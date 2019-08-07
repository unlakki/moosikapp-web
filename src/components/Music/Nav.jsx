import React from 'react';
import { Link } from 'react-router-dom';
import routes from './routes';

import styles from './layouts/Nav.module.css';

const Nav = () => (
  <nav className={styles.nav}>
    {routes.map(({ uuid, path, name }) => {
      const active = window.location.pathname === path;
      return (
        <Link
          key={uuid}
          className={`${styles.item}${active ? ` ${styles.active}` : ''}`}
          to={path}
        >
          {name}
        </Link>
      );
    })}
  </nav>
);

export default Nav;
