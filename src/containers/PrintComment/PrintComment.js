import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'

import CommentCard from './../../components/CommentCard'
import AddComment from '../AddComment/AddComment'
const useStyles = makeStyles((theme) => ({
  root: {
//    maxWidth: 445,
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
  styleName: {
    '&::first-line': {
      color: 'red',
    },
    '&:hover': {
      color: 'blue',
    },
  },
  styleComment: {

  }
}));

export default function PrintComment( props ) {
  const classes = useStyles();
  const {name, comment} = props
  return (
    <div className={classes.root}>
      <CommentCard name={name} comment={comment} avatar={null}/>
      <CommentCard name={name} comment={comment} avatar={null}/>
      <CommentCard name={name} comment={'asdasdjhagkdj'} avatar={null}/>
      <AddComment setFocusInput={props.setFocusInput}/>
    </div>
  );
}

PrintComment.defaultProps = {
    name: `Azorel`,
    comment: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been' \
     the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled \
     it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, \
     remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum \
     passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
}