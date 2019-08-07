import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav';
import routes from './routes';

import styles from './layouts/Music.module.css';

const Music = () => (
  <div className={styles.container}>
    <Nav />
    {routes.map(route => <Route key={route.uuid} {...route} />)}
    {/* <div className={styles.pagination}>
      <button type="button">1</button>
      <button type="button">2</button>
      <button type="button">3</button>
      <button type="button">4</button>
      <button type="button">5</button>
    </div> */}
  </div>
);

export default Music;
