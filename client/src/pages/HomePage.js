import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

export const HomePage = function () {
  const classes = useStyles();
  const history = useHistory();

  const redirect = () => {
    history.push('/how');
  };

  return (
    <div className={classes.wrapper}>
      <Box className={classes.leftBox}>
        <Typography
          variant="h1"
          className={classes.font}
          style={{ marginBottom: '10px' }}
        >
          Innowacyjne oglądanie filmów
        </Typography>
        <Typography className={classes.font}>
          VideoSpace jest nie tylko zwykłym serwisem pozwalającym na oglądanie setek filmów, ale i
          również generatorem kompilacji z ich najlepszymi fragmentami.
        </Typography>
        <Typography className={classes.font}>
          Jesteś ciekaw na jakiej zasadzie to działa? Sprawdź sam co jeszcze VideoSpace jest w
          stanie ci zaoferować.
        </Typography>
        <Box>
          <Button className={classes.startNow} onClick={redirect}>
            <Typography variant="h6" className={classes.font}>
              Rozpocznij
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
    height: 'calc(100vh - 70px)',
    display: 'flex',
    alignItems: 'center',
    animation: `$appear 500ms ease-in`,
  },
  '@keyframes appear': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    }
  },
  leftBox: {
    color: 'white',
    marginLeft: '140px',
    display: 'flex',
    flexDirection: 'column',
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
}, { name: 'HomePage' });
