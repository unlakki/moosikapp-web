import axios from 'axios';
import {
  SET_SONG,
  SET_NP,
  PLAY,
  PAUSE,
  SET_ERROR,
} from '../constants/player';

const { REACT_APP_API_URL = '' } = process.env;

export const setSong = (token, uuid) => async (dispatch) => {
  dispatch({ type: SET_NP, payload: uuid });

  try {
    const { song } = await axios(`${REACT_APP_API_URL}/api/songs/${uuid}`, {
      method: 'GET',
      headers: {
        accept: 'application/vnd.moosikapp.v1+json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(r => r.data);

    dispatch({ type: SET_SONG, payload: song });
  } catch (e) {
    dispatch({ type: SET_ERROR, payload: e });
  }
};

export const play = () => (dispatch) => {
  dispatch({ type: PLAY });
};

export const pause = () => (dispatch) => {
  dispatch({ type: PAUSE });
};
