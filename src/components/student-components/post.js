/* eslint-disable no-plusplus */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPost, fetchApplication } from '../../actions';
import Application from './student-modals/application';
import pin from '../../../static/img/pin.png';
import '../../styles/post.scss';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  showModal = (e) => {
    this.props.fetchApplication(this.props.current.application_id);
    this.setState({
      show: true,
    });
  };

  hideModal = (e) => {
    this.setState({
      show: false,
    });
  }

  requiredSkillsHelper= () => {
    const requiredSkills = [];
    if (this.props.current.required_skills) {
      for (const [index, value] of this.props.current.required_skills.entries()) {
        requiredSkills.push(
          // eslint-disable-next-line no-loop-func
          <li id="skill" key={index}>{value}</li>,
        );
      }
      return requiredSkills;
    } else {
      return <div />;
    }
  }

  preferredSkillsHelper = () => {
    const preferredSkills = [];
    if (this.props.current.preferred_skills) {
      for (const [index, value] of this.props.current.preferred_skills.entries()) {
        preferredSkills.push(
          // eslint-disable-next-line no-loop-func
          <li id="skill" key={index}>{value}</li>,
        );
      }
      return preferredSkills;
    } else {
      return <div />;
    }
  }

  responsibilitiesHelper = () => {
    const responsibilities = [];
    if (this.props.current.responsibilities) {
      for (let i = 0; i < this.props.current.responsibilities.length; i++) {
        console.log(this.props.current.responsibilities[i]);
        responsibilities.push(
          <li id="responsibility" key={this.props.current.responsibilities[i]}>{this.props.current.responsibilities[i]}</li>,
        );
      }
      return responsibilities;
    } else {
      return <div />;
    }
  }

  render() {
    if (this.props.current.startup_id) {
      return (
        <div>
          <Application onClose={this.hideModal} show={this.state.show} />
          <h1 id="title">{this.props.current.title}</h1>
          <div className="bar">
            <img src={this.props.current.startup_id.logo} alt="no logo" />
            <h2 id="name">{this.props.current.startup_id.name}</h2>
            <img src={pin} alt="location" />
            <h2 id="name">{this.props.current.location}</h2>
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
          <button id="submit-app"
            type="submit"
            onClick={(e) => {
              this.showModal();
            }}
          >Apply Now!
          </button>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (reduxState) => ({
  current: reduxState.posts.current,
});

export default withRouter(connect(mapStateToProps, { fetchPost, fetchApplication })(Post));
