/* eslint-disable array-callback-return */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateStartup, updatePost, sendNotificationEmail } from '../../actions';
// import close from '../../../static/img/close.png';
import '../../styles/modal.scss';

const Emails = (props) => {
  if (!props.show) {
    return null;
  }

  const onApprove = (e) => {
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
          <p> Emails for </p>
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
