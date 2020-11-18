import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username
    }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
    return {type: actionTypes.AUTH_LOGOUT};
}
export const authFail = ( error ) => {
    return {
        type: actionTypes.AUTH_ERROR,
        error: error
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => 
        setTimeout(() =>{
            dispatch(logout())
        }, expirationTime * 1000);
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if(!token) {
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()) {
                dispatch(logout())
            } else {
                const username = localStorage.getItem('username');
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
}
export const authRequest = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        const exercise = {
            username: email,
            password: password
        }
        console.log(exercise)
        axios.post('http://localhost:5000/login/', exercise)
            .then(res => {
                if(res.data.authenticated === 'true') {
                    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                    localStorage.setItem('token',  res.data.token)
                    localStorage.setItem('username', res.data.username)
                    localStorage.setItem('expirationDate', expirationDate)
                    dispatch(authSuccess(res.data.token, res.data.username));
                    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
                } else {
                    console.log(res.data.error)
                    dispatch(authFail(res.data.error));
                }
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const accountRecovery = (email) => {
    return dispatch => {
        const account = {
            username: email,
        }
        axios.post('http://localhost:5000/recover/', account)
            .then(res => {
                if(res.data.found === 'true') {
                    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                    localStorage.setItem('token',  res.data.token)
                    localStorage.setItem('username', res.data.username)
                    localStorage.setItem('expirationDate', expirationDate)
                    dispatch(authSuccess(res.data.token, res.data.username));
                    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
                } else {
                    console.log(res.data.error)
                    dispatch(authFail(res.data.error));
                }
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}