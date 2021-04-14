import axios from './../../shared/axios-base';
import * as actionTypes from './actionTypes';

export const fetchStart = (url) => {
    return {
        type: actionTypes.FETCH_START,
        url: url
    }
}
export const fetchFailed = (error) => {
    return {
        type: actionTypes.FETCH_FAILED,
        error: error
    }
}
export const fetchSuccess = (content) => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        content: content
    }
}
export const pageContentUpdate = (newValues) => {
    return {
        type: actionTypes.UPDATE_PAGE_FIELDS,
        newValues: newValues
    }
}
export const fetchPage = (url) => {
    return dispatch => {
        dispatch(fetchStart(url));
        axios.get(url, {})
        .then(res => {
            // console.log(res.data);
            if(res.data.success) {
                dispatch(fetchSuccess(res.data.data));
            } else {
                dispatch(fetchFailed(res.data.error));
            }
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch(fetchFailed({...err.response.data.error, status: err.response.status}));
        })
    }
}

export const updateLocalAndDBFields = (url, formData, newValues) => {
    return dispatch => {
        // console.log(newValues)
        dispatch(pageContentUpdate(newValues ? newValues : formData));
        axios
        .put(url, formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },})
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchFailed({...err.response.data.error, status: err.response.status}));
        })
    }
}
