/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updatePost, updateStartup, updateStudent } from '../../actions';
import close from '../../../static/img/close.png';
import '../../styles/archive-modal.scss';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filled: false,
    };
    this.notFilled = this.notFilled.bind(this);
    this.filled = this.filled.bind(this);
  }

  notFilled = (e) => {
    this.setState({ filled: false });
  }

  filled = (e) => {
    this.setState({ filled: true });
  }

  onArchive = (e) => {
    if (this.props.post) {
      const { post } = this.props;
      post.status = 'Archived';
      this.props.updatePost(post.id, post);
      this.props.onClose(e);
    }
    if (this.props.startup) {
      const { startup } = this.props;
      startup.status = 'Archived';
      this.props.updateStartup(startup.id, startup);
      startup.posts.map((post) => {
        const postCopy = post;
        postCopy.status = 'Archived';
        this.props.updatePost(post.id, postCopy);
      });
      this.props.onClose(e);
    }
    if (this.props.student) {
      const { student } = this.props;
      student.status = 'Archived';
      this.props.updateStudent(student.id, student);
      this.props.onClose(e);
    }
  }

  filledRender() {
    if (this.state.filled) {
      return (
        <p>Select the student(s) who filled the position</p>
      );
    } else {
      return null;
    }
  }

  // eslint-disable-next-line consistent-return
  postArchive() {
    if (this.props.post) {
      return (
        <div className="archiveQuestions">
          <p> Has this position been filled?</p>
          <div className="archiveOptions">
            <button type="submit"
              id="noarchive"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                this.notFilled();
              }}
            >
              No
            </button>
            <button type="submit"
              id="archive"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                this.filled();
              }}
            >
              Yes
            </button>
          </div>
          {this.filledRender}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <div className="archiveContainer">
          <div className="archiveModal" id="archiveModal">
            <img id="close-app"
              src={close}
              alt="close"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                this.props.onClose(e);
              }}
            />
            <p> Are you sure you want to archive this?</p>
            <div className="archiveOptions">
              <button type="submit"
                id="noarchive"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  this.props.onClose(e);
                }}
              >
                No
              </button>
              <button type="submit"
                id="archive"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  this.onArchive(e);
                }}
              >
                Yes
              </button>
              {this.postArchive}
            </div>

          </div>
        </div>
      );
    }
  }
}

export default withRouter(connect(null, { updatePost, updateStartup, updateStudent })(Archive));
