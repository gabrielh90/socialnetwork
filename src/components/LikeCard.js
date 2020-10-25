import React, {Fragment, useState} from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {fade, makeStyles} from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import InputBase from '@material-ui/core/InputBase'


const useStyles = makeStyles((theme)=>({
    menuRoot: {
        position: 'absolute',
        top: '-64px',
        padding: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        backgroundColor: 'white',
        borderRadius: 50,
        border: '1px solid #d3d3d3b0',
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    },
    roundButtom: {
        //border: '2px green solid',
        // display: 'flex',
        //  margin: theme.spacing(0.5),
        padding: theme.spacing(0),
        fontSize: 36,
        height: '100%',
        color: 'gray',
    },
    roundIcon: {
        //border: '2px green solid',
        // display: 'flex',
        margin: theme.spacing(0),
        padding: theme.spacing(0.5),
        fontSize: 40,
        '&:hover': {
            color: fade(theme.palette.common.black, 0.65),
            fontSize: 48,
            padding: theme.spacing(0),
        }
    },

}))

const LikeCard = ({emotions, emotionType, handleMouseClick, handleMouseEnter, handleMouseLeave}) => {
    const classes = useStyles()

    const menu = <div className={classes.menuRoot}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                    {emotions.map((elem, index) =>  {
                            return    <IconButton 
                                onClick={(e) => (handleMouseClick(e, {...elem, selected: index}))}
                                aria-label="show 4 new mails" color="inherit"
                                className={classes.roundButtom}
                                style={{color: emotionType.name !== elem.name ? 'gray' : 'var(--primary-color)'}}
                            >
                                <elem.icon className={classes.roundIcon}/>
                            </IconButton>
                        }
                    )}
                    {/* <IconButton 
                        onClick={(e) => (handleMouseClick(e, 'like'))}
                        aria-label="show 4 new mails" color="inherit"
                        className={classes.roundButtom}
                    >
                        <ThumbUpAltOutlinedIcon className={classes.roundIcon}/>
                    </IconButton>
                    <IconButton 
                        onClick={(e) => (handleMouseClick(e, 'favorite'))}
                        aria-label="show 4 new mails" color="inherit"
                        className={classes.roundButtom}
                    >
                        <FavoriteBorderOutlinedIcon className={classes.roundIcon}/>
                    </IconButton>
                    <IconButton 
                        onClick={(e) => (handleMouseClick(e, 'satisfied'))}
                        aria-label="show 4 new mails" color="inherit"
                        className={classes.roundButtom}
                        >
                        <SentimentSatisfiedOutlinedIcon className={classes.roundIcon}/>
                    </IconButton>
                    <IconButton 
                        onClick={(e) => (handleMouseClick(e, 'dissatisfied'))}
                        aria-label="show 4 new mails" color="inherit"
                        className={classes.roundButtom}
                    >
                        <SentimentDissatisfiedOutlinedIcon className={classes.roundIcon}/>
                    </IconButton>
                    <IconButton 
                        onClick={(e) => (handleMouseClick(e, 'shocked'))}
                        aria-label="show 4 new mails" color="inherit"
                        className={classes.roundButtom}
                    >
                        <SentimentVeryDissatisfiedOutlinedIcon className={classes.roundIcon}/>
                    </IconButton>
                    <IconButton 
                        onClick={(e) => (handleMouseClick(e, 'surprise'))}
                        aria-label="show 4 new mails" color="inherit"
                        className={classes.roundButtom}
                    >
                        <SentimentVerySatisfiedOutlinedIcon className={classes.roundIcon}/>
                    </IconButton>
                 */}
                </div>
    return (
        <>  
            {menu}
                
        </>
    );
}
export default LikeCard;