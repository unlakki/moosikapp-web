import { combineReducers } from 'redux';
import mobile from './sidebar';
import login from './login';
import music from './music';
import player from './player';

const rootReducer = combineReducers({
  mobile,
  login,
  music,
  player,
});

export default rootReducer;
