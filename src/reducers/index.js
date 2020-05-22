// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import PostsReducer from './posts-reducer';
import StartupsReducer from './startups-reducer';
import StudentsReducer from './students-reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  startups: StartupsReducer,
  students: StudentsReducer,
});

export default rootReducer;
