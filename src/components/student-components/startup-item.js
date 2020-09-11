/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/postings.scss';

const StartupListItem = (props) => {
  const route = `/startups/${props.startup._id}`;

  const logo = props.startup.logo ? (
    <img src={props.startup.logo} alt=" " className="companyLogo"/>
  ) : (
    <div />
  );

  const industries = props.startup.industries.map((industry, index) => {
    if (index === 0) {
      return (
        <div id="pillsTitle" key={industry.id}>
          Industries: <div className="grayPill"> {industry.name} </div>
        </div>
      );
    } else if (index < 3) {
      return (
        <div key={industry.id} className="grayPill">
          {industry.name}
        </div>
      );
    }
  });

  const posts = props.startup.posts.map((post, index) => {
    if (index == 0) {
      return (
        <div id="pillsTitle" key={post.id}>
          Posts: <div className="greenPill">{post.title}</div>
        </div>
      )
    } else if (index < 3) {
      return (
        <div className="greenPill" id="postings" key={post.id}>
          {post.title}
        </div>
      );
    }
  });

  const cityState = (props.startup.city && props.startup.state) ? (
    <div className="location">
      <span className="locationIcon" />
      <span className="postLocation"> {`${props.startup.city}, ${props.startup.state}`} </span>
    </div>  
  ) : (
    <div />
  );

  const renderDescription = (props.startup.description?.length > 100) ? (
    <p className="descriptionText">{`${props.startup.description.substring(0, 99)}...`}</p>
  ) : (
    <p className="descriptionText">{props.startup.description}</p>
  );
  
  return (
    <Link to={route} key={props.startup.id} className="listItem link">
      <div className="postBody">
        <div className="postText">

          <div className="companyInfo">
            <div className="companyLeft">
              <h1 className="startupName"> { props.startup.name} </h1>
              {cityState}
            </div>
            <div className="companyRight">
              {logo}
            </div>
          </div>

          <div className="postInfo">
            {renderDescription}
          </div>

          <div className="pillsList">
            {posts}
          </div>

          <div className="pillsList">
            {industries}
          </div>
          
        </div>
      </div>

      {/*<div className="companyInfo">
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
      </div>*/}
    </Link>
  );
};

export default StartupListItem;