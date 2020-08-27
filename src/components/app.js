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
import Footer from './footer';
import Signin from './signin';
import Signup from './signup';
import ForgotPassword from './forgot-password';
import ResetPassword from './reset-password';
import Credits from './credits';
import StudentsFAQ from './student-components/students-faq';
import StartupsFAQ from './startup-components/startups-faq';
import StartupsLanding from './startup-components/startups-landing';
import SubmittedApplications from './student-components/submitted-applications';
import StartupApplicationListItem from './startup-components/startup-application-list-item';
import StudentSignUp from './student-components/student-sign-up/student-signup';
import StartupProfileStartups from './startup-components/startup-profile-startups';
import StartupSignUp from './startup-components/startup-sign-up/startup-signup';
import PrivateRoute from './private-route';
import StudentRoute from './student-components/student-route';
import StartupRoute from './startup-components/startup-route';
import ApplicationListItem from './student-components/application-list-item';
import AddPost from './startup-components/startup-add-post/add-post';
import AddPostTitleLocation from './startup-components/startup-add-post/add-post-title-location';
import AddPostTiming from './startup-components/startup-add-post/add-post-timing';
import AddPostRequiredSkills from './startup-components/startup-add-post/add-post-req-skills';
import AddPostPreferredSkills from './startup-components/startup-add-post/add-post-pref-skills';
import AddPostIndustries from './startup-components/startup-add-post/add-post-industries';
import AddPostDesiredClasses from './startup-components/startup-add-post/add-post-desired-classes';
import AddPostDescription from './startup-components/startup-add-post/add-post-description';
import StartupSubmittedApplications from './startup-components/startup-submitted-applications';

const App = (props) => {
  return (
    <Router>
      <div id="main-div">
        <Nav />
        <Switch>
          {/* Open routes */}
          <Route exact path="/" component={StudentsLanding} />
          <Route path="/startupslanding" component={StartupsLanding} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/resetpassword" component={ResetPassword} />
          <Route path="/credits" component={Credits} />
          <Route path="/studentsfaq" component={StudentsFAQ} />
          <Route path="/startupsfaq" component={StartupsFAQ} />
          {/* Private route */}
          <PrivateRoute path="/posts/:postID" component={Post} />
          <PrivateRoute path="/posts" component={Postings} />
          {/* Student routes */}
          <StudentRoute path="/student-signup" component={StudentSignUp} />
          <StudentRoute path="/startups/:startupID" component={StartupProfile} />
          <StudentRoute path="/startups" component={Startups} />
          <StudentRoute path="/applications/:applicationID" component={ApplicationListItem} />
          <StudentRoute path="/applications" component={SubmittedApplications} />
          <StudentRoute path="/profile" component={StudentProfile} />
          {/* Startup routes */}
          <StartupRoute path="/students/:studentID" component={StudentProfileStartup} />
          <StartupRoute path="/students" component={Students} />
          <StartupRoute path="/startupsubmittedapplications/:applicationID" component={StartupApplicationListItem} />
          <StartupRoute path="/startupsubmittedapplications" component={StartupSubmittedApplications} />
          <StartupRoute path="/startupprofile" component={StartupProfileStartups} />
          <StartupRoute path="/startup-signup" component={StartupSignUp} />
          <StartupRoute path="/add-post" component={AddPost} />
          <StartupRoute path="/add-post-title-location" component={AddPostTitleLocation} />
          <StartupRoute path="/add-post-timing" component={AddPostTiming} />
          <StartupRoute path="/add-post-req-skills" component={AddPostRequiredSkills} />
          <StartupRoute path="/add-post-pref-skills" component={AddPostPreferredSkills} />
          <StartupRoute path="/add-post-industries" component={AddPostIndustries} />
          <StartupRoute path="/add-post-desired-classes" component={AddPostDesiredClasses} />
          <StartupRoute path="/add-post-description" component={AddPostDescription} />
          {/* error route */}
          <Route render={() => (<div>page not found </div>)} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
