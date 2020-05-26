/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchSubmittedApplication, fetchSubmittedApplications, fetchPosts } from '../actions';

import '../styles/postings.scss';

class SubmittedApplications extends Component {
  componentDidMount() {
    this.props.fetchSubmittedApplications();
    this.props.fetchPosts();
  }

  render() {
    const mappingApplications = this.props.submittedApplications.map((application) => {
      console.log(application);
      const route = `/applications/${application._id}`;
      let post = null;
      for (const i in this.props.posts) {
        if (this.props.posts[i].id === application.post_id) {
          post = this.props.posts[i];
          break;
        }
      }
      return (
        <Link to={route} key={application.id} className="listItem link">
          <div className="Status">
            <div>{post.title}</div>
            <div>{post.location}</div>
            <div>{application.status}</div>
          </div>
        </Link>
      );
    });
    return (
      this.props.submittedApplications !== undefined
        ? (
          <div className="list">
            {mappingApplications}
          </div>
        ) : (<div />)
    );
  }
}

const mapStateToProps = (reduxState) => ({
  submittedApplications: reduxState.submittedApplications.all,
  posts: reduxState.posts.all,
});

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchSubmittedApplication, fetchSubmittedApplications })(SubmittedApplications));
