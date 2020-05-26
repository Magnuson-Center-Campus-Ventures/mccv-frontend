import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: [],
};

const IndustriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_INDUSTRIES:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_SOME_INDUSTRIES:
      return { ...state, current: action.payload };
    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default IndustriesReducer;
