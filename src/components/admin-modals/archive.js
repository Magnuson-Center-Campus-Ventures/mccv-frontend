/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updatePost, updateStartup, updateStudent } from '../../actions';
import close from '../../../static/img/close.png';
import '../../styles/archive-modal.scss';

const Archive = (props) => {
  if (!props.show) {
    return null;
  }

  const onArchive = (e) => {
    if (props.post) {
      const { post } = props;
      post.status = 'Archived';
      props.updatePost(post.id, post);
      props.onClose(e);
    }
    if (props.startup) {
      const { startup } = props;
      startup.status = 'Archived';
      props.updateStartup(startup.id, startup);
      startup.posts.map((post) => {
        const postCopy = post;
        postCopy.status = 'Archived';
        props.updatePost(post.id, postCopy);
      });
      props.onClose(e);
    }
    if (props.student) {
      const { student } = props;
      student.status = 'Archived';
      props.updateStudent(student.id, student);
      props.onClose(e);
    }
  };


  return (
    <div className="archiveContainer">
      <div className="archiveModal" id="archiveModal">
        <img id="close-app"
          src={close}
          alt="close"
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            props.onClose(e);
          }}
        />
        <p> Are you sure you want to archive this?</p>
        <div className="archiveOptions">
          <button type="submit"
            id="noarchive"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              props.onClose(e);
            }}
          >
            No
          </button>
          <button type="submit"
            id="archive"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              onArchive(e);
            }}
          >
            Yes
          </button>
        </div>

      </div>
    </div>
  );
};

export default withRouter(connect(null, { updatePost, updateStartup, updateStudent })(Archive));
