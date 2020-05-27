/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostListItem from './posting-item';
import SearchBar from './search-bar';
import { fetchPosts, fetchStartups } from '../actions';

import '../styles/postings.scss';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchStartups();
  }

  findStartup(id) {
    this.props.startups.map((startup) => {
      if (id === startup.id) {
        return startup;
      }
    });
  }


  render() {
    const mappingPostings = this.props.posts !== undefined && this.props.posts !== null
      ? this.props.posts.map((post) => {
        const startup = this.findStartup(post.startup_id);
        console.log(startup);
        return (
          <PostListItem post={post} key={post.id} />
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
            <SearchBar />
            <div className="list">
              {mappingPostings}
            </div>
          </div>
        ) : (
          <div />
        )
    );
  }
}

const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
  startups: reduxState.startups.all,
});

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchStartups })(Posts));

// render() {
//   const mappingPostings = this.props.posts.map((post) => {
//     this.props.fetchStartup(post.startup_id);
//     // console.log('mapping error?');
//     return (
//       <PostListItem post={post} startup={this.props.startup} key={post.id} />
//     );
//   });
//   return (
//     this.props.posts !== undefined
//       ? (
//         <div className="list">
//           {mappingPostings}
//         </div>
//       ) : (<div />)
//   );
// }
