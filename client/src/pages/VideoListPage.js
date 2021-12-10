import React, { useEffect, useState } from 'react';
import '../App.css';
import Container from '@material-ui/core/Container';
import { Box, IconButton } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

export const VideoListPage = () => {
  const classes = useStyles();
  const [bounds, setBounds] = useState({
    begin: 0,
    end: 3
  });
  const [mock, setMock] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/videos')
      .then((reponse) => {
        setMock(reponse.data);
      });
  }, []);

  const increase = () => {
    setBounds(prevState => {
      return {
        begin: prevState.begin + 3,
        end: prevState.end + 3,
      };
    });
  };

  const decrease = () => {
    setBounds(prevState => {
      return {
        begin: prevState.begin - 3,
        end: prevState.end - 3,
      };
    });
  };
  return (
    <Container maxWidth="xl" className={classes.wrapper}>
      <Box className={classes.cardsWrapper}>
        <Box className={classes.buttonWrapper}>

          <IconButton className={classes.scrollButton} disabled={bounds.begin <= 0}
                      onClick={decrease}> <ArrowBackIcon/></IconButton>
        </Box>
        {mock.map((e, idx) => (
            (idx <= (bounds.end) && idx >= (bounds.begin)) ?
              <Box component={NavLink} to="/video">
                <div className={classes.card} style={{ backgroundImage: `url(${e.image})` }}>
                </div>
              </Box> : null

          )
        )}
        <Box className={classes.buttonWrapper}>
          <IconButton className={classes.scrollButton} disabled={bounds.end >= mock.length}
                      onClick={increase}> <ArrowForwardIcon/></IconButton>
        </Box>
      </Box>

    </Container>
  )
    ;
};

const useStyles = makeStyles({
  wrapper: {
    height: 'calc(100vh - 70px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollButton: {
    backgroundColor: 'red',
    color: 'white',
    height: '60px',
    width: '60px',
    borderRadius: '100%',
  },
  cardsWrapper: {
    display: 'flex',
    gap: '60px',
  },
  card: {
    padding: '20px',
    width: '300px',
    height: '450px',
    border: '1px solid white',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
    backgroundSize: 'cover',
    boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
  },
}, { name: 'VideosPage' });




