import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Title from './Title.js';
import { orange } from '@material-ui/core/colors';


const styles = theme => ({
  box: {
    width: '100%',
    display: 'flex',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    width: '60%',
    padding: theme.spacing.unit * 2,
    color: orange[500],
    backgroundColor: theme.palette.action.disabled,
    marginBottom: theme.spacing.unit,
  },
});

const GenresGrid = (props) => {
  const { classes } = props;

  return (
    <div style={{ width: '100%' }}>
      <Title />
      <Box className={classes.box} p={3}>    
        <Grid
          container
          direction="row"
          align="center"
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          {window.music_genres.map((genre) => {
            return (
              <Grid item xs={8} sm={5} md={4} lg={3} xl={2}>
                <Paper 
                  className={classes.paper}
                  key={genre}
                >
                  {genre.toUpperCase()}
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </div>
  );
}

GenresGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenresGrid);
