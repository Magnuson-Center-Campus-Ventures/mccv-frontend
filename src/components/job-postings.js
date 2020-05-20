import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostListItem from './job-posting-item';
import { fetchJobs } from '../actions';

class JobPosts extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }

  render() {
    console.log('here: ', this.props.jobs);
    const mapping = this.props.jobs.map((job) => {
      return (
        <PostListItem job={job} key={job.id} />
      );
    });
    return (
      this.props.jobs !== undefined
        ? (
          <div className="postList">
            {mapping}
          </div>
        ) : (<div />)
    );
  }
}

const mapStateToProps = (reduxState) => ({
  jobs: reduxState.jobs.all,
});

export default withRouter(connect(mapStateToProps, { fetchJobs })(JobPosts));
