/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import '../../../styles/startup-add-post/add-post-pref-skills.scss';
import {
  fetchPost, createSkillForPost, updatePost, fetchAllSkills,
} from '../../../actions';

class AddPostPrefSkillss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: '',
      selectedSkills: [],
      displaySkills: [],
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchAllSkills();
    this.props.fetchPost(this.props.post.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post !== {} && prevProps.post !== this.props.post) {
      this.populateCurrentSkills();
    }
  }

  getSkill(name) {
    const skillObject = this.props.skills.find((skill) => {
      return (skill.name === name);
    });
    return skillObject;
  }

  addSkill = () => {
    if (!this.props.post.preferred_skills.includes(this.getSkill(this.state.skill))) {
      this.props.post.preferred_skills.push(this.getSkill(this.state.skill));
    }
    this.state.displaySkills = this.state.displaySkills.filter((value) => {
      return (value.label !== this.state.skill);
    });
    this.state.skill = '';
    this.forceUpdate();
  }

  deleteSkill = (skill) => {
    this.props.post.preferred_skills = this.props.post.preferred_skills.filter((value) => {
      return (value !== skill.skill);
    });
    this.state.displaySkills.push({ label: skill.skill.name });
    this.forceUpdate();
  }

  populateCurrentSkills() {
    this.props.post.preferred_skills.forEach((value) => {
      if (!this.state.selectedSkills.includes(value.name)) {
        this.state.selectedSkills.push(value.name);
      }
    });
    this.props.skills.forEach((value) => {
      if (!this.state.selectedSkills.includes(value.name)) {
        this.state.displaySkills.push({ label: value.name });
      }
    });
  }

  renderAddSkill() {
    const customStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      <div className="add-skills">
        <CreateableSelect
          className="select-dropdown"
          styles={customStyles}
          name="skills"
          value={this.state.skill}
          options={this.state.displaySkills}
          onChange={(selectedOption) => {
            this.state.skill = selectedOption.label;
            this.addSkill();
          }}
          onCreateOption={(newOption) => {
            this.state.skill = newOption;
            this.props.createSkillForPost({ name: newOption }, this.props.post);
          }}
        />
      </div>
    );
  }

  renderSkills() {
    // eslint-disable-next-line camelcase
    if (this.props.post?.preferred_skills) {
      return (
        this.props.post.preferred_skills.map((skill) => {
          return (
            <div className="skill" key={skill.name}>
              {skill.name}
              <button type="submit" className="delete-btn-post-skills" style={{ cursor: 'pointer' }} onClick={() => { this.deleteSkill({ skill }); }}>
                <i className="far fa-trash-alt" id="icon" />
              </button>
            </div>
          );
        })
      );
    } else {
      return (
        <div>Loading</div>
      );
    }
  }

  render() {
    // still have occasioanl rendering issue for skills.all
    if (this.props.post.preferred_skills !== undefined && this.props.skills.all !== []) {
      return (
        <div className="AddPostPrefSkillsContainer">
          <div className="AddPostPrefSkillsHeaderContainer">
            <h1 className="AddPostPrefSkillsHeader">
              Preferred Skills
            </h1>
          </div>
          <div className="AddPostPrefSkillsDescContainer">
            <p className="AddPostPrefSkillsDesc">
              What skills are preferred for your volunteer position?
            </p>
            <i className="fas fa-building" id="icon" />
          </div>
          <div id="skills">
            <div className="AddPostPrefSkillsListHeader">Skills</div>
            {this.renderAddSkill()}
            {this.renderSkills()}
          </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  post: reduxState.posts.current,
  skills: reduxState.skills.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchPost, createSkillForPost, updatePost, fetchAllSkills,
})(AddPostPrefSkillss));
