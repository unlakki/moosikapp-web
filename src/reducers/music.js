import {
  REQUEST_SONGS,
  REQUEST_FAVORITE_SONGS,
  FIND_SONGS,
  RETREIVE_SONGS_SUCCESSED,
  RETRIEVE_SONGS_ERROR,
} from '../constants/music';

const initialState = {
  loading: false,
  songs: [],
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_SONGS:
    case REQUEST_FAVORITE_SONGS:
    case FIND_SONGS:
      return { ...state, loading: true };
    case RETREIVE_SONGS_SUCCESSED:
      return { ...state, loading: false, songs: action.payload };
    case RETRIEVE_SONGS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
