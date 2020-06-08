/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { fetchUser } from '../actions';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  routeCallback = (e) => {
    if (this.props.authenticated) {
      return (
        <Route {...this.props} />
      );
    } else {
      return (
        <Redirect to="/" />
      );
    }
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

export default withRouter(connect(mapStateToProps, { fetchUser })(PrivateRoute));
