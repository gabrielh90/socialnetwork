import * as actionTypes from './../actions/actionTypes'

const initialState = {
    token: null,
    username: null,
    authRedirectPath: '/',
    error: null
}

const authStart = (state, action) => {
    return {
        ...state,
        error: null,
        token: null
    }
}
const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        username: action.username
    }
}
const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        username: null
    }
}
const authError = (state, action) => {
    return {
        ...state,
        error: action.error
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
        default:
            return state;
    }
}

export default reducer
