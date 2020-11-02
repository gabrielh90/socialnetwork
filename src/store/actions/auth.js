import axios from 'axios'

export const logout = () => {
    return {type: 'MAMBO'};
}
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        console.log('token ' + token)
        if(!token) {
            dispatch(logout())
        }
    }
}
export const authStart = () => {
    return {
        type: 'AUTH_START'
    }
}
export const authRequest = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        const exercise = {
            username: email,
            password: password
        }
        axios.post('http://localhost:5000/login/add', exercise)
            .then(res => console.log('Resp from server: ' + res.data))
    }
}
