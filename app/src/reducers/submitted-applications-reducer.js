/* eslint-disable */
import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const SubmittedApplicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SUBMITTED_APPLICATIONS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_SUBMITTED_APPLICATION:
      return { ...state, current: action.payload };
    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default SubmittedApplicationsReducer;
