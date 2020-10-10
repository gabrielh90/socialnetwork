import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {fade, makeStyles} from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    listItem: {
        '&:hover': fade(theme.palette.common.black, 0.09)
    }
}))

const ListElement = ({name, description, avatar, type}) => {
    const classes = useStyles()
    return (
        <ListItem className = {classes.listItem}>
            
            <ListItemAvatar>
            <Avatar alt={avatar} src={avatar}/>
            
            </ListItemAvatar>
            <ListItemText 
                disableTypography='true'
                primary ={
                    <Typography variant='subtitle2'>
                        {name}
                    </Typography>
                }
                secondary={
                    <Typography variant='body2' color='primary'>
                    <div style={{
                        color: 'primary',
                        '::before': 'content:"\A"',}}>
                        {description}
                    </div>
                    </Typography>
                }
                />
        </ListItem>
    );
}
ListElement.defaultProps = {
    name: 'Pricolici',
    type: 'standard'
}

export default ListElement;