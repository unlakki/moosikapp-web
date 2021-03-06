import {
  SET_SONG, NOW_PLAYING, PLAY, PAUSE, ERROR,
} from '../constants/player';
import { getSongById } from '../utils/requests';

export const setSong = (token, uuid) => async (dispatch) => {
  dispatch({ type: NOW_PLAYING, payload: uuid });

  try {
    const song = await getSongById(token, uuid);

    dispatch({ type: SET_SONG, payload: song });
  } catch (e) {
    dispatch({ type: ERROR, payload: e.message });
  }
};

export const play = () => (dispatch) => {
  dispatch({ type: PLAY });
};

export const pause = () => (dispatch) => {
  dispatch({ type: PAUSE });
};
