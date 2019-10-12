import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import All from './All';
import Favorites from './Favorites';
import Search from './Search';

export default () => (
  <Switch>
    <Route path="/music" component={All} exact />
    <Route path="/music/likes" component={Favorites} />
    <Route path="/music/search" component={Search} />
    <Redirect to="/music" />
  </Switch>
);
