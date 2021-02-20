import React, {Fragment} from 'react'
import Story from '../../components/Story'
import Post from '../Post/Post'
import AddPost from '../../components/AddPost'

const CenterRail = () => {

    return (
            <Fragment>
                <AddPost/>
                {/* <Post/> */}
                <Story/>
            </Fragment>
        );
}

export default CenterRail;
