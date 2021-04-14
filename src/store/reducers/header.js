import * as actionTypes from './../actions/actionTypes'
const initialState = {
    error: null,
    loading: false
}
const headerFetchStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true
    }
}
const headerFetchSuccess = (state, action) => {
    return {
        ...state,
        ...action.header,
        loading: false
    }
}
const headerFetchFailed = (state, action) => {
    return {
        ...initialState,
        error: action.error,
        loading: false
    }
}
const headerContentUpdate = (state, action) => {
    console.log(action.newValues);
    const header = {
        ...state.header,
        ...action.newValues
    }
    console.log(header)
    return {
        ...state,
        header: header
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_HEADER_START:
            return headerFetchStart(state, action);
        case actionTypes.FETCH_HEADER_SUCCESS:
            return headerFetchSuccess(state, action);
        case actionTypes.FETCH_HEADER_FAILED:
            return headerFetchFailed(state, action);
        case actionTypes.UPDATE_HEADER_FIELDS:
            return headerContentUpdate(state, action);
        default:
            return state;
    }
}

export default reducer
