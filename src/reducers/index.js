// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import JobsReducer from './jobs-reducer';
import StartupsReducer from './startups-reducer';
import StudentsReducer from './students-reducer';

const rootReducer = combineReducers({
  jobs: JobsReducer,
  startups: StartupsReducer,
  students: StudentsReducer,
});

export default rootReducer;
