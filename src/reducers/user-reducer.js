import { ActionTypes } from '../actions';

const initialState = {
  current: {},
  email: '',
  userID: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return {
        ...state,
        current: action.payload,
        email: action.payload.email,
        userID: action.payload._id,
      };
    default:
      return state;
  }
};

export default AuthReducer;
