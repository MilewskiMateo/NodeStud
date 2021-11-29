import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

export const HomePage = function () {
  const classes = useStyles();
  const history = useHistory();

  function leftClick() {
    history.push('/how');
  }

  function rightClick() {
    history.push('/videos');
  }

  return (
    <div className={classes.wrapper}>
      <Box className={classes.leftBox} onClick={leftClick}>
        <Typography variant="h1" className={classes.font}>
          Innowacyjny oglądanie filmów
        </Typography>
        <Typography variant="h1" className={classes.font}>
          VideoSpace
        </Typography>
        <Typography variant="p" className={classes.font}>
          Has been the industry standard dummy text ever since the 1500s, when an unknown
          printer took a
        </Typography>
        <Typography variant="p" className={classes.font}>
          galley of type and scrambled it to make a type specimen book. It has survived not only
          five
        </Typography>
        <Box>
          <Button className={classes.startNow}>
            <Typography variant="h6" className={classes.font}>
              Start Now
            </Typography>
          </Button>
        </Box>
      </Box>
      ;
    </div>
  );
};

const useStyles = makeStyles({
  wrapper: {
    height: 'calc(100vh - 130px)',
    display: 'flex',
    alignItems: 'center',
  },
  leftBox: {
    color: 'white',
    marginLeft: '140px',
    display: 'flex',
    flexDirection: 'column',
  },
  rightBox: {
    padding: '20px',
    backgroundColor: '#FF9472',
    width: '400px',
    height: '400px',
    border: '1px solid white',
    wordWrap: 'break-word',
    animation: '$rightEffect 500ms ease-out',
    boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
    cursor: 'pointer',
  },
  startNow: {
    marginTop: '30px',
    display: 'inline-flex',
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '200px'
  },
  font: {
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  '@keyframes rightEffect': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}, { name: 'HomePage' });
