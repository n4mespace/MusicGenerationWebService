import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    marginLeft: 35,
    color: "black",
    backgroundColor: "white",
    textIndent: "5rem",
  },
  bar: {
    backgroundColor: '#eceff1',
  },
  iconButton: {
    marginLeft: -12,
    marginRight: 20,
    backgroundColor: "white",
    color: "black",
  },
});

const TopBar = (props) => {
  const { classes } = props;
  const externalLinks = {
    github: 'https://github.com/n4mespace',
    documentation: 'https://github.com/n4mespace/MusicGenerationWebService',
  };

  const handleClick = (link) => () => {
    window.open(link, "_blank");
  }

  return (
    <div className={classes.root}>
      <AppBar 
        position="static" 
        className={classes.bar}
      >
        <Toolbar>
          <Typography 
            align="center"                                                                                              
            variant="h6" 
            className={classes.grow}
          >
            Music Generation Web Service
          </Typography>

          <IconButton 
            className={classes.iconButton}
            aria-label="upload picture" 
            component="span"
            onClick={handleClick(externalLinks.documentation)}
          >
            <DescriptionOutlinedIcon />
          </IconButton>

          <IconButton 
            className={classes.iconButton}
            aria-label="upload picture" 
            component="span"
            onClick={handleClick(externalLinks.github)}
          >
            <GitHubIcon />  
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);
