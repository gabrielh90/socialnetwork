import React, {Fragment, useEffect, useState} from 'react';
import Story from '../../components/Story';
import Post from '../Post/Post';
import {axios} from '../../shared';

const CenterRail = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('/posts')
        .then(rsp => {
            if(rsp.data.success){
                setPosts(rsp.data.data)
        }})
        .catch(err => console.log(err))
    }, [])


    return (
            <Fragment>

                
                <Post/>
                <Story/>
            </Fragment>
        );
}

export default CenterRail;
