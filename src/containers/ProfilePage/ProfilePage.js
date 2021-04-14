import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from './ProfilePage.css';
import * as actions from './../../store/actions';
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import ProfilePageHeader from '../../components/ProfilePageHeader'
import AddPost from '../../components/AddPost';
import Friends from '../Friends';
import Page404 from '../../components/PageNotFound';
import Box from '@material-ui/core/Box';
import Posts from './../Posts';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
                {children}
            </Box>
        )}
        </div>
    );
}

function ProfilePage(props) {
    const [selectedTab, setSelectedTab] = useState("posts");
    const [addPost, setAddPost] = useState(false);
    useEffect(() => {
        if((Object.keys(props.pageContent).length === 0) ||
            (props.pageContent.userId !== props.match.params.id)) {
            props.fetchPage('/users/' + props.match.params.id);
        }
        return () => {
        }
    }, []);
    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    }

    return (<Fragment>
        {Boolean(props.pageError) ?
            <Page404 {...props.pageError}/>
            :
            <>
                <ProfilePageHeader handleChangeTab={handleChangeTab} selectedTab={selectedTab} handleAddPost={setAddPost} addPost={addPost}/>
                <div className={styles.tabpanel}>
                    <TabPanel value={selectedTab} index="posts">
                        {addPost && <AddPost handleAddPost={setAddPost}/>}
                        <Posts/>
                    </TabPanel>
                    <TabPanel value={selectedTab} index="about">
                        Item Two
                    </TabPanel>
                    <TabPanel value={selectedTab} index="friends">
                        <Friends/>
                    </TabPanel>
                    <TabPanel value={selectedTab} index="photos">
                        Item Three
                    </TabPanel>
                </div>
            </>
        }
    </Fragment>)
}
const mapStateToProps = state => {
    return {
        pageContent: state.currentPage.content,
        pageError: state.currentPage.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPage: (url) => dispatch(actions.fetchPage(url)),

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage))