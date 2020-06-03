import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchStartupByUserID, fetchPosts, fetchPost } from '../../actions/index';
import AddPosting from './startups-modals/startup-add-posting';
import '../../styles/startup-profile.scss';

class StartupProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    // this.renderPostings = this.renderPostings.bind(this);
  }

  componentDidMount() {
    console.log('didMount');
    this.props.fetchStartupByUserID(localStorage.getItem('userID'));
    // this.props.fetchPosts();
  }

  showModal = () => {
    this.setState({
      show: true,
    });
  };

  hideModal = () => {
    this.setState({
      show: false,
    });
  };

  // eslint-disable-next-line consistent-return
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

  renderPostings = (e) => {
    if (this.props.startup.posts && this.props.startup.posts.length && typeof this.props.startup !== 'undefined') {
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
              <div className="startup-add-posting-box">
                <span className="startup-postings-h1">Volunteer Positions:</span>
                <button type="button"
                  className="startup-add-posting-btn"
                  onClick={() => {
                    this.showModal();
                  }}
                >
                  <i className="fas fa-plus" />
                </button>
              </div>
              <ul className="startup-postings-list">
                {mappingPostings}
              </ul>
            </div>
          ) : (<div />)
      );
    } else {
      return (
        <div className="startup-postings">
          <div className="startup-add-posting-box">
            <span className="startup-postings-h1">Volunteer Positions:</span>
            <button type="button"
              className="startup-add-posting-btn"
              onClick={() => {
                this.showModal();
              }}
            >
              <i className="fas fa-plus" />
            </button>
          </div>
        </div>
      );
    }
  }

  renderIndustries() {
    console.log(this.props.startup.industries);
    if (typeof this.props.startup.industries !== 'undefined') {
      return (
        this.props.startup.industries.map((industry) => {
          return (
            <div className="industry" key={industry}>{industry}</div>
          );
        })
      );
    } else {
      return (
        <div>Loading</div>
      );
    }
  }

  renderStartup() {
    if (typeof this.props.startup !== 'undefined') {
      return (
        <div className="startup-body">
          <AddPosting onClose={this.hideModal} show={this.state.show} />
          <h1 className="startup-name">{`${this.props.startup.name}`}</h1>
          <div className="startup-location">Location: {`${this.props.startup.location}`}</div>
          <div className="startup-industries"><div>Industry: </div>{this.renderIndustries()}</div>
          <div className="startup-description">About {`${this.props.startup.name}`}:<br /><br />{`${this.props.startup.description}`}</div>
        </div>
      );
    } else {
      return (
        <div>Startup profile does not exist</div>
      );
    }
  }

  render() {
    return (
      <div className="startup">
        { this.renderPostings() }
        { this.renderStartup() }
      </div>
    );
    /* if (this.props.startup.status === 'Approved') {
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
    } */
  }
}

function mapStateToProps(reduxState) {
  return {
    startup: reduxState.startups.current,
    // posts: reduxState.posts.all,
  };
}

export default withRouter(connect(mapStateToProps, { fetchStartupByUserID, fetchPosts, fetchPost })(StartupProfile));
