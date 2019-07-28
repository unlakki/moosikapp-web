import React from 'react';
import uuidv4 from 'uuid/v4';
import { Link } from 'react-router-dom';

import styles from './layouts/Nav.module.css';

const iterate = items => items.map(({ uuid, path, name }) => {
  const active = window.location.pathname === path;
  return (
    <Link
      key={uuid}
      className={`${styles.item} ${active ? styles.active : ''}`.trim()}
      to={path}
    >
      {name}
    </Link>
  );
});

const Nav = () => (
  <nav className={styles.nav}>
    {iterate(
      [
        {
          uuid: uuidv4(),
          path: '/music',
          name: 'All',
        },
        {
          uuid: uuidv4(),
          path: '/music/favorites',
          name: 'Likes',
        },
        {
          uuid: uuidv4(),
          path: '/music/search',
          name: 'Search',
        },
      ],
    )}
  </nav>
);

export default Nav;
