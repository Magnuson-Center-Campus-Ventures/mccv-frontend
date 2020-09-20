/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  submitApplication,
  fetchPost,
  fetchStudentByUserID,
  fetchUserByStudentID,
  fetchUser,
  updatePost,
} from '../../../actions';
import close from '../../../../static/img/close.png';
import '../../../styles/application.scss';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionToAnswer: {},
    };
    this.onAnswerChange = this.onAnswerChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchStudentByUserID(localStorage.getItem('userID'));
    this.props.fetchPost(this.props.match.params.postID);
  }

  onSubmit = (e) => {
    const newApplication = {
      student_id: this.props.student._id,
      post_id: this.props.post.id,
      responses: this.state.questionToAnswer,
      status: 'pending',
    };
    const newPost = this.props.post;
    newPost.applicants.push(this.props.student);
    this.props.submitApplication(newApplication);
    this.props.updatePost(this.props.post._id, newPost);
    this.props.onClose && this.props.onClose(e);
  };

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  }

  onAnswerChange(event) {
    const { target: { name, value } } = event;
    const newQuestionToAnswer = { ...this.state.questionToAnswer, [name]: value };
    this.setState({ questionToAnswer: newQuestionToAnswer });
  }

  renderHelper= () => {
    const items = [];
    if (this.props.post) {
      this.props.post.questions.map((question) => {
        items.push(
          <div key={question}>
            <h3 id="question-title" >{question}</h3>
            <textarea name={question} onChange={this.onAnswerChange} value={this.state.questionToAnswer[question]} />
          </div>,
        );
      });
      return items;
    } else {
      return <div />;
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="application-container">
        <div id="application" className="application">
          <div className="application-title">{this.props.post.title}<img id="close-app"
            src={close}
            alt="close"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              this.onClose(e);
            }}
          />
          </div>
          <div className="questions">
            {this.renderHelper()}
          </div>
          <div className="actions">
            <button type="submit"
              className="submit-btn"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                this.onSubmit(e);
              }}
            >
              Submit
            </button>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  user: reduxState.user.current,
  student: reduxState.students.current_student,
  post: reduxState.posts.current,
  questions: reduxState.questions.all,
  application: reduxState.applications.current,
});

export default withRouter(connect(mapStateToProps, {
  submitApplication,
  fetchPost,
  fetchStudentByUserID,
  fetchUserByStudentID,
  fetchUser,
  updatePost,
})(Application));
