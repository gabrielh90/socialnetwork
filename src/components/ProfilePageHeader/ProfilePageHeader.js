import React from 'react';
import { connect } from 'react-redux';
import styles from './ProfilePageHeader.css';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { Avatar, Backdrop, Badge, Button, Divider, Fade, fade, Modal, Paper, Tab, Tabs, TextField, Typography, withStyles } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from './../../shared/axios-base';
import { useState } from 'react';

const StyledBadge = withStyles((theme) => ({
    root: {
        position: 'absolute',
        botton: '0px',
        left: '50%',
        transform: 'scale(1) translate(-50%, calc(var(--pageWidth) / 4))',
        borderRadius: '50%',
        backgroundColor: 'white',
        border: `4px solid ${theme.palette.background.paper}`,
        '&:active': {
            // border: `4px solid ${theme.palette.background.paper}`,
            transform: 'scale(1) translate(-50%, calc(var(--pageWidth) / 4))',
        },
        [theme.breakpoints.down('sm')]: {
            transform: 'scale(1) translate(-50%, calc( (var(--pageWidth) / 4) - (((var(--pageWidth) / 4) - (100vw / 4)) * 1.7)   ))',
            '&:active': {
                transform: 'scale(1) translate(-50%, calc( (var(--pageWidth) / 4) - (((var(--pageWidth) / 4) - (100vw / 4)) * 1.7)   ))',
            },
          },
    },
}))(Badge);
const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 36,
        height: 36,
        color: 'black',
    },
}))(Avatar);
const BigAvatar = withStyles((theme) => ({
    root: {
        width: '168px',
        height: '168px',
        // '&:hover': {
        //     border: `4px solid ${theme.palette.background.paper}`,
        // },
        '&:active': {
            border: `4px solid ${theme.palette.background.paper}`,
        },
    },
}))(Avatar);
const AddCoverButton = withStyles((theme) => ({
    root: {
        position: 'absolute',
        bottom: '15px',
        right: '20px',
        textTransform: 'capitalize',
        [theme.breakpoints.down('sm')]: {
            
            bottom: 'calc((var(--pageWidth) / 4) - (100vw / 4) )',
        }
    },
}))(Button);

const StyledMenu = withStyles((theme) => ({
    paper: {
      border: '1px solid #d3d4d5',
      borderRadius: '10px',
    },
    list: {
      padding: `${theme.spacing(1)}px`,
    },
  }))((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      borderRadius: '7px',
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

const AddBioButton = withStyles((theme) => ({
    root: {
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    },
}))(Button)

const StyledTab = withStyles((theme) => ({
    // Name of the rule
    root: {
      // Some CSS
      minWidth: '32px',
    //   flex: '1 1 auto',
      width: 'auto',
      borderRadius:5,
      //background: fade(theme.palette.common.black, 0.04),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.black, 0.07),
      },
    },
}))(Tab);

const StyledTabs = withStyles({
    root: {
        display: 'inline-flex',
        overflow: 'hidden',
        //   width: '100%',
        //   width: var(--pageWidth);
    },
})(Tabs);

function ProfilePage(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [updateBio, setUpdateBio] = useState(false)
    const [newBio, setNewBio] = useState(props.pageContent.shortDescription)
    const [imageModal, setImageModal] = useState(null)
    const myProfile = props.history.location.pathname === ('/' + props.userProfileId);
    // const profilePageHandler = (event, userId) => {
    //     props.fetchPage('/' + userId);
    //     props.history.push('/' + userId);
    //   }
    //   onClick={(event) => profilePageHandler(event, userProfileId)}

    useEffect(() => {
        if(props.pageContent.userProfileId && props.history.location.pathname !== ('/' + props.pageContent.userProfileId)) {
            props.fetchPage('/' +props.pageContent.userProfileId);
            props.history.push('/' + props.pageContent.userProfileId);
        }
        if(Object.keys(props.pageContent).length === 0) {
            // props.fetchPage(props.history.location.pathname);
            // props.history.push('/' + userId);
           
        
        }
        return () => {
        }
    }, [])

    const inputFileChangeHandler = (event) => {
        let formData = new FormData();
        formData.append('file', event.target.files[0], anchorEl.id);
        // formData.append('file', event.target.files[0]);
        // formData.append(anchorEl.id, true);

        let newReactData = Object.assign({},{[anchorEl.id] : URL.createObjectURL(event.target.files[0])});
        props.updateFields(props.history.location.pathname, formData, newReactData);
        setAnchorEl(null);
    }
    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const selectPhoto = <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
        <StyledMenuItem>
        <ListItemIcon 
            style={{minWidth: '0', marginRight: '20px'}}
        >
            <PhotoOutlinedIcon fontSize="small"/>
        </ListItemIcon>
        <ListItemText primary="Select Photo" />
        </StyledMenuItem>
        <StyledMenuItem>
        <input type="file" accept="image/*" style={{display: "none",}} id="upload-photo"
            onChange={(event)=>inputFileChangeHandler(event)}
        />
        <label htmlFor="upload-photo" style={{display: 'flex', alignItems: 'center'}}>
            <ListItemIcon style={{minWidth: '0', marginRight: '20px'}}>
                <BackupOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Upload Photo" />
        </label>
        </StyledMenuItem>
    </StyledMenu>
    const modalWindow = <Modal
            className={styles.modal}
            open={Boolean(imageModal)}
            onClose={() => {setImageModal(null)}}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
        <Fade in={Boolean(imageModal)}>
            <Paper>
                <img src={imageModal}/>
            </Paper>
        </Fade>
    </Modal>
    const handlerModalImage = (event, img) => {
        event.preventDefault();
        event.stopPropagation();
        setImageModal(img)
    }
    return (
        <div className={styles.hero}>
            <div className={styles.cover} 
                style={Boolean(props.pageContent?.coverPhoto) ? {backgroundImage: `url(${props.pageContent?.coverPhoto})`} : {}}
                onClick={(event)=>handlerModalImage(event, props.pageContent?.coverPhoto)}
                >
                <StyledBadge
                    onClick={(event)=>{handlerModalImage(event, props.pageContent?.userAvatar);}}
                    id='userAvatar'
                    overlap="circle"
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    badgeContent={myProfile && <SmallAvatar onClick={handleClick}><PhotoCameraIcon/></SmallAvatar>}
                >
                    <BigAvatar alt={props.pageContent.firstName} src={props.pageContent?.userAvatar} />
                </StyledBadge>
                {myProfile && <AddCoverButton
                    onClick={handleClick}
                    id='coverPhoto'
                    disableElevation={true}
                    variant="contained"
                    color="default"
                    startIcon={<PhotoCameraIcon />}
                >
                    {props.pageContent.coverPhoto === null? 'Add':'Change'}  Cover Photo
                </AddCoverButton>}
                {selectPhoto}
            </div>
            {modalWindow}
            <Typography variant="h4" align="center">
                {props.pageContent['firstName'] + ' ' + props.pageContent['lastName']}
            </Typography>
            <div className={styles.shortDescription}>
                {!updateBio && 
                <>
                <Typography variant="subtitle1" display="block" align="center">
                    {props.pageContent.shortDescription}
                </Typography>
                <AddBioButton 
                    variant="text" 
                    color='primary' 
                    disableRipple={true}
                    disableFocusRipple={true}
                    disableElevation={true}
                    onClick={() => {
                        setNewBio(props.pageContent.shortDescription);
                        setUpdateBio(true);
                    }}
                >
                    {Boolean(props.pageContent.shortDescription) ? 
                        "EditBio"
                        :
                        "AddBio"
                    }
                </AddBioButton>
                </>}

                {updateBio  && <div className={styles.bioUpdate}>
                    <TextField
                        style={{marginBottom: '8px'}}
                        id="outlined-multiline-static"
                        label="Describe who you are"
                        placeholder="Describe who you are"
                        InputLabelProps={{shrink: true}}
                        margin='normal'
                        multiline
                        rows={4}
                        defaultValue={Boolean(props.pageContent.shortDescription) ? props.pageContent.shortDescription : ""}
                        variant="outlined"
                        onChange={(event) => {setNewBio(event.target.value)}}
                    />
                    <div style={{alignSelf:"end"}}>
                        <Button variant="contained" color="primary" style={{marginRight: '8px'}}
                        onClick={() => setUpdateBio(false)}
                        >Cancel</Button>
                        <Button variant="contained" disabled={newBio === props.pageContent.shortDescription} 
                            onClick={()=>{props.updateFields(props.history.location.pathname, {shortDescription :newBio});}}
                        >Save</Button> 
                    </div>
                </div>}
            </div>
            <Divider variant="middle" style={{marginTop: '18px', marginBottom: '18px'}} />
            <div className={styles.navigation}>
            <StyledTabs
                value={1}
                //onChange={handleChange}
                variant="standard"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="prevent tabs example"
                >
                <StyledTab aria-label="home round icon" label="Posts"/>
                <StyledTab aria-label="home round icon" label="About"/>
                <StyledTab aria-label="home round icon" label="Friends"/>
                <StyledTab aria-label="home round icon" label="Photos"/>
            </StyledTabs>
            {props.history.location.pathname !== ('/' + props.userProfileId) && 
            <Button
                variant="text"
                color="primary"
                // className={classes.button}
                startIcon={<PersonAddIcon  style={{ transform: 'rotateY(180deg)' }}/>}
            >
                Add friend
            </Button>}
            
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        pageContent: state.currentPage.content,
        userProfileId: state.auth.userProfileId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPage: (url) => dispatch(actions.fetchPage(url)),
        updateFields: (url, formData, newValues) => dispatch(actions.updateFields(url, formData, newValues))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage))