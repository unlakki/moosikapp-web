import {
  LOGIN, LOGIN_SUCCESEDED, LOGIN_ERROR, LOGOUT,
} from '../constants/login';

const initialState = {
  loading: false,
  token: window.localStorage.getItem('token') || '',
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESEDED:
      return { ...state, loading: false, token: action.payload };
    case LOGIN_ERROR:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, token: '' };
    default:
      return state;
  }
}
