import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: [],
};

const ClassesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_CLASSES:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_SOME_CLASSES:
      return { ...state, current: action.payload };
    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default ClassesReducer;
