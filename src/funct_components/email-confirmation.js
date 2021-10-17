import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { confirmedSignup } from '../actions/index';
import '../styles/email-confirmation.scss';

function EmailConfirmation() {
  const [token, setToken] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setToken(urlParams.get('token'));
  }, []);

  const renderError = () => {
    if (props.error && props.error !== 'Email found') {
      return <div className="signinError">{props.error}</div>;
    }
    return null;
  }

    if (!token) {
      return (
        <div className="signinPage">
          <div className="signinBoard">
            <div className="signinLeft">
              <h1>Thank you for signing up!</h1>
              <h2>Check your email for a link to sign in and fill out your profile</h2>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="signinPage">
          <div className="signinBoard">
            <div className="signinLeft">
              <h1>Thank you for confirming your email</h1>
              <h2>Click below to sign in and fill out your profile</h2>
              <div className="signupActions">
                <button type="button"
                  className="signupSignupBtn"
                  onClick={() => {
                    props.confirmedSignup({ token: token }, props.history);
                  }}
                >
                  <span>Sign In</span>
                </button>
              </div>
            </div>
          </div>
          {renderError()}
        </div>
      );
    };
};

function mapStateToProps(reduxState) {
  return {
    error: reduxState.user.error,
  };
}

export default withRouter(connect(mapStateToProps, { confirmedSignup })(EmailConfirmation));
