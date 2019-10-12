import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import css from './css/Subnav.module.css';

const routes = [
  {
    to: '/music',
    title: 'All',
  },
  {
    to: '/music/likes',
    title: 'Likes',
  },
  {
    to: '/music/search',
    title: 'Search',
  },
];

export default () => (
  <div className={css.subnav}>
    {routes.map(route => (
      <Link
        to={route.to}
        className={classnames(css.link, {
          [css.active]: window.location.pathname === route.to,
        })}
      >
        {route.title}
      </Link>
    ))}
  </div>
);
