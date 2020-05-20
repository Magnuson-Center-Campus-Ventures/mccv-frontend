// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import JobsReducer from './jobs-reducer';
import StartupsReducer from './startups-reducer';

const rootReducer = combineReducers({
  jobs: JobsReducer,
  startups: StartupsReducer,
});

export default rootReducer;
