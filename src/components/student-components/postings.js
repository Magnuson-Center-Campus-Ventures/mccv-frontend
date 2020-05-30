/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostListItem from './posting-item';
import SearchBar from './search-bar';
import {
  fetchPosts, fetchStartups, fetchPostSearch, fetchStartupSearch,
} from '../../actions';
import { startupSearch } from '../../services/datastore';

import '../../styles/postings.scss';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    // this.props.fetchStartups();
  }

  search = (text) => {
    this.props.fetchPostSearch(text);
    startupSearch(text);
    // this.props.fetchStartupSearch(text);
    // console.log('search term: ', text);
    // console.log('posts: ', this.props.posts);
    // console.log('startups: ', this.props.startups);
  }

  refresh = () => {
    // this.props.fetchStartups();
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <PostListItem post={post} key={post.id} />
      );
    });
  }

  render() {
    return (
      this.props.posts !== undefined && this.props.posts !== null
        ? (
          <div>
            <SearchBar onSearchChange={this.search} onNoSearch={this.refresh} />
            <div className="list">
              {this.renderPosts()}
            </div>
          </div>
        ) : (
          <div> </div>
        )
    );
  }
}

const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
  startups: reduxState.startups.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchPosts, fetchStartups, fetchPostSearch, fetchStartupSearch,
})(Posts));
