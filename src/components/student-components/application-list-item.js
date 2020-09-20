/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchSubmittedApplication,
  fetchPost,
  fetchStudentByID,
  fetchUserByStudentID,
  fetchUser,
} from '../../actions';
import '../../styles/startup-submitted-application.scss';
 
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

class ApplicationListItem extends Component {
  componentDidMount() {
    this.props.fetchSubmittedApplication(this.props.match.params.applicationID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.current !== null && !isEmpty(this.props.current) && (prevProps.current !== this.props.current)) {
      this.props.fetchPost(this.props.current.post_id);
    }
  }

  renderQuestions= () => {
    const items = [];
    if (this.props.post.questions && this.props.post.questions.length > 0) {
      this.props.post.questions.map((question) => {
        if (this.props.current.responses[question]) {
          items.push(
            <div key={question} className="work-exp">
              <div className="exp-title">{question}</div>
              <div className="exp-text">{this.props.current.responses[question]}</div>
            </div>,
          );
        }
      });
      return items;
    } else {
      return <div />;
    }
  }

  render() {
    if (this.props.post != null && !isEmpty(this.props.post)) {
      return (
        <div>
          <div className="job-info">
            <h1>{this.props.post.title}</h1>
            <h2 id="startupName"> { this.props.post.startup_id.name} </h2>
            <div className="location">
              <span className="locationIcon" />
              <h2> {`${this.props.post.city}, ${this.props.post.state}`} </h2>
            </div>
            <div className="app-status">
              <h2>Status: {this.props.current.status}</h2>
            </div>
            <h1>Questions</h1>
          </div>
          <div className="exps-fixed">
            {this.renderQuestions()}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (reduxState) => ({
  student: reduxState.students.current_student,
  user: reduxState.user.current,
  current: reduxState.submittedApplications.current,
  post: reduxState.posts.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByID,
  fetchUserByStudentID,
  fetchUser,
  fetchSubmittedApplication,
  fetchPost,
})(ApplicationListItem));
