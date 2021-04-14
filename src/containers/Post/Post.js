import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Girl1 from '../../assets/girl1.jpg'
import Girl2 from '../../assets/girl2.webp'

import ListElement from '../../components/ListElement'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded'
import PrintComment from '../../containers/PrintComment/PrintComment'
import LikeCard from '../../components/LikeCard'

import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined'
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined'
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined'
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined'

const tileData = [
    {
      img: Girl2,
      title: 'Image',
      author: 'author',
      cols: 2,
    },
    {
        img: Girl1,
        title: 'Image',
        author: 'author',
        cols: 2,
    },
    // {
    //     img: Girl2,
    //     title: 'Image',
    //     author: 'author',
    //     cols: 2,
    // },
    // {
    //     img: Girl1,
    //     title: 'Image',
    //     author: 'author',
    //     cols: 2,
    // },

];

const emotions = [
    {
        name: 'like',
        icon: ThumbUpAltOutlinedIcon,
    },
    {
        name: 'favorite',
        icon: FavoriteBorderOutlinedIcon,
    },
    {
        name: 'satisfied',
        icon: SentimentSatisfiedOutlinedIcon,
    },
    {
        name: 'dissatisfied',
        icon: SentimentDissatisfiedOutlinedIcon,
    },
    {
        name: 'shocked',
        icon: SentimentVeryDissatisfiedOutlinedIcon,
    },
    {
        name: 'surprise',
        icon: SentimentVerySatisfiedOutlinedIcon,
    },
]
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0 auto',
        flexWrap: 'nowrap',
        minWidth: 300,
        borderRadius: 13,
        width: '100%',
        padding: `${theme.spacing(1)}px 0px`,
        marginBottom: `${theme.spacing(1.5)}px`,
        backgroundColor: theme.palette.common.white,
    },
    image: {
      position: 'relative',
      margin: theme.spacing(0.4),
      height: 200,
      display: 'inline-flex',
    //   width: `calc(100% * (1/5) - ${theme.spacing(2)}px - 1px)`,
      borderRadius: '13px',
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
      },
    },
    imageSrc: {
      position: 'absolute',
      borderRadius: '13px',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 100%',
    },
    imageBackdrop: {
    position: 'absolute',
    borderRadius: '13px',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      padding: theme.spacing(1),
      left: 0,
      right: 0,
    //   top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'left',
      color: theme.palette.common.white,
    },
    imageTitle: {
      position: 'relative',
      textAlign: 'left',
      lineHeight: '1.3',
      //padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      position: 'absolute',
      left: 10,
      top: 10,
      height: 36,
      width: 36,
      borderRadius: 50,
      backgroundSize: 'cover',
      backgroundPosition: 'center 100%',
      border: '3px blue solid',
    //   left: 'calc(50% - 9px)',
    //   transition: theme.transitions.create('opacity'),
    },
    albumOnePhoto:{
        display: 'grid',
        justifyContent: 'center',
    },
    albumMultiplePhoto:{
        display: 'grid',
        //border: '2px red solid',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: '2px',
        //overflow: 'hidden'
        // padding: '12px',
    },
}));

const Post = (props) => {
const classes = useStyles();
const [emotion, setEmotion] = useState({name: 'Like', icon: ThumbUpAltOutlinedIcon, selected: -1})
const [showEmotionsMenu, setShowEmotionsMenu] = useState(false)
const [delayEmotionMenu, setDelayEmotionMenu] = useState(false)
const [focusInput, setFocusInput] = useState(null)
const imgGrid = () => {
    //return <div>asdasdada</div>
    if(!props.images) return null;
    if(props.images.length === 1) {
        return  <div className={classes.albumOnePhoto}>
                    <img src={props.images[0]} alt=''/>
                </div>
    } else if (props.images.length % 2 === 0) {
        return  <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
                             maxHeight: '600px', overflow: 'hidden',}}>
                    {props.images.map((image, idx) => {
                                if(idx === 4 && props.images.length > 4) {
                                    return <div key={idx}>
                                        <img key={idx} src={image} alt=''/>
                                    </div>
                                } else {
                                    return <div key={idx} className={classes.albumMultiplePhoto}>
                                        <img key={idx} src={image} alt='' style={{maxWidth: '100%'}}/>
                                    </div>
                                }
                            }
                        )
                    }
                </div>
    } else if(props.images.length === 3) {
        return  <div style={{
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                            maxHeight: '600px', overflow: 'hidden',
                            }}>
                    {props.images.map((image, idx) => {
                        let gridRow = {gridRow: '1 / span 2'}
                        if(idx === 0) {
                            gridRow = {gridRow: '1 / span 2'}
                        }else if(idx === 1) {
                            gridRow = {gridRow: '1 / 2'}
                        }
                        else if(idx === 2) {
                            gridRow = {gridRow: '2 / 3'}
                        }
                        return  <div style={gridRow}
                                    className={classes.albumMultiplePhoto}>
                                        <img  key={idx} src={image} alt='' style={{maxWidth: '100%'}}/>
                                </div>
                        })
                    }
                </div>
    } else if(props.images.length === 5) {
        return  <div style={{
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                            maxHeight: '600px', overflow: 'hidden',
                            }}>
                    {props.images.map((image, idx) => {
                        let gridRow = {gridRow: '1 / span 3'}
                        if(idx === 0) {
                            gridRow = {gridRow: '1 / span 3'}
                        }else if(idx === 1) {
                            gridRow = {gridRow: '1 / span 2'}
                        }
                        else if(idx === 2) {
                            gridRow = {gridRow: '4 / span 3'}
                        }
                        else if(idx === 3) {
                            gridRow = {gridRow: '3 / span 2'}
                        }
                        else if(idx === 4) {
                            gridRow = {gridRow: '5 / span 2'}
                        }
                        return  <div style={gridRow}
                                    className={classes.albumMultiplePhoto}>
                                        <img  key={idx} src={image} style={{maxWidth: '100%'}}/>
                                </div>
                        })
                    }
                </div>
    }
}
const handleMouseClick = (event, emotionType) => {
    setEmotion(emotion.selected === -1 ? emotionType : 
                emotion.selected !== emotionType.selected ? emotionType : {...emotions[0], selected: -1})
    // console.log(event.target)
    console.log('emotionType: ' + emotionType.name)
    clearTimeout(delayEmotionMenu)
    setShowEmotionsMenu(false)
}
const handleMouseEnter = () => {
    console.log('mouse enter')
    clearTimeout(delayEmotionMenu)
    setDelayEmotionMenu(setTimeout(()=> {
                            setShowEmotionsMenu(true)
                            clearTimeout(delayEmotionMenu)
                        }, 1000))
}
const handleMouseLeave = () => {
    console.log('mouse leave')
    clearTimeout(delayEmotionMenu)
    setDelayEmotionMenu(setTimeout(() => {
        
        setShowEmotionsMenu(false)
    }, 1000))
}
const d = new Date(props.createdAt)
return (
    <div className={classes.root}>
        <div direction="row" style={{display: 'flex', justifyContent: 'space-around', margin: '0px 16px'}}>
            {/* <ListElement style={{display: 'inline-flex', padding: '0px' }}/> */}
            <ListElement //key={userId} name={firstName + ' ' + lastName} avatar={avatar} 
                                details={<Typography variant='caption' color='black'> {d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear()} </Typography>}
                                //onClick={(event) => profilePageHandler(event, userId)}
                                />

            <IconButton aria-label="delete" style={{display: 'inline-flex', minWidth: '60px'}}>
                <MoreHorizIcon />
            </IconButton>
        </div>
            <Typography
                component="span"
                variant="subtitle2"
                color="inherit"
                align="justify"
                style={{paddingLeft: '16px', paddingRight: '16px',
                        textIndent: '16px'}}
            >
                {props?.title}
            </Typography>
            
            <Typography
                component="span"
                variant="body2"
                color="inherit"
                align="justify"
                style={{paddingLeft: '16px', paddingRight: '16px',
                        textIndent: '16px'}}
            >
                {props?.aboveText}
            </Typography>
        <div>
            {imgGrid()}
        </div>
            <Typography
                component="span"
                variant="body2"
                color="inherit"
                align="justify"
                style={{paddingLeft: '16px', paddingRight: '16px',
                        textIndent: '16px'}}
            >
                {props?.belowText}
            </Typography>
        <Divider variant="middle"  style={{margin: '4px'}}/>
        <div style={{display: 'flex', position: 'relative', width: '100%', padding: '0px 16px'}} >
            <Button
                onClick={(e) => (handleMouseClick(e, emotion.selected === -1 ? {...emotions[0], selected: 0} : emotion ))}
                startIcon={<emotion.icon/>}
                style={{color: emotion.selected === -1 ? 'gray' : 'var(--primary-color)', display: 'inline-flex', width: '32%'}}
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}
            >
                {emotion.name}
            </Button>
            <Button
                style={{color: 'gray', display: 'inline-flex', width: '32%'}}
                onClick={() => {focusInput.focus()}}
                startIcon={<ChatBubbleRoundedIcon/>}
            >
                Comments
            </Button>
            <Button
                style={{color: 'gray', display: 'inline-flex', width: '32%'}}
                startIcon={<ReplyRoundedIcon />}
            >
                Share
            </Button>
            {showEmotionsMenu && <LikeCard 
                                        emotions={emotions}
                                        emotionType={emotion}
                                        handleMouseClick={() => handleMouseClick()}
                                        handleMouseEnter={() => handleMouseEnter()}
                                        handleMouseLeave={() =>handleMouseLeave()}
                                        />}
        </div>
        <Divider variant="middle"  style={{margin: '4px'}}/>
        
        <div>
            <PrintComment setFocusInput={setFocusInput}/>
        </div>
    </div>
);
}

export default Post;