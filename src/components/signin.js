import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { signinUser } from '../actions/index';
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
      <div className="signinPage">
        <div className="signinBoard">
          <div className="signinLeft">
            <h1>Login to access Magnuson Campus Ventures</h1>
          </div>

          <div className="signinRight">
            <div className="signinEmail">
              <h2>Email</h2>
              <input type="text" onChange={this.onEmailChange} value={this.state.email} />
            </div>

            <div className="signinPassword">
              <h2>Password</h2>
              <input type="password" onChange={this.onPasswordChange} value={this.state.password} />
            </div>

            <div className="signupActions">
              <button type="button" className="signinLoginBtn" onClick={this.signinNow}>
                <span className="signinLoginCta">Login</span>
              </button>
              <NavLink to="/forgotpassword" className="signupLink">Forgot your password?</NavLink>
              <NavLink to="/signup" className="signupLink">Don&apos;t have an account? Sign Up</NavLink>
            </div>
          </div>

        </div>

        {/* <div className="signinButtons">
          <button type="button" className="signinSignupBtn" onClick={() => this.props.history.push('/signup')}>
            <span className="signinSignupCta">Sign Up</span>
          </button>

          <button type="button" className="signinLoginBtn" onClick={this.signinNow}>
            <span className="signinLoginCta">Login</span>
          </button>
        </div> */}

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

// export default connect(mapStateToProps, { authError, signinUser })(Signin);
export default withRouter(connect(mapStateToProps, { signinUser })(Signin));
