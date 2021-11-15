import React, { useEffect, useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as faceApi from 'face-api.js';

const expressionMap = {
  neutral: ' neutral 😶',
  happy: ' happy 😄',
  sad: 'sad 😞',
  angry: 'angry 🤬',
  fearful: 'fearful 😖',
  disgusted: 'disgusted 🤢',
  surprised: 'surprised 😲',
};

export const VideoPage = () => {
  const classes = useStyles();
  const videoRef = useRef();
  const movieRef = useRef();
  const [emotion, setEmotion] = useState();
  const [timestamps, setTimestamps] = useState([]);
  const [now, setNow] = useState(false);
  const [info, setInfo] = useState(false);
  const stream = useRef(false)

  useEffect(() => {
    if (now === true) {
      async function fetchModel() {
        await faceApi.nets.tinyFaceDetector.load('/models/');
        await faceApi.loadFaceExpressionModel('/models/');
          stream.current = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });
        videoRef.current.srcObject = stream.current
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
    let time;
    if (now) {
      time = setInterval(() => onPlay(), 300);
    }
    return () => {
      clearInterval(time);
    };
  }, [now]);

  const stop = () => {
    stream.current.getTracks().forEach(function(track) {
      track.stop();
    });

    videoRef.current.srcObject = null;
    setNow(false)
  }

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
          <Box className={classes.camera}>
            <Button onClick={stop}> Close </Button>
            <video
              ref={videoRef}
              style={{
                width: '360px',
                border: '1px solid white',
              }}
              autoPlay
              muted
              onPlay={onPlay}
            />
            <Typography variant="h4">
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
            Open Camera
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
          <Box className={classes.content}>
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
            Info
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
  camera: {
    padding: '20px',
    backgroundColor: '#FF9472',
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
    color: 'white',
    position: 'absolute',
    left: 40,
  },
  rightOpen: {
    color: 'white',
    position: 'absolute',
    right: 40,
  },
}, { name: 'HowPage' });
