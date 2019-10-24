import React from 'react';
import Register from '../components/Forms/Register';
import Login from '../components/Forms/Login';
import Forgot from '../components/Forms/Forgot';
import Music from '../components/Music';
import Upload from '../components/Upload';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <div />,
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
    component: () => <Music />,
  },
  {
    path: '/upload',
    component: () => <Upload />,
  },
];

export default routes;
