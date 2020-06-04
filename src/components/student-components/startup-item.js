/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/postings.scss';

const StartupListItem = (props) => {
  const route = `/startups/${props.startup._id}`;
  const industries = props.startup.industries.map((industry, index) => {
    return (
      <div className="industryPill" key={index}>
        {industry.name}
      </div>
    );
  });

  return (
    <Link to={route} key={props.startup.id} className="listItem link">
      <div className="companyInfo">
        <img src={props.startup.logo} alt="no logo" />
        <div className="companyText">
          <h1 id="startupName"> {props.startup.name} </h1>
          <div className="location">
            <span className="locationIcon" />
            <h2> {`${props.startup.city}, ${props.startup.state}`} </h2>
          </div>
        </div>
      </div>
      <div className="extraInfo">
        <h1> Industries: {industries} </h1>
        <h2> Good fit for: </h2>
      </div>
    </Link>
  );
};

export default StartupListItem;
