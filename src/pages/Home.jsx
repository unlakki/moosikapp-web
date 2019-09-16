import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BackgroundPicture from '../components/BackgroundPicture';
import Header from '../components/Header';
import Player from '../components/Player';
import layout from '../layouts/page.m.css';

export default () => (
  <div className={layout.wrapper}>
    <BackgroundPicture />
    <div className={layout.container}>
      <Router>
        <div className={layout.content}>
          <Header />
          <main>
            <h1>Main</h1>
          </main>
        </div>
      </Router>
    </div>
    <Player />
  </div>
);
