import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import InputBase from '@material-ui/core/InputBase'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import { useState } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import useRequest from './../../shared/useRequest'
import { connect } from 'react-redux'
import * as actions from './../../store/actions'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  searchIconButton: {
    borderRadius: 50,
    backgroundColor: fade(theme.palette.common.black, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.07),
    },
    fontSize: 24,
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
  },

  searchRoot: {
    margin: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: 'relative',
    borderRadius:50,
    backgroundColor: fade(theme.palette.common.black, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.07),
    },
    maxHeight: 48,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  searchInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1.2, 1.5, 1.2, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  inputAdornment: {
    color: 'grey',
    [theme.breakpoints.down('md')]: {
      marginRight: 0
    }
  },


  searchCardContainer:{
    position: 'absolute',
    left: 0,
    top: 0,
    marginRight: 0,
    marginLeft: 0,
    width: '368px',
    zIndex: 100
  },
  cardHeader: {
    display: 'flex',
    paddingTop : `${theme.spacing(0.7)}px`,
    paddingLeft:  `${theme.spacing(2)}px`,
    paddingRight:  `${theme.spacing(2)}px`,
  },

  backIconButton: {
    borderRadius: 50,
    backgroundColor: fade(theme.palette.common.black, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.07),
    },
    fontSize: 24,
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
  },

  searchCardInputRoot: {
    margin: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    //border: '2px red dotted',
    position: 'relative',
    borderRadius:50,
    backgroundColor: fade(theme.palette.common.black, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.07),
    },
    maxHeight: 48,
    width: '100%',
    display: 'flex',

  },
  searchCardInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1.2, 1.5, 1.2, 1.5),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  cardContent:{
    backgroundColor: fade(theme.palette.common.white, 0.47),
    padding: '0px',
    paddingLeft: '8px',
    paddingRight: '8px',
    '&:last-child': {
      paddingBottom: '0px',
    },
  },
  // inputRoot: {
  //   color: 'inherit',
  //   width: '100%',
  // },

}));

function SearchCard(props) {
  const classes = useStyles();
  const [openCard, setOpenCard] = useState(false)
  const [searchValue, data, loading, reqConfigHandler, reqQueryHandler, cancelRequest] = 
      useRequest ({method: 'post', url: '/search'}, {name: ''}, 1000);
  
  const handleClick = () => {
    setOpenCard((prev) => !prev);//true
    // console.log('handleClick')
  };
  const handleClickAway = () => {
    setOpenCard(false);
    cancelRequest();
    // console.log('Close card!!');
  };
  const profilePageHandler = (event, userId) => {
    props.fetchPage('/' + userId);
    props.history.push('/' + userId);
  }
  const searchCard = 
  <div className={classes.searchCardContainer}>
  <Zoom direction="up" in={openCard}>
  <Card>
    <div className={classes.cardHeader}>
        <IconButton
          edge="end"
          className={classes.backIconButton}
          onClick={handleClick}
        >
            <KeyboardBackspaceIcon/>
        </IconButton>
        <InputBase
          placeholder="Search…"
          classes={{
          input: classes.searchCardInput,
          root: classes.inputRoot,
          }}
          autoFocus={true}
          inputProps={{ 'aria-label': 'search'}}
          className={classes.searchCardInputRoot}
          onClick={() => setOpenCard(true)}
          onChange={reqQueryHandler}
          name='name'
          value={searchValue.name}
        />
    </div>
    <CardContent className={classes.cardContent} >
        <List className={classes.list}>
        {data?.map(({fullname, email, avatar, userProfileId}, id) => (
            <ListItem button key={id} onClick={(event) => profilePageHandler(event, userProfileId)}>
                <ListItemAvatar>
                  <Avatar alt={fullname} src={avatar} />
                </ListItemAvatar>
                <ListItemText primary={fullname} secondary={email} />
            </ListItem>
        ))}
        </List>
        {/* {messages.map(({ id, primary, secondary, person }) => (
            <ListItem button key={id}>
                <ListItemAvatar>
                <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
            </ListItem>
        ))}
        </List> */}
    </CardContent>
  </Card>
  </Zoom>
  </div>

  const searchInput = <div>
          <InputBase
            placeholder="Search…"
            startAdornment={
            <InputAdornment 
              classes={{positionStart: classes.inputAdornment}} 
              position="start" >
                <SearchIcon />
            </InputAdornment>
            }
            classes={{
            input: classes.searchInput,
            root: classes.inputRoot,
            }}
            inputProps={{ 'aria-label': 'search' }}
            className={classes.searchRoot}
            value={searchValue.name}
            onClick={handleClick}
          />
          <IconButton 
              onClick={handleClick}
              className={classes.searchIconButton}>
              <SearchIcon />
          </IconButton>
        </div>


  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      {openCard ? searchCard : searchInput}
    </ClickAwayListener>
  );
}

const mapStateToProps = state => {
  return {
      data: state.currentPage.content
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchPage: (url) => dispatch(actions.fetchPage(url))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchCard))