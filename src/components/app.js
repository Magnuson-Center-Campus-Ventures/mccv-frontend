import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Home from './home';
import Postings from './postings';
import Startups from './startups';
import StudentProfile from './student-profile';
import Nav from './nav';

const App = (props) => {
  return (
    <Router>
      <div id="main-div">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/posts/:postID" />
          <Route path="/posts" component={Postings} />
          <Route path="/startups/:startupID" />
          <Route path="/startups" component={Startups} />
          <Route path="/applications" />
          <Route path="/profile" component={StudentProfile} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
