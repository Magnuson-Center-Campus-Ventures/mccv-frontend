/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser, clearUserState } from '../actions';

class Nav extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      usertype: '',
    };
  }

  componentDidMount() {
    // console.log(localStorage.getItem('userID'));
    this.setState({ usertype: this.props.user.role });
    this._isMounted = true;
  }

  // componentDidUpdate() {
  //   if (this.props.user.role !== this.state.usertype) {
  //     this.props.fetchUser(localStorage.getItem('userID'));
  //     this.setState({ usertype: this.props.user.role });
  //   }
  // }

  signout = (event) => {
    localStorage.clear();
    this.props.signoutUser(this.props.history);
    this.props.clearUserState();
  }


  usertypeRender() {
    if (this.props.user.role === 'student') { // if logged in user is a student
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
    } else if (this.props.user.role === 'startup') { // if logged in user is a startup
      console.log('here ');
      return (
        <ul id="nav-bar">
          <li><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li><NavLink to="/students">Students</NavLink></li>
          <li><NavLink to="/startupsubmittedapplications">Applications</NavLink></li>
          <li>
            <div className="userDropdown">
              <button type="button" className="navNameBtn">
                <span className="navNameCta">Name</span>
              </button>
              <div className="dropdownOptions">
                <NavLink to="/startupprofile">Profile</NavLink>
                <button type="button" className="signoutBtn" onClick={this.signout}>
                  <span className="signoutCta">Logout</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      );
    } else { // if logged in user is an admin
      return (
        <ul id="nav-bar">
          <li><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li><NavLink to="/posts">Positions</NavLink></li>
          <li><NavLink to="/startups">Startups</NavLink></li>
          <li><NavLink to="/students">Students</NavLink></li>
          <li>
            <div className="userDropdown">
              <button type="button" className="navNameBtn">
                <span className="navNameCta">Name</span>
              </button>
              <div className="dropdownOptions">
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
      return this.usertypeRender();
    }
  }

  render() {
    return this._isMounted ? (
      <nav>
        {this.authRender()}
      </nav>
    )
      : (<nav />);
  }
}

const mapStateToProps = (reduxState) => ({
  authenticated: reduxState.auth.authenticated,
  userID: reduxState.auth.userID,
  error: reduxState.auth.error,
  user: reduxState.user.current,
});


export default withRouter(connect(mapStateToProps, { signoutUser, clearUserState })(Nav));
