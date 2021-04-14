import axios from './axios-base';
import {CancelToken, isCancel} from 'axios'
import {useEffect, useState} from "react";
import { useRef } from 'react';

const useRequest = (initReqConfig={method: 'post', url: '/'}, initQueryParams={}, delay = 0) => {
    const [reqConfig, setReqConfig] = useState(initReqConfig);
    const [queryParams, setQueryParams] = useState(initQueryParams);
    const [responseData, setResponseData] = useState({data: [], loading: false});
    const [delayTimer, setDelayTimer] = useState(null)
    const source = CancelToken.source();
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        clearTimeout(delayTimer);

        const timer = setTimeout(() => {
            setResponseData(currentState => ({data: currentState.data, loading: true}));
            // console.log(queryParams);
            let axiosReq = null;
            if(reqConfig.method === 'get') {
                const queryString = '?' + Object.entries(queryParams).map(([key, value], index) => (
                    encodeURIComponent(key) + '=' + encodeURIComponent(value)
                )).join('&');
                axiosReq = axios({...reqConfig, url: reqConfig.url + (queryParams !== {} ? queryString : '')
                                    , cancelToken: source.token})
            } else {
                axiosReq = axios({...reqConfig, data: queryParams, cancelToken: source.token})
            }
            setResponseData(prev => ({data: prev.data, loading: true}));
            axiosReq
            .then(response => {
                console.log(response.data.data);
                if(response.data.success)
                    setResponseData(prev => ({data: response.data.data, loading: false}));
            })
            .catch(error => {
                if (isCancel(error)) {
                    console.log(error.message);
                    setResponseData(currentState => ({...currentState, loading: false}));
                } else {
                    console.log(error);
                }
            })
            return () => {
                source.cancel('Request canceled!');
            }
        }, delay);

        setDelayTimer(timer);
    }, [reqConfig, queryParams])

    const cancelRequest = () => {
        clearTimeout(delayTimer);
        source.cancel('Request canceled!');
        setResponseData(currentState => ({data: currentState.data, loading: false}));
    }

    const changeReqQueryHandler = event => {
        event.preventDefault();
        event.persist();
        setQueryParams(currentState => ({
            ...currentState,
            [event.target.name]: event.target.value}
        ))
        // console.log(event.target.value);
    }

    return [queryParams,
            responseData.data,
            responseData.loading, 
            setReqConfig,
            changeReqQueryHandler,
            cancelRequest]
}

export default useRequest;