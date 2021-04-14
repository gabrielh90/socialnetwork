import * as actionTypes from './../actions/actionTypes'

const initialState = {
    userIsNotAuthenticated: false,
    userIsAuthenticated: false,
    userId: null,
    token: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || '',
    timeoutTimer: null,
    authRedirectPath: '/',
    error: null
}

const authStart = (state, action) => {
    return {
        ...state
    }
}
const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        email: action.email,
        userId: action.userId,
        timeoutTimer: action.timeoutTimer,
        userIsNotAuthenticated: false,
        userIsAuthenticated: true,
    }
}
const authLogout = (state, action) => {
    return {
        ...initialState,
        userIsNotAuthenticated: true,
        userIsAuthenticated: false,
    }
}
const authError = (state, action) => {
    return {
        ...state,
        error: action.error,
        userIsNotAuthenticated: true,
        userIsAuthenticated: false,
    }
}
const authUpdateTimeout = (state, action) => {
    return {
        ...state,
        userId: action.userId,
        timeoutTimer: action.timerTimeout,
        userIsNotAuthenticated: false,
        userIsAuthenticated: true,
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.AUTH_ERROR:
            return authError(state, action);
        case actionTypes.AUTH_TIMEOUT:
            return authLogout(state, action);
        case actionTypes.AUTH_UPDATE_TIMEOUT:
            return authUpdateTimeout(state, action);
        default:
            return state;
    }
}

export default reducer
