import { combineReducers } from 'redux';
import sidebar from './sidebar';
import login from './login';
import music from './music';
import player from './player';

const rootReducer = combineReducers({
  sidebar,
  login,
  music,
  player,
});

export default rootReducer;
