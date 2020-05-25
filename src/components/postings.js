/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostListItem from './posting-item';
import { fetchPosts, fetchStartup } from '../actions';

import '../styles/postings.scss';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const mappingPostings = this.props.posts.map((post) => {
      this.props.fetchStartup(post.startup_id);
      return (
        <PostListItem post={post} startup={this.props.startup} key={post.id} />
      );
    });
    return (
      this.props.posts !== undefined
        ? (
          <div className="list">
            {mappingPostings}
          </div>
        ) : (<div />)
    );
  }
}

const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
  startup: reduxState.startups.current,
});

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchStartup })(Posts));
