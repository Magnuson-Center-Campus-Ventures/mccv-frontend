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
      show: true,
    };
  }

  componentDidMount() {
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

  componentDidUpdate() {
    if (this.state.show === true && (window.location.href.indexOf('startup-signup') > -1 || window.location.href.indexOf('student-signup') > -1)) {
      this.setState({ show: false });
    } else if (this.state.show === false && !(window.location.href.indexOf('startup-signup') > -1 || window.location.href.indexOf('student-signup') > -1)) {
      this.setState({ show: true });
    }
  }

  signout = (event) => {
    // localStorage.clear(); put this in signoutUser function
    this.props.signoutUser(this.props.history);
  }

  // eslint-disable-next-line consistent-return
  navRender() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    let firstName = '';
    if (localStorage.getItem('firstName') !== 'undefined') {
      firstName = localStorage.getItem('firstName');
    }
    if (token && role && role === 'admin') { // if logged in user is an admin
      return (
        <ul id="nav-bar">
          <li className="navLi"><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li className="navLi"><NavLink to="/posts" className="navlink" activeClassName="activeBorder">Positions</NavLink></li>
          <li className="navLi"><NavLink to="/startups" className="navlink" activeClassName="activeBorder">Startups</NavLink></li>
          <li className="navLi"><NavLink to="/students" className="navlink" activeClassName="activeBorder">Students</NavLink></li>
          <li className="navLi"><NavLink to="/dashboard" className="navlink" activeClassName="activeBorder">Dashboard</NavLink></li>
          <li className="navLi">
            <button type="button" className="navLogoutBtn" onClick={this.signout}>
              <span className="navLogoutCta">Logout</span>
            </button>
          </li>
        </ul>
      );
    } else if (token && role && role === 'startup') { // if logged in user is a startup
      return (
        <ul id="nav-bar">
          <li className="navLi"><span className="mccv">Magnuson Center Campus Ventures</span></li>
          <li className="navLi"><NavLink to="/students" className="navlink" activeClassName="activeBorder">Students</NavLink></li>
          <li className="navLi"><NavLink to="/startupsubmittedapplications" className="navlink" activeClassName="activeBorder">Applications</NavLink></li>
          <li className="navLi"><NavLink to="/startupprofile" className="navlink" activeClassName="activeBorder">My Profile</NavLink></li>
          <li className="navLi">
            <button type="button" className="navLogoutBtn" onClick={this.signout}>
              <span className="navLogoutCta">Logout</span>
            </button>
          </li>
        </ul>
      );
    } else if (token && role && role === 'student') { // if logged in user is a student
      return (
        <ul id="nav-bar">
          <li className="navLi"><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li className="navLi"><NavLink to="/posts" className="navlink" activeClassName="activeBorder">Positions</NavLink></li>
          <li className="navLi"><NavLink to="/startups" className="navlink" activeClassName="activeBorder">Startups</NavLink></li>
          <li className="navLi"><NavLink to="/applications" className="navlink" activeClassName="activeBorder">Applications</NavLink></li>
          <div className="dropdownContainer">
            <button type="button" className="navNameBtn" onClick={this.showDropdown}>
              <i className="far fa-user" />
              <span className="navNameCta">{firstName}</span>
            </button>
            <ul className="dropdownOptions">
              <li className="dropdownLi">
                <NavLink to="/profile" className="navlinkDropdown" activeClassName="activeBorder">My Profile</NavLink>
              </li>
              <li className="dropdownLi">
                <button type="button" className="navDropdownLogoutBtn" onClick={this.signout}>
                  <span className="navLogoutCta">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </ul>
      );
    } else { // user not logged in or role undefined
      return (
        <ul id="nav-bar">
          <li className="navLi"><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li className="navLi"><NavLink exact to="/" className="navlink" activeClassName="activeBorder">Students</NavLink></li>
          <li className="navLi"><NavLink to="/startupslanding" className="navlink" activeClassName="activeBorder">Startups</NavLink></li>
          <li className="navLi">
            <NavLink to="/signin" activeClassName="noBorder">
              <button type="button" className="navLoginBtn">
                <span className="navLoginCta">Login</span>
              </button>
            </NavLink>
          </li>
        </ul>
      );
    }
  }

  render() {
    return this.state.isMounted && this.state.show ? (
      <nav>
        {this.navRender()}
      </nav>
    )
      : (<nav />);
  }
}

const mapStateToProps = (reduxState) => ({
  user: reduxState.user.current,
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, { signoutUser, fetchUser, fetchStudentByID })(Nav));
