import axios from 'axios';
import {
  SET_SONG, NOW_PLAYING, PLAY, PAUSE, ERROR,
} from '../constants/player';

const { REACT_APP_API_URL = '' } = process.env;

export const setSong = (token, uuid) => async (dispatch) => {
  dispatch({ type: NOW_PLAYING, payload: uuid });

  try {
    const { song } = await axios(`${REACT_APP_API_URL}/songs/${uuid}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(response => response.data);

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
