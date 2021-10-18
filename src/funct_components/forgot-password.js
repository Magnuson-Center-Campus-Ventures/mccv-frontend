import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { createResetToken } from '../actions/index';
import '../styles/forgot-password.scss';

function ForgotPassword(props) {
  const[email, setEmail] = useState()

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const sendEmail = (event) => {
    const fields = { email: email};
    fields.email = email.toLowerCase();
    props.createResetToken(fields, props.history);
  }

  const renderError = () => {
    if (props.error && props.error !== 'Email found') {
      return <div className="signinError">{props.error}</div>;
    }
    return null;
  }

  return (
      <div className="signinPage">
        <div className="signinBoard">
          <div className="signinLeft">
            <h1>Forgot your password?</h1>
            <h2>Enter your email and we will send you a link to reset your password</h2>
            {renderError()}
          </div>

          <div className="signinRight">
            <div className="signinEmail">
              <h2>Email</h2>
              <input type="text" onChange={onEmailChange} value={email} />
            </div>

            <div className="signupActions">
              <button type="button" className="signinLoginBtn" onClick={sendEmail}>
                <span className="signinLoginCta">Send email</span>
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

export default withRouter(connect(mapStateToProps, { createResetToken })(ForgotPassword));
