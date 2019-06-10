import React from 'react';
import Status from './components/Status';

const routes = [
  {
    path: '/',
    component: () => <Status />,
    exact: true,
  },
  {
    path: '/music',
    component: () => <div>music</div>,
  },
  {
    path: '/upload',
    component: () => <div>upload</div>,
  },
  {
    path: '/login',
    component: () => <div>login</div>,
  },
  {
    path: '/register',
    component: () => <div>register</div>,
  },
  {
    path: '/forgot',
    component: () => <div>forgot</div>,
  },
];

export default routes;
