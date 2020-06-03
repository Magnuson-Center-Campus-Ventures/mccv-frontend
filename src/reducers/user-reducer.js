import { ActionTypes } from '../actions';

const initialState = {
  current: {},
  email: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return {
        ...state,
        current: action.payload,
        email: action.payload.email,
      };
    case ActionTypes.LOGOUT_USER:
      return {
        current: {},
        email: '',
      };
    default:
      return state;
  }
};

export default AuthReducer;
