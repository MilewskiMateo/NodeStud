import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthProvider';

export const HomePage = function () {
  const classes = useStyles();
  const history = useHistory();

  function redirect() {
    history.push('/how');
  }

  const {token, setToken} = useAuth();
  useEffect(() => {
    axios.get('http://localhost:8080/token',{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(function (response) {
        setToken(response.data)
      })
      .catch(function (error) {
        if(error.response.data.msg === "Token has expired"){
          setToken('')
        }
      });
  },[])

  return (
    <div className={classes.wrapper}>
      <Box className={classes.leftBox}>
        <Typography variant="h1" className={classes.font} style={{ marginBottom: '10px'}}>
          Innowacyjne oglądanie filmów
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
