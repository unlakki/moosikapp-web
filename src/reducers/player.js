const initialState = {
  songs: [],
  nowPlaying: -1,
  paused: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_SONGS':
      return { ...state, songs: action.payload };
    case 'SET_NP':
      return { ...state, nowPlaying: action.payload };
    case 'SET_PAUSE':
      return { ...state, paused: action.payload };
    default:
      return state;
  }
}
