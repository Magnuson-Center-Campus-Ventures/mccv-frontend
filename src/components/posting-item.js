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
      startup: [],
    };
  }

  componentDidMount() {
    console.log('from mount', findStartup(this.props.post.startup_id));
    this.setState({ startup: findStartup(this.props.post.startup_id) });
    // console.log(this.props.post.startup_id);
    // this.props.fetchStartup(this.props.post.startup_id);
  }


  render() {
    const route = `/posts/${this.props.post._id}`;
    // console.log(this.props.startup.name);
    // const startup = await findStartup(this.props.post.startup_id);

    // console.log(this.props.post.startup_id);
    console.log('from render fxn', this.state.startup);
    return (
      <Link to={route} key={this.props.post.id} className="listItem link">
        <div className="companyInfo">
          {/* <img src={startup.logo} alt="no logo" />
          <div className="companyText">
            <h1 id="startupName"> {startup.name} </h1>
            <div className="location">
              <span className="locationIcon" />
              <h2> {startup.location} </h2>
            </div>
          </div> */}
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
