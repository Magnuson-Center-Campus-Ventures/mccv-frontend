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

import '../../styles/postings.scss';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchStartups();
  }

  search = (text) => {
    this.props.fetchPostSearch(text);
    // this.props.fetchStartupSearch(text);
    // console.log('search term: ', text);
    // console.log('posts: ', this.props.posts);
    // console.log('startups: ', this.props.startups);
  }

  refresh = () => {
    this.props.fetchStartups();
    this.props.fetchPosts();
  }

  findStartup(id) {
    let startupInfo = null;
    this.props.startups.map((startup) => {
      if (id === startup.id) {
        startupInfo = startup;
      }
    });
    return startupInfo;
  }

  render() {
    const mappingPostings = this.props.posts.length !== undefined && this.props.posts !== null
      ? this.props.posts.map((post) => {
        const startup = this.props.startups !== undefined && this.props.startups !== null ? (
          this.findStartup(post.startup_id)
        )
          : (null);
        return (
          startup !== null
            ? (
              <PostListItem post={post} startup={startup} key={post.id} />
            ) : (<div />)
        );
      })
      : (
        <div>
          Sorry, no posts currently
        </div>
      );
    return (
      this.props.posts !== undefined
        ? (
          <div>
            <SearchBar onSearchChange={this.search} onNoSearch={this.refresh} />
            <div className="list">
              {mappingPostings}
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
