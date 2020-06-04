/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { fetchUser } from '../actions';

const StudentRoute = ({ component: Child, ...props }) => {
  return (
    <Route {...props}
      render={(routeProps) => (props.authenticated && props.role === 'student' ? (<Child {...routeProps} />) : (<Redirect to="/signin" />))}
    />
  );
};

const StartupRoute = ({ component: Child, ...props }) => {
  return (
    <Route {...props}
      render={(routeProps) => (props.authenticated && props.role === 'startup' ? (<Child {...routeProps} />) : (<Redirect to="/signin" />))}
    />
  );
};


const AdminRoute = ({ component: Child, ...props }) => {
  return (
    <Route {...props}
      // check if role is admin
      render={(routeProps) => (props.authenticated && props.role === 'admin' ? (<Child {...routeProps} />) : (<Redirect to="/signin" />))}
    />
  );
};

const PrivateRoute = ({ component: Child, ...props }) => {
  return (
    <Route {...props}
      render={(routeProps) => (props.authenticated ? (<Child {...routeProps} />) : (<Redirect to="/signin" />))}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    role: state.user.current.role,
  };
};

export default withRouter(connect(mapStateToProps, { fetchUser })(StudentRoute, StartupRoute, AdminRoute, PrivateRoute));
