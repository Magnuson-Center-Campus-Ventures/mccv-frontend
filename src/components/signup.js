/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  authError, signupUser, createStudent, updateUser,
} from '../actions/index';
import '../styles/signup.scss';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'student',
      email: '',
      password: '',
      student_profile_id: '',
      startup_profile_id: '',
    };
  }

  /*
  componentDidUpdate(prevProps) {
    console.log('in didUpdate');
    console.log(prevProps);
    if (this.props.userID !== '' && prevProps.userID !== this.props.userID) {
      this.setState({ userID: this.props.userID });
      console.log(this.state.userID);
    }
    if (this.props.studentID !== '' && prevProps.studentID !== this.props.studentID) {
      this.setState({ studentID: this.props.studentID });
    }
  }
  */

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
    newUser.startup_profile_id = this.state.startup_profile_id;
    console.log('newUser');
    console.log(newUser);
    this.props.signupUser(newUser, this.props.history);
    /* if (this.state.role === 'student') {
      console.log('in student');
      // creating new student
      const newStudent = {
        user_id: this.props.userID,
      };
      console.log('newStudent');
      console.log(newStudent);
      this.props.createStudent(newStudent);
      this.props.history.push('/'); // replace later with first page of create profile sequence
      // updating user with studentprofile id

      newUser.student_profile_id = this.state.studentID;
      this.props.updateUser(this.state.userID, newUser);
      console.log('updated userid');
      this.props.history.push('/'); // replace later with first page of create profile sequence

      this.props.createStudent(newStudent).then((result) => {
        newUser.student_profile_id = this.state.studentID;
        this.props.updateUser(this.state.userID, newUser);
        console.log('updated userid');
        this.props.history.push('/'); // replace later with first page of create profile sequence
      }).catch((error) => {
        console.log('error creating Student');
      });
    } else if (this.state.role === 'startup') {
      console.log('in startup');
      // create new startup
    } else if (this.state.role === 'admin') {
      console.log('in admin');
      // create new admin
    }
    */
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
            <span className="signupSignupCta">Login</span>
          </button>

          <button type="button" className="signupSignupBtn" onClick={this.signupNow}>
            <span className="signupLoginCta">Sign Up</span>
          </button>
        </div>
        {this.renderError()}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
    userID: reduxState.auth.userID,
    error: reduxState.auth.error,
    studentID: reduxState.students.studentID,
  };
}

export default connect(mapStateToProps, {
  authError, signupUser, createStudent, updateUser,
})(Signup);
