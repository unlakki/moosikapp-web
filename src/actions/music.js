import axios from 'axios';
import {
  REQUEST_ALL, REQUEST_FAVORITES, SEARCH_SONGS, CLEAR_SONGS, SUCCEEDED, ERROR, SKIP, LIMIT,
} from '../constants/music';

const { REACT_APP_API_URL = '' } = process.env;

const retrieveSucceeded = songs => ({
  type: SUCCEEDED, payload: songs,
});

const retrieveError = error => ({
  type: ERROR, payload: error,
});

export const fetchSongs = (token, skip = 0, limit = 100) => async (dispatch) => {
  dispatch({ type: REQUEST_ALL });

  try {
    const { songs } = await axios(`${REACT_APP_API_URL}/api/v2/songs?skip=${skip}&limit=${limit}&scope=3`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(response => response.data);

    dispatch(retrieveSucceeded(songs));
  } catch (e) {
    dispatch(retrieveError(e.message));
  }
};

export const fetchFavoriteSongs = (token, skip = 0, limit = 100) => async (dispatch) => {
  dispatch({ type: REQUEST_FAVORITES });

  try {
    const { songs } = await axios(`${REACT_APP_API_URL}/api/v2/favorites?skip=${skip}&limit=${limit}&scope=2`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(response => response.data);

    dispatch(retrieveSucceeded(songs));
  } catch (e) {
    dispatch(retrieveError(e.message));
  }
};

export const searchSongs = (token, query, skip = 0, limit = 100) => async (dispatch) => {
  dispatch({ type: SEARCH_SONGS });

  try {
    const { songs } = await axios(`${REACT_APP_API_URL}/api/v2/songs/find?query=${query}&skip=${skip}&limit=${limit}&scope=3`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(response => response.data);

    dispatch(retrieveSucceeded(songs));
  } catch (e) {
    dispatch(retrieveError(e.message));
  }
};

export const clearSongs = () => (dispatch) => {
  dispatch(({ type: CLEAR_SONGS }));
};

export const setSkip = skip => (dispatch) => {
  dispatch({ type: SKIP, payload: skip });
};

export const setLimit = limit => (dispatch) => {
  dispatch({ type: LIMIT, payload: limit });
};
