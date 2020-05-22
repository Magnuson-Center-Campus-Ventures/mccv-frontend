import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostListItem from './posting-item';
import { fetchPosts } from '../actions';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    // console.log('here: ', this.props.posts);
    const mapping = this.props.posts.map((post) => {
      return (
        <PostListItem post={post} key={post.id} />
      );
    });
    return (
      this.props.posts !== undefined
        ? (
          <div className="postList">
            {mapping}
          </div>
        ) : (<div />)
    );
  }
}

const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
});

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
