import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import abcjs from "abcjs";
import 'abcjs/abcjs-audio.css';


const styles = theme => ({

});

const ABCPlayer = (props) => {
  const { classes } = props;

  useEffect(() => {
    abcjs.renderAbc("paper", "X: 1\nT: Cooley's\nM: 4/4\nL: 1/8\nK: Emin\n|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|");
  }, []);

  return (
    <div id="paper"></div>
  );
}

ABCPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ABCPlayer);
