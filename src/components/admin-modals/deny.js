/* eslint-disable array-callback-return */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateStartup, updatePost } from '../../actions';
import close from '../../../static/img/close.png';
import '../../styles/archive-modal.scss';

const Deny = (props) => {
  if (!props.show) {
    return null;
  }

  //   const onDeny = (e) => {
  //     if (props.startup) {
  //       // console.log('startup: ', props.startup);
  //       const { startup } = props;
  //       startup.status = 'Pending';
  //       props.updateStartup(startup.id, startup);
  //       startup.posts.map((post) => {
  //         const postCopy = post;
  //         postCopy.status = 'Pending';
  //         props.updatePost(post.id, postCopy);
  //       });
  //     }
  //   };

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
        <p> Are you sure you want to deny this startup? <br />
          Note: this will just leave the startup as pending. If there are specific changes you would like to see on their profile, please email them!
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
              props.onClose(e);
            }}
          >
            Yes
          </button>
        </div>

      </div>
    </div>
  );
};

export default withRouter(connect(null, { updateStartup, updatePost })(Deny));
