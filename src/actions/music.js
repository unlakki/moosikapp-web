import {
  REQUEST_ALL, REQUEST_FAVORITES, SEARCH_SONGS, CLEAR_SONGS, SUCCEEDED, ERROR, SKIP, LIMIT,
} from '../constants/music';
import { getSongs, getFavoriteSongs, findSongs } from '../utils/requests';

const retrieveSucceeded = songs => ({
  type: SUCCEEDED, payload: songs,
});

const retrieveError = error => ({
  type: ERROR, payload: error,
});

export const fetchSongs = (token, skip, limit) => async (dispatch) => {
  dispatch({ type: REQUEST_ALL });

  try {
    const songs = await getSongs(token, skip, limit);

    dispatch(retrieveSucceeded(songs));
  } catch (e) {
    dispatch(retrieveError(e.message));
  }
};

export const fetchFavoriteSongs = (token, skip = 0, limit = 100) => async (dispatch) => {
  dispatch({ type: REQUEST_FAVORITES });

  try {
    const songs = await getFavoriteSongs(token, skip, limit);

    dispatch(retrieveSucceeded(songs));
  } catch (e) {
    dispatch(retrieveError(e.message));
  }
};

export const searchSongs = (token, query, skip = 0, limit = 100) => async (dispatch) => {
  dispatch({ type: SEARCH_SONGS });

  try {
    const songs = await findSongs(token, skip, limit);

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
