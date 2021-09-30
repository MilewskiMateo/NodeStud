import React from 'react';
import Container from "@material-ui/core/Container";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export const VideoPage = () => {
    const classes = useStyles();
    return (
        <Container className={classes.wrapper}>
            <Box className={classes.content}>
                <h1>
                    Welcome stranger!
                </h1>
                <p>
                    Has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                    more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                    Ipsum.
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
    },
    content: {
        color:'white',
        padding:'20px',
        backgroundColor: '#FF9472',
        width: '800px',
        height: '600px',
        border: "1px solid white",
        wordWrap: 'break-word',
        backgroundImage:'url(https://terrigen-cdn-dev.marvel.com/content/prod/1x/online_9.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundSize: 'cover',
        boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
    },
}, {name: 'HowPage'});



