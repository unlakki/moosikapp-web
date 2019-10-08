import {
  LOGIN, SUCCEEDED, ERROR, LOGOUT,
} from '../constants/login';
import { authorize } from '../utils/requests';

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN });

  try {
    const token = await authorize(username, password);

    window.localStorage.setItem('token', token);

    dispatch({ type: SUCCEEDED, payload: token });
  } catch (e) {
    dispatch({ type: ERROR, payload: e.message });
  }
};

export const logout = () => ({
  type: LOGOUT,
});
