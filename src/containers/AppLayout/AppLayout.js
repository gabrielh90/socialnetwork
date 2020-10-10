import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import styless from './AppLayout.css'
import PrimarySearchAppBar from '../AppBar/AppBar'
import LeftRail from '../LeftRail/LeftRail';
import RightRail from  '../RightRail/RightRail'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: fade(theme.palette.common.black, 0.04)
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.paper}>
        <Grid container spacing={3} className={styless.GridContainer}>
          <Grid item xs={12} style={{padding: '8px 12px', margin: '0px'}} >
              <PrimarySearchAppBar/>
          </Grid>
          <Hidden only={['xs', 'sm', 'md']}>
              <Grid item xs={false} sm={false} md={false} lg={3} >
                  <LeftRail/>
              </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md={8} lg={4}>
              <Paper >
                
              What is Lorem Ipsum?

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Why do we use it?

It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

              </Paper>
          </Grid>
          <Hidden only={['xs', 'sm']}>
              <Grid item xs={false} sm={false} md={4} lg={3}>
                <RightRail/>
              </Grid>
          </Hidden>
        </Grid>
      </Paper>
    </div>
  );
}