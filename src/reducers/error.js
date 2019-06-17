const initialState = {
  message: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_ERROR_MESSAGE':
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
