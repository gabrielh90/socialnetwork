import React, {Fragment} from 'react'
import ListElement from '../../components/ListElement'
import BirthdayCard from '../../components/BirthdayCard'
import ContactsCard from '../../components/ContactCards'
import List from '@material-ui/core/List';
import {Typography} from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import AddRoundedIcon from '@material-ui/icons/AddRounded'

const RightRail = () => {
    return (
        <Fragment>
            <List>
                <BirthdayCard title='Birthday'/>
            </List>
            <Divider variant='middle'/>
            <List>
                <ContactsCard/>
            </List>
            <Divider variant='middle'/>
            <List>
                <Typography variant='subtitle1' style={{fontWeight: 500, paddingLeft: '16px'}}>Group conversations</Typography>
                <ListElement name={'Create New Group'} description='' avatar={<AddRoundedIcon/>}/>
            </List>
        </Fragment>
        );
}

export default RightRail;

 {/* // <Grid container>
            //     <Grid item xs={12}>
            //         <BirthdayCard title='Birthday'/>
            //     </Grid>
            //     <Grid item xs={12}>
            //         <Typography variant='subtitle1' style={{fontWeight: 500, paddingLeft: '16px'}}>Contacts</Typography>
            //         <List>
            //             <ListElement 
            //                 name='Pricolici' 
            //                 description='birthday' 
            //                 avatar={AvatarSrc}/>
            //             <ListElement 
            //                 name='Pricolici' 
            //                 description='birthday' 
            //                 avatar={AvatarSrc}/>
            //             <ListElement 
            //                 name='Pricolici' 
            //                 description='birthday' 
            //                 avatar={AvatarSrc}/>
            //         </List>
            //     </Grid>
            //     <Grid item xs={12}>
            //         <Typography variant='subtitle1' style={{fontWeight: 500, paddingLeft: '16px'}}>Group conversations</Typography>
            //         <ListElement name={'Create New Group'} description='' avatar={<AddRoundedIcon/>}/>
            //     </Grid>
            // </Grid> */}