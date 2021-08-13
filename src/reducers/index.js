// the starting point for your redux store
// this defines what your store state will look like
/* eslint-disable */
import { combineReducers } from 'redux';

import PostsReducer from './posts-reducer';
import StartupsReducer from './startups-reducer';
import StudentsReducer from './students-reducer';
import IndustriesReducer from './industries-reducer';
import SkillsReducer from './skills-reducer';
import ClassesReducer from './classes-reducer';
import ApplicationsReducer from './applications-reducer';
import UserReducer from './user-reducer';
// import AuthReducer from './auth-reducer';
import SubmittedApplicationsReducer from './submitted-applications-reducer';
import QuestionsReducer from './questions-reducer';

const appReducer = combineReducers({
  posts: PostsReducer,
  startups: StartupsReducer,
  students: StudentsReducer,
  industries: IndustriesReducer,
  skills: SkillsReducer,
  classes: ClassesReducer,
  applications: ApplicationsReducer,
  questions: QuestionsReducer,
  submittedApplications: SubmittedApplicationsReducer,
  user: UserReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'LOGOUT_USER') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
