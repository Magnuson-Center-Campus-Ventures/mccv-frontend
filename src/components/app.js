import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import StudentsLanding from './student-components/students-landing';
import Postings from './student-components/postings';
import Startups from './student-components/startups';
import StartupProfile from './student-components/startup-profile';
import StudentProfile from './student-components/student-profile';
import Students from './startup-components/students';
import Post from './student-components/post';
import Nav from './nav';
import Signin from './signin';
import Signup from './signup';
import StudentsFAQ from './student-components/students-faq';
import StartupsFAQ from './startup-components/startups-faq';
import StartupsLanding from './startup-components/startups-landing';
import SubmittedApplications from './student-components/submitted-applications';
import SubmittedApplication from './student-components/submitted-application';
import StudentSignUpBio from './student-components/student-sign-up/student-signup-bio';
import StudentSignUpTiming from './student-components/student-sign-up/student-signup-timing';
import StudentSignUpWorkExperiences from './student-components/student-sign-up/student-signup-work-experiences';
import StudentSignUpOtherExperiences from './student-components/student-sign-up/student-signup-other-experiences';
import StudentSignUpMajorMinor from './student-components/student-sign-up/student-signup-major-minor';
import StudentSignUpIndustries from './student-components/student-sign-up/student-signup-industries';
import StudentSignUpSkills from './student-components/student-sign-up/student-signup-skills';
import StudentSignUpClasses from './student-components/student-sign-up/student-signup-classes';
import StudentSignUp from './student-components/student-sign-up/student-signup';
import StartupSignUpBio from './startup-components/startup-sign-up/startup-signup-bio';
import StartupSignUpDesc from './startup-components/startup-sign-up/startup-signup-desc';
import StartupSignUpVideo from './startup-components/startup-sign-up/startup-signup-video';
import StartupSignUpIndustries from './startup-components/startup-sign-up/startup-signup-industries';

const App = (props) => {
  return (
    <Router>
      <div id="main-div">
        <Nav />
        <Switch>
          <Route exact path="/" component={StudentsLanding} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/posts" component={Postings} />
          <Route path="/startups/:startupID" component={StartupProfile} />
          <Route path="/startups" component={Startups} />
          <Route path="/students" component={Students} />
          <Route path="/applications/:applicationID" component={SubmittedApplication} />
          <Route path="/applications" component={SubmittedApplications} />
          <Route path="/profile" component={StudentProfile} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/studentsfaq" component={StudentsFAQ} />
          <Route path="/startupsfaq" component={StartupsFAQ} />
          <Route path="/startupslanding" component={StartupsLanding} />
          <Route path="/student-signup-bio" component={StudentSignUpBio} />
          <Route path="/student-signup-timing" component={StudentSignUpTiming} />
          <Route path="/student-signup-workexperiences" component={StudentSignUpWorkExperiences} />
          <Route path="/student-signup-otherexperiences" component={StudentSignUpOtherExperiences} />
          <Route path="/student-signup-majorminor" component={StudentSignUpMajorMinor} />
          <Route path="/student-signup-industries" component={StudentSignUpIndustries} />
          <Route path="/student-signup-classes" component={StudentSignUpClasses} />
          <Route path="/student-signup-skills" component={StudentSignUpSkills} />
          <Route path="/student-signup" component={StudentSignUp} />
          <Route path="/startup-signup-bio" component={StartupSignUpBio} />
          <Route path="/startup-signup-desc" component={StartupSignUpDesc} />
          <Route path="/startup-signup-industries" component={StartupSignUpIndustries} />
          <Route path="/startup-signup-video" component={StartupSignUpVideo} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
