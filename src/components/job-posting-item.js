/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';


const PostListItem = (props) => {
  const route = `/jobposts/${props.job._id}`;
  return (
    <div className="postListItem" key={props.job.id}>
      <Link to={route} key={props.job.id} className="link">
        <h1>{props.job.title}</h1>
      </Link>
    </div>
  );
};

export default PostListItem;
