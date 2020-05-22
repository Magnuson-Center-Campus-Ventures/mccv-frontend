import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const StudentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_STUDENTS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_STUDENT:
      return { ...state, current: action.payload };
    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default StudentsReducer;
