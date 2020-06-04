/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { fetchUser } from '../../actions';

const StartupRoute = ({ component: Child, ...props }) => {
  return (
    <Route {...props}
      render={(routeProps) => (props.authenticated && props.role === 'startup' ? (<Child {...routeProps} />) : (<Redirect to="/startuplanding" />))}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    role: state.user.current.role,
  };
};

export default withRouter(connect(mapStateToProps, { fetchUser })(StartupRoute));
