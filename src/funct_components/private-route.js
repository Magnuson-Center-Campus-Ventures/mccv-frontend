/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {
  const routeCallback = (e) => {
    const token = localStorage.getItem('token');
    if (token) {
      return (
        <Route {...props} />
      );
    } else {
      return (
        <Redirect to="/" />
      );
    }
  }

  return (
    routeCallback()
  );
}

// export default withRouter(connect(mapStateToProps, { fetchUser })(PrivateRoute));
export default withRouter(PrivateRoute);
