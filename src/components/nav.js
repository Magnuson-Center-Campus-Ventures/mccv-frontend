/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser, fetchUser, fetchStudentByID } from '../actions';
import '../styles/nav.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
    };
  }

  componentDidMount() {
    /*
    if (localStorage.getItem('userID')) {
      this.props.fetchUser(localStorage.getItem('userID'));
    }
    if (this.props.role === 'student') {
      this.props.fetchStudentByID(this.props.user.student_profile_id);
    } */
    const role = localStorage.getItem('role');
    const userID = localStorage.getItem('userID');
    if (userID) {
      this.props.fetchUser(userID);
    }
    if (role === 'student') {
      this.props.fetchStudentByID(this.props.user.student_profile_id);
    }
    this.setState({ isMounted: true });
  }

  signout = (event) => {
    // localStorage.clear(); put this in signoutUser function
    this.props.signoutUser(this.props.history);
  }


  // eslint-disable-next-line consistent-return
  navRender() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const firstName = localStorage.getItem('firstName');
    // if (!this.props.authenticated) { // if not signed in
    if (!token) { // if not signed in
      return (
        <ul id="nav-bar">
          <li><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li><NavLink exact to="/" className="navlink" activeClassName="activeBorder">Students</NavLink></li>
          <li><NavLink to="/startupslanding" className="navlink" activeClassName="activeBorder">Startups</NavLink></li>
          <li>
            <NavLink to="/signin" activeClassName="noBorder">
              <button type="button" className="navLoginBtn">
                <span className="navLoginCta">Login</span>
              </button>
            </NavLink>
          </li>
        </ul>
      );
    } else if (token && role === 'admin') { // if logged in user is an admin
    // else if (this.props.authenticated && this.props.role === 'admin') { // if logged in user is an admin
      return (
        <ul id="nav-bar">
          <li><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li><NavLink to="/posts" className="navlink" activeClassName="activeBorder">Positions</NavLink></li>
          <li><NavLink to="/startups" className="navlink" activeClassName="activeBorder">Startups</NavLink></li>
          <li><NavLink to="/students" className="navlink" activeClassName="activeBorder">Students</NavLink></li>
          <li>
            <button type="button" className="navLogoutBtn" onClick={this.signout}>
              <span className="navLogoutCta">Logout</span>
            </button>
          </li>
        </ul>
      );
    } else if (token && role === 'startup') { // if logged in user is a startup
    // else if (this.props.authenticated && this.props.role === 'startup') { // if logged in user is a startup
      return (
        <ul id="nav-bar">
          <li><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li><NavLink to="/students" className="navlink" activeClassName="activeBorder">Students</NavLink></li>
          <li><NavLink to="/startupsubmittedapplications" className="navlink" activeClassName="activeBorder">Applications</NavLink></li>
          <li><NavLink to="/startupprofile" className="navlink" activeClassName="activeBorder">My Profile</NavLink></li>
          <button type="button" className="navLogoutBtn" onClick={this.signout}>
            <span className="navLogoutCta">Logout</span>
          </button>
        </ul>
      );
    } else if (token && role === 'student') { // if logged in user is a student
    // else if (this.props.authenticated && this.props.role === 'student') { // if logged in user is a student
      return (
        <ul id="nav-bar">
          <li><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li><NavLink to="/posts" className="navlink" activeClassName="activeBorder">Positions</NavLink></li>
          <li><NavLink to="/startups" className="navlink" activeClassName="activeBorder">Startups</NavLink></li>
          <li><NavLink to="/applications" className="navlink" activeClassName="activeBorder">Applications</NavLink></li>
          <li>
            <button type="button" className="navNameBtn">
              <span className="navNameCta">{firstName}</span>
            </button>
          </li>
          <div className="userDropdown">
            <div className="dropdownOptions">
              <NavLink to="/profile" className="navlink" activeClassName="activeBorder">My Profile</NavLink>
              <button type="button" className="navLogoutBtn" onClick={this.signout}>
                <span className="navLogoutCta">Logout</span>
              </button>
            </div>
          </div>
        </ul>
      );
    }
  }

  render() {
    return this.state.isMounted ? (
      <nav>
        {this.navRender()}
      </nav>
    )
      : (<nav />);
  }
}

const mapStateToProps = (reduxState) => ({
  // role: reduxState.user.current.role,
  user: reduxState.user.current,
  // authenticated: reduxState.user.authenticated,
  student: reduxState.students.current_student,
  // name: reduxState.students.current_student.first_name,
});


export default withRouter(connect(mapStateToProps, { signoutUser, fetchUser, fetchStudentByID })(Nav));
