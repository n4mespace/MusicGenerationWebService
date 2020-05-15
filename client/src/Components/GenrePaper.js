import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { orange } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const styles = theme => ({
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


const GenrePaper = (props) => {
  const { classes } = props;
  const genre = props.genre;
  const prevActiveButton = props.activeButton;

  const handleChange = event => {
    if (prevActiveButton !== genre) {
      document.getElementById(genre).style.background = "red";
      
      if (prevActiveButton) {
        document.getElementById(prevActiveButton).style.background = "rgba(0, 0, 0, 0.26)";
      }

      props.onClick(genre);
    }
  };

  return (
    <Button
      className={classes.button}
      onClick={handleChange}
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
  );
}

GenrePaper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenrePaper);
