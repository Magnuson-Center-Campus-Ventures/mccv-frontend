import { ActionTypes } from '../actions';

const initialState = {
  current: {},
  email: '',
  userID: '',
  authenticated: false,
  error: '',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return {
        ...state,
        current: action.payload,
        email: action.payload.email,
        userID: action.payload.id,
        authenticated: true,
        error: '',
      };
    /* case ActionTypes.LOGOUT_USER:
      return {
        ...state,
        current: {},
        email: '',
        userID: '',
        authenticated: false,
        error: '',
      }; */
    case ActionTypes.AUTH_ERROR:
      return {
        ...state,
        authenticated: false,
        error: action.message,
      };
    default:
      return state;
  }
};

export default UserReducer;
