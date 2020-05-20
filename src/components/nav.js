/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NavLink } from 'react-router-dom';
import React from 'react';

const Nav = (props) => {
  return (
    <nav>
      <ul id="nav-bar">
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/jobposts">Job Postings</NavLink></li>
        <li><NavLink to="/startups">Startups</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav;
