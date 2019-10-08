import {
  SHOW, HIDE,
} from '../constants/sidebar';

export const show = () => ({
  type: SHOW,
});

export const hide = () => ({
  type: HIDE,
});
