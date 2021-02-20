import * as actionTypes from './../actions/actionTypes'

const initialState = {
    userIsNotAuthenticated: false,
    userIsAuthenticated: false,
    token: localStorage.getItem('token') || '',
    userProfileId: null,
    email: localStorage.getItem('email') || '',
    userAvatar: null,
    firstName: null,
    lastName: null,
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
        userProfileId: action.userProfileId,
        email: action.email,
        userAvatar: action.userAvatar,
        firstName: action.firstName,
        lastName: action.lastName,
        timeoutTimer: action.timeoutTimer,
        userIsNotAuthenticated: false,
        userIsAuthenticated: true,
    }
}
const authLogout = (state, action) => {
    return {
        ...initialState,
        userIsNotAuthenticated: true,
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
const authTimeout = (state, action) => {
    return {
        ...state
    }
}
const authUpdateTimeout = (state, action) => {
    return {
        ...state,
        timeoutTimer: action.timeoutTimer
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
            return authTimeout(state, action);
        case actionTypes.AUTH_UPDATE_TIMEOUT:
            return authUpdateTimeout(state, action);
        default:
            return state;
    }
}

export default reducer
