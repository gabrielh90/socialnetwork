import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {fade, makeStyles} from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search'

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
    itemTextPrimary: {
        display: 'flex',
        backgroundColor: 'var(--gray-input)',
        '&:hover': {
          backgroundColor: 'var(--gray-hover-input)',
        },
        borderRadius: 25,
        width: '100%',
        paddingRight: `${theme.spacing(2)}px`,
        
        paddingLeft: `${theme.spacing(2)}px`,
    },
    rootInput: {
      width: '100%',
      display: 'inline-flex',
      padding: theme.spacing(1, 1, 1, 0),
      transition: theme.transitions.create('width'),
      border: '0px',
      backgroundColor: 'transparent',
      // fontWeight: theme.typography.fontWeightMedium,
      // fontFamily: theme.typography.fontFamily,
      // fontSize: '13px',
    },
    searchIconInput: {
      height: '100%',
      // pointerEvents: 'none',
      display: 'inline-flex',
      alignSelf: 'center',
      color: 'gray',
    },
}))


const AddComment = ({name, comment, avatar, type, setFocusInput}) => {
    const classes = useStyles()

    let fName = <div style={{display: 'flex', alignItems: 'center'}}>
                    <div className={classes.itemTextPrimary}>
                     
                      <input
                        placeholder="Write a comment..."
                        className={classes.rootInput}
                        ref={(ip) => setFocusInput(ip)}
                      />
                      <div className={classes.searchIconInput}>
                        <SearchIcon />
                      </div>
                    </div>
                </div>


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
                secondary={ ''
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
AddComment.defaultProps = {
    name: 'Pricolici',
    type: 'standard',
    avatar: null
}
AddComment.propTypes = {
    comment: PropTypes.bool,
}
export default AddComment;