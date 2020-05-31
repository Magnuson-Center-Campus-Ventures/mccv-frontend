/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostListItem from './posting-item';
import SearchBar from './search-bar';
import { fetchPosts, fetchPostSearch } from '../../actions';
import { startupSearch, postingsSearch, startupByID } from '../../services/datastore';

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
    this.setState({ search: true });
    // this.props.fetchPostSearch(text);
    console.log(this.props.posts);
    const searchterm = text.toLowerCase();
    this.props.posts.map((post) => {
      const skills = post.required_skills.map((skill) => skill.toLowerCase());
      const responsibilities = post.responsibilities.map((resp) => resp.toLowerCase());
      const postInd = post.industries.map((industry) => industry.toLowerCase());
      const startupInd = post.startup_id.industry.map((industry) => industry.toLowerCase());
      if (post.title.toLowerCase().includes(searchterm)
      || post.location.toLowerCase().includes(searchterm)
      || skills.includes(searchterm) // array
      || responsibilities.includes(searchterm) // array
      || postInd.includes(searchterm) // array
      || post.startup_id.name.toLowerCase().includes(searchterm)
      || startupInd.includes(searchterm)) { // array
        this.setState((prevState) => ({
          results: [...prevState.results, post],
        }));
      }
    });
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

  clear = () => {
    this.setState({ search: false });
    this.setState({ results: [] });
    // this.props.fetchPosts();
  }

  renderPosts() {
    if (this.state.search) {
      console.log('here');
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
            <SearchBar onSearchChange={this.search} onNoSearch={this.clear} />
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

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchPostSearch })(Posts));
