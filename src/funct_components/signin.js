import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { signinUser } from '../actions/index';
import '../styles/signin.scss';


function Signin(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const signinNow = (event) => {
        const fields = { email: email, password: password};
        fields.email = email.toLowerCase();
        props.signinUser(fields, props.history);
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
                <h1>Login to access Magnuson Center Campus Ventures</h1>
                {renderError()}
            </div>
            <div className="signinRight">
                <div className="signinEmail">
                    <h2>Email</h2>
                    <input type="text" onChange={onEmailChange} value={email} />
                </div>
                <div className="signinPassword">
                    <h2>Password</h2>
                    <input type="password" onChange={onPasswordChange} value={password} />
                </div>
                <div className="signupActions">
                    <button type="button" className="signinLoginBtn" onClick={signinNow}>
                        <span className="signinLoginCta">Login</span>
                    </button>
                    <NavLink to="/forgotpassword" className="signupLink">Forgot your password?</NavLink>
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

// export default connect(mapStateToProps, { authError, signinUser })(Signin);
export default withRouter(connect(mapStateToProps, { signinUser })(Signin));
