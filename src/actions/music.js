import axios from 'axios';
import {
  REQUEST_SONGS,
  REQUEST_FAVORITE_SONGS,
  FIND_SONGS,
  RETREIVE_SONGS_SUCCESSED,
  RETRIEVE_SONGS_ERROR,
  CLEAR_SONGS,
  SET_SKIP,
  SET_LIMIT,
} from '../constants/music';

const { REACT_APP_API_URL = '' } = process.env;

const retrieveSongsSuccessed = songs => ({
  type: RETREIVE_SONGS_SUCCESSED, payload: songs,
});

const retrieveSongsError = error => ({
  type: RETRIEVE_SONGS_ERROR, payload: error,
});

export const fetchSongs = (token, skip = 0, limit = 100) => async (dispatch) => {
  dispatch({ type: REQUEST_SONGS });

  try {
    const { songs } = await axios(`${REACT_APP_API_URL}/api/v2/songs?skip=${skip}&limit=${limit}&scope=3`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(response => response.data);

    dispatch(retrieveSongsSuccessed(songs));
  } catch (e) {
    dispatch(retrieveSongsError(e.message));
  }
};

export const fetchFavoriteSongs = (token, skip = 0, limit = 100) => async (dispatch) => {
  dispatch({ type: REQUEST_FAVORITE_SONGS });

  try {
    const { songs } = await axios(`${REACT_APP_API_URL}/api/v2/favorites?skip=${skip}&limit=${limit}&scope=2`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(response => response.data);

    dispatch(retrieveSongsSuccessed(songs));
  } catch (e) {
    dispatch(retrieveSongsError(e.message));
  }
};

export const searchSongs = (token, query, skip = 0, limit = 100) => async (dispatch) => {
  dispatch({ type: FIND_SONGS });

  try {
    const { songs } = await axios(`${REACT_APP_API_URL}/api/v2/songs/find?query=${query}&skip=${skip}&limit=${limit}&scope=3`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(response => response.data);

    dispatch(retrieveSongsSuccessed(songs));
  } catch (e) {
    dispatch(retrieveSongsError(e.message));
  }
};

export const clearSongs = () => (dispatch) => {
  dispatch(({ type: CLEAR_SONGS }));
};

export const setSkip = skip => (dispatch) => {
  dispatch({ type: SET_SKIP, payload: skip });
};

export const setLimit = limit => (dispatch) => {
  dispatch({ type: SET_LIMIT, payload: limit });
};
