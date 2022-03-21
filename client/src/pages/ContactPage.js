import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { EmialIcon } from '../components/Icons/EmialIcon';

export const ContactPage = () => {
  const classes = useStyles();


  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.header}> Masz jakieś pytania?</Typography>
      <Box className={classes.flexWrapper}>
        <Box className={classes.leftBox}>
          <EmialIcon style={{
            width: '320px',
            height: '320px'
          }}/>
        </Box>
        <Box className={classes.rightBox}>
          <Typography className={classes.paragraph}> Projekt ten został wykonany w ramach pracy
            inżynierskiej. Praca to była tworza na Politechnice Warszawskiej na wydziale
            Elektrycznym. Jeśli ciekawi cię więcej na jej temat z kontaktuj się z
            twórcą. </Typography>
          <Typography className={classes.paragraph}> Email: maewfws23@gmail.com </Typography>
          <Typography className={classes.paragraph}> phone: +45 231 232 534</Typography>
        </Box>
      </Box>
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
  header: {
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 600,
    fontSize: '34px',
  },
  paragraph: {
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 600,
    marginBottom: '10px',
  },
  icon: {
    fontSize: '40px',
  }
}, { name: 'ContactPage' });
