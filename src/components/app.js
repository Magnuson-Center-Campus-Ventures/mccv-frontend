import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import StudentsLanding from './student-components/students-landing';
import Postings from './student-components/postings';
import Startups from './student-components/startups';
import StartupProfile from './student-components/startup-profile';
import StudentProfile from './student-components/student-profile';
import StudentProfileStartup from './startup-components/student-profile-startups';
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
import StudentSignUp from './student-components/student-sign-up/student-signup';
import StartupProfileStartups from './startup-components/startup-profile-startups';
import StartupSignUpBio from './startup-components/startup-sign-up/startup-signup-bio';
import StartupSignUpDesc from './startup-components/startup-sign-up/startup-signup-desc';
import StartupSignUpVideo from './startup-components/startup-sign-up/startup-signup-video';
import StartupSignUpIndustries from './startup-components/startup-sign-up/startup-signup-industries';
import StartupSignUp from './startup-components/startup-sign-up/startup-signup';
import PrivateRoute from './private-route';
import StudentRoute from './student-components/student-route';
import StartupRoute from './startup-components/startup-route';
// import AdminRoute from './admin-components/admin-route';
import ApplicationListItem from './startup-components/application-list-item';
import StartupSubmittedApplications from './startup-components/startup-submitted-applications';

const App = (props) => {
  return (
    <Router>
      <div id="main-div">
        <Nav />
        <Switch>
          <Route exact path="/" component={StudentsLanding} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/studentsfaq" component={StudentsFAQ} />
          <Route path="/startupsfaq" component={StartupsFAQ} />
          <Route render={() => (<div>post not found </div>)} />
          <PrivateRoute path="/posts/:postID" component={Post} />
          <PrivateRoute path="/posts" component={Postings} />
          <PrivateRoute path="/startups/:startupID" component={StartupProfile} />
          <PrivateRoute path="/startups" component={Startups} />
          <PrivateRoute path="/students/:studentID" component={StudentProfileStartup} />
          <PrivateRoute path="/students" component={Students} />
          <PrivateRoute path="/applications/:applicationID" component={SubmittedApplication} />
          <PrivateRoute path="/applications" component={SubmittedApplications} />
          <PrivateRoute path="/profile" component={StudentProfile} />
          <StudentRoute path="/student-signup" component={StudentSignUp} />
          <StartupRoute path="/startupslanding" component={StartupsLanding} />
          <StartupRoute path="/startupprofile" component={StartupProfileStartups} />
          <StartupRoute path="/startup-signup-bio" component={StartupSignUpBio} />
          <StartupRoute path="/startup-signup-desc" component={StartupSignUpDesc} />
          <StartupRoute path="/startup-signup-industries" component={StartupSignUpIndustries} />
          <StartupRoute path="/startup-signup-video" component={StartupSignUpVideo} />
          <StartupRoute path="/startup-signup" component={StartupSignUp} />
          <StartupRoute path="/startupsubmittedapplications/:applicationID" component={ApplicationListItem} />
          <StartupRoute path="/startupsubmittedapplications" component={StartupSubmittedApplications} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
