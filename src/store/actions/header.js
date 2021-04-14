import axios from './../../shared/axios-base';
import * as actionTypes from './actionTypes';

export const fetchHeaderStart = () => {
    return {
        type: actionTypes.FETCH_HEADER_START,
    }
}
export const fetchHeaderFailed = (error) => {
    return {
        type: actionTypes.FETCH_HEADER_FAILED,
        error: error
    }
}
export const fetchHeaderSuccess = (header) => {
    return {
        type: actionTypes.FETCH_HEADER_SUCCESS,
        header
    }
}
export const headerContentUpdate = (newValues) => {
    return {
        type: actionTypes.UPDATE_HEADER_FIELDS,
        newValues: newValues
    }
}
export const fetchHeaderInfo = (url = '/users/me') => {
    return dispatch => {
        dispatch(fetchHeaderStart(url));
        axios.get(url)
        .then(res => {
            if(res.data.success){
                dispatch(fetchHeaderSuccess(res.data.data));
            } else {
                dispatch(fetchHeaderFailed(res.data.error));
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchHeaderFailed(err.response.data.error));
        })
    }
}
export const fetchPage = (url) => {
    return dispatch => {
        dispatch(fetchHeaderStart(url));
        axios.post(url, {})
        .then(res => {
            // console.log(res.data);
            dispatch(fetchHeaderSuccess(res.data));
            //return data
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchHeaderFailed(err.response.data.error));
        })
    }
}

export const updateFields = (url, formData, newValues) => {
    return dispatch => {
        console.log(newValues)
        dispatch(headerContentUpdate(newValues ? newValues : formData));
        axios
        .post(url+'/update', formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },})
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchHeaderFailed(err.response.data.error));
        })
    }
}
