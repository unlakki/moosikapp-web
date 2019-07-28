import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav';
import routes from './routes';

import styles from './layouts/Music.module.css';

const Music = () => (
  <div className={styles.container}>
    <Nav />
    {routes.map(({
      uuid, path, component, exact,
    }) => (
      <Route key={uuid} path={path} component={component} exact={exact} />
    ))}
  </div>
);

export default Music;
