import React from 'react';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    footer: {
        border: `1px solid white`,
        backgroundColor: '#3b27ba',
        color: "white",
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:'10px',
    },
}));


function Footer() {
    const classes = useStyles();
    return (
        <Container component="footer" className={classes.footer}>
            {'Copyright © Mateusz Milewski.'}
        </Container>
    );
}

export default Footer;
