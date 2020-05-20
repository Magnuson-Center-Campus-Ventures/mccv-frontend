import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const JobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_JOBS:
      return { ...state, current: action.payload }; // should this be return { ...state, all: action.payload };
    case ActionTypes.FETCH_JOB:
      return { ...state, current: state.current }; // should this be return { ...state, current: action.payload };
    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default JobsReducer;
