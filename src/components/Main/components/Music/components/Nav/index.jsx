import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './nav.module.css';

const Nav = ({ items }) => (
  <div className={styles.wrapper}>
    {items && items.map(item => (
      <Link
        key={item.title.toLowerCase()}
        className={`${styles.item} ${window.location.pathname === item.path ? styles.active : ''}`}
        to={item.path}
      >
        {item.title}
      </Link>
    ))}
  </div>
);

Nav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,
};

export default Nav;
