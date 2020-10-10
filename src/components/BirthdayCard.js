import React, {Fragment} from 'react'
import {Typography} from '@material-ui/core'
import ListElement from './ListElement'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

function setBold(word, index) {
    if(index === 0) {
        return <Typography variant='subtitle2' style={{display: 'inline-flex', paddingLeft: '0px'}}>{word}</Typography>
    } else if((index % 2) === 1){
        //console.log('Mambo2: ' + word);
        return <Typography variant='body2' style={{display: 'inline-flex', paddingLeft: '6px'}}>{word}</Typography>
    } else {
        //console.log('Mambo2: ' + word);
        return <Typography variant='subtitle2'  style={{display: 'inline-flex', paddingLeft: '6px'}}>{word}</Typography>
    }
}

const BirthdayCard = () => {
    const names = ['Patrocle', 'Pricolici', 'Piftel']
    
    const formatedNames = names
        .join(' and ')
        .split(' ')
        .map(
            (elem, index) => {
                return setBold(elem, index)
            }
    )

    formatedNames.push(
        <Typography variant='body2' style={{display: 'inline-flex', paddingLeft: '6px'}}>
            {names.length === 1 ? 'is ' : 'are '} celebrating their birthday
        </Typography>)
    
    return (
        <Fragment>
        <Typography variant='h6'>Birthdays</Typography>
        <ListElement
            name={formatedNames}
            description = '' 
            avatar={CardGiftcardIcon}
            type='birthday'
        />
        </Fragment>
    )
}

export default BirthdayCard