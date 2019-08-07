import {
  SHOW_MOBILE_NAV,
  HIDE_MOBILE_NAV,
} from '../constants/mobile';

export const show = () => ({
  type: SHOW_MOBILE_NAV,
});

export const hide = () => ({
  type: HIDE_MOBILE_NAV,
});
