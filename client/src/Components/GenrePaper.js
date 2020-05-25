import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { orange } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
  },
  button: {
    width: "60%",
    display: "block",
  },
});

/**
 * Represents Button with genre of music for choise
 * Using for music play handling
 * @component
 * @param {object} props - props of component
 */
const GenrePaper = (props) => {
  const { classes } = props;
  const genre = props.genre;
  const activeButton = props.activeButton;
  const changeActiveButton = props.onClick;

  const [backgroundColor, setBackgroundColor] = useState("rgba(0, 0, 0, 0.26)");
  const [color, setColor] = useState(orange[500]);

  useEffect(() => {
    if (activeButton === genre) {      
      setBackgroundColor("white");
      setColor("black");
    } else {
      setBackgroundColor("rgba(0, 0, 0, 0.26)");
      setColor(orange[500]);
    }

  }, [activeButton, genre]);

  return (
    <Button
      className={classes.button}
      onClick={changeActiveButton}
      key={genre}
      id={'btn-'.concat(genre)}
    >
      <Paper
        className={classes.paper}
        style={{backgroundColor: backgroundColor, color: color}}
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
  genre: PropTypes.any,
  onClick: PropTypes.func,
  activeButton: PropTypes.any,
};

export default withStyles(styles)(GenrePaper);
