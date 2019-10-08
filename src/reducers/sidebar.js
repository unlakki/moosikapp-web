import { SHOW, HIDE } from '../constants/sidebar';

const initialState = {
  hidden: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW:
      return { hidden: false };
    case HIDE:
      return { hidden: true };
    default:
      return state;
  }
};
