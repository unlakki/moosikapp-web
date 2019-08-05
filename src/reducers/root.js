import { combineReducers } from 'redux';
import mobile from './mobile';
import login from './login';
import music from './music';

const rootReducer = combineReducers({
  mobile,
  login,
  music,
});

export default rootReducer;
