import React, {useEffect, useRef, useState} from 'react';
import Container from "@material-ui/core/Container";
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as faceApi from "face-api.js";

const expressionMap = {
    neutral: " neutral 😶",
    happy: " happy 😄",
    sad: "sad 😞",
    angry: "angry 🤬",
    fearful: "fearful 😖",
    disgusted: "disgusted 🤢",
    surprised: "surprised 😲"
};

export const VideoPage = (props) => {
    const classes = useStyles();
    const videoRef = useRef()
    const [emotion, setEmotion] = useState()

    useEffect(() => {
        async function fetchModel() {
            await faceApi.nets.tinyFaceDetector.load('/models/')
            await faceApi.loadFaceExpressionModel(`/models/`);
            videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({
                video: {facingMode: "user"}
            });
        }

        try {
            fetchModel()
        } catch (e) {
            console.log('somthing wrong');
        }
    }, [])


    const onPlay = async () => {
        console.log('look out')
        if (!faceApi.nets.tinyFaceDetector.params) {
            return
        }
        const options = new faceApi.TinyFaceDetectorOptions({
            inputSize: 512,
            scoreThreshold: 0.5
        });
        const result = await faceApi
            .detectSingleFace(videoRef.current, options)
            .withFaceExpressions()

        if (result) {
            const arr = Object.entries(result.expressions);
            const max = arr.reduce(
                (acc,
                 current) => {
                    return acc[1] > current[1] ? acc : current
                }, []
            )
            setEmotion(expressionMap[max[0]])
        }

    }

    useEffect(() => {
        const time = setInterval(() => onPlay(), 300)
        return () => {
            clearInterval(time)
        }
    }, [])

    return (
        <Container className={classes.wrapper}>
            <Box className={classes.camera}>
                <video
                    ref={videoRef}
                    style={{width: '360px', border: "1px solid white",}}
                    autoPlay
                    muted
                    onPlay={onPlay}
                />
                <Typography variant="h4">
                    Your emotion:
                </Typography>
                <Typography variant="h4">
                    {emotion}
                </Typography>
            </Box>
            <Box className={classes.playerWrapper}>
                <video className={classes.video} controls crossOrigin="anonymous">
                    <source src={`http://localhost:4000/video/${1}`} type="video/mp4"/>
                    <track label="English" kind="captions" srcLang="en" src={`http://localhost:4000/video/${0}/caption`}
                           default/>
                </video>

            </Box>
            <Box className={classes.content}>
                <h1>
                    Welcome stranger!
                </h1>
                <p>
                    Has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                </p>
            </Box>
        </Container>
    );
};


const useStyles = makeStyles({
    wrapper: {
        height: 'calc(100vh - 130px)',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: `$rightEffect 500ms ease-out`,
        gap: '60px',
    },
    playerWrapper: {
        backgroundColor: 'transparent',
        height: '600px',
        maxWidth: '800px',
        boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
    },
    video: {
        border: "1px solid white",
        height: '602px',
        maxWidth: '800px',
        // display: 'none',
        // visibility: 'hidden',
    },
    content: {
        color: 'white',
        padding: '20px',
        backgroundColor: '#FF9472',
        minWidth: '400px',
        height: '600px',
        border: "1px solid white",
        wordWrap: 'break-word',
        backgroundImage: 'url(https://terrigen-cdn-dev.marvel.com/content/prod/1x/online_9.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundSize: 'cover',
        boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
    },
    "@keyframes rightEffect": {
        "0%": {
            opacity: 0,
        },
        "100%": {
            opacity: 1,
        }
    },
    camera: {
        padding: '20px',
        backgroundColor: '#FF9472',
        minWidth: '400px',
        height: '600px',
        border: "1px solid white",
        boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
    },
}, {name: 'HowPage'});



