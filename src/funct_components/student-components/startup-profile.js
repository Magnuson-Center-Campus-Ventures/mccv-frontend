/* eslint-disable consistent-return */
/* eslint-disable react/sort-comp */
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
    if (this.props.startup.posts && this.props.startup.posts.length && typeof this.props.startup !== 'undefined') {
      const mappingPostings = this.props.startup.posts.forEach((post) => {
        const virtual = (post.virtual === true) ? (
          <div className="location">
            <span className="virtualIcon" />
            <span className="postLocation">Virtual</span>
          </div>
        ) : (
          <div />
        );

        const inperson = (post.city && post.state) ? (
          <div className="location">
            <span className="locationIcon" />
            <span className="postLocation"> {`${post.city}, ${post.state}`} </span>
          </div>
        ) : (
          <div />
        );

        const start = new Date(post.desired_start_date);
        const end = new Date(post.desired_end_date);

        const startDate = (start) ? (
          <span className="dateText">Starts {`${start.getMonth() + 1}/${start.getDate()}/${start.getFullYear()}`}</span>
        ) : (
          <div />
        );

        const endDate = (end) ? (
          <span className="dateText">Ends {`${end.getMonth() + 1}/${end.getDate()}/${end.getFullYear()}`}</span>
        ) : (
          <div />
        );

        if (post.status === 'Approved') {
          return (
            <li className="startup-posting" key={post._id}>
              <Link to={`/posts/${post._id}`} key={post.id} className="postLink">
                <div className="postInfo">
                  <h1 className="postTitle">{ post.title}</h1>
                  {virtual}
                  {inperson}
                  <div className="dates">
                    {startDate}
                    {endDate}
                  </div>
                  <div className="startup-posting-time">Time Commitment: {post.time_commitment} hours per week</div>
                  {/* <div className="startup-posting-status">Status: {post.status}</div> */}
                  <div className="applicationStatusRow">
                    <div id="pillsTitle">Status: </div>
                    <div className="greenPill">Approved</div>
                  </div>
                </div>
              </Link>
            </li>
          );
        }
      });
      return (
        this.props.startup.posts !== undefined
          ? (
            <div className="startup-postings">
              <h1 className="startup-postings-header">Volunteer Positions:</h1>
              <ul className="startup-postings-list">
                {mappingPostings}
              </ul>
            </div>
          ) : (<div />)
      );
    } else {
      return (
        <div className="startup-postings">
          <h1 className="startup-postings-header">Volunteer Positions:</h1>
          <ul className="startup-postings-list" />
        </div>
      );
    }
  }

  renderIndustries() {
    if (this.props.startup?.industries) {
      return (
        this.props.startup.industries.map((industry) => {
          return (
            <div className="yellowPill" key={industry.id}>
              {industry.name}
            </div>
            // <div className="startup-industry" key={industry.name}>{industry.name}</div>
          );
        })
      );
    }
  }

  renderButtons() {
    if (this.props.user.role === 'admin') {
      if (this.props.startup?.status === 'Approved') {
        return (
          <div className="startup-profile-admin-button-row">
            <button className="startup-profile-admin-button"
              type="submit"
              onClick={(e) => {
                this.showArchiveModal();
              }}
            >
              Archive
            </button>
          </div>
        );
      } else if (this.props.startup?.status === 'Pending') {
        return (
          <div className="startup-profile-admin-button-row">
            <button className="startup-profile-admin-button"
              type="submit"
              onClick={(e) => {
                this.showApproveModal();
              }}
            >
              Approve
            </button>
            <button className="startup-profile-admin-button"
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

  renderLogo() {
    if (this.props.startup?.logo) {
      return (<img className="startup-logo" id="logo" alt="" src={this.props.startup.logo} />);
    }
  }

  renderVideo() {
    if (this.props.startup?.video) {
      return (
        <div className="startup-video">
          <iframe
            title="videoLarge"
            className="embed-responsive-item"
            allow="fullscreen"
            src={this.props.startup.video}
          />
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }

  logoCompanyName = () => {
    if (this.props.startup.logo) {
      return (
        <div className="profileCompanyInfo">
          <div className="profileCompanyLeft">
            <img src={this.props.startup.logo} alt="no logo" className="profileCompanyLogo" />
          </div>
          <div className="profileCompanyRight">
            <div className="profileCompanyTitle"> { this.props.startup.name} </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="profileCompanyTitle"> { this.props.startup.name} </div>
        </div>
      );
    }
  }

  renderStartupProfileDescription = () => {
    if (this.props.startup.description) {
      return (
        <div>{this.props.startup.description}</div>
      );
    } else {
      return (<div />);
    }
  }

  renderEmail() {
    if (this.props.startup.contact_email) {
      return (
        <div className="startup-header">Email: {this.props.startup.contact_email}</div>
      );
    } else {
      return (
        <div />
      );
    }
  }

  renderLocation = () => {
    if (this.props.startup.city && this.props.startup.state) {
      return (
        <div className="startup-header">
          <span className="locationIcon" />
          <span className="position-location"> {`${this.props.startup.city}, ${this.props.startup.state}`} </span>
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }

  renderStartup() {
    if (this.props.startup) {
      return (
        <div className="startup-body">
          <div className="startup-body-text">
            <div className="startup-header">
              {this.logoCompanyName()}
            </div>

            <div className="startup-profile-info">
              {/* <div className="startup-location startup-header">Location: {`${this.props.startup.city}`}, {`${this.props.startup.state}`}</div> */}
              {this.renderLocation()}
              {this.renderEmail()}
              <div className="startup-industries">Industries: {this.renderIndustries()}</div>
            </div>

            <div className="startup-description">
              <h3>About {`${this.props.startup.name}`}:</h3>
              {this.renderStartupProfileDescription()}
            </div>

            {this.renderVideo()}

            {/* <div className="startup-header">
              {this.renderLogo()}
              <h1>{`${this.props.startup.name}`}</h1>
            </div>
            <div className="startup-location startup-header">Location: {`${this.props.startup.city}`}, {`${this.props.startup.state}`}</div>
            <div className="startup-header">Industries:</div>
            <div className="startup-industries">{this.renderIndustries()}</div>
            {this.props.user.role === 'admin' ? (
              <div> Affiliation: {this.props.startup.affiliation}</div>
            ): (<div/>)}
            <div className="startup-description">
              <p>About {`${this.props.startup.name}`}:</p>
              <div className="startup-description">{`${this.props.startup.description}`}</div>
            </div>
            <div className="startup-video">
              {this.renderVideo()}
            </div> */}

            {this.renderButtons()}
          </div>
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
