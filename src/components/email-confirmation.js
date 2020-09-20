import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { confirmedSignup } from '../actions/index';
import '../styles/email-confirmation.scss';

class EmailConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  componentDidMount(){
    const urlParams = new URLSearchParams(window.location.search);
    this.setState({ token: urlParams.get('token'), });
    console.log(this.state.token);
  }

  renderError = () => {
    if (this.props.error && this.props.error != 'Email found') {
      return <div className="signinError">{this.props.error}</div>;
    }
    return null;
  }

  render() { 
    console.log(this.state.token);
    if (!this.state.token){
      return (
        <div className="signinPage">
          <div className="signinBoard">
            <div className="signinLeft">
              <h1>Thank you for signing up!</h1>
              <h2>Check your email for a link to sign in and fill out your profile</h2>
            </div>
          </div>
          {this.renderError()}
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
                <button type="button" className="signupSignupBtn" onClick={() => {
                  this.props.confirmedSignup({ token: this.state.token }, this.props.history);
                  }}>
                  <span>Sign In</span>
                </button>
              </div>
            </div>
          </div>
          {this.renderError()}
        </div>
      );
      }
  }
}

function mapStateToProps(reduxState) {
  return {
    error: reduxState.user.error,
  };
}

export default withRouter(connect(mapStateToProps, { confirmedSignup })(EmailConfirmation));
