import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { useAuth } from './AuthProvider';

export const Header = () => {
  const classes = useStyles();

  const {token, setToken} = useAuth();

  return (
    <Box className={classes.appBar}>
      <Link to="/" className={classes.links}>
        VideoSpace
      </Link>
      <Box className={classes.menu}>
        <Link to="/how" className={classes.links}>
          How
        </Link>
        <Link to="/contact" className={classes.links}>
          Contact
        </Link>
        {token !== '' ?
          <Link to="/videos" className={classes.links}>
            Videos
          </Link> :
          <>
            <Link to="/register" className={classes.links}>
              Register
            </Link>
            <Link to="/login" className={classes.links}>
              Login
            </Link>
          </>
        }
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  appBar: {
    display: 'flex',
    height: '70px',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    fontSize: '40px',
    fontFamily: 'Roboto',
    fontWeight: 600,
    padding: '10px 140px',
  },
  menu: {
    display: 'flex',
    gap: '30px',
    '& > *': {
      paddingRight: '30px',
      borderRight: '2px solid white',
      '&:last-child': {
        border: 'none',
      }
    },
  },
  logoWrapper: {
    height: '100%'
  },
  logo: {
    height: '100%'
  },
  links: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '20px',
  },
}));

