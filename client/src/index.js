import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {VideoListPage} from './pages/VideoListPage';
import {Header} from './components/Header';
import Footer from './components/Footer';
import {HomePage} from "./pages/HomePage";
import {HowPage} from "./pages/HowPage";
import {VideoPage} from "./pages/VideoPage";

const routing = (
    <Router>
        <Header/>
        <Switch style={{
            overflow: 'hidden',
        }}>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/videos" component={VideoListPage}/>
            <Route exact path="/how" component={HowPage}/>
            <Route exact path="/video" component={VideoPage}/>
        </Switch>
        <Footer/>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
