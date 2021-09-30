import React from 'react';
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
// import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useHistory } from "react-router-dom";

export const HomePage = () => {
    const classes = useStyles();
    let history = useHistory();

    function leftClick() {
        history.push("/how");
    }
    function rightClick() {
        history.push("/videos");
    }
    return (
        <div className={classes.wrapper}>
            <Box className={classes.leftBox} onClick={leftClick}>
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
            <Box className={classes.rightBox} onClick={rightClick}>
                <h1>
                    Videos
                </h1>
                <p>
                    If you already know how VideoSpace works check out videos we are offering. Hope you will find something interesting.
                </p>
                {/*<VideoLibraryIcon/>*/}
            </Box>
        </div>
    );
};

const useStyles = makeStyles({
    wrapper: {
        height: 'calc(100vh - 100px)',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        overflow: "hidden",
        width: '100vw',
    },
    leftBox: {
        padding: '20px',
        backgroundColor: '#FF9472',
        width: '400px',
        height: '400px',
        border: "1px solid white",
        wordWrap: 'break-word',
        animation: `$leftEffect 1000ms ease-out`,
        boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
        cursor: "pointer",
    },
    "@keyframes leftEffect": {
        "0%": {
            opacity: 0,
            transform: "translateX(-100%)"
        },
        "100%": {
            opacity: 1,
            transform: "translateX(0)"
        }
    },
    rightBox: {
        padding: '20px',
        backgroundColor: '#FF9472',
        width: '400px',
        height: '400px',
        border: "1px solid white",
        wordWrap: 'break-word',
        animation: `$rightEffect 1000ms ease-out`,
        boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
        cursor: "pointer",
    },
    "@keyframes rightEffect": {
        "0%": {
            opacity: 0,
            transform: "translateX(100%)"
        },
        "100%": {
            opacity: 1,
            transform: "translateX(0)"
        }
    },
}, {name: 'HomePage'});

