/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  authError, signupUser, createStudent, updateUser,
} from '../actions';
import '../styles/signup.scss';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'student',
      email: '',
      password: '',
      student_profile_id: '',
      startup_id: '',
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

  signupNow = (event) => {
    // create new user
    const newUser = { ...this.state };
    newUser.email = this.state.email;
    newUser.password = this.state.password;
    newUser.role = this.state.role;
    newUser.student_profile_id = this.state.student_profile_id;
    newUser.startup_id = this.state.startup_id;
    this.props.signupUser(newUser, this.props.history);
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
        <div className="signupBoard">
          <div className="signupLeft">
            <h1>Are you a</h1>
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
          </div>
        </div>

        <div className="signupButtons">
          <button type="button" className="signupLoginBtn" onClick={() => this.props.history.push('/signin')}>
            <span>Login</span>
          </button>

          <button type="button" className="signupSignupBtn" onClick={this.signupNow}>
            <span>Sign Up</span>
          </button>
        </div>
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

export default connect(mapStateToProps, {
  authError, signupUser, createStudent, updateUser,
})(Signup);
