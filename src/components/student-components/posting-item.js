/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Archive from '../admin-modals/archive';
import '../../styles/postings.scss';

const PostListItem = (props) => {
  const route = `/posts/${props.post._id}`;

  let archiveShow = false;

  const showArchiveModal = (e) => {
    archiveShow = true;
  };

  const hideArchiveModal = (e) => {
    archiveShow = false;
  };

  const buttons = props.user.role === 'admin' ? (
    <button
      type="submit"
      onClick={(e) => {
        showArchiveModal();
      }}
    >
      Archive
    </button>
  ) : <div />;


  return (
    <div>
      <Link to={route} key={props.post.id} className="listItem link">
        <Archive post={props.post} onClose={hideArchiveModal} show={archiveShow} />
        <div className="companyInfo">
          <img src={props.post.startup_id.logo} alt="no logo" />
          <div className="companyText">
            <h1 id="startupName"> { props.post.startup_id.name} </h1>
            <div className="location">
              <span className="locationIcon" />
              <h2> { props.post.location} </h2>
            </div>
          </div>
        </div>
        <div className="postInfo">
          <h1 id="postTitle">{ props.post.title}</h1>
          {/* <h2 id="matched">Matched on: </h2> */}
          {/* {buttons} */}
        </div>
      </Link>

    </div>

  );
};

export default PostListItem;
