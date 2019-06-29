import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import Main from '../Main';
import Player from '../Player';
import Modal from '../Modal';

import styles from './app.module.css';

import bg1 from './background.webp';
import bg2 from './background.jpf';

const bg = window.navigator.userAgent.includes('iPhone') ? bg2 : bg1;

const App = ({ token, error }) => (
  <div className={styles.app}>
    <div className={styles.backgroundWrapper}>
      <div className={styles.background} style={{ backgroundImage: `url(${bg})` }} />
    </div>
    <main className={styles.container}>
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
      {token && <Player />}
    </main>
    <div className={styles.modalWrapper}>
      {error && <Modal error={error} />}
    </div>
  </div>
);

App.propTypes = {
  token: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  error: store.error.message,
});

export default connect(mapStateToProps)(App);
