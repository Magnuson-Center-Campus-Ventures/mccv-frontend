/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { fetchUser } from '../../actions';

/* const StudentRoute = ({ component: Child, ...props }) => {
  return (
    <Route {...props}
      render={(routeProps) => (props.authenticated && props.role !== 'startup' ? (<Child {...routeProps} />) : (<Redirect to="/startupslanding" />))}
    />
  );
}; */

class StudentRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  routeCallback = (e) => {
    return (
      <Route {...this.props}
        render={(routeProps) => (this.props.authenticated && (this.props.role === 'student' || this.props.role === 'admin') ? (<Route {...routeProps} />) : (<Redirect to="/startupslanding" />))}
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

export default withRouter(connect(mapStateToProps, { fetchUser })(StudentRoute));
