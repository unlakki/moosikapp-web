export const actions = {
  SET_SONGS: 'SET_SONGS',
  SET_NOW_PLAYING: 'SET_NP',
  SET_PAUSE: 'SET_PAUSE',
};

const action = (type, value) => ({
  type,
  payload: value,
});

export default action;
