import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchStartup, fetchPosts, fetchPost } from '../../actions/index';
import '../../styles/startup-profile.scss';

class Startup extends Component {
  componentDidMount() {
    this.props.fetchStartup(this.props.match.params.startupID);
  }

  renderDescription = (post) => {
    if (post.description.length > 100) {
      const description = `${post.description.substring(0, 99)}...`;
      return (
        <div className="startup-posting-description">{description}</div>
      );
    } else {
      return (
        <div className="startup-posting-description">{post.description}</div>
      );
    }
  }

  renderPostings() {
    if (this.props.startup.posts) {
      const mappingPostings = this.props.startup.posts.map((post) => {
        return (
          <li className="startup-posting" key={post._id}>
            <div className="startup-posting-title">{post.title}</div>
            <br />
            {this.renderDescription(post)}
            <br />
            <div className="startup-posting-time">Time Commitment: {post.time_commitment} hours per week</div>
          </li>
        );
      });
      return (
        this.props.startup.posts !== undefined
          ? (
            <div className="startup-postings">
              <h1>Internship Postings:</h1>
              <ul className="startup-postings-list">
                {mappingPostings}
              </ul>
            </div>
          ) : (<div />)
      );
    } else {
      return (
        <div>posts are undefined</div>
      );
    }
  }

  renderIndustries() {
    return (
      this.props.startup.industries.map((industry) => {
        return (
          <div className="industry" key={industry}>{industry}</div>
        );
      })
    );
  }

  renderStartup() {
    if (this.props.startup) {
      return (
        <div className="startup-body">
          <h1 className="startup-name">{`${this.props.startup.name}`}</h1>
          <div className="startup-location">Location: {`${this.props.startup.location}`}</div>
          <div className="startup-industries"><div>Industry: </div>{this.renderIndustries()}</div>
          <div className="startup-description">About {`${this.props.startup.name}`}:<br /><br />{`${this.props.startup.description}`}</div>
        </div>
      );
    } else {
      return (
        <div>Startups are undefined</div>
      );
    }
  }

  render() {
    if (this.props.startup.status === 'Approved') {
      return (
        <div className="startup">
          {this.renderPostings()}
          {this.renderStartup()}
        </div>
      );
    } else {
      return (
        <div>Company not Approved</div>
      );
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    startup: reduxState.startups.current,
    posts: reduxState.posts.all,
  };
}

export default withRouter(connect(mapStateToProps, { fetchStartup, fetchPosts, fetchPost })(Startup));
