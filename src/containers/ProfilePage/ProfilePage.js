import React from 'react';
import { connect } from 'react-redux';
import styles from './ProfilePage.css';
import * as actions from './../../store/actions';
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { fade, Paper, withStyles } from '@material-ui/core';
import ProfilePageHeader from '../../components/ProfilePageHeader'
import AddPost from '../../components/AddPost';

const StyledPaper = withStyles((theme) => ({
    root: {
      backgroundColor: fade(theme.palette.common.black, 0.34),
    //   marginTop: theme.spacing(2),
    },
  }))(Paper);

function ProfilePage(props) {
    // const profilePageHandler = (event, userId) => {
    //     props.fetchPage('/' + userId);
    //     props.history.push('/' + userId);
    //   }
    //   onClick={(event) => profilePageHandler(event, userProfileId)}
    useEffect(() => {
        if(Object.keys(props.pageContent).length === 0) {
            props.fetchPage(props.history.location.pathname);
            // props.history.push('/' + userId);
        }
        return () => {
        }
    }, [])


    return (<Fragment>
        <StyledPaper>
            <ProfilePageHeader />

            <StyledPaper>
                <AddPost/>
            </StyledPaper>

        </StyledPaper>
    </Fragment>)
}
const mapStateToProps = state => {
    return {
        pageContent: state.currentPage.content
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPage: (url) => dispatch(actions.fetchPage(url))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage))