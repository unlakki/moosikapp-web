import React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';

import styles from './main.module.css';

const Main = () => (
  <main className={styles.main}>
    {routes.map(route => (
      <Route
        key={route.path.slice(1)}
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ))}
  </main>
);

export default Main;
