/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { fetchUser } from '../../actions';

/* const StartupRoute = ({ component: Child, ...props }) => {
  return (
    <Route {...props}
      render={(routeProps) => (props.authenticated && props.role !== 'student' ? (<Child {...routeProps} />) : (<Redirect to="/" />))}
    />
  );
}; */

class StartupRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  routeCallback = (e) => {
    return (
      <Route {...this.props}
        render={(routeProps) => (this.props.authenticated && this.props.role !== 'student' ? (<Route {...routeProps} />) : (<Redirect to="/" />))}
      />
    );
  }

  render() {
    this.props.fetchUser(localStorage.getItem('userID'));
    return (
      this.routeCallback()
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.user.authenticated,
    role: reduxState.user.current.role,
  };
}

export default withRouter(connect(mapStateToProps, { fetchUser })(StartupRoute));
