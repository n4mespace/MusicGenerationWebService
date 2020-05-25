import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import abcjs from "abcjs";
import 'abcjs/abcjs-audio.css';
import { CSSTransition, transit } from 'react-css-transition';
import queue from 'async/queue';


const styles = theme => ({
  main: {
    marginTop: "3rem",
  }
});

/**
 * Represents player of generated music
 * Renders abc string of music and play it
 * @component
 * @param {object} props - props of component
 */
const ABCPlayer = (props) => {
  const { classes } = props;

  const ELEM_ID = props.playerID;
  const MUSIC_SERVICE_URL = props.musicUrl;
  const STARTING_STATE = "X: 1\nM: 4/4\nL: 1/8\nK: Emin\n|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|";

  const [isLoading, setIsLoading] = useState(true);
  const music = [STARTING_STATE];

  const qMusic = queue((task, callback) => {
    console.log('task: ' + task.data);
    music.push(task.data);
    console.log('music: ' + music);

    callback();
  }, 2);

  const createSynth = new abcjs.synth.CreateSynth();
  const synthControl = new abcjs.synth.SynthController();

  useEffect(() => {
    const interval = setInterval(() => {
      if (music.length < 5) {
        const currMusic = music[0];
        const prefix = currMusic.slice(-20);

        fetch(MUSIC_SERVICE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prefix }),
        })
          .then(response => response.json())
          .then(data => {
            const slicedMusic = data.music.slice(0, 80);
            const len = slicedMusic.length;

            return currMusic
              .slice(len - 1)
              .concat(slicedMusic);
          }).then((music) => {
            qMusic.push({ data: music });
          })
          .catch(e => {
            // TODO: err handl
            console.warn(e);
          });
      }
    }, 3500);

    setIsLoading(false);

    return () => clearInterval(interval);
  }, [qMusic, MUSIC_SERVICE_URL, music]);

  const renderMusicPlayer = useCallback(() => {
    const abc = music.length > 1 ? music.shift() : music[0];
    const tunes = abcjs.renderAbc(ELEM_ID, abc, {
      responsive: "resize",
      add_classes: true,
      inlineControls: {
        hide: true,
      },
    })[0];

    return tunes;
  }, [music, ELEM_ID]);

  useEffect(() => {
    renderMusicPlayer();
  }, [renderMusicPlayer, music]);

  const handleClick = () => {
    const tunes = renderMusicPlayer();
    synthControl.load("#audio", {}, { displayPlay: true });

    createSynth.init({ 
        visualObj: tunes,
    }).then(() => {
        synthControl.setTune(tunes, true, {
          chordsOff: true,
          qpm: 70,
        }).then(() => {
          console.log("Audio successfully loaded.")
        }).catch((error) => {
          console.warn("Audio problem:", error);
        });
    }).catch((error) => {
      console.warn("Audio problem:", error);
    });
  }
  
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
          <span id="audio"></span>
        </CSSTransition>

        { isLoading && <p>Loading...</p> }
    </div>
  );
}

ABCPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
  musicUrl: PropTypes.object.isRequired,
  playerID: PropTypes.object.isRequired,
};

export default withStyles(styles)(ABCPlayer);
