import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.css';

import logo from './logo.svg';

const Header = () => (
  <header className={styles.box}>
    <div className={styles.container}>
      <div className={styles.left}>
        <Link className={styles.logo} to="/">
          <svg>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${logo}#logo`} />
          </svg>
        </Link>
        <nav className={styles.nav}>
          <Link className={styles.link} to="/music">Music</Link>
          <Link className={styles.link} to="/upload">Upload</Link>
        </nav>
      </div>
      <Link className={styles.link} to="/login">Login</Link>
    </div>
  </header>
);

export default Header;
