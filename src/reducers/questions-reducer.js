/* eslint-disable */
import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const QuestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_QUESTIONS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_QUESTION:
      return { ...state, current: action.payload };
    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default QuestionsReducer;
