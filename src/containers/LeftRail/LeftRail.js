import React, {Fragment} from 'react'
import ListElement from '../../components/ListElement'
import List from '@material-ui/core/List';
import AvatarSrc from "./../../assets/avatar.jpg"
import Divider from '@material-ui/core/Divider'

const groups = [
    {
        name: "COVID-19 Information Centre",
        details: '&#9679;1 new',
        avatar: AvatarSrc,
    },
    {
        name: "Friends",
        details: '',
        avatar: AvatarSrc,
    },
    {
        name: "Groups",
        details: '',
        avatar: AvatarSrc,
    },
    {
        name: "Video",
        details: '2 new',
        avatar: AvatarSrc,
    },
    {
        name: "Events",
        details: '2 new',
        avatar: AvatarSrc,
    },
    {
        name: "Memories",
        details: "7 new video",
        avatar: AvatarSrc,
    },
    {
        name: "Saved",
        details: '',
        avatar: AvatarSrc,
    },
    {
        name: "Crisis Response",
        details: '',
        avatar: AvatarSrc,    },
]

const LeftRail = () => {

    return (
            <Fragment>
                <ListElement name={"Patrocle"} details='' avatar={AvatarSrc}/>
                <List>
                    {groups.map((group, index) => (
                        <ListElement key={index} name={group.name} details={group.details} avatar={group.avatar}/>
                    ))}
                </List>
                <ListElement name={"See more"} details='' avatar={AvatarSrc}/>
                <Divider variant="middle"/>
                <ListElement name={"See more"} details='' avatar={AvatarSrc}/>
            </Fragment>
        );
}

export default LeftRail;
