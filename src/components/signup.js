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
      usertype: 'student',
      email: '',
      password: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  // setState when student button selected
  usertypeStudent = (event) => {
    this.setState({ usertype: 'student' });
  }

  // setState when startup button selected
  usertypeStartup = (event) => {
    this.setState({ usertype: 'startup' });
  }

  signupNow = (event) => {
    const newUser = { ...this.state };
    newUser.role = this.usertype;
    this.props.signupUser(newUser, this.props.history);
    if (this.state.usertype === 'student') {
      console.log('in student');
      const newStudent = {
        user_id: this.state.userID,
      };
      this.props.createStudent(newStudent);
      /*
      this.props.createStudent(newStudent).then((result) => {
        newUser.student_profile_id = this.state.studentID;
        this.props.updateUser(this.state.userID, newUser);
        console.log('updated userid');
        this.props.history.push('/'); // replace later with first page of create profile sequence
      }).catch((error) => {
        console.log('error creating Student');
      });
      */
    } else if (this.state.usertype === 'startup') {
      console.log('in startup');
    } else if (this.state.usertype === 'admin') {
      console.log('in admin');
    }
  }

  // return button className if student is selected
  studentClassname() {
    if (this.state.usertype === 'student') {
      return 'usertypeSelectedBtn';
    } else {
      return 'usertypeBtn';
    }
  }

  // return button className if startup is selected
  startupClassname() {
    if (this.state.usertype === 'startup') {
      return 'usertypeSelectedBtn';
    } else {
      return 'usertypeBtn';
    }
  }

  renderError() {
    if (this.props.error) {
      return <div className="signupError">{this.props.error}</div>;
    }
    return null;
  }

  renderTypeEmail() {
    if (this.state.usertype === 'student') {
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
            <div className="usertypeButtons">
              <button type="button" className={this.studentClassname()} onClick={this.usertypeStudent}>
                <span className="usertypeStudentCta">Student</span>
              </button>

              <button type="button" className={this.startupClassname()} onClick={this.usertypeStartup}>
                <span className="usertypeStartupCta">Startup</span>
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
