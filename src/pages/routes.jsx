import React from 'react';
import Register from '../components/Forms/Register';
import Login from '../components/Forms/Login';
import Forgot from '../components/Forms/Forgot';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <div>home</div>,
  },
  {
    path: '/register',
    component: () => <Register />,
  },
  {
    path: '/login',
    component: () => <Login />,
  },
  {
    path: '/forgot',
    component: () => <Forgot />,
  },
  {
    path: '/music',
    component: () => <div>music</div>,
  },
  {
    path: '/upload',
    component: () => <div>upload</div>,
  },
];

export default routes;