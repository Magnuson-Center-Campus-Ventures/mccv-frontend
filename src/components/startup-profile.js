import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchStartup, fetchPosts, fetchPost } from '../actions/index';
import '../styles/startup-profile.scss';

const ID = '5ec9848db73b4100389ff67f';

class Startup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderPostings = this.renderPostings.bind(this);
  }

  componentDidMount() {
    this.props.fetchStartup(ID);
    this.props.fetchPosts();
  }

  renderDescription() {
    if (this.post.description.length > 100) {
      this.description = `${this.post.description.substring(0, 99)}...`;
      return (
        <div className="startup-posting-description">{this.description}</div>
      );
    } else {
      return (
        <div className="startup-posting-description">{this.post.description}</div>
      );
    }
  }

  renderPostings() {
    if (this.props.posts && this.props.posts.length && typeof this.props.startup !== 'undefined') {
      const mappingPostings = this.props.startup.posts.map((postID) => {
        this.post = this.props.posts.find((x) => x.id === postID);
        return (
          <li className="startup-posting" key={postID}>
            <div className="startup-posting-title">{this.post.title}</div>
            <br />
            {this.renderDescription()}
            <br />
            <div className="startup-posting-time">Time Commitment: {this.post.time_commitment} hours per week</div>
          </li>
        );
      });
      return (
        this.props.posts !== undefined
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
      this.props.startup.industry.map((industry) => {
        return (
          <div className="industry" key={industry}>{industry}</div>
        );
      })
    );
  }

  renderStartup() {
    if (typeof this.props.startup !== 'undefined') {
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
