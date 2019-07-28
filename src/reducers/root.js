import { combineReducers } from 'redux';
import mobile from './mobile';
import login from './login';

const rootReducer = combineReducers({
  mobile,
  login,
});

export default rootReducer;
