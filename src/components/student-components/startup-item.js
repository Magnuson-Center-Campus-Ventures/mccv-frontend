/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/postings.scss';

const StartupListItem = (props) => {
  const route = `/startups/${props.startup._id}`;

  const logo = props.startup.logo ? (
    <img src={props.startup.logo} alt=" " className="companyLogo" />
  ) : (
    <div />
  );

  const industries = props.startup.industries.map((industry, index) => {
    if (index === 0) {
      return (
        <div id="pillsTitle" key={industry.id}>
          Industries: <div className="yellowPill" key={industry.id}> {industry.name} </div>
        </div>
      );
    } else if (index < 3) {
      return (
        <div className="yellowPill" key={industry.id}>
          {industry.name}
        </div>
      );
    } else if (index === 3) {
      return (
        <div className="yellowPill" key={industry.id}>
          ...
        </div>
      );
    }
  });

  let liveCount = 0;
  const maxPostLength = 40;
  const posts = props.startup.posts.map((post, index) => {
    if (post.status === 'Approved') {
      if (liveCount === 0) {
        liveCount += 1;
        if (post.title.length > maxPostLength) {
          return (
            <div id="pillsTitle" key={post.id}>
              Positions: <div className="greenPill" key={post.id}>{post.title.substring(0, maxPostLength - 1)}...</div>
            </div>
          );
        } else {
          return (
            <div id="pillsTitle" key={post.id}>
              Positions: <div className="greenPill" key={post.id}>{post.title}</div>
            </div>
          );
        }
      } else if (liveCount === 1) {
        liveCount += 1;
        if (post.title.length > 40) {
          return (
            <div className="greenPill" key={post.id}>{post.title.substring(0, 39)}...</div>
          );
        } else {
          return (
            <div className="greenPill" key={post.id}>{post.title}</div>
          );
        }
      } else if (liveCount === 2) {
        liveCount += 1;
        return (
          <div className="greenPill" key={post.id}>
            ...
          </div>
        );
      }
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

  const renderDescription = (props.startup.description) ? (
    (props.startup.description?.length > 100) ? (
      <div className="postInfo">
        <p className="descriptionText">{`${props.startup.description.substring(0, 99)}...`}</p>
      </div>
    ) : (
      <div className="postInfo">
        <p className="descriptionText">{props.startup.description}</p>
      </div>
    )
  ) : (
    <div className="postSpace" />
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

          {renderDescription}

          <div className="pillsList">
            {posts}
          </div>

          <div className="pillsList">
            {industries}
          </div>

        </div>
      </div>

      {/* <div className="companyInfo">
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
      </div> */}
    </Link>
  );
};

export default StartupListItem;
