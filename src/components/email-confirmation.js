import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { createConfirmationToken } from '../actions/index';
import '../styles/email-confirmation.scss';

class EmailConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
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
            <h1>Thank you for confirming your email</h1>
            <h2>Click here to sign in and fill out your profile</h2>
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
