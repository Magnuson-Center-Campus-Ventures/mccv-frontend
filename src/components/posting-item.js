/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchStartup } from '../actions';
import { findStartup } from '../../services/datastore';


import '../styles/postings.scss';

class PostListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startup: {},
    };
  }

  componentDidMount() {
    // findStartup(this.props.post.startup_id);
    // this.setState({ startup: findStartup(this.props.post.startup_id) });
  }


  render() {
    const route = `/posts/${this.props.post._id}`;
    return (
      <Link to={route} key={this.props.post.id} className="listItem link">
        <div className="companyInfo">
          <img src={this.props.startup.logo} alt="no logo" />
          <div className="companyText">
            <h1 id="startupName"> {this.props.startup.name} </h1>
            <div className="location">
              <span className="locationIcon" />
              <h2> {this.props.startup.location} </h2>
            </div>
          </div>
        </div>
        <div className="postInfo">
          <h1 id="postTitle">{this.props.post.title}</h1>
          <h2 id="matched">Matched on: </h2>
        </div>
      </Link>
    );
  }
}

// const mapStateToProps = (reduxState) => ({
//   startup: reduxState.startups.current,
// });

// export default withRouter(connect(mapStateToProps, { fetchStartup })(PostListItem));

export default PostListItem;
