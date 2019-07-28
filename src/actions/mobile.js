import { SHOW_MOBILE_NAV } from '../constants/mobile';

export const show = () => ({
  type: SHOW_MOBILE_NAV, payload: true,
});

export const hide = () => ({
  type: SHOW_MOBILE_NAV, payload: false,
});
