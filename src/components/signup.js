/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component, useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  authError, signupUser, createStudent, updateUser,
  emailExists, sendConfirmationEmail,
} from '../actions';
import '../styles/signup.scss';
import StudentTerms from '../components/student-components/student-modals/student-terms';
import StartupTerms from '../components/startup-components/startup-modals/startup-terms';

function Signup(props) {
    const [role, setRole] = useState("student")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [student_profile_id, set_student_profile_id] = useState('')
    const [startup_id, set_startup_id] = useState('')
    const [signed, set_signed] = useState('')
    const [error, setError] = useState(props.error)
    const [show, set_show] = useState(false)

    const onEmailChange = (event) => {
        setEmail(event.target.value)
        props.emailExists({ email: event.target.value.toLowerCase() });
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    // setState when student button selected
    const roleStudent = (event) => {
        setRole('student')
    }

    // setState when startup button selected
    const roleStartup = (event) => {
        setRole('startup')
    }

    const signupNow = () => {
        const confirmation = {
        email: email.toLowerCase(),
        password: password,
        role: role,
        student_profile_id: student_profile_id,
        startup_id: startup_id,
        };
        props.sendConfirmationEmail(confirmation, props.history);
    }

    const showModal = async (event) => {
        if (password === '') {
            setError('Sign Up Failed: Password is blank');
        } else if (email === '') {
            setError('Sign Up Failed: Username is blank');
        } else if (props.error === 'Email found') {
            setError('Sign Up Failed: User with this email already exists');
        } else  {
            set_show(true)
        }
    };

    const hideModal = (event) => {
        set_show(false)
    }

    const signModal = (event) => {
        if (event.signature !== '') {
        set_signed(new Date().getTime());
        signupNow();
        }
        set_show(false);
    }

    // return button className if student is selected
    const studentClassname = () => {
        if (role === 'student') {
        return 'roleSelectedBtn';
        } else {
        return 'roleBtn';
        }
    }

    // return button className if startup is selected
    const startupClassname = () => {
        if (role === 'startup') {
        return 'roleSelectedBtn';
        } else {
        return 'roleBtn';
        }
    }

    const renderError = () => {
        if (error && error.length > 0) {
            return <div className="signupError">{error}</div>;
        }
        return null;
    }

    const renderTypeEmail = () => {
        if (role === 'student') {
        return 'Dartmouth Email';
        } else {
        return 'Email';
        }
    }

    return (
        <div className="signupPage">
            <div className="student-profile">
            <StudentTerms
                onClose={hideModal}
                acceptTC={signModal}
                show={show && role === 'student'}
            />
            <StartupTerms
                onClose={hideModal}
                acceptTC={signModal}
                show={show && role === 'startup'}
            />
            </div>
            <div className="signupBoard">
            <div className="signupLeft">
                <h1>Sign up as a</h1>
                <div className="roleButtons">
                <button type="button" className={studentClassname()} onClick={roleStudent}>
                    <span className="roleStudentCta">Student</span>
                </button>

                <button type="button" className={startupClassname()} onClick={roleStartup}>
                    <span className="roleStartupCta">Startup</span>
                </button>
                </div>
                {renderError()}
            </div>
            <div className="signupRight">
                <div className="signupEmail">
                <h2>{renderTypeEmail()}</h2>
                <input type="text" onChange={onEmailChange} value={email} />
                </div>

                <div className="signupPassword">
                <h2>Password</h2>
                <input type="password" onChange={onPasswordChange} value={password} />
                </div>

                <div className="signupActions">
                <button type="button" className="signupSignupBtn" onClick={showModal}>
                    <span>Sign Up</span>
                </button>
                <NavLink to="/signin" className="loginLink">Already have an account? Login</NavLink>
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

export default withRouter(connect(mapStateToProps, {
  authError, signupUser, createStudent, updateUser, emailExists, sendConfirmationEmail,
})(Signup));
