import { SHOW, HIDE } from '../constants/sidebar';

const initialState = {
  visible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW:
      return { visible: true };
    case HIDE:
      return { visible: false };
    default:
      return state;
  }
};
