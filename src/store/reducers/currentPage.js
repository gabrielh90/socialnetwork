import * as actionTypes from './../actions/actionTypes'
const initialState = {
    content: {},
    url: '',
    error: null
}
const pageFetchStart = (state, action) => {
    return {
        ...state,
        content: {},
        url: action.url,
        error: null,
        loading: true
    }
}
const pageFetchSuccess = (state, action) => {
    return {
        ...state,
        content: action.content,
        loading: false
    }
}
const pageFetchFailed = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    }
}
const pageContentUpdate = (state, action) => {
    // console.log(action.newValues);
    const content = {
        ...state.content,
        ...action.newValues
    }
    // console.log(content)
    return {
        ...state,
        content: content
    }
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_START:
            return pageFetchStart(state, action);
        case actionTypes.FETCH_SUCCESS:
            return pageFetchSuccess(state, action);
        case actionTypes.FETCH_FAILED:
            return pageFetchFailed(state, action);
        case actionTypes.UPDATE_PAGE_FIELDS:
            return pageContentUpdate(state, action);
        default:
            return state;
    }
}

export default reducer