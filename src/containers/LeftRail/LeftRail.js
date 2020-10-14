import React, {Fragment} from 'react'
import ListElement from '../../components/ListElement'
import List from '@material-ui/core/List';
import AvatarSrc from "./../../assets/avatar.jpg"
import Divider from '@material-ui/core/Divider'

const groups = [
    {
        name: "COVID-19 Information Centre",
        description: '&#9679;1 new',
        avatar: AvatarSrc,
    },
    {
        name: "Friends",
        description: '',
        avatar: AvatarSrc,
    },
    {
        name: "Groups",
        description: '',
        avatar: AvatarSrc,
    },
    {
        name: "Video",
        description: '2 new',
        avatar: AvatarSrc,
    },
    {
        name: "Events",
        description: '2 new',
        avatar: AvatarSrc,
    },
    {
        name: "Memories",
        description: "7 new video",
        avatar: AvatarSrc,
    },
    {
        name: "Saved",
        description: '',
        avatar: AvatarSrc,
    },
    {
        name: "Crisis Response",
        description: '',
        avatar: AvatarSrc,    },
]

const LeftRail = () => {

    return (
            <Fragment>
                <ListElement name={"Patrocle"} description='' avatar={AvatarSrc}/>
                <List>
                    {groups.map((group) => (
                        <ListElement name={group.name} description={group.description} avatar={group.avatar}/>
                    ))}
                </List>
                <ListElement name={"See more"} description='' avatar={AvatarSrc}/>
                <Divider variant="middle"/>
                <ListElement name={"See more"} description='' avatar={AvatarSrc}/>
            </Fragment>
        );
}

export default LeftRail;
