/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  signout = (event) => {
    this.props.signoutUser(this.props.history);
  }

  authRender() {
    if (!this.props.authenticated) { // if not signed in
      return (
        <ul id="nav-bar">
          <li><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li><NavLink to="/">Students</NavLink></li>
          <li><NavLink to="/startupslanding">Startups</NavLink></li>
          <li>
            <NavLink to="/signin">
              <button type="button" className="navLoginBtn">
                <span className="navLoginCta">Login</span>
              </button>
            </NavLink>
          </li>
        </ul>
      );
    } else { // if signed in
      return (
        <ul id="nav-bar">
          <li><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li><NavLink to="/posts">Positions</NavLink></li>
          <li><NavLink to="/startups">Startups</NavLink></li>
          <li><NavLink to="/applications">Applications</NavLink></li>
          <li>
            <div className="userDropdown">
              <button type="button" className="navNameBtn">
                <span className="navNameCta">Name</span>
              </button>
              <div className="dropdownOptions">
                <NavLink to="/profile">Profile</NavLink>
                <button type="button" className="signoutBtn" onClick={this.signout}>
                  <span className="signoutCta">Logout</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <nav>
        { this.authRender() }
      </nav>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
    userID: reduxState.auth.userID,
    error: reduxState.auth.error,
  };
}

export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
