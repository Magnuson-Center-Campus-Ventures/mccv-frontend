import { ActionTypes } from '../actions';

const initialState = {
  email: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return { ...state, email: action.payload.email };
    default:
      return state;
  }
};

export default AuthReducer;
