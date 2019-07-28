import React from 'react';
import uuidv4 from 'uuid/v4';
import All from './pages/All';
import Likes from './pages/Likes';
import Find from './pages/Find';

const routes = [
  {
    uuid: uuidv4(),
    path: '/music',
    component: () => <All />,
    exact: true,
  },
  {
    uuid: uuidv4(),
    path: '/music/favorites',
    component: () => <Likes />,
  },
  {
    uuid: uuidv4(),
    path: '/music/search',
    component: () => <Find />,
  },
];

export default routes;
