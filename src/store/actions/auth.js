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
        email: res.email,
        userId: res.userId,
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
export const authTimeout = () => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.AUTH_TIMEOUT});
        dispatch(logout());
    }
}
export const updateAuthTimeout = (timerTimeout, userId) => {
    return {
        type: actionTypes.AUTH_UPDATE_TIMEOUT,
        timerTimeout: timerTimeout,
        userId: userId,
    }
}
export const updateAuthTimer = (logoutTime) => {
    return (dispatch, getState) => {
        const expirationTime = (new Date(logoutTime).getTime() - new Date().getTime())/1000
        // console.log(getState().auth);
        if(getState().auth.timerTimeout !== null) {
            clearTimeout(getState().auth.timerTimeout);
        }
        const timerTimeout = setTimeout(() =>{
                            console.log('Session has expired!');
                            dispatch(authTimeout())
                        }, expirationTime * 1000);
        return timerTimeout;
    }
};

export const updateTokenTimeout = () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    return  (dispatch, getState) => {
        dispatch(authStart());
        // if((token !== '' && email !== '') || url !== '/') {
        if(Boolean(token) && (expirationDate > new Date())) {
            axios.get('http://localhost:5000/api/v1/auth/renewtokentimeout', 
                    {
                        headers: {
                        Authorization: `Bearer ${token}` 
                    }
                    })
            .then(res => {
                    // console.log(res);
                    if(res.data.success === true) {
                        // console.log(res.data);
                        localStorage.setItem('expirationDate', res.data.data.logoutTime);
                        const timeoutTimer = dispatch(updateAuthTimer(res.data.data.logoutTime));
                        dispatch(updateAuthTimeout(timeoutTimer, res.data.data.userId));
                    } else {
                        console.log(res);
                        dispatch(authFail(res.data.error));
                    }
                }
            )
            .catch(err => {
                console.log(err.response.data);
                // dispatch(logout());
                if( err.response.data.error.name === "Not authorized to access this route" && 
                    err.response.data.error.description.authenticated === false){
                        dispatch(authFail(err.response.data.error));
                }
            })
        } else {
            dispatch(logout());
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
        axios.post('http://localhost:5000/api/v1/auth/login', userCredentials)
            .then(res => {
                console.log(res.data);
                if(res.data.success === true) {
                    localStorage.setItem('token',  res.data.data.token);
                    localStorage.setItem('email', res.data.data.email);
                    localStorage.setItem('expirationDate', res.data.data.logoutTime);
                    const timeoutTimer = dispatch(updateAuthTimer(res.data.data.logoutTime));
                    dispatch(authSuccess(timeoutTimer, res.data.data));
                } else {
                    console.log(res.data.error);
                    dispatch(authFail(res.data.error));
                }
                //return data
            })
            .catch(err => {
                console.log(err.response);
                if(!err.response.data.success)
                    dispatch(authFail(err.response.data.error));
            })
    }
}
