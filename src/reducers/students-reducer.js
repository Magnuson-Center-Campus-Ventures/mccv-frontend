import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
  current_work_exps: [],
};

const StudentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_STUDENTS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_STUDENT:
      return { ...state, current: action.payload };
    case ActionTypes.FETCH_WORK_EXPS:
      return { ...state, current_work_exps: action.payload };
    case ActionTypes.UPDATE_WORK_EXP:
      // Talked with a TA and we're not really sure why just returning the state works, but it does
      // If we have any issues with updating a work experience in the future, should come back to this
      return state;
    case ActionTypes.DELETE_WORK_EXP: {
      console.log(action.payload._id);
      const tempWorkExps = state.current_work_exps.filter((workExp) => {
        return workExp._id !== action.payload._id;
      });
      return { ...state, current_work_exps: tempWorkExps };
    }
    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default StudentsReducer;
