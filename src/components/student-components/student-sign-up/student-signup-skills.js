import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import '../../../styles/student-sign-up/student-signup-industries.scss';
import {
  fetchStudentByUserID, fetchUser,
  fetchAllSkills, fetchCertainSkills, createSkill,
} from '../../../actions';

class StudentSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      skill: '',
      displaySkills: [],
      allSkills: [],
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
    }
    if (prevProps.skills !== this.props.skills) {
      const skills = this.props.skills.all.map((skill) => {
        return { value: skill.name, label: skill.name, skill };
      });
      this.state.allSkills = skills;
      const displaySkills = this.state.allSkills.filter((value) => {
        return !this.props.student.skills.includes(this.getSkill(value.value));
      });
      this.state.displaySkills = displaySkills;
    }
  }

  getSkill(name) {
    const skillObject = this.props.skills.all.find((skill) => {
      return (skill.name === name);
    });
    return skillObject;
  }

  getSkillName(id) {
    const skillObject = this.props.skills.all.find((skill) => {
      return (skill.id === id);
    });
    return skillObject.name;
  }

  addSkillDB = () => {
    if (!this.state.allSkills.includes(this.state.skill)) {
      this.props.createSkill({ name: this.state.skill });
    }
    this.props.fetchAllSkills();
  }

  addSkill = () => {
    if (!this.props.student.skills.includes(this.getSkill(this.state.skill))) {
      this.props.student.skills.push(this.getSkill(this.state.skill));
    }
    const displaySkills = this.state.allSkills.filter((value) => {
      return !this.props.student.skills.includes(this.getSkill(value.value));
    });
    this.state.displaySkills = displaySkills;
    this.state.skill = '';
    this.forceUpdate();
  }

  deleteSkill = (skill) => {
    const skills = this.props.student.skills.filter((value) => {
      return (value !== skill.skill);
    });
    this.props.student.skills = skills;
    const displaySkills = this.state.allSkills.filter((value) => {
      return !this.props.student.skills.includes(this.getSkill(value.value));
    });
    this.state.displaySkills = displaySkills;
    this.forceUpdate();
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
          options={this.state.displaySkills}
          onChange={(selectedOption) => {
            this.state.skill = selectedOption.value;
            this.addSkill();
          }}
          onCreateOption={(newOption) => {
            this.state.skill = newOption;
            this.addSkillDB();
            this.addSkill();
          }}
        />
      </div>
    );
  }

  renderSkills() {
    return (
      this.props.student.skills.map((skill) => {
        return (
          <div className="skill" key={skill.id}>
            <div className="text">
              {skill.name}
            </div>
            <button type="submit" className="delete-btn-student-skills" style={{ cursor: 'pointer' }} onClick={() => { this.deleteSkill({ skill }); }}>
              <i className="far fa-trash-alt" id="icon" />
            </button>
          </div>
        );
      })
    );
  }

  render() {
    if (this.state.student.skills !== undefined && this.props.skills.all !== []) {
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
  skills: reduxState.skills,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, fetchAllSkills, fetchCertainSkills, createSkill,
})(StudentSkills));
