import React from 'react';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SwipeIcon from '@mui/icons-material/Swipe';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { Typography } from '@mui/material';

export const HowPage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.wrapper}>
      <Box className={classes.content}>
        <Box className={classes.step}>
          <Box className={classes.iconWrapper}>
            <SwipeIcon fontSize={'inherit'} className={classes.icon}/>
          </Box>
          <Typography> Chose movie</Typography>
          <Typography> Some text lorem ipusm strata tata.Some text lorem ipusm strata tata.Some text
            lorem ipusm strata tata.Some text lorem ipusm strata tata.</Typography>
        </Box>
        <Box className={classes.step}>
          <Box className={classes.iconWrapper}>
            <SlideshowIcon fontSize={'inherit'} className={classes.icon}/>
          </Box>
          <Typography> Watch</Typography>
          <Typography> Some text lorem ipusm strata tata.Some text lorem ipusm strata tata.Some text
            lorem ipusm strata tata.Some text lorem ipusm strata tata.</Typography>
        </Box>
        <Box className={classes.step}>
          <Box className={classes.iconWrapper}>
            <TheaterComedyIcon fontSize={'inherit'} className={classes.icon}/>
          </Box>
          <Typography> Analyze</Typography>
          <Typography> Some text lorem ipusm strata tata.Some text lorem ipusm strata tata.Some text
            lorem ipusm strata tata.Some text lorem ipusm strata tata.</Typography>
        </Box>
        <Box className={classes.step}>
          <Box className={classes.iconWrapper}>
            <CelebrationIcon fontSize={'inherit'} className={classes.icon}/>
          </Box>
          <Typography> Throwback</Typography>
          <Typography> Some text lorem ipusm strata tata.Some text lorem ipusm strata tata.Some text
            lorem ipusm strata tata.Some text lorem ipusm strata tata.</Typography>
        </Box>
        <Box className={classes.line} sx={{left: '360px', top:'180px', width: '300px'}}/>
        <Box className={classes.line} sx={{top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-34deg)', width: '320px',}}/>
        <Box className={classes.line} sx={{left: '360px', bottom:'100px', width: '300px'}}/>
      </Box>
    </Container>
  );
};

const useStyles = makeStyles({
  line: {
    position: 'absolute',
    height: '6px',
    backgroundColor: 'red'
  },
  iconWrapper: {
    border: '6px solid red',
    padding: '10px',
    borderRadius: '100%',
    width: '80px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '40px',
  },
  icon: {},
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '300px',
    height: '300px',
    color: 'white',
  },
  wrapper: {
    height: 'calc(100vh - 130px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    display: 'grid',
    gap: '200px',
    columnGap: '400px',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
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
}, { name: 'HowPage' });



