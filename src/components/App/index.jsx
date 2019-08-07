import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Header';
import Player from '../Player';
import routes from './routes';

import styles from './layouts/App.module.css';

import webp from './images/bg.webp';
import jpg from './images/bg.jpg';

const App = ({ token }) => (
  <div className={styles.app}>
    <div className={styles.backgroundWrapper}>
      <picture>
        <source srcSet={webp} type="image/webp" />
        <img className={styles.background} alt="background" src={jpg} />
      </picture>
    </div>
    <div className={styles.container}>
      <Header />
      <section className={styles.content} style={{ marginBottom: !token ? '0' : '' }}>
        {routes.map(route => <Route key={route.uuid} {...route} />)}
      </section>
      {token && <Player />}
    </div>
  </div>
);

App.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(App);
