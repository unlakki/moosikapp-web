import {
  REQUEST_ALL, REQUEST_FAVORITES, SEARCH_SONGS, SUCCEEDED, ERROR, CLEAR_SONGS, SKIP, LIMIT,
} from '../constants/music';

const initialState = {
  loading: false,
  skip: 0,
  limit: 100,
  songs: [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ALL:
    case REQUEST_FAVORITES:
    case SEARCH_SONGS:
      return { ...state, loading: true, error: null };
    case SUCCEEDED:
      return {
        ...state, loading: false, songs: action.payload, error: null,
      };
    case ERROR:
      return {
        ...state, loading: false, songs: [], error: action.payload,
      };
    case CLEAR_SONGS:
      return {
        ...state, loading: false, songs: [], error: null,
      };
    case SKIP:
      return { ...state, skip: action.payload };
    case LIMIT:
      return { ...state, limit: action.payload };
    default:
      return state;
  }
}
