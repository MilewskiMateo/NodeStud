import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SwipeIcon from '@mui/icons-material/Swipe';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { useAuth } from '../components/AuthProvider';
import { useHistory } from 'react-router-dom';

export const HowPage = () => {
  const classes = useStyles();
  const history = useHistory()

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

  function redirect() {
    history.push('/register');
  }

  return (
    <Container className={classes.wrapper}>
      <Box className={classes.content}>
        <Box className={classes.step}>
          <Box className={classes.iconWrapper}>
            <SwipeIcon fontSize={'inherit'} className={classes.icon}/>
          </Box>
          <Typography> Wybór film</Typography>
          <Typography> W pierwszej kolejności wybierz film z bazy filmów dostępnych w naszym serwisie. Nasza baz wciaż się powieksza i posiada setki wspaniałych tytułów napewno znajdziesz coś dla siebie.</Typography>
        </Box>
        <Box className={classes.step}>
          <Box className={classes.iconWrapper}>
            <SlideshowIcon fontSize={'inherit'} className={classes.icon}/>
          </Box>
          <Typography> Oglądanie</Typography>
          <Typography> Podczas oglądania filmu możesz uruchomić funkcję rejestracji twoich emocji. Jedyne co musisz zrobić to zezwolić na dostęp do twojej kamery w laptopie. Nie martw się nie jesteś w żaden sposób nagrywane my jedynie analizujemy twoje emocje w czasie rzeczywistym. </Typography>
        </Box>
        <Box className={classes.step}>
          <Box className={classes.iconWrapper}>
            <TheaterComedyIcon fontSize={'inherit'} className={classes.icon}/>
          </Box>
          <Typography> Analiza</Typography>
          <Typography> Twój wyraz twarzy poddawany jest dogłębnej analizie z wykorzystaniem uczenia maszynowego. Dzięki temu jestemy w stanie rozpoznać emocje jakie ci towarzyszą podczas oglądania filmu. </Typography>
        </Box>
        <Box className={classes.step}>
          <Box className={classes.iconWrapper}>
            <CelebrationIcon fontSize={'inherit'} className={classes.icon}/>
          </Box>
          <Typography> Wspomnienia</Typography>
          <Typography> Na koniec nasz serwis wygeneruje dla ciebie kompilacje najlepszych momentów z filmu na podstawie twoich wcześniejszych emocji. Przeżyj te chwile jeszcze raz!</Typography>
        </Box>
        <ArrowForwardIcon className={classes.line} sx={{
          height: '100px',
          width: '100px',
          left: '460px',
          top: '100px',
        }}/>
        <ArrowForwardIcon className={classes.line} sx={{
          height: '100px',
          width: '100px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(135deg)',
        }}/>
        <ArrowForwardIcon className={classes.line} sx={{
          height: '100px',
          width: '100px',
          left: '460px',
          bottom: '80px',
        }}/>
      </Box>
      <Button className={classes.startNow} onClick={redirect}>
        <Typography variant="h6">
          Sprawdź
        </Typography>
      </Button>    </Container>
  );
};

const useStyles = makeStyles({
  line: {
    position: 'absolute',
    height: '100px',
    width: '100px',
    color: 'white',
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
  startNow: {
    marginTop: '30px',
    display: 'inline-flex',
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '200px',
    position: 'absolute',
    right: '100px',
    opacity: 0,
    animation: `$appear 1500ms ease-in forwards`,
    animationDelay: '3000ms',
  },
  icon: {},
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '350px',
    height: '300px',
    color: 'white',
  },
  wrapper: {
    height: 'calc(100vh - 70px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    display: 'grid',
    gap: '200px',
    columnGap: '320px',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
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
}, { name: 'HowPage' });



