import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Girl1 from '../../assets/girl1.jpg'
import Girl2 from '../../assets/girl2.webp'

import ListElement from '../../components/ListElement'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

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
];
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

];



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flex: '1 0 auto',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        minWidth: 300,
        borderRadius: 13,
        width: '100%',
        padding: `${theme.spacing(1)}px 0px`,
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

export default function ButtonBases() {
const classes = useStyles();
const imgGrid = () => {
    //return <div>asdasdada</div>
    if(tileData.length === 1) {
        return  <div className={classes.albumOnePhoto}>
                    <img src={tileData[0].img} alt={tileData[0].title}/>
                </div>
    } else if (tileData.length % 2 === 0) {
        return  <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
                             maxHeight: '600px', overflow: 'hidden',}}>
                    {tileData.map((tile, index) => {
                                if(index === 4 && tileData.length > 4) {
                                    return <div >
                                        <img src={tile.img} alt={tile.title}/>
                                    </div>
                                } else {
                                    return <div className={classes.albumMultiplePhoto}>
                                        <img src={tile.img} alt={tile.title} style={{maxWidth: '100%'}}/>
                                    </div>
                                }
                            }
                        )
                    }
                </div>
    } else if(tileData.length === 3) {
        return  <div style={{
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                            maxHeight: '600px', overflow: 'hidden',
                            }}>
                    {tileData.map((tile, index) => {
                        let gridRow = {gridRow: '1 / span 2'}
                        if(index === 0) {
                            gridRow = {gridRow: '1 / span 2'}
                        }else if(index === 1) {
                            gridRow = {gridRow: '1 / 2'}
                        }
                        else if(index === 2) {
                            gridRow = {gridRow: '2 / 3'}
                        }
                        return  <div style={gridRow}
                                    className={classes.albumMultiplePhoto}>
                                        <img src={tile.img} alt={tile.title} style={{maxWidth: '100%'}}/>
                                </div>
                        })
                    }
                </div>
    } else if(tileData.length === 5) {
        return  <div style={{
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                            maxHeight: '600px', overflow: 'hidden',
                            }}>
                    {tileData.map((tile, index) => {
                        let gridRow = {gridRow: '1 / span 3'}
                        if(index === 0) {
                            gridRow = {gridRow: '1 / span 3'}
                        }else if(index === 1) {
                            gridRow = {gridRow: '1 / span 2'}
                        }
                        else if(index === 2) {
                            gridRow = {gridRow: '4 / span 3'}
                        }
                        else if(index === 3) {
                            gridRow = {gridRow: '3 / span 2'}
                        }
                        else if(index === 4) {
                            gridRow = {gridRow: '5 / span 2'}
                        }
                        return  <div style={gridRow}
                                    className={classes.albumMultiplePhoto}>
                                        <img src={tile.img} alt={tile.title} style={{maxWidth: '100%'}}/>
                                </div>
                        })
                    }
                </div>
    }
}

return (
    <div className={classes.root}>
        <Grid container direction="column">
            <Grid item direction="row" style={{display: 'inline-flex'}}>
                <ListElement style={{display: 'inline-flex'}}/>
                <IconButton aria-label="delete" style={{display: 'inline-flex', minWidth: '60px'}}>
                    <MoreHorizIcon />
                </IconButton>
            </Grid>
            <Grid item style={{display: 'inline-flex'}}>
                <Typography
                    component="span"
                    variant="body2"
                    color="inherit"
                    className={classes.imageTitle}
                    style={{paddingLeft: '16px', paddingRight: '16px'}}
                >
                 Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii '60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum.
                </Typography>
            </Grid>
            <Grid item>
                    {imgGrid()}
            </Grid>
            <Grid item style={{display: 'inline-flex'}}>
                <Typography
                    component="span"
                    variant="body2"
                    color="inherit"
                    className={classes.imageTitle}
                    style={{paddingLeft: '16px', paddingRight: '16px'}}
                >
                 Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii '60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum.
                </Typography>
            </Grid>
        </Grid>
    </div>
);
}
