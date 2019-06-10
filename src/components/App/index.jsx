import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import Main from '../Main';

import styles from './app.module.css';

import bg from './bg.jpg';

const App = () => (
  <div className={styles.app}>
    <div className={styles.background} style={{ backgroundImage: `url(${bg})` }} />
    <div className={styles.container}>
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
    </div>
  </div>
);

export default App;
