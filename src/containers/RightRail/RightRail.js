import React from 'react'
import Grid from '@material-ui/core/Grid'
import ListElement from '../../components/ListElement'
import BirthdayCard from '../../components/BirthdayCard'
import List from '@material-ui/core/List';
import AvatarSrc from "./../../assets/avatar.jpg"
import {Typography} from '@material-ui/core'


const RightRail = () => {
    

    return (
            <Grid container>
                <Grid item xs={12}>
                    <BirthdayCard/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Contacts</Typography>
                    <List>
                        <ListElement 
                            name='Pricolici' 
                            description='birthday' 
                            avatar={AvatarSrc}/>
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Group conversations</Typography>
                    <ListElement name={'Create New Group'} description='' avatar={AvatarSrc}/>
                </Grid>
            </Grid>
        );
}

export default RightRail;
