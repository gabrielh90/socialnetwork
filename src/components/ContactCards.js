
import React, {Fragment} from 'react'
import AvatarSrc from "./../assets/avatar.jpg"
import {Typography} from '@material-ui/core'
import ListElement from './ListElement'

const ContactCards = () => (
        <Fragment>
            <Typography variant='subtitle1' style={{fontWeight: 500, paddingLeft: '16px'}}>Contacts</Typography>
            <ListElement 
                name='Pricolici' 
                description='&#9679;new' 
                avatar={AvatarSrc}/>
            <ListElement 
                name='Pricolici' 
                description='' 
                avatar={AvatarSrc}/>
            <ListElement 
                name='Pricolici' 
                description='&#x2709;new' 
                avatar={AvatarSrc}/>
        </Fragment>
)

export default ContactCards;