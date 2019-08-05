import axios from 'axios';
import {
  REQUEST_SONGS,
  REQUEST_FAVORITE_SONGS,
  FIND_SONGS,
  RETREIVE_SONGS_SUCCESSED,
  RETRIEVE_SONGS_ERROR,
  CLEAR_SONGS,
} from '../constants/music';

const { REACT_APP_API_URL = '' } = process.env;

const requestSongs = () => ({
  type: REQUEST_SONGS,
});

const requestFavoriteSongs = () => ({
  type: REQUEST_FAVORITE_SONGS,
});

const findSongs = () => ({
  type: FIND_SONGS,
});

const retrieveSongsSuccessed = songs => ({
  type: RETREIVE_SONGS_SUCCESSED, payload: songs,
});

const retrieveSongsError = error => ({
  type: RETRIEVE_SONGS_ERROR, payload: error,
});

const clear = () => ({
  type: CLEAR_SONGS,
});

export const getSongs = (token, skip = 0, limit = 100) => async (dispatch) => {
  dispatch(requestSongs());
  try {
    const { songs } = await axios(`${REACT_APP_API_URL}/api/songs?skip=${skip}&limit=${limit}&scope=3`, {
      method: 'GET',
      headers: {
        accept: 'application/vnd.moosikapp.v1+json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(r => r.data);

    dispatch(retrieveSongsSuccessed(songs));
  } catch (e) {
    dispatch(retrieveSongsError(e.message));
  }
};

export const getFavoriteSongs = (token, skip = 0, limit = 100) => async (dispatch) => {
  dispatch(requestFavoriteSongs());
  try {
    const { songs } = await axios(`${REACT_APP_API_URL}/api/favorites?skip=${skip}&limit=${limit}&scope=2`, {
      method: 'GET',
      headers: {
        accept: 'application/vnd.moosikapp.v1+json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(r => r.data);

    dispatch(retrieveSongsSuccessed(songs));
  } catch (e) {
    dispatch(retrieveSongsError(e.message));
  }
};

export const searchSongs = (token, searchString, skip = 0, limit = 100) => async (dispatch) => {
  dispatch(findSongs());
  try {
    const { songs } = await axios(`${REACT_APP_API_URL}/api/songs/find?query=${searchString}&skip=${skip}&limit=${limit}&scope=3`, {
      method: 'GET',
      headers: {
        accept: 'application/vnd.moosikapp.v1+json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(r => r.data);

    dispatch(retrieveSongsSuccessed(songs));
  } catch (e) {
    dispatch(retrieveSongsError(e.message));
  }
};

export const clearSongs = () => (dispatch) => {
  dispatch(clear());
};
