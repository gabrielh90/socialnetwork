import React, {Fragment, useEffect, useState} from 'react';
import Post from '../Post/Post';
import {axios} from '../../shared';

const Posts = () => {
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
                {posts.map((post, idx) => 
                        <Post key={idx} {...post}/>
                )}
                
                {/* <Post/> */}
            </Fragment>
        );
}

export default Posts;
