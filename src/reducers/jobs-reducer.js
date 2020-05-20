import { ActionTypes } from '../actions';

const JobsReducer = (state = {
  all: [],
  current: {},
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_JOB:
      return { all: state.all, current: action.payload };
    case ActionTypes.FETCH_JOBS:
      return { all: action.payload, current: state.current };
    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default JobsReducer;
