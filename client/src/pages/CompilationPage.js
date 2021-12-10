import React from 'react';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const CompilationPage = ({ match }) => {
  const classes = useStyles();

  return (
    <Container className={classes.wrapper}>
      <Box className={classes.playerWrapper}>
        <video className={classes.video} controls crossOrigin="anonymous">
          <source src={'http://127.0.0.1:8080/compilation/'+ match.params.address} type="video/webm"/>
        </video>
      </Box>
    </Container>
  );
};

const useStyles = makeStyles({
  wrapper: {
    height: 'calc(100vh - 70px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '60px',
    overflow: 'hidden',
    animation: `$appear 500ms ease-out`,
  },
  '@keyframes appear': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    }
  },
  playerWrapper: {
    backgroundColor: 'transparent',
    height: '600px',
    maxWidth: '800px',
    boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
  },
  video: {
    border: '1px solid white',
    height: '602px',
    maxWidth: '800px',
    backgroundColor: 'black',
  },
}, { name: 'CompilationPage' });
