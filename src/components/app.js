import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Home from './home';
import Postings from './student-components/postings';
import Startups from './student-components/startups';
import StartupProfile from './student-components/startup-profile';
import StudentProfile from './student-components/student-profile';
import Post from './student-components/post';
import Students from './startup-components/students';
import Nav from './nav';
import Signin from './signin';
import Signup from './signup';
import SubmittedApplications from './student-components/submitted-applications';
import StudentSignUpBio from './student-components/studentSignUp/student-signup-bio';
import StudentSignUpTiming from './student-components/studentSignUp/student-signup-timing';
import StudentSignUpWorkExperiences from './student-components/studentSignUp/student-signup-work-experiences';
import StudentSignUpOtherExperiences from './student-components/studentSignUp/student-signup-other-experiences';
import StudentSignUpMajorMinor from './student-components/studentSignUp/student-signup-major-minor';
import StudentSignUpIndustries from './student-components/studentSignUp/student-signup-industries';
import StudentSignUpSkills from './student-components/studentSignUp/student-signup-skills';
import StudentSignUpClasses from './student-components/studentSignUp/student-signup-classes';

const App = (props) => {
  return (
    <Router>
      <div id="main-div">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/posts" component={Postings} />
          <Route path="/startups/:startupID" component={StartupProfile} />
          <Route path="/startups" component={Startups} />
          <Route path="/students" component={Students} />
          <Route path="/applications" component={SubmittedApplications} />
          <Route path="/profile" component={StudentProfile} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/student-signup-bio" component={StudentSignUpBio} />
          <Route path="/student-signup-timing" component={StudentSignUpTiming} />
          <Route path="/student-signup-workexperiences" component={StudentSignUpWorkExperiences} />
          <Route path="/student-signup-otherexperiences" component={StudentSignUpOtherExperiences} />
          <Route path="/student-signup-majorminor" component={StudentSignUpMajorMinor} />
          <Route path="/student-signup-industries" component={StudentSignUpIndustries} />
          <Route path="/student-signup-classes" component={StudentSignUpClasses} />
          <Route path="/student-signup-skills" component={StudentSignUpSkills} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
