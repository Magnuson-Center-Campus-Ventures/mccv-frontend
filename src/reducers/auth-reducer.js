import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  userID: '',
  error: undefined,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return {
        ...state,
        authenticated: true,
        userID: action.userID,
        error: undefined,
      };
    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false, userID: '' };
    case ActionTypes.AUTH_ERROR:
      return { ...state, authenticated: false, error: action.message };
    default:
      return state;
  }
};

export default AuthReducer;
