import { Avatar, Box, fade, Grid, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import styles from './Friends.css';
import axios from './../../shared/axios-base';
import { withRouter } from 'react-router';
import * as actions from './../../store/actions'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

const StyledTab = withStyles((theme) => ({
    // Name of the rule
    root: {
        // Some CSS
        minWidth: '32px',
        //   flex: '1 1 auto',
        textTransform: 'none',
        width: 'auto',
        borderRadius:5,
        // background: fade(theme.palette.common.black, 0.04),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.07),
        },
    },
}))(Tab);
const StyledTabs = withStyles((theme) => ({
    root: {
        display: 'inline-flex',
        marginBottom: theme.spacing(2),
        //   width: '100%',
        //   width: var(--pageWidth);
    },
}))(Tabs);

const Friends = (props) => {
    const [selectedTab, setSelectedTab] = useState('');
    const [users, setUsers] = useState([]);
    useEffect(() => {
        loadFriends();
    }, []);
    const loadFriends = (path = '') => {
        axios.get('/friends/' + path + '/' +  props.match.params.id)
        .then(res=> {
            if(res.data.success){
                setUsers(res.data.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
        loadFriends(newValue);
    }
    const profilePageHandler = (event, userId) => {
        props.fetchPage('/users/' + userId);
        props.history.push('/' + userId);
    }
    
    return (<div className={styles.root}>
            <StyledTabs
                value={selectedTab}
                onChange={handleChangeTab}
                variant="standard"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="prevent tabs example"
                >
                <StyledTab value="" aria-label="home round icon" label="All friends"/>
                <StyledTab value="sentFriendRequests" aria-label="home round icon" label="Friend request sent"/>
                <StyledTab value="receivedFriendRequests" aria-label="home round icon" label="Friend request received"/>
            </StyledTabs>

            <Grid container spacing={1}>
                {users.map(({firstName, lastName, email, avatar, userId}) => {
                    console.log(firstName)
                    return (<Grid item  xs={12} sm={6} md={4} lg={4} key={userId} >
                        <ListItem button style={{border: '1px solid lightgray', borderRadius: '10px'}} onClick={(event) => profilePageHandler(event, userId)}>
                        <ListItemAvatar style={{marginRight: '10px'}}>
                            <Avatar variant="rounded" style={{height: '64px', width: '64px'}} alt={firstName + ' ' + lastName} src={avatar} />
                        </ListItemAvatar>
                        <ListItemText primary={firstName + ' ' + lastName} secondary={email} />
                            {/* <PersonAddDisabledIcon/> */}
                        </ListItem>
                    </Grid>)
                })}
            </Grid>
        </div>);
}
const mapDispatchToProps = dispatch => {
    return {
        fetchPage: (url) => dispatch(actions.fetchPage(url))
    }
}
export default withRouter(connect(null, mapDispatchToProps)(Friends));
