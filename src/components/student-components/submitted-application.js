/* eslint-disable array-callback-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSubmittedApplication, fetchQuestions, fetchPosts } from '../../actions';
import '../../styles/post.scss';

class SubmittedApplication extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchSubmittedApplication(this.props.match.params.applicationID);
    this.props.fetchQuestions();
  }

  renderHelper= () => {
    const items = [];
    if (this.props.current.responses && this.props.questions.length > 0) {
      console.log(this.props.current.responses);
      console.log(this.props.questions);
      this.props.questions.map((question) => {
        if (this.props.current.responses[question._id]) {
          items.push(
            <div key={question._id}>
              <h3 id="question" key={question._id}>{question.question}</h3>
              <h2 id="question" key={question._id}>{this.props.current.responses[question._id]}</h2>
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
    if (this.props.posts.length > 0) {
      let post = '';
      for (const i in this.props.posts) {
        if (this.props.posts[i].id === this.props.current.post_id) {
          post = this.props.posts[i];
          break;
        }
      }
      return (
        <div>
          <h1>{post.title}</h1>
          <div>{post.location}</div>
          <h2 id="title">{this.props.current.status}</h2>
          {this.renderHelper()}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (reduxState) => ({
  current: reduxState.submittedApplications.current,
  posts: reduxState.posts.all,
  questions: reduxState.questions.all,
});

export default withRouter(connect(mapStateToProps, { fetchSubmittedApplication, fetchQuestions, fetchPosts })(SubmittedApplication));
