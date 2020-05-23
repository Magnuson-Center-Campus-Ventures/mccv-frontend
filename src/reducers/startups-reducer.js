import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const StartupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_STARTUPS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_STARTUP:
      return { ...state, current: action.payload };
    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default StartupsReducer;
