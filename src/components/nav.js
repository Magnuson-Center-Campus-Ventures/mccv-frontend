/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  signout = () => {
    this.props.signoutUser(this.props.history);
  }

  /*
  authRender() {
    if (!this.state.authenticated) { // if not signed in
      return (

      );
    } else {
      return (
        <ul id="nav-bar">
          <li><NavLink exact to="/">Magnuson Campus Ventures</NavLink></li>
          <li><NavLink to="/posts">Positions</NavLink></li>
          <li><NavLink to="/startups">Startups</NavLink></li>
          <li><NavLink to="/applications">Applications</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/signin">Signin</NavLink></li>
          <li><NavLink to="/signup">Signup</NavLink></li>
          <li>
            <button type="button" className="signoutBtn" onClick={this.signout}>
              <span className="signoutCta">Sign Out</span>
            </button>
          </li>
        </ul>
      );
    }
  }
  */

  render() {
    return (
      <nav>
        <ul id="nav-bar">
          <li><NavLink exact to="/">Magnuson Campus Ventures</NavLink></li>
          <li><NavLink to="/posts">Positions</NavLink></li>
          <li><NavLink to="/startups">Startups</NavLink></li>
          <li><NavLink to="/applications">Applications</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/signin">Signin</NavLink></li>
          <li><NavLink to="/signup">Signup</NavLink></li>
          <li>
            <button type="button" className="signoutBtn" onClick={this.signout}>
              <span className="signoutCta">Sign Out</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
    error: reduxState.auth.error,
  };
}

export default connect(mapStateToProps, { signoutUser })(Nav);
