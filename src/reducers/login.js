import { SET_TOKEN } from '../constants/login';

const initialState = {
  token: window.localStorage.getItem('token') || '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
