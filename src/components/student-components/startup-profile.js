/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchStartup, fetchPosts, fetchPost, fetchUser,
} from '../../actions/index';
import Archive from '../admin-modals/archive';
import '../../styles/startup-profile.scss';

class Startup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archiveShow: false,
    };
    this.renderPostings = this.renderPostings.bind(this);
    this.showArchiveModal = this.showArchiveModal.bind(this);
    this.hideArchiveModal = this.hideArchiveModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchStartup(this.props.match.params.startupID);
    this.props.fetchPosts();
    this.props.fetchUser(localStorage.getItem('userID'));
  }

  showArchiveModal = (e) => {
    this.setState({
      archiveShow: true,
    });
  }

  hideArchiveModal = (e) => {
    this.setState({
      archiveShow: false,
    });
  }

  renderDescription = (post) => {
    if (post.description !== undefined) {
      // console.log(post.description);
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
              <h1>Volunteer Positions:</h1>
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

  renderButtons() {
    if (this.props.user.role === 'admin') {
      return (
        <button
          type="submit"
          onClick={(e) => {
            this.showArchiveModal();
          }}
        >
          Archive
        </button>
      );
    } else {
      return (<div />);
    }
  }

  renderStartup() {
    if (this.props.startup) {
      return (
        <div className="startup-body">
          <h1 className="startup-name">{`${this.props.startup.name}`}</h1>
          <div className="startup-location">Location: {`${this.props.startup.city}, ${this.props.startup.state}`}</div>
          <div className="startup-industries"><div>Industry: </div>{this.renderIndustries()}</div>
          <div className="startup-description">About {`${this.props.startup.name}`}:<br /><br />{`${this.props.startup.description}`}</div>
          {this.renderButtons()}
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
          <Archive startup={this.props.startup} onClose={this.hideArchiveModal} show={this.state.archiveShow} />
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
    user: reduxState.user.current,
  };
}

export default withRouter(connect(mapStateToProps, {
  fetchStartup, fetchPosts, fetchPost, fetchUser,
})(Startup));
