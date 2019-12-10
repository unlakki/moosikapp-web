import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages';
import createStore from './store';
import * as serviceWorker from './serviceWorker';

import './layouts/default.css';

ReactDOM.render(
  <Provider store={createStore()}>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app-mount'),
);

serviceWorker.register();
