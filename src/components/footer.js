import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/footer.scss';
import logo from '../assets/magnuson_logo.png';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  componentDidUpdate() {
    if (window.location.href.indexOf("startup-signup") > -1 || window.location.href.indexOf("student-signup") > -1) {
      this.state.show = false;
    } else {
      this.state.show = true;
    }
  }

  render() {
    return this.state.show ? (
      <ul id="footer">
        <li>
          <a href="https://magnuson.dartmouth.edu/">
            <img
              src={logo}
              alt="Magnuson Logo"
              style={{ cursor: 'pointer' }}
            />
          </a>
        </li>
        <li><NavLink to="/credits">Credit</NavLink></li>
        <li><a href="mailto:magnuson.student.leadership.board@dartmouth.edu">Contact</a></li>
      </ul>
    )
    : (<nav />);
  }
};

const mapStateToProps = (reduxState) => ({
  user: reduxState.user.current,
});

export default withRouter(connect(mapStateToProps)(Footer));
