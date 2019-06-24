import React from 'react';
import All from './components/All';
import Fav from './components/Favorites';
import Find from './components/Find';

const routes = [
  {
    path: '/music',
    component: () => <All />,
    exact: true,
  },
  {
    path: '/music/favorites',
    component: () => <Fav />,
  },
  {
    path: '/music/find',
    component: () => <Find />,
  },
];

export default routes;
