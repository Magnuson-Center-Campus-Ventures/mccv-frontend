/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updatePost } from '../../actions';
import close from '../../../static/img/close.png';
import '../../styles/archive-modal.scss';

const Archive = (props) => {
//   render() {
  if (!props.show) {
    return null;
  }

  const onArchive = (e) => {
    if (props.post) {
      // console.log('from modal ', props.post);
      const { post } = props;
      post.status = 'Archived';
      // console.log('post updated: ', post);
      updatePost(post.id, post);
    }
    props.onClose(e);
  };
  if (props.startup) {
    console.log(props.startup);
  }
  console.log('in archive');
  // console.log(props.post);

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
// }

// const mapStateToProps = (reduxState) => ({

// });

export default withRouter(connect(null, { updatePost })(Archive));

// export default Archive;
