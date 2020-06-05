import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const ApplicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_APPLICATIONS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_APPLICATION:
      return { ...state, current: action.payload };
    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default ApplicationsReducer;
