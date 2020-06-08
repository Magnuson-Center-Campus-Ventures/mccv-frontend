/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser, fetchUser, fetchStudentByID } from '../actions';
import '../styles/nav.scss';

class Nav extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    if (localStorage.getItem('userID')) {
      this.props.fetchUser(localStorage.getItem('userID'));
    }
    /* if (this.props.role === 'student') {
      this.props.fetchStudentByID(this.props.user.student_profile_id);
    } */
    this._isMounted = true;
  }

  signout = (event) => {
    localStorage.clear();
    this.props.signoutUser(this.props.history);
  }


  // eslint-disable-next-line consistent-return
  navRender() {
    if (this.props.authenticated && this.props.role === 'admin') { // if logged in user is an admin
      return (
        <ul id="nav-bar">
          <li><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li><NavLink to="/posts">Positions</NavLink></li>
          <li><NavLink to="/startups">Startups</NavLink></li>
          <li><NavLink to="/students">Students</NavLink></li>
          <li>
            <button type="button" className="navNameBtn">
              <span className="navNameCta">Admin</span>
            </button>
          </li>
          <div className="userDropdown">
            <div className="dropdownOptions">
              <NavLink to="/profile">My Profile</NavLink>
              <button type="button" className="navLogoutBtn" onClick={this.signout}>
                <span className="navLogoutCta">Logout</span>
              </button>
            </div>
          </div>
        </ul>
      );
    } else if (this.props.authenticated && this.props.role === 'startup') { // if logged in user is a startup
      return (
        <ul id="nav-bar">
          <li><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li><NavLink to="/students">Students</NavLink></li>
          <li><NavLink to="/startupsubmittedapplications">Applications</NavLink></li>
          <li><NavLink to="/startupprofile">My Profile</NavLink></li>
          <button type="button" className="navLogoutBtn" onClick={this.signout}>
            <span className="navLogoutCta">Logout</span>
          </button>
        </ul>
      );
    } else if (this.props.authenticated && this.props.role === 'student') { // if logged in user is a student
      return (
        <ul id="nav-bar">
          <li><div className="mccv">Magnuson Center Campus Ventures</div></li>
          <li><NavLink to="/posts">Positions</NavLink></li>
          <li><NavLink to="/startups">Startups</NavLink></li>
          <li><NavLink to="/applications">Applications</NavLink></li>
          <li>
            <button type="button" className="navNameBtn">
              <span className="navNameCta">{this.props.name}</span>
            </button>
          </li>
          <div className="userDropdown">
            <div className="dropdownOptions">
              <NavLink to="/profile">My Profile</NavLink>
              <button type="button" className="navLogoutBtn" onClick={this.signout}>
                <span className="navLogoutCta">Logout</span>
              </button>
            </div>
          </div>
        </ul>
      );
    } else { // if not signed in
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
    }
  }

  render() {
    return this._isMounted ? (
      <nav>
        {this.navRender()}
      </nav>
    )
      : (<nav />);
  }
}

const mapStateToProps = (reduxState) => ({
  role: reduxState.user.current.role,
  user: reduxState.user.current,
  authenticated: reduxState.user.authenticated,
  student: reduxState.students.current_student,
  name: reduxState.students.current_student.first_name,
});


export default withRouter(connect(mapStateToProps, { signoutUser, fetchUser, fetchStudentByID })(Nav));
