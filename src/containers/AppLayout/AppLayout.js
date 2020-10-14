import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import styless from './AppLayout.css'
import PrimarySearchAppBar from '../AppBar/AppBar'
import LeftRail from '../LeftRail/LeftRail';
import RightRail from  '../RightRail/RightRail'
import CenterRail from  '../CenterRail/CenterRail'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: fade(theme.palette.common.black, 0.04),
    marginTop: theme.spacing(2),
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PrimarySearchAppBar/>
      <Paper elevation={1} className={classes.paper}>
        <Grid container spacing={2} className={styless.GridContainer}>
          <Hidden only={['xs', 'sm', 'md']}>
              <Grid item xs={false} sm={false} md={false} lg={3} >
                  <LeftRail/>
              </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md={8} lg={5}>
            <CenterRail/>
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