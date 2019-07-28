import axios from 'axios';
import {
  LOGIN, LOGIN_SUCCESEDED, LOGIN_ERROR, LOGOUT,
} from '../constants/login';

const { REACT_APP_API_URL = '' } = process.env;

const loggingIn = () => ({
  type: LOGIN,
});

const loginSuccesed = token => ({
  type: LOGIN_SUCCESEDED, payload: token,
});

const loginError = error => ({
  type: LOGIN_ERROR, payload: error,
});

export const login = (username, password) => async (dispatch) => {
  dispatch(loggingIn());
  try {
    const { token } = await axios(`${REACT_APP_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        accept: 'application/vnd.moosikapp.v1+json',
        'content-type': 'application/json',
      },
      data: JSON.stringify({ username, password }),
    }).then(r => r.data);

    dispatch(loginSuccesed(token));

    window.localStorage.setItem('token', token);
  } catch (e) {
    dispatch(loginError(e.message));
  }
};

export const logout = () => ({
  type: LOGOUT,
});
