import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
<<<<<<< HEAD
  // userID: '',
=======
>>>>>>> 733cc4c45ffe26f3dc603d9a7d9b19e4edda8879
  error: undefined,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      console.log('in auth user');
<<<<<<< HEAD
      console.log(action.payload);
=======
>>>>>>> 733cc4c45ffe26f3dc603d9a7d9b19e4edda8879
      return { ...state, authenticated: true };
    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false };
    case ActionTypes.AUTH_ERROR:
      return { ...state, authenticated: false, error: action.message };
    default:
      return state;
  }
};

export default AuthReducer;
