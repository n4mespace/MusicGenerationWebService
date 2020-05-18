import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import abcjs from "abcjs";
import 'abcjs/abcjs-audio.css';
import { CSSTransition, transit } from 'react-css-transition';


const styles = theme => ({
  main: {
    marginTop: "3rem",
  }
});

const ABCPlayer = (props) => {
  const { classes } = props;

  const ELEM_ID = "genMusic";
  const MUSIC_SERVICE_URL = props.musicUrl;
  const STARTING_STATE = "X: 1\nM: 4/4\nL: 1/8\nK: Emin\n|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|";

  const [currMusic, setCurrMusic] = useState(STARTING_STATE);
  const [isLoading, setIsLoading] = useState(true);     

  useEffect(() => {
    fetch(MUSIC_SERVICE_URL, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => setCurrMusic(data.music))
      .catch(e => {
        // TODO: err handl
        setCurrMusic(STARTING_STATE)
      });

    setIsLoading(false);
  }, [MUSIC_SERVICE_URL]);

  useEffect(() => {
    abcjs.renderAbc(ELEM_ID, currMusic, {
      responsive: "resize",
      add_classes: true,
    });
  }, [currMusic]);

  return (
    <div className={classes.main}>
        <CSSTransition
          active={!isLoading} 
          defaultStyle={{ opacity: 0 }}
          enterStyle={{ opacity: transit(1.0, 1500, "ease-in") }}
          activeStyle={{ opacity: 1.0 }}
          transitionDelay={200}
        >
          <div id={ELEM_ID}></div>
        </CSSTransition>

        { isLoading && <p>Loading...</p> }
    </div>
  );
}

ABCPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ABCPlayer);
