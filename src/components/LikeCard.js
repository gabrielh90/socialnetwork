import React from 'react'
import {fade, makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';


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