import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

export const Player = (props) => {
    return (
      <div className="App-header">
        <video controls muted autoPlay crossOrigin="anonymous">
          <source src={`http://localhost:4000/video/${props.videoId}`} type="video/mp4"></source>
          <track label="English" kind="captions" srcLang="en" src={`http://localhost:4000/video/${props.videoId}/caption`} default></track>
        </video>
      </div>
    )
}
