import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import logo from '../assets/logo.png'
// import logoTrans from '../assets/logoTrans.png'
import {Link} from "react-router-dom";

export const Header = () => {
    const classes = useStyles();
    return (
        <Container className={classes.appBar}>
            <Link to="/" className={classes.logoWrapper}>
                <img src={logo} alt='Logo' className={classes.logo}/>
            </Link>
            <div>
                <Link to="/how" className={classes.links}>
                    How
                </Link>
                <Link to="/videos" className={classes.links}>
                    Videos
                </Link>
            </div>
        </Container>
    );
}

const useStyles = makeStyles(() => ({
    appBar: {
        marginTop: '10px',
        border: `1px solid white`,
        display: 'flex',
        height: '50px',
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: '#3B27BA',
        color: 'white',
        fontSize: '40px'
    },
    logoWrapper: {
        height: '100%'
    },
    logo: {
        height: '100%'
    },
    links: {
        color: "white",
        textDecoration: "none",
        marginLeft: '20px',
    },
}));
