import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './components/Nav';

import routes from './routes';

import styles from './music.module.css';

const navItems = [
  {
    title: 'All',
    path: '/music',
  },
  {
    title: 'Search',
    path: '/music/find',
  },
  {
    title: 'Likes',
    path: '/music/favorites',
  },
];

const Music = () => (
  <section className={styles.wrapper}>
    <Nav items={navItems} />
    <div className={styles.container}>
      {routes.map(route => (
        <Route
          key={route.path.slice(1)}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      ))}
    </div>
  </section>
);

export default Music;
