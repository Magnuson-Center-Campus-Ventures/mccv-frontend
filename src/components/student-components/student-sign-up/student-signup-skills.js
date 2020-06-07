/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import '../../../styles/student-sign-up/student-signup-industries.scss';
import {
  fetchStudentByUserID, fetchUser,
  fetchAllSkills, fetchCertainSkills, createSkillForStudent,
} from '../../../actions';

class StudentSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      skill: '',
      selectedSkills: [],
      displaySkills: [],
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchAllSkills();
    this.props.fetchStudentByUserID(this.props.userID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ student: this.props.student });
      this.populateCurrentSkills();
    }
  }

  getSkill(name) {
    const skillObject = this.props.skills.find((skill) => {
      return (skill.name === name);
    });
    return skillObject;
  }

<<<<<<< HEAD
  addSkillDB = () => {
    if (!this.state.allSkills.includes(this.state.skill)) {
      this.props.createSkillForStudent({ name: this.state.skill });
    }
    this.props.fetchAllSkills();
  }

=======
>>>>>>> f6c1bbe2decf17a3dd494618bca53f30fc6078a7
  addSkill = () => {
    if (!this.props.student.skills.includes(this.getSkill(this.state.skill))) {
      this.props.student.skills.push(this.getSkill(this.state.skill));
    }
    this.state.displaySkills = this.state.displaySkills.filter((value) => {
      return (value.label !== this.state.skill);
    });
    this.state.skill = '';
    this.forceUpdate();
  }

  deleteSkill = (skill) => {
    this.props.student.skills = this.props.student.skills.filter((value) => {
      return (value !== skill.skill);
    });
    this.state.displaySkills.push({ label: skill.skill.name });
    this.forceUpdate();
  }

  populateCurrentSkills() {
    this.props.student.skills.forEach((value) => {
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
            this.state.skill = newOption;
            this.props.createSkillForStudent({ name: newOption }, this.props.student);
          }}
        />
      </div>
    );
  }

  renderSkills() {
    if (this.props.student?.skills) {
      return (
        this.props.student.skills.map((skill) => {
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
    if (this.state.student.skills !== undefined && this.props.skills !== []) {
      return (
        <div className="StudentSkillContainer">
          <div className="StudentSkillHeaderContainer">
            <h1 className="StudentSkillHeader">
              Skills
            </h1>
          </div>
          <div className="StudentSkillDescContainer">
            <p className="StudentSkillDesc">
              Add the skills you have!
            </p>
            <i className="fas fa-brain" id="icon" />
          </div>
          <div id="skills">
            <div className="StudentSkillListHeader">Skills</div>
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
  student: reduxState.students.current_student,
  skills: reduxState.skills.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, fetchAllSkills, fetchCertainSkills, createSkillForStudent,
})(StudentSkills));
