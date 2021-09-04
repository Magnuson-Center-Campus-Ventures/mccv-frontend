/* eslint-disable */
import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload };
    case ActionTypes.CLEAR_POST:
      return { ...state, current: {} };

    case ActionTypes.ERROR_SET:
      return state;
    default:
      return state;
  }
};

export default PostsReducer;
