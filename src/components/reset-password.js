import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { updatePassword } from '../actions/index';
import '../styles/reset-password.scss';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      password: '',
    };
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  submitPassword = (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    this.state.token = urlParams.get('token');
    const fields = { ...this.state };
    this.props.updatePassword(fields, this.props.history);
  }

  renderError = () => {
    if (this.props.error) {
      return <div className="signinError">{this.props.error}</div>;
    }
    return null;
  }

  render() {
    return (
      <div className="signinPage">
        <div className="signinBoard">
          <div className="signinLeft">
            <h1>Reset your password?</h1>
            <h2>Enter your new password</h2>
          </div>

          <div className="signinRight">
            <div className="signinPassword">
              <h2>New Password</h2>
              <input type="password" onChange={this.onPasswordChange} value={this.state.password} />
            </div>

            <div className="signupActions">
              <button type="button" className="signinLoginBtn" onClick={this.submitPassword}>
                <span className="signinLoginCta">Submit</span>
              </button>
              <NavLink to="/signup" className="signupLink">Don&apos;t have an account? Sign Up</NavLink>
            </div>
          </div>

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

export default withRouter(connect(mapStateToProps, { updatePassword })(ResetPassword));
