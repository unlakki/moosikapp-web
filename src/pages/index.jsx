import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '../components/Layout';

import routes from './routes';

export default () => (
  <Layout>
    <Switch>
      {routes.map(route => <Route key={route.path} {...route} />)}
      <Redirect to="/" />
    </Switch>
  </Layout>
);
