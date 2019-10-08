import {
  SET_SONG, NOW_PLAYING, PLAY, PAUSE, ERROR,
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
    case NOW_PLAYING:
      return { ...state, nowPlaying: action.payload };
    case PLAY:
      return { ...state, playing: true };
    case PAUSE:
      return { ...state, playing: false };
    case ERROR:
      return {
        song: null, nowPlaying: '', playing: false, error: action.payload,
      };
    default:
      return state;
  }
}
