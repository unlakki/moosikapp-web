const initialState = {
  param: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_PARAM':
      return { ...state, param: action.payload };
    default:
      return state;
  }
}
