/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
import React, { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser, fetchUser, fetchStudentByID } from '../actions';
import '../styles/nav.scss';


function Nav(props) {
  const [isMounted, setIsMounted] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('role');
    const userID = localStorage.getItem('userID');
    if (userID) {
      props.fetchUser(userID);
    };
    if (role === 'student') {
      props.fetchStudentByID(props.user.student_profile_id);
    };
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (window.location.href.indexOf('startup-signup') > -1 || window.location.href.indexOf('student-signup') > -1) {
      setShow(false);
    } else if (!(window.location.href.indexOf('startup-signup') > -1 || window.location.href.indexOf('student-signup') > -1)) {
      setShow(true);
    };
  }, [show, isMounted]);

  const signout = (event) => {
    props.signoutUser(props.history);
  };

  const navRender = () => {
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
          <div className="dropdownContainer">
            <button type="button" className="navNameBtn" onClick={this.showDropdown}>
              <i className="far fa-user" />
              <span className="navNameCta">Dashboard</span>
            </button>
            <ul className="dropdownOptions">
              <li className="dropdownLi">
                <NavLink to="/dashboard" className="navlinkDropdown" activeClassName="activeBorder">Metrics</NavLink>
              </li>
              <li className="dropdownLi">
                <NavLink to="/action-dashboard" className="navlinkDropdown" activeClassName="activeBorder">Action</NavLink>
              </li>
            </ul>
          </div>
          <li className="navLi">
            <button type="button" className="navLogoutBtn" onClick={signout}>
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
            <button type="button" className="navLogoutBtn" onClick={signout}>
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
              <span className="navNameCta">Dashboard</span>
            </button>
            <ul className="dropdownOptions">
              <li className="dropdownLi">
                <NavLink to="/dashboard" className="navlinkDropdown" activeClassName="activeBorder">Metrics</NavLink>
              </li>
              <li className="dropdownLi">
                <NavLink to="/action-dashboard" className="navlinkDropdown" activeClassName="activeBorder">Action</NavLink>
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
    };
  }
  

  return isMounted && show ? (
    <nav>
      {navRender()}
    </nav>
  )
    : (<nav />);
};


const mapStateToProps = (reduxState) => ({
  user: reduxState.user.current,
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, { signoutUser, fetchUser, fetchStudentByID })(Nav));
