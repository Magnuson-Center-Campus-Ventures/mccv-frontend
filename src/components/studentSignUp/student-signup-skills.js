/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import '../../styles/studentSignUp/student-signup-industries.scss';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
  fetchAllSkills, fetchCertainSkills, createSkill,
} from '../../actions';

class StudentSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      skill: '',
      nameSkills: [],
      allSkillOptions: [],
    };

    this.onSkillChange = this.onSkillChange.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchAllSkills();
    this.props.fetchStudentByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ student: this.props.student });
    }
    if (prevProps.student.skills !== this.props.student.skills) {
      this.props.student.skills.forEach((skillID) => {
        const name = this.getSkillName(skillID);
        if (!this.state.nameSkills.includes(name)) {
          this.state.nameSkills.push(name);
        }
      });
    }
    if (prevProps.student.skills !== this.props.student.skills) {
      // Set up options for dropdown
      const allSkillOptions = this.props.skills.all.map((skill) => {
        return { value: skill.name, label: skill.name, skill };
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ allSkillOptions });
    }
  }

  // not done
  //  onSubmit = () => {
  //    this.props.updateStudent(this.state.student.id, this.state.student);
  //    this.state.newSkills.forEach((skill) => this.props.createSkill(skill));
  //    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  //  }

  onSkillChange(event) {
    this.setState({
      skill: event.target.value,
    });
  }

  getSkillName(id) {
    const skillObject = this.props.skills.all.find((skill) => {
      return (skill.id === id);
    });
    return skillObject.name;
  }

   addSkill = () => {
     if (!this.state.nameSkills.includes(this.state.skill)) {
       this.state.nameSkills.push(this.state.skill);
     }
     this.state.skill = '';
     this.forceUpdate();
   }

    deleteSkill = (skill) => {
      const skills = this.state.nameSkills.filter((value) => {
        return (value !== skill.skill);
      });
      this.state.nameSkills = skills;
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
            options={this.state.allSkillOptions}
            onChange={(selectedOption) => {
              this.state.skill = selectedOption.value;
              this.addSkill();
            }}
            onCreateOption={(newOption) => {
              this.state.skill = newOption;
              this.addSkill();
            }}
          />
        </div>
      );
    }

    renderSkills() {
      return (
        this.state.nameSkills.map((skill) => {
          return (
            <div className="skill" key={skill}>
              <div className="text">
                {skill}
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
      // still have occasional rendering issue
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
            <div className="buttonContainer">
              <button type="submit" className="submit-btn-student-timing" style={{ cursor: 'pointer' }} onClick={this.onSubmit}>
                Submit!
              </button>
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
  fetchStudentByUserID, fetchUser, updateStudent, fetchAllSkills, fetchCertainSkills, createSkill,
})(StudentSkills));
