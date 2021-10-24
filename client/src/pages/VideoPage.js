import React from 'react';
import Container from "@material-ui/core/Container";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export const VideoPage = (props) => {
    const classes = useStyles();
    return (
        <Container className={classes.wrapper}>
            <Box className={classes.playerWrapper}>
              <video className={classes.video} controls crossOrigin="anonymous">
                  <source src={`http://localhost:4000/video/${1}`} type="video/mp4"></source>
                  <track label="English" kind="captions" srcLang="en" src={`http://localhost:4000/video/${0}/caption`} default></track>
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
        height: 'calc(100vh - 100px)',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: `$rightEffect 500ms ease-out`,
        gap: '60px',
    },
    playerWrapper:{
        backgroundColor: 'transparent',
        height: '600px',

        boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
    },
    video: {
        border: "1px solid white",
        height: '602px',    
    },
    content: {
        color:'white',
        padding:'20px',
        backgroundColor: '#FF9472',
        minWidth: '400px',
        height: '600px',
        border: "1px solid white",
        wordWrap: 'break-word',
        backgroundImage:'url(https://terrigen-cdn-dev.marvel.com/content/prod/1x/online_9.jpg)',
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
}, {name: 'HowPage'});



