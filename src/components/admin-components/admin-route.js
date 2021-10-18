/* eslint-disable */
import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';

function AdminRoute(props) {

  const routeCallback = (e) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') {
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

// export default withRouter(connect(mapStateToProps, { fetchUser })(StartupRoute));
export default withRouter(AdminRoute);
