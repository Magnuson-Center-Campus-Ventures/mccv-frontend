/* eslint-disable array-callback-return */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize'
import { updateStartup, updatePost, sendNotificationEmail } from '../../actions';
// import close from '../../../static/img/close.png';
import '../../styles/modal.scss';

const Revise = (props) => {
  if (!props.show) {
    return null;
  }

  const onRevise = (e) => {
    if (props.startup) {
      const { startup } = props;
      startup.status = 'Approved';
      props.sendNotificationEmail({
        user_id: startup.user_id, 
        type: 'startup approved',
        info: '',
      });
      props.updateStartup(startup.id, startup);
      startup.posts.map((post) => {
        const postCopy = post;
        postCopy.status = 'Approved';
        props.updatePost(post.id, postCopy);
      });
    }
  };


  return (
    <div className="archiveContainer">
      <div className="archiveModal" id="archiveModal">
        {/* <img id="close-app"
          src={close}
          alt="close"
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            props.onClose(e);
          }}
        /> */}
        <i className="fas fa-times"
          aria-label="close modal"
          role="button"
          tabIndex={0}
          id="close-modal"
          onClick={(e) => {
            props.onClose(e);
          }}
        />
        <div className="modalContent">
          <p> 
            Are you sure you want to approve this startup? <br />
            All of their posts will also go live when you approve them.
          </p>
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
                onApprove(e);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(connect(null, { updateStartup, updatePost, sendNotificationEmail })(Approve));
