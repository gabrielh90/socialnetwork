import React, {Fragment} from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {fade, makeStyles} from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme)=>({
    listItem: {
        borderRadius: 5,
    },
    icon: {
        backgroundColor: fade(theme.palette.common.black, 0.09),
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        width: '40px',
        marginRight: theme.spacing(1),
    },
    styleName: {
        fontWeight: theme.typography.fontWeightMedium,
        fontFamily: theme.typography.fontFamily,
        // '&::first-line': {
        //   color: 'red',
        // },
        // '&:hover': {
        //   color: 'blue',
        // },
      },
      styleComment: {
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: theme.typography.fontFamily,
        fontSize: '0.875rem',
      },
      itemTextPrimary: {
        padding: '12px',
        backgroundColor: fade(theme.palette.common.black, 0.07),
        borderRadius: 15,
      },
      itemTextSecondary: {

      },
}))

var processComment = (comment) => {
    let fComment = <div>{comment}</div>
    if (comment.length > 100){
        fComment = <div>
                        {comment.slice(0, 70)} <div style={{color: 'red'}}> more </div> {comment.slice(70, comment.length)}
                    </div>
    }
    return fComment
}


const ListElement = ({name, comment, avatar, type}) => {
    const classes = useStyles()

    let fName = <div className={classes.itemTextPrimary}>
                  <p className={classes.styleName}>{name}</p>
                  <p className={classes.styleComment}>{processComment(comment)}</p>
                </div>
  let fComment = <Fragment>
                    <span>Like</span>
                    <span>Reply</span>
                    <span>8Hours</span>
                </Fragment>
    return (
        <>
        <ListItem className = {classes.listItem}>
            <ListItemAvatar style={{disply: 'grid', alignSelf: 'self-start', minWidth: '20px',}}>
                { avatar === null ? 
                      <Icon className={classes.icon}><AccountCircleIcon  style={{ fontSize: 48 }} /></Icon>
                    : typeof(avatar) === 'object' 
                    ? <Icon className={classes.icon}>{avatar}</Icon> //material ui icon
                    : <Avatar className={classes.icon} alt={avatar} src={avatar}/> //path to the image
                }
            </ListItemAvatar>
            
            <ListItemText 
                style={{margin: '0px'}}
                disableTypography='true'
                primary ={fName}
                secondary={fComment
                    // typeof(name) === 'string' 
                    //     ? <Typography variant='caption' color='primary'>
                    //         {description}
                    //       </Typography>
                    //     : description
                }
            />
        </ListItem>
        </>
    );
}
ListElement.defaultProps = {
    name: 'Pricolici',
    type: 'standard',
    avatar: null
}
ListElement.propTypes = {
    comment: PropTypes.bool,
}
export default ListElement;