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

  // TODO: refactor with UseState
  const handleChange = event => {
    if (prevActiveButton !== genre) {
      const newActiveBtn = document.getElementById(genre);
      
      newActiveBtn.style.background = "white";
      newActiveBtn.style.color = "black";      

      if (prevActiveButton) {
        const prevActiveBtn = document.getElementById(prevActiveButton);

        prevActiveBtn.style.background = "rgba(0, 0, 0, 0.26)";
        prevActiveBtn.style.color = orange[500];
      }

      props.onClick(genre);
      event.preventDefault();
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
