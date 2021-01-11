import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {fade, makeStyles} from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme)=>({
    listItem: {
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.09),
        },
        '&:active': {
            backgroundColor: fade(theme.palette.common.black, 0.13),
        },
        borderRadius: 5,
        maxHeight: '56px',
        userSelect: 'none',
    },
    icon: {
        backgroundColor: fade(theme.palette.common.black, 0.09),
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        width: '40px',
    }
}))

const ListElement = ({name, description, avatar, type}) => {
    const classes = useStyles()
    return (
        <ListItem className = {classes.listItem}>
            <ListItemAvatar>
                { avatar === null ? 
                      <Icon className={classes.icon}><AccountCircleIcon  style={{ fontSize: 48 }} /></Icon>
                    : typeof(avatar) === 'object' 
                    ? <Icon className={classes.icon}>{avatar}</Icon> //material ui icon
                    : <Avatar alt={avatar} src={avatar}/> //path to the image
                }
            </ListItemAvatar>
            <ListItemText 
                disableTypography
                primary ={
                    typeof(name) === 'string' 
                        ?<Typography variant='subtitle1' style={{lineHeight: 1,}}>{name}</Typography>
                        : name
                }
                secondary={
                    typeof(name) === 'string' 
                        ? <Typography variant='caption' color='primary'>
                            {description}
                          </Typography>
                        : description
                }
            />
        </ListItem>
    );
}
ListElement.defaultProps = {
    name: 'Pricolici',
    type: 'standard',
    avatar: null
}

export default ListElement;