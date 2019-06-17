import { combineReducers } from 'redux';
import login from './login';
import player from './player';
import error from './error';

const rootReducer = combineReducers({
  login, player, error,
});

export default rootReducer;
