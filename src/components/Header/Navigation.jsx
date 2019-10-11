import React from 'react';
import Link from './NavLink';

import css from './css/Navigation.module.css';

export default () => (
  <nav className={css.navigation}>
    <Link className={css.item} to="/music">Music</Link>
    <Link className={css.item} to="/upload">Upload</Link>
  </nav>
);
