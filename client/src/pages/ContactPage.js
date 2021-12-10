import React from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { EmialIcon } from '../components/Icons/EmialIcon';

export const ContactPage = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.paragraph}> Do you have some questions?</Typography>
      <Box className={classes.flexWrapper}>
        <Box className={classes.leftBox}>
          <EmialIcon style={{
            width: '320px',
            height: '320px'
          }}/>
        </Box>
        <Box className={classes.rightBox}>
          <Typography className={classes.paragraph}> Thiwadwadwa dwad wad awd wad waiiontegr oierg
            roein rong rweib ejrngi eqger bqiergb eing eqirng qeiurgb qerlhjg jqekrga
            kreqjlgkqej</Typography>
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
    marginBottom: '20px',
  },
  icon: {
    fontSize: '40px',
  }
}, { name: 'ContactPage' });
