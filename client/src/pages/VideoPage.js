import React, { useEffect, useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Box, Button, CircularProgress, IconButton, Typography } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../components/AuthProvider';
import { Link } from 'react-router-dom';
import * as faceApi from 'face-api.js';
import axios from 'axios';

const expressionMap = {
  neutral: 'neutral',
  happy: 'happy',
  sad: 'sad',
  angry: 'angry',
  fearful: 'fearful',
  disgusted: 'disgusted',
  surprised: 'surprised',
};

export const VideoPage = ({ match }) => {
  const classes = useStyles();
  const videoRef = useRef();
  const movieRef = useRef();
  const stream = useRef(false);
  const [now, setNow] = useState(false);
  const [info, setInfo] = useState(false);
  const [ended, setEnded] = useState(false);
  const [startGenerating, setStartGenerating] = useState(false);
  const [leftStyle, setLeftStyle] = useState(classes.camera);
  const [rightStyle, setRightStyle] = useState(classes.content);
  const [poster, setPoster] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [description, setDescription] = useState('');
  const [movieUrl, setMovieUrl] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState();
  const { userId } = useAuth();

  useEffect(() => {
    axios.get(`http://localhost:1337/api/movies/${match.params.address}?populate=*`)
      .then((reponse) => {
        setPoster(reponse.data.data.attributes.poster.data.attributes.url);
        setTitle(reponse.data.data.attributes.title);
        setDescription(reponse.data.data.attributes.description);
        setMovieUrl(reponse.data.data.attributes.video.data.attributes.url);
      });
  }, [match.params.address]);

  useEffect(() => {
    if (now === true) {
      async function fetchModel() {
        try {
          await faceApi.nets.tinyFaceDetector.load('/models/');
          await faceApi.loadFaceExpressionModel('/models/');
          stream.current = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
          });
          videoRef.current.srcObject = stream.current;
        } catch (e) {
          console.error('failed to load models or access user camera', e);
        }
      }

      fetchModel();
    }
  }, [now]);

  useEffect(() => {
    if (currentEmotion === 'happy') {
      setTimestamps((prev) => [...new Set([...prev, movieRef.current.currentTime])]);
    }
  }, [currentEmotion]);

  useEffect(() => {
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let time;
    if (now) {
      time = setInterval(() => onPlay(), 300);
    }
    return () => {
      clearInterval(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now]);

  const closeFace = () => {
    setLeftStyle(classes.cameraOut);
    setTimeout(() => stop(), 500);
  };

  const stop = () => {
    if (stream && stream.current && stream.current.getTracks) {
      stream.current.getTracks()
        .forEach(function (track) {
          track.stop();
        });
      setNow(false);
      setLeftStyle(classes.camera);
    }
  };

  const closeInfo = () => {
    setRightStyle(classes.contentOut);
    setTimeout(() => {
      setInfo(false);
      setRightStyle(classes.content);
    }, 500);
  };

  const seekTo = (time) => {
    movieRef.current.currentTime = time;
  };

  const analyze = async () => {
    if (!faceApi.nets.tinyFaceDetector.params) {
      return;
    }

    const options = new faceApi.TinyFaceDetectorOptions({
      inputSize: 512,
      scoreThreshold: 0.5,
    });

    const result = await faceApi
      .detectSingleFace(videoRef.current, options)
      .withFaceExpressions();

    if (result) {
      const arr = Object.entries(result.expressions);
      const max = arr.reduce((
        acc,
        current,
      ) => (acc[1] > current[1] ? acc : current), []);
      return max[0];
    }
  };

  const onPlay = async () => {
    const emotion = await analyze();
    setCurrentEmotion(emotion);
  };

  const onEnding = () => {
    setEnded(true);
  };

  const generate = () => {
    setStartGenerating(true);

    axios.post('http://localhost:8080/generate', {
      timestamps: timestamps,
    })
      .then(function (response) {
        setAddress('/compilation/' + response.data.address);
        axios
          .post('http://localhost:1337/api/compilations', {
            data: {
              title: title,
              description: description,
              userId: userId.toString(),
              posterURL: poster,
              url: response.data.address,
            }
          })
          .catch((error) => {
            console.error(error.response.data);
          });
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  return (
    <Container className={classes.wrapper}>
      {now ? (
          <Box className={leftStyle}>
            <IconButton
              onClick={closeFace}
              className={classes.leftClose}
            >
              <KeyboardArrowLeftIcon/>
            </IconButton>
            <video
              ref={videoRef}
              className={classes.faceVideo}
              autoPlay
              muted
              onPlay={onPlay}
            />
            <Typography className={classes.emotion}>
              {expressionMap[currentEmotion]}
            </Typography>
            <Box className={classes.stampsWrapper}>
              {timestamps.map((stamp) => (
                <Box
                  key={stamp}
                  className={classes.timestampBox}
                  onClick={() => {
                    seekTo(stamp);
                  }}
                >
                  <Typography variant="h6">
                    {stamp}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )
        : (
          <IconButton
            onClick={() => setNow(true)}
            className={classes.leftOpen}
          >
            <ArrowForwardIcon/>
          </IconButton>
        )}
      <Box className={classes.playerWrapper}>
        {movieUrl !== '' &&
          <video
            className={classes.video}
            controls
            crossOrigin="anonymous"
            controlsList="nofullscreen nodownload"
            onEnded={onEnding}
            ref={movieRef}
          >
            <source src={`http://localhost:1337${movieUrl}`} type="video/mp4"/>
          </video>
        }
      </Box>
      {info ? (
        <Box className={rightStyle}
             style={{ backgroundImage: `url(http://localhost:1337${poster})` }}>
          <IconButton
            onClick={closeInfo}
            className={classes.rightClose}
          >
            <KeyboardArrowRightIcon/>
          </IconButton>
        </Box>
      ) : (
        <IconButton
          className={classes.rightOpen}
          onClick={() => {
            setInfo(true);
          }}>
          <ArrowBackIcon/>
        </IconButton>
      )}
      {ended && timestamps.length > 0 &&
        <Box className={classes.endedWrapper}>
          <Button
            onClick={generate}
            className={classes.generateButton}
          >
            Generate compilation
          </Button>
          {startGenerating && (address ?
              <Link to={address}>
                Compilation
              </Link>
              : <CircularProgress size={26} className={classes.spiner}/>
          )}
        </Box>}
    </Container>
  );
};

const useStyles = makeStyles({
  wrapper: {
    height: 'calc(100vh - 70px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '60px',
    overflow: 'hidden',
    animation: `$appear 500ms ease-in`,
  },
  spiner: {
    color: 'white',
  },
  endedWrapper: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    backgroundColor: 'red',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    transform: 'translateX(-50%)',
  },
  generateButton: {
    color: 'white'
  },
  '@keyframes appear': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    }
  },
  playerWrapper: {
    backgroundColor: 'transparent',
    height: '600px',
    maxWidth: '800px',
    boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
  },
  video: {
    border: '1px solid white',
    height: '602px',
    maxWidth: '800px',
    backgroundColor: 'black',
  },
  faceVideo: {
    width: '380px',
    height: '285px',
    border: '1px solid white',
  },
  content: {
    color: 'white',
    padding: '20px',
    backgroundColor: '#FF9472',
    width: '400px',
    height: '600px',
    border: '1px solid white',
    wordWrap: 'break-word',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
    backgroundSize: 'cover',
    boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
    position: 'absolute',
    right: '-400px',
    animation: '$leftEffect 0.5s forwards',
  },
  contentOut: {
    color: 'white',
    padding: '20px',
    backgroundColor: '#FF9472',
    width: '400px',
    height: '600px',
    border: '1px solid white',
    wordWrap: 'break-word',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
    backgroundSize: 'cover',
    boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
    position: 'absolute',
    right: '40px',
    animation: '$rightEffectClose 0.5s forwards',
  },
  emotion: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b27ba',
    color: 'white',
    top: 10,
    right: 10,
    borderRadius: '0px 0px 0px 10px',
    padding: '5px',
    fontSize: '20px',
    width: '100px',
    height: '32px',
    border: '1px solid white',
  },
  camera: {
    padding: '10px',
    zIndex: 10,
    background: 'linear-gradient(315deg, #2f4353 0%, #333333 74%)',
    minWidth: '400px',
    height: '600px',
    border: '1px solid white',
    boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '-450px',
    animation: '$rightEffect 0.5s forwards',
  },
  cameraOut: {
    padding: '10px',
    zIndex: 10,
    backgroundColor: 'black',
    minWidth: '400px',
    height: '600px',
    border: '1px solid white',
    boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '40px',
    animation: '$leftEffectClose 0.5s forwards',
  },
  '@keyframes rightEffect': {
    '100%': {
      left: 40,
    },
  },
  '@keyframes leftEffect': {
    '100%': {
      right: 40,
    },
  },
  '@keyframes leftEffectClose': {
    '100%': {
      left: '-400px',
    },
  },
  '@keyframes rightEffectClose': {
    '100%': {
      right: '-400px',
    },
  },
  stampsWrapper: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: ' column',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  timestampBox: {
    backgroundColor: '#3b27ba',
    color: 'white',
    borderRadius: '3px',
    border: '0.5px solid white',
    marginTop: '6px',
    padding: '4px',
  },
  leftOpen: {
    height: '30px',
    width: '30px',
    borderRadius: '100%',
    backgroundColor: 'red',
    padding: '0px',
    color: 'white',
    position: 'absolute',
    left: 10,
  },
  leftClose: {
    position: 'absolute',
    backgroundColor: '#3b27ba',
    color: 'white',
    padding: '5px',
    zIndex: 10,
    left: 10,
    top: 10,
    borderRadius: '0px 0px 10px 0px',
    border: '1px solid white'
  },
  rightOpen: {
    height: '30px',
    width: '30px',
    borderRadius: '100%',
    backgroundColor: 'red',
    padding: '0px',
    color: 'white',
    position: 'absolute',
    right: 10,
  },
  rightClose: {
    position: 'absolute',
    backgroundColor: '#3b27ba',
    color: 'white',
    padding: '5px',
    zIndex: 10,
    right: 0,
    top: 0,
    borderRadius: '0px 0px 0px 10px',
    borderBottom: '1px solid white',
    borderLeft: '1px solid white',
  }
}, { name: 'VideoPage' });
