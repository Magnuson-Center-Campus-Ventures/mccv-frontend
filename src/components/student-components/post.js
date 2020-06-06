/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchPost, fetchApplication, fetchUser,
} from '../../actions';
import Application from './student-modals/application';
import Archive from '../admin-modals/archive';
import pin from '../../../static/img/pin.png';
import '../../styles/post.scss';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applyShow: false,
      archiveShow: false,
      isEditing: false,
    };
    this.showApplyModal = this.showApplyModal.bind(this);
    this.hideApplyModal = this.hideApplyModal.bind(this);
    this.showArchiveModal = this.showArchiveModal.bind(this);
    this.hideArchiveModal = this.hideArchiveModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
    this.props.fetchUser(localStorage.getItem('userID'));
  }

  // onArchive(id, post) {
  //   this.props.updatePost(id, post);
  // }

  showApplyModal = (e) => {
    this.props.fetchApplication(this.props.current?.application_id);
    this.setState({
      applyShow: true,
    });
  };

  showArchiveModal = (e) => {
    this.setState({
      archiveShow: true,
    });
  }

  hideApplyModal = (e) => {
    this.setState({
      applyShow: false,
    });
  }

  hideArchiveModal = (e) => {
    this.setState({
      archiveShow: false,
    });
  }

  editMode = (e) => {
    this.setState({
      isEditing: true,
    });
    console.log(this.state.isEditing);
  }


  requiredSkillsHelper= () => {
    const requiredSkills = [];
    if (this.props.current?.required_skills) {
      for (const [index, value] of this.props.current.required_skills.entries()) {
        requiredSkills.push(
          // eslint-disable-next-line no-loop-func
          <li id="skill" key={index}>{value.name}</li>,
        );
      }
      return requiredSkills;
    } else {
      return <div />;
    }
  }

  preferredSkillsHelper = () => {
    const preferredSkills = [];
    if (this.props.current?.preferred_skills) {
      for (const [index, value] of this.props.current.preferred_skills.entries()) {
        preferredSkills.push(
          // eslint-disable-next-line no-loop-func
          <li id="skill" key={index}>{value.name}</li>,
        );
      }
      return preferredSkills;
    } else {
      return <div />;
    }
  }

  responsibilitiesHelper = () => {
    const responsibilities = [];
    if (this.props.current?.responsibilities) {
      for (let i = 0; i < this.props.current.responsibilities.length; i++) {
        responsibilities.push(
          <li id="responsibility" key={this.props.current.responsibilities[i]}>{this.props.current.responsibilities[i]}</li>,
        );
      }
      return responsibilities;
    } else {
      return <div />;
    }
  }

  // eslint-disable-next-line consistent-return
  renderButtons() {
    if (this.props.user.role === 'admin') {
      return (
        <button
          type="submit"
          onClick={(e) => {
            this.showArchiveModal();
          }}
        >
          Archive Position
        </button>
      );
    } else if (this.props.user.role === 'startup') {
      return (
        <div className="post-startup-buttons">
          <button
            type="submit"
            onClick={(e) => {
              this.showArchiveModal();
            }}
          >
            Archive Position
          </button>

          <button id="edit-post"
            type="submit"
            onClick={(e) => {
              this.editMode();
            }}
          >Edit Position
          </button>
        </div>
      );
    } else if (this.props.user.role === 'student') {
      return (
        <button id="submit-app"
          type="submit"
          onClick={(e) => {
            this.showApplyModal();
          }}
        >Apply Now!
        </button>
      );
    }
  }

  render() {
    if (this.props.current?.startup_id) {
      return (
        <div>
          <Application onClose={this.hideApplyModal} show={this.state.applyShow} />
          <Archive post={this.props.current} onClose={this.hideArchiveModal} show={this.state.archiveShow} />
          <h1 id="title">{this.props.current.title}</h1>
          <div className="bar">
            <img src={this.props.current.startup_id.logo} alt="no logo" />
            <h2 id="name">{this.props.current.startup_id.name}</h2>
            <img src={pin} alt="location" />
            <h2 id="name">{`${this.props.current.city}, ${this.props.current.state}`}</h2>
          </div>
          <div className="top">
            <div id="project">
              <h2>Project Description</h2>
              <h3 id="post-description">{this.props.current.description}</h3>
            </div>
            <div id="skills-section">
              <h2>Required Skills</h2>
              <ul id="skills">{this.requiredSkillsHelper()}</ul>
              <h2>Preferred Skills</h2>
              <ul id="skills">{this.preferredSkillsHelper()}</ul>
            </div>
          </div>
          <div className="bottom">
            <h2>Responsibilities</h2>
            <ul id="skills">{this.responsibilitiesHelper()}</ul>
          </div>
          {this.renderButtons()}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (reduxState) => ({
  current: reduxState.posts.current,
  user: reduxState.user.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchPost, fetchUser, fetchApplication,
})(Post));
