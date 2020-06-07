/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Archive from '../admin-modals/archive';
import '../../styles/postings.scss';

const PostListItem = (props) => {
  const route = `/posts/${props.post._id}`;

  const logo = props.post.startup_id.logo ? (
    <img src={props.post.startup_id.logo} alt="  " />
  ) : (
    <div />
  );

  const industries = props.post.industries.map((industry, index) => {
    if (index === 0) {
      return (
        <h2 key={industry.id}>
          <div id="industryTitle">
            Industries: <div className="pill"> {industry.name} </div>
          </div>
        </h2>
      );
    }
    return (
      <h2 key={industry.id} className="pill" id="notFirstInd">
        {industry.name}
      </h2>
    );
  });

  return (
    <Link to={route} key={props.post.id} className="listItem link">
      <div className="companyInfo">
        <div className="companyText">
          <h1 id="startupName"> { props.post.startup_id.name} </h1>
          <div className="location">
            <span className="locationIcon" />
            <h2> {`${props.post.city}, ${props.post.state}`} </h2>
          </div>
        </div>
        {logo}
        {/* <img src={props.post.startup_id.logo} alt="no logo" /> */}
      </div>
      <div className="postInfo">
        <h1 id="postTitle">{ props.post.title}</h1>
        <div className="industriesList">
          {industries}
        </div>
      </div>
    </Link>
  );
};

export default PostListItem;
