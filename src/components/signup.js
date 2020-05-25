import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  authError, signupUser,
} from '../actions/index';
import '../styles/signup.scss';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  signupNow = (event) => {
    const fields = { ...this.state };
    this.props.signupUser(fields, this.props.history);
  }

  renderError() {
    if (this.props.error) {
      return <div className="signupError">{this.props.error}</div>;
    }
    return null;
  }

  render() {
    return (
      <div className="signupBoard">
        <div className="signup">
          <h1>Sign Up</h1>

          <div className="signupEmail">
            <h2>Email</h2>
            <input type="text" onChange={this.onEmailChange} value={this.state.email} />
          </div>

          <div className="signupPassword">
            <h2>Password</h2>
            <input type="password" onChange={this.onPasswordChange} value={this.state.password} />
          </div>

          <button type="button" className="signupBtn" onClick={this.signupNow}>
            <span className="signupCta">Sign Up</span>
          </button>
          {this.renderError()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
    error: reduxState.auth.error,
  };
}

// enables this.props.currentPost, this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, {
  authError, signupUser,
})(Signup);
