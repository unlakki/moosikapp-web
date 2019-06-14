import React from 'react';
import Status from './components/Status';
import Login from './components/Login';
import Register from './components/Register';

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
    component: () => <Login />,
  },
  {
    path: '/register',
    component: () => <Register />,
  },
  {
    path: '/forgot',
    component: () => <div>forgot</div>,
  },
];

export default routes;
