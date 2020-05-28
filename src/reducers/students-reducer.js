import { ActionTypes } from '../actions';

const initialState = {
  all_students: [],
  current_student: {},
  current_work_exps: [],
  studentID: '',
};

const StudentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_STUDENT:
      // return { ...state, current: action.payload, studentID: action.id };
      // return { ...state, current: action.payload, studentID: action.payload.id };
      return { ...state, current: action.payload };
    case ActionTypes.FETCH_STUDENTS:
      return { ...state, all_students: action.payload };
    case ActionTypes.FETCH_STUDENT:
      return { ...state, current_student: action.payload };
    case ActionTypes.FETCH_WORK_EXPS:
      return { ...state, current_work_exps: action.payload };
    case ActionTypes.ADD_WORK_EXP:
      return {
        ...state,
        // Add the created work experience object to the current work experiences in redux state
        current_work_exps: [...state.current_work_exps, action.payload],
        // Add the id of the created work experience to the current student object
        current_student: { ...state.current_student, work_exp: [...state.current_student.work_exp, action.payload._id] },
      };
    case ActionTypes.UPDATE_WORK_EXP:
      // Talked with a TA and we're not really sure why just returning the state works, but it does
      // If we have any issues with updating a work experience in the future, should come back to this
      return state;
    case ActionTypes.DELETE_WORK_EXP: {
      // Remove the deleted work experience from current work experieces,
      // And remove its ID from the work experience IDs of the current student
      const tempWorkExps = state.current_work_exps.filter((workExp) => {
        return workExp._id !== action.payload._id;
      });
      const tempWorkExpIDs = state.current_student.work_exp.filter((id) => {
        return id !== action.payload._id;
      });
      return {
        ...state,
        current_work_exps: tempWorkExps,
        current_student: { ...state.current_student, work_exp: tempWorkExpIDs },
      };
    }
    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default StudentsReducer;
