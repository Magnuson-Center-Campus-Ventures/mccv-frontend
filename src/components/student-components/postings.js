/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostListItem from './posting-item';
import SearchBar from './search-bar';
import {
  fetchPosts, fetchPostSearch,
} from '../../actions';
import { startupSearch, postingsSearch, postByID } from '../../services/datastore';

import '../../styles/postings.scss';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      results: [],
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  search = (text) => {
    console.log(this.props.posts);
    // this.setState({ search: true });
    // postingsSearch(text, (result) => {
    //   this.setState((prevState) => ({
    //     results: [...prevState.results, result],
    //   }));
    // });
    // startupSearch(text, (result) => {
    //   console.log('result: ', result);
    //   // this.setState((prevState) => ({
    //   //   results: [...prevState.results, result],
    //   // }));
    //   this.setState((prevState) => ({
    //     results: [...prevState.results, postByID(result)],
    //   }));
    // });
  }

  refresh = () => {
    this.setState({ search: false });
    this.setState({ results: [] });
    this.props.fetchPosts();
  }

  renderPosts() {
    if (this.state.search) {
      if (this.state.results.length > 0) {
        console.log('state results: ', this.state.results);
        return this.state.results.map((post) => {
          console.log(post);
          return (
            <PostListItem post={post} key={post.id} />
          );
        });
      } else {
        return (
          <div> Sorry, no postings match that query</div>
        );
      }
    } else {
      return this.props.posts.map((post) => {
        return (
          <PostListItem post={post} key={post.id} />
        );
      });
    }
  }

  render() {
    return (
      (this.props.posts !== undefined || null) && (this.state.results !== null || undefined)
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
});

export default withRouter(connect(mapStateToProps, {
  fetchPosts, fetchPostSearch,
})(Posts));
