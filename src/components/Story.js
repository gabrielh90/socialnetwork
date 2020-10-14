import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import Girl1 from '../assets/girl1.jpg'
import Paper from '@material-ui/core/Paper'
import Grow from '@material-ui/core/Grow'

const images = [
    {
    url: Girl1,
    url1: Girl1,
    title: 'Delicious Breakfast',
    width: '100%',
    },
    {
    url: Girl1,
    url1: Girl1,
    title: 'Tasty Burgers for me',
    width: '100%',
    },
    {
    url: Girl1,
    url1: Girl1,
    title: 'Nice Camera for photos',
    width: '100%',
    },
    {
    url: Girl1,
    url1: Girl1,
    title: 'Tasty Burgers',
    width: '100%',
    },
    {
    url: Girl1,
    url1: Girl1,
    title: 'Nice Camera',
    width: '100%',
    },
    {
      url: Girl1,
      url1: Girl1,
      title: 'Nice Camera',
      width: '100%',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flex: '1 0 auto',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        minWidth: 300,
        width: '100%',
        padding: `${theme.spacing(1)}px 0px`,
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
    paper: {
        border: 'blue 2px dotted',
        width: `calc(100% * (1/5) - ${theme.spacing(1)}px - 1px)`,
        height: 200,
        minWidth: '14px',
        display: 'inline-flex',
      },
}));

export default function ButtonBases() {
const classes = useStyles();

return (
    <div className={classes.root}>
        {/* {[0, 1, 2, 4, 5].map((value) => (
            <Paper className={classes.paper} />
        ))} */}

        {images.map((image) => (
            <ButtonBase
                focusRipple
                key={image.title}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: image.width,
                }}
            >
                <span
                    className={classes.imageSrc}
                    style={{
                        backgroundImage: `url(${image.url})`,
                    }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageMarked} 
                    style={{
                        backgroundImage: `url(${image.url})`,
                    }}
                />
                <span className={classes.imageButton}>
                    <Typography
                        component="span"
                        variant="subtitle2"
                        color="inherit"
                        className={classes.imageTitle}
                    >
                        {image.title}
                    </Typography>
                </span>
            </ButtonBase>
        ))}

    </div>
);
}
