/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import '../../../styles/startup-add-post/add-post-industries.scss';
import {
  fetchPost, updatePost, fetchAllSkills, fetchCertainSkills, createSkillForStudent,
} from '../../../actions';

class AddPostPrefSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      skill: '',
      selectedSkills: [],
      displaySkills: [],
    };
  }

  // Get profile info
  componentDidMount() {
    console.log('skills did mount');
    console.log(this.props.post.id);
    this.props.fetchPost(this.props.post.id);
    // this.props.fetchPost(localStorage.getItem('postID'));
    this.props.fetchAllSkills();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post !== {} && prevProps.post !== this.props.post) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ post: this.props.post });
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
    this.props.post.preferred_skills.forEach((value) => {
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
            this.state.skill = newOption;
            this.props.createSkillForStudent({ name: newOption }, this.props.post.preferred_skills);
          }}
        />
      </div>
    );
  }

  renderSkills() {
    if (this.props.post?.preferred_skills) {
      return (
        this.props.post.preferred_skills.map((skill) => {
          return (
            <div className="skill" key={skill.name}>
              {skill.name}
              <button type="submit" className="delete-btn-student-skills" style={{ cursor: 'pointer' }} onClick={() => { this.deleteSkill({ skill }); }}>
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
    if (this.state.post.preferred_skills !== undefined && this.props.skills !== []) {
      return (
        <div className="AddPostPrefSkillsContainer">
          <div className="AddPostPrefSkillsHeaderContainer">
            <h1 className="AddPostPrefSkillsHeader">
              Skills
            </h1>
          </div>
          <div className="AddPostPrefSkillsDescContainer">
            <p className="AddPostPrefSkillsDesc">
              Add the skills you have!
            </p>
            <i className="fas fa-brain" id="icon" />
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
        <div>loading</div>
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
  fetchPost, updatePost, fetchAllSkills, fetchCertainSkills, createSkillForStudent,
})(AddPostPrefSkills));
