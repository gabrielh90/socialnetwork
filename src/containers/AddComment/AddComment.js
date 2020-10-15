import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListElement from './../../components/ListElement'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 445,
  },
  classHeader:{
      padding : `${theme.spacing(1)}px`,
      paddingLeft:  `${theme.spacing(2)}px`,
      paddingRight:  `${theme.spacing(2)}px`,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
    width: 'auto',
  },
  searchIcon: {
    height: '100%',
    position: 'relative',
    display: 'inline-block',
    alignItems: 'left',
    justifyContent: 'left',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    position:'relative',
    
    display: 'inline-block',
    border: '2px blue solid',
    borderRadius: 50,
    backgroundColor: fade(theme.palette.common.black, 0.02),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.07),
    },
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `${theme.spacing(2)}px`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function AddComment() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        
        
   {/* //     <ListElement name={"See more"} description='' avatar={AvatarSrc}/> */}

      <CardContent className={classes.classHeader}>

            <div className={classes.search}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    className={classes.searchIcon}
                >
                    <KeyboardBackspaceIcon/>
                </IconButton>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            {/* <List className={classes.list}>
            {messages.map(({ id, primary, secondary, person }) => (
                <React.Fragment key={id}>
                {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
                {id === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
                <ListItem button>
                    <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={person} />
                    </ListItemAvatar>
                    <ListItemText primary={primary} secondary={secondary} />
                </ListItem>
                </React.Fragment>
            ))}
            </List> */}
      </CardContent>
    </div>
  );
}
