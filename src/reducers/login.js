import {
  LOGIN, SUCCEEDED, ERROR, LOGOUT,
} from '../constants/login';

const initialState = {
  loading: false,
  token: window.localStorage.getItem('token') || '',
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true };
    case SUCCEEDED:
      return { ...state, loading: false, token: action.payload };
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, loading: false, token: '' };
    default:
      return state;
  }
};
