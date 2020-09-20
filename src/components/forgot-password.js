import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { createResetToken } from '../actions/index';
import '../styles/forgot-password.scss';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  sendEmail = (event) => {
    let fields = { ...this.state }; 
    fields.email = this.state.email.toLowerCase();
    this.props.createResetToken(fields, this.props.history); 
  }

  renderError = () => {
    if (this.props.error && this.props.error != 'Email found') {
      return <div className="signinError">{this.props.error}</div>;
    }
    return null;
  }

  render() { 
    return (
      <div className="signinPage">
        <div className="signinBoard">
          <div className="signinLeft">
            <h1>Forgot your password?</h1>
            <h2>Enter your email and we will send you a link to reset your password</h2>
          </div>

          <div className="signinRight">
            <div className="signinEmail">
              <h2>Email</h2>
              <input type="text" onChange={this.onEmailChange} value={this.state.email} />
            </div>

            <div className="signupActions">
              <button type="button" className="signinLoginBtn" onClick={this.sendEmail}>
                <span className="signinLoginCta">Send email</span>
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

export default withRouter(connect(mapStateToProps, { createResetToken })(ForgotPassword));
