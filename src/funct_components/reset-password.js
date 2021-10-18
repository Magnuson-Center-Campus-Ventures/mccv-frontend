import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { updatePassword } from '../actions/index';
import '../styles/reset-password.scss';

function ResetPassword() {
  const [token, setToken] = useState()
  const [password, setPassword] = useState()

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const submitPassword = (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    token = urlParams.get('token');
    const fields = { token: token, password: password};
    props.updatePassword(fields, props.history);
  }

  const renderError = () => {
    if (props.error) {
      return <div className="signinError">{props.error}</div>;
    }
    return null;
  }

  return (
    <div className="signinPage">
      <div className="signinBoard">
        <div className="signinLeft">
          <h1>Reset your password?</h1>
          <h2>Enter your new password</h2>
          {renderError()}
        </div>
        <div className="signinRight">
          <div className="signinPassword">
            <h2>New Password</h2>
            <input type="password" onChange={onPasswordChange} value={password} />
          </div>

          <div className="signupActions">
            <button type="button" className="signinLoginBtn" onClick={submitPassword}>
              <span className="signinLoginCta">Submit</span>
            </button>
            <NavLink to="/signup" className="signupLink">Don&apos;t have an account? Sign Up</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(reduxState) {
  return {
    error: reduxState.user.error,
  };
}

export default withRouter(connect(mapStateToProps, { updatePassword })(ResetPassword));
