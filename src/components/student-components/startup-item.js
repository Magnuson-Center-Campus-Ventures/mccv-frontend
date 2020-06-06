/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/postings.scss';

const StartupListItem = (props) => {
  const route = `/startups/${props.startup._id}`;

  const logo = props.startup.logo ? (
    <img src={props.startup.logo} alt="  " />
  ) : (
    <div />
  );

  const industries = props.startup.industries.map((industry, index) => {
    if (index === 0) {
      return (
        <h1 key={industry.id}>
          Industries: {industry.name}
        </h1>
      );
    }
    return (
      <h1 key={industry.id} id="notFirstInd">
        {industry.name}
      </h1>
    );
  });

  const postNames = props.startup.posts.map((post) => {
    console.log(post);
    return (
      <div className="pill" key={post.id}>
        {post.title}
      </div>
    );
  });

  const posts = props.startup.posts.length > 0 ? (
    <div className="postings">
      <h2>Looking for:  </h2>
      {postNames}
    </div>
  ) : (
    <div />
  );

  return (
    <Link to={route} key={props.startup.id} className="listItem link">
      <div className="companyInfo">
        <div className="companyText">
          <h1 id="startupName"> {props.startup.name} </h1>
          <div className="location">
            <span className="locationIcon" />
            <h2> {`${props.startup.city}, ${props.startup.state}`} </h2>
          </div>
        </div>
        {logo}
      </div>
      <div className="extraInfo">
        <div className="industriesList postIndustries">
          {industries}
        </div>
        {posts}
      </div>
    </Link>
  );
};

export default StartupListItem;
