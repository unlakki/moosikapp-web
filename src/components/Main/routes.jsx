import React from 'react';
import Status from './components/Status';
import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/Forgot';
import Music from './components/Music';

const routes = [
  {
    path: '/',
    component: () => <Status />,
    exact: true,
  },
  {
    path: '/music',
    component: () => <Music />,
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
    component: () => <Forgot />,
  },
];

export default routes;
