import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/footer.scss';
import logo from '../assets/magnuson_logo.png';

const Footer = () => {
  return (
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
  );
};

export default Footer;
