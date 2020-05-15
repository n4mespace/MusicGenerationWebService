import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import abcjs from "abcjs";
import 'abcjs/abcjs-audio.css';


const styles = theme => ({
  main: {
    marginTop: "3rem",
  }
});

const ABCPlayer = (props) => {
  const { classes } = props;
  const elemId = "genMusic";

  useEffect(() => {
    abcjs.renderAbc(elemId, 
                    "X: 1\nM: 4/4\nL: 1/8\nK: Emin\n|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|",
                    {
                      responsive: "resize",
                      add_classes: true,
                    });
  }, []);

  return (
    <div className={classes.main}>
      <div id={elemId}></div>
    </div>
  );
}

ABCPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ABCPlayer);
