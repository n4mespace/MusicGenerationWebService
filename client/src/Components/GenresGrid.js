import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Title from './Title.js';
import GenrePaper from './GenrePaper.js';

const styles = theme => ({
  box: {
    width: '100%',
    display: 'flex',
  },
  root: {
    width: '100%',
  },
});

/**
 * Represents Grid of buttons with music genres
 * Handles button behaviour
 * @component
 * @param {object} props - props of component
 */
const GenresGrid = props => {
  const { classes } = props;
  const [activeButton, setActiveButton] = useState('');
  const handleClick = (genre) => () => setActiveButton(genre);

  return (
    <div className={classes.root}>
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
              <Grid item key={genre}
                xs={8} sm={5} md={4} lg={3} xl={2}>
                <GenrePaper 
                  genre={genre}
                  activeButton={activeButton}
                  onClick={handleClick(genre)}
                />
              </Grid>
            );
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
