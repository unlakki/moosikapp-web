import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';

import './layouts/default.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Sidebar />
      <App />
      <Modal />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// document.body.hidden = true;
// document.body.onload = () => {
//   document.body.hidden = false;
// };

serviceWorker.unregister();
