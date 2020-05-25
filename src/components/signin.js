import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  authError, signinUser,
} from '../actions/index';
import '../styles/signin.scss';

class Signin extends Component {
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

  signinNow = (event) => {
    const fields = { ...this.state };
    this.props.signinUser(fields, this.props.history);
  }

  renderError = () => {
    if (this.props.error) {
      return <div className="signinError">{this.props.error}</div>;
    }
    return null;
  }

  render() {
    return (
      <div className="signinBoard">
        <div className="signin">
          <h1>Sign In</h1>
          <div className="signinEmail">
            <h2>Email</h2>
            <input type="text" onChange={this.onEmailChange} value={this.state.email} />
          </div>

          <div className="signinPassword">
            <h2>Password</h2>
            <input type="password" onChange={this.onPasswordChange} value={this.state.password} />
          </div>

          <button type="button" className="signinBtn" onClick={this.signinNow}>
            <span className="signinCta">Sign In</span>
          </button>
          {this.renderError()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticate: reduxState.auth.authenticated,
    error: reduxState.auth.error,
  };
}

export default connect(mapStateToProps, {
  authError, signinUser,
})(Signin);
