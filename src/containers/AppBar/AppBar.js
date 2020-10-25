import React, {Fragment} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/MoreVert'
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
import ButtonBase from '@material-ui/core/ButtonBase'

import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: fade(theme.palette.common.white, 1),
  },
  leftIcons: {
    display: 'flex',
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
  searchIcon: {
    color: 'gray',
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  search: {
    margin: 'auto',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    //border: '2px red dotted',
    position: 'relative',
    borderRadius:50,
    backgroundColor: fade(theme.palette.common.black, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.07),
    },
    maxHeight: 48,
    width: '100%',

    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  searchIconInput: {
    //border: '2px green solid',
    padding: theme.spacing(0, 1.5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'gray',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    // border: '2px blue solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1.2, 1.5, 1.2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      //width: '20ch',
    },
  },
  searchCard:{
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'none',
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
    [theme.breakpoints.up('md')]: {
     // display: 'none',
    },
  },
  rightIcons:{
    display: 'flex',
    justifyContent: 'flex-end',
  },
  roundIcon: {
    //border: '2px green solid',
    margin: theme.spacing(0.5),
    padding: theme.spacing(1),
    fontSize: 24,
    height: '100%',
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

export default function LogInAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'buttom', horizontal: 'left' }}
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
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
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
              <Grid item xs={false} sm={4} md={4} lg={3}>
                <div className={classes.leftIcons}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  style={{backgroundColor: 'transparent',
                          padding: 0, margin: 0}}
                >
                  <Icon className={classes.facebookIcon}>facebook</Icon>
                </IconButton>

                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  // style={{backgroundColor: 'transparent',
                  //         padding: 0, margin: 0}}
                  className={classes.roundIcon + ' ' + classes.searchIcon}
                >
                  <SearchIcon/>
                </IconButton>

                <div className={classes.search}>
                  <div className={classes.searchIconInput}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                <div className={classes.searchCard}>
                        <SearchCard/>
                </div>
              </div>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
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
               
                  {/* <ButtonBase aria-label="show 4 new mails" color="inherit"
                    className={classes.desktopIcon}
                  >
                    <Badge badgeContent={0} color="secondary">
                      <HomeRoundedIcon />
                    </Badge>
                  </ButtonBase>
                  <ButtonBase aria-label="show 17 new notifications" color="inherit"
                    className={classes.desktopIcon}
                  >
                    <Badge badgeContent={0} color="secondary">
                      <OndemandVideoRoundedIcon />
                    </Badge>
                  </ButtonBase>
                  <ButtonBase aria-label="show 4 new mails" color="inherit"
                    className={classes.desktopIcon}
                  >
                    <Badge badgeContent={0} color="secondary">
                      <StorefrontRoundedIcon />
                    </Badge>
                  </ButtonBase>
                  <ButtonBase aria-label="show 17 new notifications" color="inherit"
                    className={classes.desktopIcon}
                  >
                    <Badge badgeContent={17} color="secondary">
                      <PeopleRoundedIcon />
                    </Badge>
                  </ButtonBase>
                  <ButtonBase aria-label="show 4 new mails" color="inherit"
                    className={classes.desktopIcon}
                  >
                    <Badge badgeContent={3} color="secondary">
                      <GamepadRoundedIcon />
                    </Badge>
                  </ButtonBase>
                  */}
                </div> 
                {/* <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                </div> */}
              </Grid>
              <Grid item xs={false} sm={4} md={4} lg={3}>
                <div className={classes.rightIcons}>
                  {/* <IconButton
                    aria-label="account of current user"
                    color="inherit"
                    style={{backgroundColor: 'transparent',}}
                  >
                    <AccountCircle/>
                  </IconButton>
                  <Typography>First Name</Typography> */}
                  <ButtonBase>
                    <Chip
                      avatar={<Avatar alt="Natacha" src={AvatarSrc} style={{    width: 32,
                        height: 32,}} />}
                      label="Patrocle"
                      //className={classes.roundIcon}
                      style={{margin: '8px', background: 'transparent', '&hover': { background: 'gray'}}}
                    />
                  </ButtonBase>
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
                </div>
              </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Fragment>
  );
}
