import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

export const RegisterPage = () => {
  const classes = useStyles();
  const {
    control,
    reset,
    handleSubmit
  } = useForm({
    defaultValues: {
      username: '',
      login: '',
      password: '',
    }
  });
  const onSubmit = data => {
    axios.post('http://localhost:8080/registration/register', data)
      .then(() => {
        reset();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.paragraph} style={{ fontSize: '40px' }}> Register</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.formWrapper}>
          <Box>
            <Typography className={classes.paragraph}> Username</Typography>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  className={classes.field}
                  {...field}
                />
              )}
            />
          </Box>
          <Box>
            <Typography className={classes.paragraph}> Login</Typography>
            <Controller
              name="login"
              control={control}
              render={({ field }) => (
                <TextField
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
              render={({ field }) => (
                <TextField
                  className={classes.field}
                  {...field}
                />
              )}
            />
          </Box>
          <Button type="submit" variant={'outlined'}
                  className={classes.registerButton}> Register</Button>
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
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    padding: '30px',
  },
  field: {
    border: '1px solid white',
    borderRadius: '6px',
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
}, { name: 'RegisterPage' });
