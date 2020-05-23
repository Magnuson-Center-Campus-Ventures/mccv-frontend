/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { fetchPost } from '../actions';

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
    };
  }

  componentDidMount() {
    console.log('here');
    this.props.fetchPost(this.props.match.params.postID);
    this.setState({ isMounted: true });
  }

  render() {
    // console.log('here');
    // if (this.state.isMounted) {
    //   return (
    //     <div className="postingInfo">
    //       <h1> {this.props.post.title} </h1>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       Loading...
    //     </div>
    //   );
    // }
    return (
      <div> This is for an individual post</div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  post: reduxState.post.current,
});

export default withRouter(connect(mapStateToProps, { fetchPost })(SinglePost));
