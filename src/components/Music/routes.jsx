import React from 'react';
import uuidv4 from 'uuid/v4';
import All from './pages/All';
import Likes from './pages/Likes';
import Find from './pages/Find';

const routes = [
  {
    uuid: uuidv4(),
    name: 'All',
    path: '/music',
    component: () => <All />,
    exact: true,
  },
  {
    uuid: uuidv4(),
    name: 'Likes',
    path: '/music/favorites',
    component: () => <Likes />,
  },
  {
    uuid: uuidv4(),
    name: 'Find',
    path: '/music/search',
    component: () => <Find />,
  },
];

export default routes;
