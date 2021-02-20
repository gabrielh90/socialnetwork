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
export const authSuccess = (timeoutTimer, res) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: res.token,
        userProfileId: res.userProfileId,
        email: res.email, 
        userAvatar: res.userAvatar,
        firstName: res.firstName,
        lastName: res.lastName,
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
function arrayBufferToBase64(buffer, avatarType = '') {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));        
    bytes.forEach((b) => binary += String.fromCharCode(b));        
    return 'data:' + avatarType + ';base64,' + window.btoa(binary);
};

export const tokenAuthRequest = (url='/') => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    return  (dispatch, getState) => {
        dispatch(authStart());
        if(!token && !email) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()) {
                dispatch(logout());
            } else {
                const userCredentials = { 
                    email: email,
                    token: token,
                }
                axios.post('http://localhost:5000/login', userCredentials)
                .then(res => {
                        // console.log(res);
                        if(res.data.authenticated === true) {
                                // console.log(res.data);
                                localStorage.setItem('expirationDate', res.data.logoutTime);
                                const timeoutTimer = dispatch(updateAuthTimeout(res.data.logoutTime));
                                dispatch(authSuccess(timeoutTimer, res.data));
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
export const tokenAuthRequestFetchPage = (url='/') => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    return  (dispatch, getState) => {
        dispatch(authStart());
        let userCredentials = {
            email: email,
            token: token,
            url: url
        }
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if(expirationDate < new Date()) {
            dispatch(logout());
            userCredentials = {
                ...userCredentials,
                email: '',
                token: ''
            }
        }

        if((token !== '' && email !== '') || url !== '/') {
            axios.post('http://localhost:5000/login', userCredentials)
            .then(res => {
                    // console.log(res);
                    if(res.data.authenticated === true) {
                        // console.log(res.data);
                        localStorage.setItem('expirationDate', res.data.logoutTime);
                        const timeoutTimer = dispatch(updateAuthTimeout(res.data.logoutTime));
                        dispatch(authSuccess(timeoutTimer, res.data));
                    } else if(res.data.authenticated !== true && userCredentials.email !== ''){
                        console.log(res);
                        dispatch(authFail(res.data.error));
                    }
                    //dispatch also data
                }
            )
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
        }
    }
}

export const passwordAuthRequest = (email, password, url='/') => {
    return dispatch => {
        dispatch(authStart());
        const userCredentials = {
            email: email,
            password: password,
            url: url
        }
        // console.log(userCredentials);
        // console.log('http://localhost:5000/' + url);
        axios.post('http://localhost:5000/login', userCredentials)
            .then(res => {
                //console.log(res.data);
                if(res.data.authenticated === true) {
                    // console.log(res.data);
                    localStorage.setItem('token',  res.data.token);
                    localStorage.setItem('email', res.data.email);
                    localStorage.setItem('expirationDate', res.data.logoutTime);
                    const timeoutTimer = dispatch(updateAuthTimeout(res.data.logoutTime));
                    dispatch(authSuccess(timeoutTimer, res.data));
                } else {
                    console.log(res.data.error);
                    dispatch(authFail(res.data.error));
                }
                //return data
            })
            .catch(err => {
                console.log(err);
                // dispatch(authFail(err.response.data.error));
            })
    }
}
