import React from 'react';
import { Link } from 'react-router-dom';


const PostListItem = (props) => {
  // const route = `/posts/${props.post._id}`;
  const route = '/';
  console.log(route);
  return (
    <div className="postListItem" key={props.post.id}>
      <Link to={route} key={props.post.id} className="link">
        <h1 className="postTitle">{props.post.title}</h1>
      </Link>
    </div>
  );
};

export default PostListItem;
