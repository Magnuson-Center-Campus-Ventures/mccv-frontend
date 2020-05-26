// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import PostsReducer from './posts-reducer';
import StartupsReducer from './startups-reducer';
import StudentsReducer from './students-reducer';
import IndustriesReducer from './industries-reducer';
import SkillsReducer from './skills-reducer';
import ClassesReducer from './classes-reducer';
import ApplicationReducer from './application-reducer';
import UserReducer from './user-reducer';
import AuthReducer from './auth-reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  startups: StartupsReducer,
  students: StudentsReducer,
  industries: IndustriesReducer,
  skills: SkillsReducer,
  classes: ClassesReducer,
  application: ApplicationReducer,
  user: UserReducer,
  auth: AuthReducer,
});

export default rootReducer;
