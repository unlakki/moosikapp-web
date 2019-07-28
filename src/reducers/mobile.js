import { SHOW_MOBILE_NAV } from '../constants/mobile';

const initialState = {
  visible: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MOBILE_NAV:
      return { ...state, visible: action.payload };
    default:
      return state;
  }
}
