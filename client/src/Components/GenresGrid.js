import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Title from './Title.js';
import { orange } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  box: {
    width: '100%',
    display: 'flex',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: orange[500],
    backgroundColor: theme.palette.action.disabled,
    marginBottom: theme.spacing.unit,
    "&:hover": {
      backgroundColor: "red",
    }
  },
  button: {
    width: "60%",
    display: "block",
  },
});

class GenresGrid extends Component {
  state = {
    selectedValue: '',
  };

  handleChange = name => event => {
    if (this.state.selectedValue !== name) {
      this.setState({ selectedValue: event.target.value });
      
      window.music_genres.forEach((genre) => {
        document.getElementById(genre).style.background = (genre === name)
          ? "red"
          : "rgba(0, 0, 0, 0.26)";
      });
    }
  };

  // TODO: refactor with new music_card elem with state of checked!

  render() {
    const { classes } = this.props;
    
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
                  <Button
                    className={classes.button}
                    onClick={this.handleChange(genre)}
                    key={genre}
                    id={'btn-'.concat(genre)}
                  >
                    <Paper
                      className={classes.paper}
                      key={genre}
                      id={genre}
                    >
                      {genre.toUpperCase()}
                    </Paper>
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
    );
  }
}

GenresGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenresGrid);
