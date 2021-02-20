import React, {Fragment} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {logout, fetchPage} from '../../store/actions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon'
import SearchCard from '../../components/SearchCard'
import MailIcon from '@material-ui/icons/Mail'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import OndemandVideoRoundedIcon from '@material-ui/icons/OndemandVideoRounded'
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded'
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded'
import GamepadRoundedIcon from '@material-ui/icons/GamepadRounded'

import AccountCircle from '@material-ui/icons/AccountCircle'
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded'
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import AvatarSrc from "./../../assets/avatar.jpg"
import ButtonBase from '@material-ui/core/ButtonBase';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: fade(theme.palette.common.white, 1),
  },
  leftIcons: {
    display: 'flex',
    alignItems: 'center',
  },
  facebookIcon: {
    margin: '0 0px',
    padding: 0,
    fontSize: 48,
    color: 'rgba(25, 181, 254, 1)',
    borderRadius: 50,
    backgroundColor: 'transparent',
    display: 'inline-flex',
  },
  sectionDesktop: {
    //justifyContent: 'space-between',
    overflow: 'hidden',
    // display: 'none',
    // [theme.breakpoints.up('md')]: {
    //   display: 'flex',
    // },
  },
  desktopIcon: {
    borderRadius: '4px', 
    flexGrow: 1,
    //background: fade(theme.palette.common.black, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.07),
    },
    padding: theme.spacing(1.5),
  },
  sectionMobile: {
    display: 'flex',
  },
  rightIcons:{
    display: 'flex',
    justifyContent: 'flex-end',
  },

  chipRoot: {
    alignSelf: 'center',
    marginRight: '4px',
    fontSize: '.9375rem',
    height: 'auto',
    borderRadius: 100,
    background: 'transparent',
    '&:hover, &:focus': {
      backgroundColor: fade(theme.palette.common.black, 0.07),
    },
    '& $chipAvatar': {
      marginLeft: '4px',
      marginTop: 4,
      marginBottom: 4,
      width: 28,
      height: 28,
    },
  },
  chipAvatar: {},
  blueColor: {
    color: 'hsl(214, 89%, 52%)',
    background: '#E7F3FF',
  },
  roundIcon: {
    //border: '2px green solid',
    margin: theme.spacing(0.5),
    padding: theme.spacing(1),
    fontSize: 24,
    // color: 'gray',
    background: fade(theme.palette.common.black, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.07),
    },
    // display: 'flex',
    // [theme.breakpoints.up('lg')]: {
    //   display: 'none',
    // },
  },
}));

const StyledTab = withStyles((theme) => ({
      // Name of the rule
      root: {
        // Some CSS
        minWidth: '32px',
        flex: '1 0 auto',
        width: 'auto',
        borderRadius:5,
        //background: fade(theme.palette.common.black, 0.04),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.black, 0.07),
        },
      },
}))(Tab);

const StyledTabs = withStyles({
  // Name of the rule
  root: {
    // Some CSS
    overflow: 'hidden',
    width: '100%',
  },
})(Tabs);

function CustomAppBar(props) {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // console.log(props.history.location.pathname);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const profilePageHandler = (event) => {
    props.fetchPage('/' + props.userProfileId);
    props.history.push('/' + props.userProfileId);
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsRoundedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={props.logOut}>
        <IconButton
          aria-label="Log out"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar
            style={{padding: '6px 16px 3px 16px', margin: '0px', minHeight: '48px',
                    justifyContent: 'space-between',
                    flexGrow: 1,}} disableGutters >
            <Grid container spacing={3} style={{justifyContent:'space-between'}}>
              <Grid item xs={2} sm={2} md={4} lg={3} className={classes.leftIcons}>
                <Link to='/'>
                  <IconButton
                    edge={false}
                    disableFocusRipple={false}
                    color="primary"
                    aria-label="open drawer"
                    size='small'
                    style={{
                            backgroundColor: 'transparent',
                            padding: 0, 
                            }}
                  >
                    <Icon className={classes.facebookIcon}>facebook</Icon>
                  </IconButton>
                </Link>
                <SearchCard/>
              </Grid>
              <Grid item xs={5} sm={5} md={4} lg={4}>
                <div className={classes.sectionDesktop}>
                  <StyledTabs
                    value={3}
                    //onChange={handleChange}
                    variant="standard"
                    scrollButtons="off"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="prevent tabs example"
                  >

                    <StyledTab icon={ 
                      <Badge badgeContent={0} color="secondary">
                        <HomeRoundedIcon />
                      </Badge>
                    } aria-label="home round icon" />
                    <StyledTab icon={
                      <Badge badgeContent={0} color="secondary">
                        <OndemandVideoRoundedIcon />
                      </Badge>
                    } aria-label="video round icon" />
                    <StyledTab icon={
                      <Badge badgeContent={4} color="secondary">
                        <StorefrontRoundedIcon />
                      </Badge>
                    } aria-label="store round  icon" />
                    <StyledTab icon={
                      <Badge badgeContent={2} color="secondary">
                        <PeopleRoundedIcon />
                      </Badge>
                    } aria-label="people groups round icon" />
                    <StyledTab icon={
                      <Badge badgeContent={0} color="secondary">
                        <GamepadRoundedIcon />
                      </Badge>
                    } aria-label="games round icon" />
                  </StyledTabs>
                </div> 
              </Grid>
              <Grid item xs={5} sm={5} md={4} lg={3} className={classes.rightIcons}>
                  <Chip
                    avatar={<Avatar alt={props.firstName}
                                    src={props.userAvatar}
                                    // style={{width: 28,
                                    //         height: 28,}}
                            />}
                    label={props.firstName}
                    onClick={profilePageHandler}
                    classes={{
                              root: classes.chipRoot,
                              avatar: classes.chipAvatar,
                    }}
                    className={props.history.location.pathname === ('/' + props.userProfileId) ? classes.blueColor : ''}
                    style={{// background: 'transparent', '&:hover': { background: 'gray'}
                    }}
                  />
                  <IconButton 
                    aria-label="show 4 new mails" color="inherit"
                    className={classes.roundIcon}
                  >
                    <Badge badgeContent={3} color="secondary">
                      <AddRoundedIcon />
                    </Badge>
                  </IconButton>
                  <IconButton 
                    aria-label="show 4 new mails" color="inherit"
                    className={classes.roundIcon}
                  >
                    <Badge badgeContent={0} color="secondary">
                      <QuestionAnswerRoundedIcon />
                    </Badge>
                  </IconButton>
                  <IconButton 
                    aria-label="show 17 new notifications" color="inherit"
                    className={classes.roundIcon}
                  >
                    <Badge badgeContent={17} color="secondary">
                      <NotificationsRoundedIcon/>
                    </Badge>
                  </IconButton>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                    className={classes.roundIcon}
                  >
                    <ArrowDropDownIcon/>
                  </IconButton>
              </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    userProfileId: state.auth.userProfileId,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    userAvatar: state.auth.userAvatar,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logout()),
    fetchPage: (url) => dispatch(fetchPage(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar); 