import { ActionTypes } from '../actions';

const initialState = {
  current: {},
  email: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      console.log(action.payload);
      return {
        ...state,
        current: action.payload,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default AuthReducer;
