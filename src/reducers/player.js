import {
  SET_SONG,
  SET_NP,
  PLAY,
  PAUSE,
  SET_ERROR,
} from '../constants/player';

const initialState = {
  song: null,
  nowPlaying: '',
  playing: false,
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SONG:
      return { ...state, song: action.payload };
    case SET_NP:
      return { ...state, nowPlaying: action.payload };
    case PLAY:
      return { ...state, playing: true };
    case PAUSE:
      return { ...state, playing: false };
    case SET_ERROR:
      return {
        song: null, nowPlaying: '', playing: false, error: action.payload,
      };
    default:
      return state;
  }
}
