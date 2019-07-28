import { SET_TOKEN } from '../constants/login';

export const login = token => ({
  type: SET_TOKEN, payload: token,
});

export const logout = () => ({
  type: SET_TOKEN, payload: '',
});
