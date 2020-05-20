import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Home from './home';
import JobPostings from './job-postings';
import Startups from './startups';
import Nav from './nav';

const App = (props) => {
  return (
    <Router>
      <div id="main-div">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/jobposts" component={JobPostings} />
          <Route path="/startups" component={Startups} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
