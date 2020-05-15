import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  footer: {
    bottom: 0,
    backgroundColor:'white',
    display: 'flex',
    minHeight: '1vh',
    flexDirection: 'column',
  },
}));

export default function BottomBar() {
  const classes = useStyles();

  return (
    <div>
      <footer className={classes.footer}>
        <Typography variant="body2" color="black">
          {'Copyright © '}
          <Link color="inherit" href="https://github.com/n4mespace">
            n4mespace
          </Link>{' '}
          {new Date().getFullYear()}
        </Typography>
      </footer>
    </div>
  );
}