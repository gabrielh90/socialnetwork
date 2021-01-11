import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authFail = ( error ) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('email');
    return {
        type: actionTypes.AUTH_ERROR,
        error: error
    }
}
export const authSuccess = (token, email, firstName, lastName, userAvatar, timeoutTimer) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        email: email, 
        userAvatar: userAvatar,
        firstName: firstName,
        lastName: lastName,
        timeoutTimer: timeoutTimer,
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('email');
    return (dispatch, getState) => {
        if(getState().auth.timeoutTimer !== null) {
            clearTimeout(getState().auth.timeoutTimer);
        }
        dispatch({type: actionTypes.AUTH_LOGOUT})
    }
}

export const authTimeout = (timerTimeout) => {
    return {
        type: actionTypes.AUTH_UPDATE_TIMEOUT,
        timerTimeout: timerTimeout
    }
}
export const updateAuthTimeout = (logoutTime) => {
    return (dispatch, getState) => {
        const expirationTime = (new Date(logoutTime).getTime() - new Date().getTime())/1000
        // console.log(getState().auth);
        if(getState().auth.timerTimeout !== null) {
            clearTimeout(getState().auth.timerTimeout);
        }
        const timerTimeout = setTimeout(() =>{
                            console.log('Session has expired!');
                            dispatch(logout())
                        }, expirationTime * 1000);
        return timerTimeout;
        //dispatch(authTimeout(timerTimeout));
        //Doesn't work with lambda function
        // dispatch(() => {return {
        //         type: actionTypes.AUTH_TIMEOUT,
        //         timeoutTimer: timerTimeout
        //     }}
        // )
    }
};

function arrayBufferToBase64(buffer, avatarType) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));        
    bytes.forEach((b) => binary += String.fromCharCode(b));        
    return 'data:' + avatarType + ';base64,' + window.btoa(binary);
};
export const authCheckState = () => {
    return  (dispatch, getState) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if(!token && !email) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()) {
                dispatch(logout());
            } else {
                const userCredentials = {
                    email: email,
                    token: token
                }
                axios.post('http://localhost:5000/login/', userCredentials)
                .then(res => {
                        // console.log(res);
                        if(res.data.authenticated === true) {
                                // console.log(res.data);
                                localStorage.setItem('expirationDate', res.data.logoutTime);
                                const timeoutTimer = dispatch(updateAuthTimeout(res.data.logoutTime));
                                const imageStr = arrayBufferToBase64(res.data.userAvatar.data, res.data.avatarType);
                                dispatch(authSuccess(res.data.token, res.data.email, res.data.firstName, res.data.lastName, imageStr, timeoutTimer));
                        } else {
                            console.log(res);
                            dispatch(authFail(res.data.error));
                        }
                    }
                )
                .catch(err => {
                    console.log(err);
                    dispatch(authFail(err.response.data.error));
                })
            }
        }
    }
}

export const authRequest = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const userCredentials = {
            email: email,
            password: password
        }
        // console.log(userCredentials);
        axios.post('http://localhost:5000/login/', userCredentials)
            .then(res => {
                //console.log(res.data);
                if(res.data.authenticated === true) {
                    // console.log(res.data);
                    localStorage.setItem('token',  res.data.token);
                    localStorage.setItem('email', res.data.email);
                    localStorage.setItem('expirationDate', res.data.logoutTime);
                    const timeoutTimer = dispatch(updateAuthTimeout(res.data.logoutTime));
                    const imageStr = arrayBufferToBase64(res.data.userAvatar.data, res.data.avatarType);
                    dispatch(authSuccess(res.data.token, res.data.email, res.data.firstName, res.data.lastName, imageStr, timeoutTimer));
                } else {
                    console.log(res.data.error);
                    dispatch(authFail(res.data.error));
                }
            })
            .catch(err => {
                console.log(err);
                // dispatch(authFail(err.response.data.error));
            })
    }
}
