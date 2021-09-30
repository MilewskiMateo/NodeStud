import React from 'react';
import '../App.css';
import {Box} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
// import Posts from '../components/Posts';
// import PostLoadingComponent from '../components/PostLoading';

const mock = [
    {
        title: 'Loki',
        id: 'asdadwd',
        ulr: 'http:/www/awdwad',
        image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/online_9.jpg',

    }, {
        title: 'Capitan Marvel',
        id: 'asdadwd1',
        ulr: 'http:/www/awdwad',
        image: 'https://static.posters.cz/image/750/plakaty/captain-marvel-epic-i71851.jpg',

    }, {
        title: 'Guardian of the Galaxy',
        id: 'asdadwd2',
        ulr: 'http:/www/awdwad',
        image: 'https://m.media-amazon.com/images/I/71pAQsmvQyL._AC_SL1000_.jpg',
    }, {
        title: 'Infinty Gauntlet',
        id: 'asdadwd',
        ulr: 'http:/www/awdwad',
        image: 'https://static.posters.cz/image/750/plakaty/marvel-retro-the-infinity-gauntlet-i59015.jpg',

    }, {
        title: 'Loki',
        id: 'asdadwd1',
        ulr: 'http:/www/awdwad',
        image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/online_9.jpg',

    }, {
        title: 'Loki',
        id: 'asdadwd2',
        ulr: 'http:/www/awdwad',
        image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/online_9.jpg',
    }, {
        title: 'Loki',
        id: 'asdadwd',
        ulr: 'http:/www/awdwad',
        image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/online_9.jpg',

    }, {
        title: 'Loki',
        id: 'asdadwd1',
        ulr: 'http:/www/awdwad',
        image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/online_9.jpg',

    }, {
        title: 'Loki',
        id: 'asdadwd2',
        ulr: 'http:/www/awdwad',
        image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/online_9.jpg',
    },
]
export const VideoListPage = () => {
    const classes = useStyles();
    // const PostLoading = PostLoadingComponent(Posts);
    // const [appState, setAppState] = useState({
    // 	loading: false,
    // 	posts: null,
    // });

    // useEffect(() => {
    // 	setAppState({ loading: true });
    // 	const apiUrl = `http://127.0.0.1/api/`;
    // 	fetch(apiUrl)
    // 		.then((data) => data.json())
    // 		.then((posts) => {
    // 			setAppState({ loading: false, posts: posts });
    // 		});
    // }, [setAppState]);
    return (
        <div className={classes.wrapper}>
            <Box className={classes.cardsWrapper}>

                {mock.map(e => (
                        <Box component={NavLink} to='/video'>
                            <div className={classes.card} style={{backgroundImage: `url(${e.image})`}}>
                            </div>
                        </Box>
                    )
                )}
            </Box>

        </div>
    );
};

const useStyles = makeStyles({
    wrapper: {
        height: 'calc(100vh - 100px)',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: '100vw',

    },
    cardsWrapper: {
        width: '100%',
        overflow: 'auto',
        display: "flex",
        padding: '40px 0',

        '&::-webkit-scrollbar': {
            height: '5px',
        },
        '&::-webkit-scrollbar-track': {
            margin: ' 0 200px',
            borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            backgroundColor: 'rgb(255,148,114)',
        },
    },
    card: {
        padding: '20px',
        width: '300px',
        height: '450px',
        border: "1px solid white",
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundSize: 'cover',
        marginRight: '30px',
        boxShadow: 'rgb(0 0 0 / 50%) 2px 2px 30px 1px',
    },
}, {name: 'VideosPage'});




