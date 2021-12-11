import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../components/AuthProvider';
import { useHistory } from 'react-router-dom';

export const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory()
  const [errorText, setErrorText] = useState('');
  const {
    control,
    reset,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    }
  });

  const {
    token,
    setToken
  } = useAuth();
  useEffect(() => {
    axios.get('http://localhost:8080/token', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(function (response) {
        setToken(response.data);
      })
      .catch(function (error) {
        if (error.response.data.msg === 'Token has expired') {
          setToken('');
        }
      });
  }, []);

  const onSubmit = data => {
    axios.post('http://localhost:8080/login/log', data,)
      .then(function (response) {
        setToken(response.data);
        reset();
        history.push('/videos')

      })
      .catch(function (error) {
        setErrorText(error.response.data.responseMessage);
      });
  };

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.paragraph} style={{ fontSize: '40px' }}> Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.formWrapper}>
          <Box>
            <Typography className={classes.paragraph}> Login</Typography>
            <Controller
              name="login"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  error={!!errors.login}
                  className={classes.field}
                  {...field}
                />
              )}
            />
          </Box>
          <Box>
            <Typography className={classes.paragraph}> Password</Typography>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  error={!!errors.password}
                  className={classes.field}
                  {...field}
                />
              )}
            />
          </Box>
          <Button type="submit" variant={'outlined'} disableRipple
                  className={classes.registerButton}> Login</Button>
          <Typography className={classes.errorMsg}> {errorText}</Typography>
        </Box>
      </form>
    </Box>
  );
};

const useStyles = makeStyles({
  wrapper: {
    height: 'calc(100vh - 70px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    padding: '30px',
  },
  errorMsg: {
    color: 'red',
    fontWeight: 600,
    textAlign: 'center'
  },
  field: {
    '& div': {
      border: '1px solid white',
      borderRadius: '6px',
    },
    '& input': {
      color: 'white',
      padding: '7px',
      fontSize: '25px'
    },
  },
  flexWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '100px',
  },
  leftBox: {
    color: 'white',
  },
  rightBox: {
    width: '400px',
    color: 'white',
    overflow: 'hidden',
  },
  paragraph: {
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 600,
    fontSize: '25px',
  },
  icon: {
    fontSize: '40px',
  },
  registerButton: {
    backgroundColor: 'red',
    border: '1px solid white',
    borderRadius: '10px',
    color: 'white',
  }
}, { name: 'LoginPage' });
