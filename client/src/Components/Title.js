import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const Title = () => {  
  return (
    <Typography 
      component="div" 
      id="topbar"
    >
      <Box 
        m={3}
        class="text-white h1"
      >
        Select genre
      </Box>
      <Box 
        m={3}
        class="text h2"
      >
        And enjoy your melody
      </Box>
    </Typography>
  );
}

export default Title;
