import React from 'react';
import uuidv4 from 'uuid/v4';
import Main from '../Main';
import Login from '../Login';
import Register from '../Register';
import Forgot from '../Forgot';
import Music from '../Music';
import Upload from '../Upload';

const routes = [
  {
    uuid: uuidv4(),
    path: '/',
    component: () => <Main />,
    exact: true,
  },
  {
    uuid: uuidv4(),
    path: '/login',
    component: () => <Login />,
  },
  {
    uuid: uuidv4(),
    path: '/register',
    component: () => <Register />,
  },
  {
    uuid: uuidv4(),
    path: '/forgot',
    component: () => <Forgot />,
  },
  {
    uuid: uuidv4(),
    path: '/music',
    component: () => <Music />,
  },
  {
    uuid: uuidv4(),
    path: '/upload',
    component: () => <Upload />,
  },
];

export default routes;
