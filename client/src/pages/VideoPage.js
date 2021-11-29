import React, { useEffect, useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Box, Button, Typography, IconButton } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import * as faceApi from 'face-api.js';

const expressionMap = {
  neutral: 'neutral',
  happy: 'happy',
  sad: 'sad',
  angry: 'angry',
  fearful: 'fearful',
  disgusted: 'disgusted',
  surprised: 'surprised',
};

export const VideoPage = () => {
  const classes = useStyles();
  const videoRef = useRef();
  const movieRef = useRef();
  const [emotion, setEmotion] = useState();
  const [timestamps, setTimestamps] = useState([]);
  const [now, setNow] = useState(false);
  const [info, setInfo] = useState(false);
  const [leftStyle, setLeftStyle] = useState(classes.camera);
  const [rightStyle, setRightStyle] = useState(classes.content);
  const stream = useRef(false);

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
          console.log(e);
        }
      }

      try {
        fetchModel();
      } catch (e) {
        console.log('somthing wrong');
      }
    }
  }, [now]);

  useEffect(() => {
    if (emotion === 'happy') {
      setTimestamps((prev) => [...new Set([...prev, movieRef.current.currentTime])]);
    }
  }, [emotion]);

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

  const onPlay = async () => {
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
      setEmotion(max[0]);
    }
  };

  return (
    <Container className={classes.wrapper}>
      {now
        ? (
          <Box className={leftStyle}>
            <IconButton onClick={closeFace}
                        className={classes.leftClose}><KeyboardArrowLeftIcon/></IconButton>
            <video
              ref={videoRef}
              className={classes.faceVideo}
              autoPlay
              muted
              onPlay={onPlay}
            />
            <Typography className={classes.emotion}>
              {expressionMap[emotion]}
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
          <Button
            onClick={() => setNow(true)}
            className={classes.leftOpen}
            variant="outlined"
          >
            <KeyboardArrowRightIcon fontSize='large'/>
          </Button>
        )}
      <Box className={classes.playerWrapper}>
        <video className={classes.video} controls crossOrigin="anonymous" ref={movieRef}>
          <source src={`http://localhost:4000/video/${2}`} type="video/mp4"/>
          <track
            label="English"
            kind="captions"
            srcLang="en"
            src={`http://localhost:4000/video/${2}/caption`}
            default
          />
        </video>
      </Box>
      {info
        ? (
          <Box className={rightStyle}>
            <IconButton onClick={closeInfo}
                        className={classes.rightClose}><KeyboardArrowRightIcon/></IconButton>
            <h1>
              Welcome stranger!
            </h1>
            <p>
              Has been the industry standard dummy text ever since the 1500s, when an unknown
              printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only
              five
              centuries, but also the leap into electronic typesetting, remaining essentially
              unchanged. It
              was
            </p>
          </Box>
        )
        : (
          <Button
            onClick={() => {
              setInfo(true);
            }}
            className={classes.rightOpen}
            variant="outlined"
          >
            <KeyboardArrowLeftIcon fontSize='large'/>
          </Button>
        )}
    </Container>
  );
};

const useStyles = makeStyles({
  wrapper: {
    height: 'calc(100vh - 130px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: '$rightEffect 500ms ease-out',
    gap: '60px',
    overflow: 'hidden',
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
    backgroundImage: 'url(https://terrigen-cdn-dev.marvel.com/content/prod/1x/online_9.jpg)',
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
    backgroundImage: 'url(https://terrigen-cdn-dev.marvel.com/content/prod/1x/online_9.jpg)',
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
    backgroundColor: 'black',
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
    padding: '20px',
    backgroundColor: '#FF9472',
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
    overflow: 'auto',
    display: 'flex',
    flexDirection: ' column',
    paddingRight: '15px',
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
    height: '300px',
    minWidth: '32px',
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
    height: '300px',
    minWidth: '32px',
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
}, { name: 'HowPage' });
