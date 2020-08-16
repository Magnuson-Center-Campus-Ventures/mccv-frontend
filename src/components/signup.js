/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  authError, signupUser, createStudent, updateUser,
} from '../actions';
import '../styles/signup.scss';
import StudentTerms from './student-components/student-modals/student-terms'
import StartupTerms from './startup-components/startup-modals/startup-terms'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'student',
      email: '',
      password: '',
      student_profile_id: '',
      startup_id: '',
      signed: '',
      show: false,
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  // setState when student button selected
  roleStudent = (event) => {
    this.setState({ role: 'student' });
  }

  // setState when startup button selected
  roleStartup = (event) => {
    this.setState({ role: 'startup' });
  }

  signupNow() {
    // create new user
    const newUser = { ...this.state };
    newUser.email = this.state.email;
    newUser.password = this.state.password;
    newUser.role = this.state.role;
    newUser.student_profile_id = this.state.student_profile_id;
    newUser.startup_id = this.state.startup_id;
    newUser.signed = this.state.signed;
    this.props.signupUser(newUser, this.props.history);
  }

  showModal = (event) => {
    this.setState({ show: true });
  };
  
  hideModal = (event) => {
    if (event.signature != ''){
      this.state.signed = new Date().getTime();
      this.signupNow();
    }
    this.setState({ show: false });
  }

  // return button className if student is selected
  studentClassname() {
    if (this.state.role === 'student') {
      return 'roleSelectedBtn';
    } else {
      return 'roleBtn';
    }
  }

  // return button className if startup is selected
  startupClassname() {
    if (this.state.role === 'startup') {
      return 'roleSelectedBtn';
    } else {
      return 'roleBtn';
    }
  }

  renderError() {
    if (this.props.error) {
      return <div className="signupError">{this.props.error}</div>;
    }
    return null;
  }

  renderTypeEmail() {
    if (this.state.role === 'student') {
      return 'Dartmouth Email';
    } else {
      return 'Email';
    }
  }

  render() {
    return (
      <div className="signupPage">
      <div className="student-profile">
          <StudentTerms
            onClose={this.hideModal}
            show={this.state.show && this.state.role=='student'}
          />
          <StartupTerms
            onClose={this.hideModal}
            show={this.state.show && this.state.role=='startup'}
          />
        </div>
        <div className="signupBoard">
          <div className="signupLeft">
            <h1>Sign up as a</h1>
            <div className="roleButtons">
              <button type="button" className={this.studentClassname()} onClick={this.roleStudent}>
                <span className="roleStudentCta">Student</span>
              </button>

              <button type="button" className={this.startupClassname()} onClick={this.roleStartup}>
                <span className="roleStartupCta">Startup</span>
              </button>
            </div>
          </div>

          <div className="signupRight">
            <div className="signupEmail">
              <h2>{this.renderTypeEmail()}</h2>
              <input type="text" onChange={this.onEmailChange} value={this.state.email} />
            </div>

            <div className="signupPassword">
              <h2>Password</h2>
              <input type="password" onChange={this.onPasswordChange} value={this.state.password} />
            </div>

            <div className="signupActions">
              <button type="button" className="signupSignupBtn" onClick={this.showModal}>
                <span>Sign Up</span>
              </button>
              <NavLink to="/signin" className="loginLink">Already have an account? Login</NavLink>
            </div>
          </div>
        </div>

        {/* <div className="signupButtons">
          <button type="button" className="signupLoginBtn" onClick={() => this.props.history.push('/signin')}>
            <span>Login</span>
          </button>

          <button type="button" className="signupSignupBtn" onClick={this.signupNow}>
            <span>Sign Up</span>
          </button>
        </div> */}
        {this.renderError()}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    error: reduxState.user.error,
  };
}

export default withRouter(connect(mapStateToProps, {
  authError, signupUser, createStudent, updateUser,
})(Signup));
