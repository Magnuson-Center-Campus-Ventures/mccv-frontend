import { ActionTypes } from '../actions';

const StartupsReducer = (state = {
  all: [],
  current: {},
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_STARTUP:
      return { all: state.all, current: action.payload };
    case ActionTypes.FETCH_STARTUPS:
      return { all: action.payload, current: state.current };
    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default StartupsReducer;
