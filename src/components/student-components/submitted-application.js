/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSubmittedApplication } from '../../actions';
import '../../styles/post.scss';

class SubmittedApplication extends Component {
  componentDidMount() {
    this.props.fetchSubmittedApplication(this.props.match.params.applicationID);
  }

  renderHelper= () => {
    const items = [];
    if (this.props.current.questions) {
      for (const [index, value] of this.props.current.questions.entries()) {
        items.push(
          <div>
            <h3 id="question" key={index}>{index}</h3>
            <h3 id="answer" key={value}>{value}</h3>
          </div>,
        );
      }
      return items;
    } else {
      return <div />;
    }
  }

  render() {
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
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  current: reduxState.submittedApplications.current,
  posts: reduxState.posts.all,
});

export default withRouter(connect(mapStateToProps, { fetchSubmittedApplication })(SubmittedApplication));
