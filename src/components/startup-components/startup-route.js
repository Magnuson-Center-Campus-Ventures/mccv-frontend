/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';
// import { fetchUser } from '../../actions';

class StartupRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /*
  componentDidUpdate(prevProps) {
    if (this.props.user === {} || prevProps.user !== this.props.user) {
      console.log('startup didUpdate');
      this.props.fetchUser(localStorage.getItem('userID'));
    }
  }
  */

  routeCallback = (e) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    // if (this.props.authenticated && (this.props.role === 'startup' || this.props.role === 'admin')) {
    if (token && (role === 'startup' || role === 'admin')) {
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
    // this.props.fetchUser(localStorage.getItem('userID'));
    return (
      this.routeCallback()
    );
  }
}

/*
function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.user.authenticated,
    role: reduxState.user.current.role,
  };
}
*/

// export default withRouter(connect(mapStateToProps, { fetchUser })(StartupRoute));
export default withRouter(StartupRoute);
