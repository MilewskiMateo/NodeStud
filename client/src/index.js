import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { VideoListPage } from './pages/VideoListPage';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { HowPage } from './pages/HowPage';
import { VideoPage } from './pages/VideoPage';
import { ContactPage } from './pages/ContactPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { CompilationPage } from './pages/CompilationPage';
import { AuthProvider } from './components/AuthProvider';
import { CompilationListPage } from './pages/CompilationListPage';

const routing = (
  <AuthProvider>
    <Router>
      <Header/>
      <Switch style={{
        overflow: 'hidden',
      }}>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/videos" component={VideoListPage}/>
        <Route exact path="/compilations" component={CompilationListPage}/>
        <Route exact path="/how" component={HowPage}/>
        <Route path="/video/:address" component={VideoPage}/>
        <Route exact path="/contact" component={ContactPage}/>
        <Route exact path="/register" component={RegisterPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route path="/compilation/:address" component={CompilationPage}/>
      </Switch>
    </Router>
  </AuthProvider>
);

ReactDOM.render(routing, document.getElementById('root'));
