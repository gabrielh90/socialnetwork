import React, {Fragment} from 'react'
import {Typography} from '@material-ui/core'
import ListElement from './ListElement'
//import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import AvatarSrc from "./../assets/gift.png"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {fade, makeStyles} from '@material-ui/core/styles'
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
function setBold(word, index) {
    if(index === 0) {
        // return <Typography variant='subtitle2'>{word}</Typography>
    } else if((index % 2) === 1){
        //console.log('Mambo2: ' + word);
        return <Typography variant='body2'>{word}</Typography>
    } else {
        //console.log('Mambo2: ' + word);
        return <Typography variant='subtitle2'>{word}</Typography>
    }
}

const BirthdayCard = ({title, names}) => {
    const classes = useStyles()
    let formatedNames = [];
    let avatar = AvatarSrc;
    const oneElem = names.length === 1
    const twoElem = names.length === 2
    const afewElem = names.length >= 3
    if(oneElem) {
        formatedNames = [<Typography key={1} variant='subtitle2' display='inline' style={{paddingRight: '6px'}}>{names[0]}</Typography>]
        avatar = AvatarSrc
    } else if(twoElem) {
        formatedNames = [
            <Typography variant='subtitle2' display='inline' style={{paddingRight: '6px'}}>{names[0]}</Typography>,
            <Typography variant='body2' display='inline' style={{paddingRight: '6px'}}>and</Typography>,
            <Typography variant='subtitle2' display='inline' style={{paddingRight: '6px'}}>{names[1]}</Typography>
        ]
    } else if(afewElem) {
        formatedNames = [
            <Typography key={0} variant='subtitle2' display='inline' style={{paddingRight: '3px'}}>{names[0]}</Typography>,
            <Typography key={1} variant='body2' display='inline' style={{paddingRight: '3px'}}>and</Typography>,
            <Typography key={2} variant='subtitle2' display='inline' style={{paddingRight: '3px'}}>Others 
            {/* {names
            .map(
                (elem, index) => {
                    return index !== 0 && <Typography key={index} variant='subtitle2' display='inline' style={{display: 'none'}}>{elem}</Typography>
                }
            )} */}
            </Typography>,
            
        ]
    } else {formatedNames = names.join(' and ').split(' ')
                            .map(
                                (elem, index) => {
                                    return setBold(elem, index)
                                }
                            )}

    const message = (names.length === 1 ? 'is' : 'are') + ' celebrating their birthday' //'s birthday is today
    formatedNames.push(
        <Typography key={100} variant='body2'  display='inline' style={{paddingRight: '6px'}}> 
            {message}
        </Typography>
    )

return (
        <Fragment>
            <Typography variant='subtitle1' style={{fontWeight: 500, paddingLeft: '16px'}}>{title}</Typography>
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
                    typeof(formatedNames) === 'string' 
                        ?<Typography variant='subtitle1' style={{lineHeight: 1,}}>{formatedNames}</Typography>
                        : formatedNames
                }
                // secondary={
                //     typeof(formatedNames) === 'string' 
                //         ? <Typography variant='caption' color='primary'>
                //             {description}
                //           </Typography>
                //         : description
                // }
            />
        </ListItem>
            {/* <ListElement
                name={formatedNames}
                description = '' 
                avatar={avatar}
                type='birthday'
            /> */}
        </Fragment>
    )
}

BirthdayCard.defaultProps = {
    // names: ['Patrocle', 'Pricolici', 'Piftel']
    names: ['Patrocle']
}

export default BirthdayCard