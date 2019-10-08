import axios from 'axios';
import {
  LOGIN, SUCCEEDED, ERROR, LOGOUT,
} from '../constants/login';

const { REACT_APP_API_URL = '' } = process.env;

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN });

  try {
    const { token } = await axios(`${REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      data: JSON.stringify({ username, password }),
    }).then(response => response.data);

    window.localStorage.setItem('token', token);

    dispatch({ type: SUCCEEDED, payload: token });
  } catch (e) {
    dispatch({ type: ERROR, payload: e.message });
  }
};

export const logout = () => ({
  type: LOGOUT,
});
