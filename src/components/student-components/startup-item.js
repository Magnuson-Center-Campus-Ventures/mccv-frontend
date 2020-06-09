/* eslint-disable no-nested-ternary */
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
    return index < 3 ? (
      index === 2 && props.startup.industries.length > 3 ? (
        <div id="lastOne">
          <h1 key={industry.id} id="notFirstInd">
            {industry.name}
          </h1>
          <p> and {props.startup.industries.length - 3} more...  </p>
        </div>
      ) : (
        <h1 key={industry.id} id="notFirstInd">
          {industry.name}
        </h1>
      )
    ) : (
      <div />
    );
  });

  const postNames = props.startup.posts.length > 2 ? (
    props.startup.posts.map((post, index) => {
      return index < 2 ? (
        index === 1 ? (
          <div id="lastOne">
            <div className="pill" id="postings" key={post.id}>
              {post.title}
            </div>
            <p> and {props.startup.posts.length - 2} more...  </p>
          </div>
        )
          : (
            <div className="pill" id="postings" key={post.id}>
              {post.title}
            </div>
          )

      ) : <div />;
    })
  ) : (
    props.startup.posts.map((post) => {
      return (
        <div className="pill" id="postings" key={post.id}>
          {post.title}
        </div>
      );
    })
  );

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
