/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import {
  fetchPost, createSkillForPost, updatePost, fetchAllSkills,
} from '../../../actions';

class AddPostReqSkills extends Component {
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
    if (!this.props.post.required_skills.includes(this.getSkill(this.state.skill))) {
      this.props.post.required_skills.push(this.getSkill(this.state.skill));
    }
    this.state.displaySkills = this.state.displaySkills.filter((value) => {
      return (value.label !== this.state.skill);
    });
    this.state.skill = '';
    this.forceUpdate();
  }

  deleteSkill = (skill) => {
    this.props.post.required_skills = this.props.post.required_skills.filter((value) => {
      return (value !== skill.skill);
    });
    this.state.displaySkills.push({ label: skill.skill.name });
    this.forceUpdate();
  }

  populateCurrentSkills() {
    this.props.post.required_skills.forEach((value) => {
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
      <div className="question-fields-items-header">
        <p className="question-fields-title">Required Skills</p>
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
    if (this.props.post?.required_skills) {
      return (
        this.props.post.required_skills.map((skill) => {
          return (
            <div className="question-fields-item" key={skill.name}>
              {skill.name}
              <button type="submit" className="question-fields-button" style={{ cursor: 'pointer' }} onClick={() => { this.deleteSkill({ skill }); }}>
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
    if (this.props.post.required_skills !== undefined && this.props.skills.all !== []) {
      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Required Skills</h1>
              <p>What skills are required for your volunteer position?</p>
            </div>
            <i className="fas fa-brain question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            {this.renderAddSkill()}
            <div className="question-fields-items">{this.renderSkills()}</div>
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
  post: reduxState.posts.current,
  skills: reduxState.skills.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchPost, createSkillForPost, updatePost, fetchAllSkills,
})(AddPostReqSkills));
