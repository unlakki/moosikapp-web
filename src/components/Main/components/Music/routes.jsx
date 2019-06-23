import React from 'react';

import All from './components/All';
import Fav from './components/Favorites';

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
];

export default routes;
