import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import Main from '../Main';
import Player from '../Player';

import styles from './app.module.css';

import bg from './bg.jpg';

const App = ({ token }) => (
  <div className={styles.app}>
    <div className={styles.background} style={{ backgroundImage: `url(${bg})` }} />
    <main className={styles.container}>
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
      {token && <Player />}
    </main>
  </div>
);

App.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(App);
