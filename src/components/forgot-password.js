import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { fetchUsers, signinUser } from '../actions/index';
import '../styles/forgot-password.scss';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  sendEmail = (event) => {
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
      <div className="signinPage">
        <div className="signinBoard">
          <div className="signinLeft">
            <h1>Forgot your password?</h1>
            <h2>Type in your email and we will send you a link to reset your password</h2>
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
              <NavLink to="/signin" className="signupLink">Remember your password?</NavLink>
              <br/>
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

export default withRouter(connect(mapStateToProps, { fetchUsers, signinUser })(ForgotPassword));
