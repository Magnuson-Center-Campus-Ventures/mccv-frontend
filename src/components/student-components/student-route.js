/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { fetchUser } from '../../actions';

class StudentRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user === {} || prevProps.user !== this.props.user) {
      console.log('private didUpdate');
      this.props.fetchUser(localStorage.getItem('userID'));
    }
  }

  routeCallback = (e) => {
    if (this.props.authenticated && (this.props.role === 'student' || this.props.role === 'admin')) {
      return (
        <Route {...this.props} />
      );
    } else {
      return (
        <Redirect to="/startupslanding" />
      );
    }
  }

  render() {
    // this.props.fetchUser(localStorage.getItem('userID'));
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

export default withRouter(connect(mapStateToProps, { fetchUser })(StudentRoute));
