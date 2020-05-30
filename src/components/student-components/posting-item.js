import React from 'react';
import { Link } from 'react-router-dom';


import '../../styles/postings.scss';

const PostListItem = (props) => {
  const route = `/posts/${props.post._id}`;
  return (
    <Link to={route} key={props.post.id} className="listItem link">
      <div className="companyInfo">
        <img src={props.startup.logo} alt="no logo" />
        <div className="companyText">
          <h1 id="startupName"> {props.startup.name} </h1>
          <div className="location">
            <span className="locationIcon" />
            <h2> {props.startup.location} </h2>
          </div>
        </div>
      </div>
      <div className="postInfo">
        <h1 id="postTitle">{props.post.title}</h1>
        <h2 id="matched">Matched on: </h2>
      </div>
    </Link>
  );
};

export default PostListItem;
