/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NavLink } from 'react-router-dom';
import React from 'react';

const Nav = (props) => {
  return (
    <nav>
      <ul id="nav-bar">
        <li><NavLink exact to="/">Magnuson Campus Ventures</NavLink></li>
        <li><NavLink to="/posts">Positions</NavLink></li>
        <li><NavLink to="/startups">Startups</NavLink></li>
        <li><NavLink to="/applications">Applications</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav;
