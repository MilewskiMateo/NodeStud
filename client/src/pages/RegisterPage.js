import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

export const RegisterPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [errorText, setErrorText] = useState('');

  const formSchema = Yup.object()
    .shape({
      email: Yup.string()
        .required('Email is mendatory')
        .email(),
      username: Yup.string()
        .required('Username is mendatory')
        .min(6, 'Username must be at least 6 char long'),
      password: Yup.string()
        .required('Password is mendatory')
        .min(6, 'Password must be at least 6 char long'),
      confirmPwd: Yup.string()
        .required('Password is mendatory')
        .oneOf([Yup.ref('password')], 'Passwords does not match'),
    });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    control,
    reset,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm(formOptions);

  const onSubmit = data => {
    axios
      .post('http://localhost:1337/api/auth/local/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then(() => {
        reset();
        history.push('/login');
      })
      .catch(error => {
        setErrorText(error.response.data.error.message);
      });
  };

  return (
    <Box className={classes.wrapper}>
      <Typography
        className={classes.paragraph}
        style={{ fontSize: '40px' }}
      >
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.formWrapper}>
          <Box>
            <Typography className={classes.paragraph}>
              Username
            </Typography>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  error={!!errors.username}
                  className={classes.field}
                  helperText={errors.username?.message}
                  {...field}
                />
              )}
            />
          </Box>
          <Box>
            <Typography className={classes.paragraph}>
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  error={!!errors.email}
                  className={classes.field}
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
            />
          </Box>
          <Box>
            <Typography className={classes.paragraph}>
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  error={!!errors.password}
                  className={classes.field}
                  type="password"
                  helperText={errors.confirmPwd?.message}
                  {...field}
                />
              )}
            />
          </Box>
          <Box>
            <Typography className={classes.paragraph}>
              Repeat Password
            </Typography>
            <Controller
              name="confirmPwd"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  error={!!errors.confirmPwd}
                  className={classes.field}
                  type="password"
                  helperText={errors.confirmPwd?.message}
                  {...field}
                />
              )}
            />
          </Box>
          <Button
            type="submit"
            variant={'outlined'}
            disableRipple
            className={classes.registerButton}
          >
            Register
          </Button>
          <Typography className={classes.errorMsg}>
            {errorText}
          </Typography>
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
    gap: '20px',
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
}, { name: 'RegisterPage' });
