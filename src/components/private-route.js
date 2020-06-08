/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { fetchUser } from '../actions';

const PrivateRoute = ({ component: Child, ...props }) => {
  props.fetchUser(localStorage.getItem('userID'));
  return (
    <Route {...props}
      render={(routeProps) => (props.authenticated ? (<Child {...routeProps} />) : (<Redirect to="/" />))}
    />
  );
};

const mapStateToProps = (reduxState) => {
  return {
    authenticated: reduxState.user.authenticated,
    role: reduxState.user.current.role,
  };
};

export default withRouter(connect(mapStateToProps, { fetchUser })(PrivateRoute));
