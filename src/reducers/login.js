const initialState = {
  token: window.localStorage.getItem('token') || '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, param: action.payload };
    default:
      return state;
  }
}
