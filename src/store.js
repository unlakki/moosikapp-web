import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const isProd = process.env.NODE_ENV === 'production';

export default () => {
  if (isProd) {
    return createStore(reducer, applyMiddleware(thunk));
  }

  return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
};
