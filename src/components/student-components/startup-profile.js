/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  fetchStartup, fetchPosts, fetchPost, fetchUser,
} from '../../actions/index';
import Archive from '../admin-modals/archive';
import Approve from '../admin-modals/approve';
import Deny from '../admin-modals/deny';
import '../../styles/startup-profile.scss';

class Startup extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      archiveShow: false,
      approveShow: false,
      denyShow: false,
    };
    this.renderPostings = this.renderPostings.bind(this);
    this.showArchiveModal = this.showArchiveModal.bind(this);
    this.hideArchiveModal = this.hideArchiveModal.bind(this);
    this.showApproveModal = this.showApproveModal.bind(this);
    this.hideApproveModal = this.hideApproveModal.bind(this);
    this.showDenyModal = this.showDenyModal.bind(this);
    this.hideDenyModal = this.hideDenyModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchStartup(this.props.match.params.startupID);
    this.props.fetchPosts();
    this.props.fetchUser(localStorage.getItem('userID'));
    this._isMounted = true;
  }

  showArchiveModal = (e) => {
    this.setState({ archiveShow: true });
  }

  hideArchiveModal = (e) => {
    this.setState({ archiveShow: false });
  }

  showApproveModal = (e) => {
    this.setState({ approveShow: true });
  }

  hideApproveModal = (e) => {
    this.setState({ approveShow: false });
  }

  showDenyModal = (e) => {
    this.setState({ denyShow: true });
  }

  hideDenyModal = (e) => {
    this.setState({ denyShow: false });
  }

  renderDescription = (post) => {
    if (post.description) {
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
    if (this.props.startup?.posts) {
      const mappingPostings = this.props.startup.posts.map((post) => {
        const route = `/posts/${post._id}`;
        return (
          <li className="startup-posting" key={post._id}>
            <Link to={route} key={post.id} className="postingLink">
              <div className="startup-posting-title">{post.title}</div>
              <br />
              {this.renderDescription(post)}
              <br />
              <div className="startup-posting-time">Time Commitment: {post.time_commitment} hours per week</div>
            </Link>

          </li>
        );
      });
      return (
        this.props.startup.posts
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
    if (this.props.startup?.industries) {
      return (
        this.props.startup.industries.map((industry) => {
          return (
            <div className="industry" key={industry.name}>{industry.name}</div>
          );
        })
      );
    }
  }

  renderButtons() {
    if (this.props.user.role === 'admin') {
      if (this.props.startup?.status === 'Approved') {
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
      } else if (this.props.startup?.status === 'Pending') {
        return (
          <div>
            <button
              type="submit"
              onClick={(e) => {
                this.showApproveModal();
              }}
            >
              Approve
            </button>
            <button
              type="submit"
              onClick={(e) => {
                this.showDenyModal();
              }}
            >
              Deny
            </button>
          </div>

        );
      }
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
    if (this._isMounted) {
      if (this.props.startup?.status === 'Approved') {
        return (
          <div className="startup">
            {this.renderPostings()}
            <Archive startup={this.props.startup} onClose={this.hideArchiveModal} show={this.state.archiveShow} />
            {this.renderStartup()}
          </div>
        );
      } else if (this.props.user.role === 'admin') {
        return (
          <div className="startup">
            {this.renderPostings()}
            <Approve startup={this.props.startup} onClose={this.hideApproveModal} show={this.state.approveShow} />
            <Deny startup={this.props.startup} onClose={this.hideDenyModal} show={this.state.denyShow} />
            {this.renderStartup()}
          </div>
        );
      } else {
        return (
          <div>Company not Approved</div>
        );
      }
    } else {
      return (
        <div />
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
