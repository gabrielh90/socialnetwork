import React, {Fragment} from 'react'
import Grid from '@material-ui/core/Grid'
import ListElement from '../../components/ListElement'
import List from '@material-ui/core/List';
import AvatarSrc from "./../../assets/avatar.jpg"
import Divider from '@material-ui/core/Divider'

const LeftRail = () => {

    return (
            <Fragment>
                <ListElement name={"Patrocle"} description='' avatar={AvatarSrc}/>
                <List>
                    <ListElement name={"COVID-19 Information Centre"} description='1 new' avatar={AvatarSrc}/>
                    <ListElement name={"Friends"} description='' avatar={AvatarSrc}/>
                    <ListElement name={"Groups"} description='2 new' avatar={AvatarSrc}/>
                    <ListElement name={"Video"} description='7 new video' avatar={AvatarSrc}/>
                    <ListElement name={"Events"} description='' avatar={AvatarSrc}/>
                    <ListElement name={"Memories"} description='' avatar={AvatarSrc}/>
                    <ListElement name={"Saved"} description='' avatar={AvatarSrc}/>
                    <ListElement name={"Crisis Response"} description='' avatar={AvatarSrc}/>
                    <ListElement name={"Events"} description='' avatar={AvatarSrc}/>
                    <ListElement name={"Events"} description='' avatar={AvatarSrc}/>
                    <ListElement name={"Events"} description='' avatar={AvatarSrc}/>
                </List>
                <ListElement name={"See more"} description='' avatar={AvatarSrc}/>
                <Divider variant="inset" component="li" />
                <ListElement name={"See more"} description='' avatar={AvatarSrc}/>
            </Fragment>
        );
}

export default LeftRail;
