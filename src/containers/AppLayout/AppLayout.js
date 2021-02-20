import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import styless from './AppLayout.css';
import LeftRail from '../LeftRail/LeftRail';
import RightRail from  '../RightRail/RightRail'
import CenterRail from  '../CenterRail/CenterRail'

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    position:'relative',
    backgroundColor: '#F0F2F5',
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
      {/* <div>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
      </div> */}
      
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