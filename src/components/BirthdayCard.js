import React, {Fragment} from 'react'
import {Typography} from '@material-ui/core'
import ListElement from './ListElement'
//import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import AvatarSrc from "./../assets/gift.png"

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
            <ListElement
                name={formatedNames}
                description = '' 
                avatar={avatar}
                type='birthday'
            />
        </Fragment>
    )
}

BirthdayCard.defaultProps = {
    // names: ['Patrocle', 'Pricolici', 'Piftel']
    names: ['Patrocle']
}

export default BirthdayCard