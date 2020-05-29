import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Home from './home';
import Postings from './postings';
import Startups from './startups';
import StartupProfile from './startup-profile';
import StudentProfile from './student-profile';
import Post from './post';
import Nav from './nav';
import Signin from './signin';
import Signup from './signup';
import StudentsFAQ from './students-faq';
import StartupsFAQ from './startups-faq';
import StartupsLanding from './startups-landing';
import SubmittedApplications from './submitted-applications';
import StudentSignUpBio from './studentSignUp/student-signup-bio';
import StudentSignUpTiming from './studentSignUp/student-signup-timing';
import StudentSignUpWorkExperiences from './studentSignUp/student-signup-work-experiences';
import StudentSignUpOtherExperiences from './studentSignUp/student-signup-other-experiences';

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
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
