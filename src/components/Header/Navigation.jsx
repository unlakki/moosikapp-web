import React from 'react';
import Link from './Link';
import { navigation, item } from './styles/Navigation.m.scss';

export default () => (
  <div className={navigation}>
    <Link className={item} to="/music">Music</Link>
    <Link className={item} to="/upload">Upload</Link>
  </div>
);
