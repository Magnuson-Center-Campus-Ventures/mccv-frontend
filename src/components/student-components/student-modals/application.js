/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */
import React, { useEffect, useState } from 'react';
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

function Application(props) {
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    props.fetchStudentByUserID(localStorage.getItem('userID'));
    props.fetchPost(props.match.params.postID);
  }, [])

  const onSubmit = (e) => {
    const newApplication = {
      student_id: props.student._id,
      post_id: props.post.id,
      questions: props.post.questions,
      answers: answers,
      status: 'pending',
    };
    const newPost = props.post;
    newPost.applicants.push(props.student);
    props.submitApplication(newApplication);
    props.updatePost(props.post._id, newPost);
    setAnswers([])
    props.onClose && props.onClose(e);
  };

  const onClose = (e) => {
    props.onClose && props.onClose(e);
  }

  const onAnswerChange = (event) => {
    const { target: { name, value } } = event;
    const answers_ = answers;
    answers_[props.post.questions.findIndex((temp) => {
      return temp === name;
    })] = value;
    setAnswers(answers_)
  }

  const renderHelper= () => {
    const items = [];
    if (props.post) {
      props.post.questions.map((question) => {
        items.push(
          <div key={question}>
            <h3 id="question-title">{question}</h3>
            <textarea
              name={question}
              onChange={onAnswerChange}
              value={answers[props.post.questions.findIndex(
                (temp) => {
                  return temp === question;
                },
              )]}
            />
          </div>,
        );
      });
      return items;
    } else {
      return <div />;
    }
  }

    if (!props.show) {
      return null;
    }
    return (
      <div className="application-container">
        <div id="application" className="application">
          <div className="application-title">{props.post.title}<img id="close-app"
            src={close}
            alt="close"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              onClose(e);
            }}
          />
          </div>
          <div className="questions">
            {renderHelper()}
          </div>
          <div className="actions">
            <button type="submit"
              className="submit-btn"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              Submit
            </button>
          </div>
        </div>

      </div>
    );
}

const mapStateToProps = (reduxState) => ({
  user: reduxState.user.current,
  student: reduxState.students.current_student,
  post: reduxState.posts.current,
  questions: reduxState.questions.all,
  application: reduxState.applications.current,
});

const mapDispatchTOProps = {
  submitApplication,
  fetchPost,
  fetchStudentByUserID,
  fetchUserByStudentID,
  fetchUser,
  updatePost,
}

export default withRouter(connect(mapStateToProps, mapDispatchTOProps)(Application));
