/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import CreateableSelect from 'react-select/creatable';
import {
  fetchStudentByUserID, fetchWorkExperiences, updateStudent, fetchUser,
  updateWorkExperience, deleteWorkExperience, updateOtherExperience,
  deleteOtherExperience, fetchOtherExperiences, fetchCertainIndustries,
  fetchCertainSkills, fetchCertainClasses, fetchAllIndustries,
  fetchAllClasses, fetchAllSkills,
  createIndustry, createSkill, createClass,
} from '../actions';
import NewWorkExp from './student-components/student-modals/new-work-exp';
import NewOtherExp from './student-components/student-modals/new-other-exp';
import '../styles/student-profile.scss';

class StudentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      showWorkExpModal: false,
      showOtherExpModal: false,
      student: {},
      workExps: [],
      otherExps: [],
      ownIndustries: [],
      ownSkills: [],
      ownClasses: [],
      allIndustryOptions: [],
      selectedIndustryOptions: [],
      allSkillOptions: [],
      selectedSkillOptions: [],
      allClassOptions: [],
      selectedClassOptions: [],
    };
  }

  componentDidMount() {
    this.props.fetchStudentByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
    this.props.fetchAllIndustries();
    this.props.fetchAllSkills();
    this.props.fetchAllClasses();
  }

  // Get student fields into state (for editing),
  // and fetch a student's work experiences,
  // once the student is loaded into props
  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      this.props.fetchWorkExperiences(this.props.student.work_exp);
      this.props.fetchOtherExperiences(this.props.student.other_exp);
      this.props.fetchCertainIndustries(this.props.student.interested_industries);
      this.props.fetchCertainSkills(this.props.student.skills);
      this.props.fetchCertainClasses(this.props.student.relevant_classes);
      this.setState({ student: this.props.student });
    }

    if (prevProps.workExps !== this.props.workExps) {
      this.setState({ workExps: this.props.workExps });
    }

    if (prevProps.otherExps !== this.props.otherExps) {
      this.setState({ otherExps: this.props.otherExps });
    }

    if (prevProps.ownIndustries !== this.props.ownIndustries) {
      // When industries are initially loaded from redux state, or redux state changes,
      // updated local state for industries and the student's industries ids
      const industryIDs = this.props.ownIndustries.map((industry) => { return industry._id; });
      const student = { ...prevState.student };
      student.interested_industries = industryIDs;
      this.setState({
        ownIndustries: this.props.ownIndustries,
        student,
      });
      // Set up options for dropdown
      const allIndustryOptions = this.props.allIndustries.map((industry) => {
        return { value: industry.name, label: industry.name, industry };
      });
      // Set initial dropdown options to be the indutries the student already has
      const selectedIndustryOptions = allIndustryOptions.filter((option) => {
        return industryIDs.includes(option.industry._id);
      });
      this.setState({ allIndustryOptions, selectedIndustryOptions });
    }

    if (prevProps.ownSkills !== this.props.ownSkills) {
      // When skills are initially loaded from redux state, or redux state changes,
      // updated local state for skills and the student's skills ids
      const skillIDs = this.props.ownSkills.map((skill) => { return skill._id; });
      const student = { ...prevState.student };
      student.skills = skillIDs;
      this.setState({
        ownSkills: this.props.ownSkills,
        student,
      });
      // Set up options for dropdown
      const allSkillOptions = this.props.allSkills.map((skill) => {
        return { value: skill.name, label: skill.name, skill };
      });
      // Set initial dropdown options to be the skills the student already has
      const selectedSkillOptions = allSkillOptions.filter((option) => {
        return skillIDs.includes(option.skill._id);
      });
      this.setState({ allSkillOptions, selectedSkillOptions });
    }

    if (prevProps.ownClasses !== this.props.ownClasses) {
      // When classes are initially loaded from redux state, or redux state changes,
      // updated local state for classes and the student's classes ids
      const classIDs = this.props.ownClasses.map((_class) => { return _class._id; });
      const student = { ...prevState.student };
      student.relevant_classes = classIDs;
      this.setState({
        ownClasses: this.props.ownClasses,
        student,
      });
      // Set up options for dropdown
      const allClassOptions = this.props.allClasses.map((_class) => {
        return { value: _class.name, label: _class.name, _class };
      });
      // Set initial dropdown options to be the classes the student already has
      const selectedClassOptions = allClassOptions.filter((option) => {
        return classIDs.includes(option._class._id);
      });
      this.setState({ allClassOptions, selectedClassOptions });
    }
  }

  changeStudentField = (field, event) => {
    // eslint-disable-next-line prefer-destructuring
    const value = event.target.value;

    this.setState((prevState) => {
      const student = { ...prevState.student };
      student[field] = value;
      return {
        ...prevState,
        student,
      };
    });
  }

  changeWorkExpField = (index, field, value) => {
    // eslint-disable-next-line prefer-destructuring
    this.setState((prevState) => {
      const workExps = [...prevState.workExps];
      workExps[index][field] = value;
      return {
        ...prevState,
        workExps,
      };
    });
  }

  changeOtherExpField = (index, field, value) => {
    // eslint-disable-next-line prefer-destructuring
    this.setState((prevState) => {
      const otherExps = [...prevState.otherExps];
      otherExps[index][field] = value;
      return {
        ...prevState,
        otherExps,
      };
    });
  }

  showWorkExpModal = () => {
    this.setState({ showWorkExpModal: true });
  };

  hideWorkExpModal = () => {
    this.setState({ showWorkExpModal: false });
  };

  showOtherExpModal = () => {
    this.setState({ showOtherExpModal: true });
  };

  hideOtherExpModal = () => {
    this.setState({ showOtherExpModal: false });
  };

  submit = () => {
    if (this.state.isEditing) {
      this.props.updateStudent(this.state.student.id, this.state.student);
      this.state.workExps.forEach((workExp) => {
        this.props.updateWorkExperience(workExp._id, workExp);
      });
      this.state.otherExps.forEach((otherExp) => {
        this.props.updateOtherExperience(otherExp._id, otherExp);
      });
      this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    } else {
      this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    }
  }

  renderMajMin = (array) => {
    if (array) {
      return array.map((elem, index) => {
        if (index < array.length - 1) {
          return (
            <div key={index} className="majors">{`${elem},`}</div>
          );
        } else {
          return (
            <div key={index} className="minors">{elem}</div>
          );
        }
      });
    } else return null;
  }

  renderPills = (pillsArray) => {
    if (pillsArray) {
      return pillsArray.map((elem, index) => {
        return <div key={index} className="profile-pill">{elem.name}</div>;
      });
    } else return null;
  }

  renderBody = () => {
    if (this.state.isEditing) {
      const customStyles = {
        control: (base) => ({
          ...base,
          width: 200,
        }),
      };
      return (
        <div className="profile-edit">
          <div className="input-title">First Name</div>
          <input className="short-input" defaultValue={this.props.student.first_name} onBlur={(event) => this.changeStudentField('first_name', event)} />
          <div className="input-title">Last Name</div>
          <input className="short-input" defaultValue={this.props.student.last_name} onBlur={(event) => this.changeStudentField('last_name', event)} />
          <div className="input-title">Email Address</div>
          <input className="short-input" defaultValue={this.props.email} onBlur={(event) => console.log(event.target.value)} />
          <div className="input-title">Phone Number</div>
          <input className="short-input" defaultValue={this.props.student.phone_number} onBlur={(event) => this.changeStudentField('phone_number', event)} />
          <div id="lists-row">
            <div className="list-section">
              <h2>Industries</h2>
              <CreateableSelect
                className="select-dropdown"
                isMulti
                styles={customStyles}
                name="industries"
                value={this.state.selectedIndustryOptions}
                options={this.state.allIndustryOptions}
                onChange={(selectedOptions) => {
                  const tempIndustries = selectedOptions.map((option) => option.industry);
                  const industryIDs = selectedOptions.map((option) => option.industry._id);
                  // Update current industries in redux state based on selected options
                  this.props.fetchCertainIndustries(industryIDs);
                  // Update the student and their current industries in local state
                  this.setState((prevState) => {
                    const student = { ...prevState.student };
                    student.interested_industries = industryIDs;
                    return {
                      ...prevState,
                      selectedIndustryOptions: selectedOptions,
                      ownIndustries: tempIndustries,
                      student,
                    };
                  });
                }}
                onCreateOption={(newOption) => {
                  this.props.createIndustry({ name: newOption });
                }}
              />
            </div>
            <div className="list-section">
              <h2>Classes</h2>
              <CreateableSelect
                className="select-dropdown"
                isMulti
                styles={customStyles}
                name="classes"
                value={this.state.selectedClassOptions}
                options={this.state.allClassOptions}
                onChange={(selectedOptions) => {
                  const tempClasses = selectedOptions.map((option) => option._class);
                  const classIDs = selectedOptions.map((option) => option._class._id);
                  // Update current classes in redux state based on selected options
                  this.props.fetchCertainClasses(classIDs);
                  // Update the student and their current classes in local state
                  this.setState((prevState) => {
                    const student = { ...prevState.student };
                    student.relevant_classes = classIDs;
                    return {
                      ...prevState,
                      selectedClassOptions: selectedOptions,
                      ownClasses: tempClasses,
                      student,
                    };
                  });
                }}
                onCreateOption={(newOption) => {
                  this.props.createClass({ name: newOption });
                }}
              />
            </div>
            <div className="list-section">
              <h2>Skills</h2>
              <CreateableSelect
                className="select-dropdown"
                isMulti
                styles={customStyles}
                name="skills"
                value={this.state.selectedSkillOptions}
                options={this.state.allSkillOptions}
                onChange={(selectedOptions) => {
                  const tempSkills = selectedOptions.map((option) => option.skill);
                  const skillIDs = selectedOptions.map((option) => option.skill._id);
                  // Update current skills in redux state based on selected options
                  this.props.fetchCertainSkills(skillIDs);
                  // Update the student and current skills in local state
                  this.setState((prevState) => {
                    const student = { ...prevState.student };
                    student.skills = skillIDs;
                    return {
                      ...prevState,
                      selectedSkillOptions: selectedOptions,
                      ownSkills: tempSkills,
                      student,
                    };
                  });
                }}
                onCreateOption={(newOption) => {
                  this.props.createSkill({ name: newOption });
                }}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="profile-fixed">
          <div id="profile-header">
            <h1>{`${this.state.student.first_name} ${this.props.student.last_name}`}</h1>
            <div>{`Class of ${this.props.student.grad_year}`}</div>
            <div id="major-row">
              {this.renderMajMin(this.props.student.majors)}
            </div>
            <div id="minor-row">
              {this.renderMajMin(this.props.student.minors)}
            </div>
            <div>{this.props.email}</div>
            <div>{this.state.student.phone_number}</div>
            <div id="lists-row">
              <div className="list-section">
                <h2>Industries</h2>
                {this.renderPills(this.state.ownIndustries)}
              </div>
              <div className="list-section">
                <h2>Classes</h2>
                {this.renderPills(this.state.ownClasses)}
              </div>
              <div className="list-section">
                <h2>Skills</h2>
                {this.renderPills(this.state.ownSkills)}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  renderWorkExperiences = () => {
    if (this.state.workExps !== []) {
      if (this.state.isEditing) {
        return this.state.workExps.map((workExp, index) => {
          return (
            <div key={index} className="work-exp">
              <div className="input-title">Role</div>
              <input className="short-input" defaultValue={workExp.role} onBlur={(event) => this.changeWorkExpField(index, 'role', event.target.value)} />
              <div className="input-title">Employer</div>
              <input className="short-input" defaultValue={workExp.employer} onBlur={(event) => this.changeWorkExpField(index, 'employer', event.target.value)} />
              <div className="input-title">Location</div>
              <input className="short-input" defaultValue={workExp.location} onBlur={(event) => this.changeWorkExpField(index, 'location', event.target.value)} />
              <div className="input-title">Start Date (YYYY-MM-DD)</div>
              <input className="short-input"
                placeholder="YYYY-MM-DD"
                defaultValue={`${new Date(workExp.start_date).getFullYear()}-${new Date(workExp.start_date).getMonth() + 1}`}
                // We're not displaying day, but the date needs to have a day, so just set it arbitrarily to the 15th here
                onBlur={(event) => this.changeWorkExpField(index, 'start_date', `${event.target.value}-15`)}
              />
              {!workExp.currently_working
                ? (
                  <div>
                    <div className="input-title">End Date (YYYY-MM-DD)</div>
                    <input className="short-input"
                      placeholder="YYYY-MM-DD"
                      defaultValue={`${new Date(workExp.end_date).getFullYear()}-${new Date(workExp.end_date).getMonth() + 1}`}
                      // We're not displaying day, but the date needs to have a day, so just set it arbitrarily to the 15th here
                      onBlur={(event) => this.changeWorkExpField(index, 'end_date', `${event.target.value}-15`)}
                    />
                  </div>
                )
                : null}
              <form>
                <label htmlFor={`currentlyWorking-${workExp._id}`}>I currently work here
                  <input
                    name="currentlyWorking"
                    id={`currentlyWorking-${workExp._id}`}
                    type="checkbox"
                    checked={workExp.currently_working}
                    onChange={(event) => this.changeWorkExpField(index, 'currently_working', event.target.checked)}
                  />
                </label>
              </form>
              <div className="input-title">Description</div>
              <TextareaAutosize className="tall-input" defaultValue={workExp.description} onBlur={(event) => this.changeWorkExpField(index, 'description', event.target.value)} />
              <button onClick={() => this.props.deleteWorkExperience(workExp._id)}>Delete Work Experience</button>
            </div>
          );
        });
      } else {
        return this.state.workExps.map((workExp, index) => {
          return (
            <div key={index} className="work-exp">
              <div>{workExp.role}</div>
              <div>{workExp.employer}</div>
              <div>{workExp.location}</div>
              <div className="date-row">
                {`${new Date(workExp.start_date).getMonth() + 1}/${new Date(workExp.start_date).getFullYear()} - `}
                {workExp.currently_working ? 'present' : `${new Date(workExp.end_date).getMonth() + 1}/${new Date(workExp.end_date).getFullYear()}`}
              </div>
              <div>{workExp.description}</div>
            </div>
          );
        });
      }
    } else return null;
  }

  renderOtherExperiences = () => {
    if (this.state.otherExps !== []) {
      if (this.state.isEditing) {
        return this.state.otherExps.map((otherExp, index) => {
          return (
            <div key={index} className="work-exp">
              <div className="input-title">Name</div>
              <input className="short-input" defaultValue={otherExp.name} onBlur={(event) => this.changeOtherExpField(index, 'name', event.target.value)} />
              <div className="input-title">Description</div>
              <TextareaAutosize className="tall-input" defaultValue={otherExp.description} onBlur={(event) => this.changeOtherExpField(index, 'description', event.target.value)} />
              <button onClick={() => this.props.deleteOtherExperience(otherExp._id)}>Delete Experience</button>
            </div>
          );
        });
      } else {
        return this.state.otherExps.map((otherExp, index) => {
          return (
            <div key={index} className="work-exp">
              <div>{otherExp.name}</div>
              <div>{otherExp.description}</div>
            </div>
          );
        });
      }
    } else return null;
  }

  render() {
    return (
      <div className="student-profile">
        <NewWorkExp
          onClose={this.hideWorkExpModal}
          show={this.state.showWorkExpModal}
        />
        <NewOtherExp
          onClose={this.hideOtherExpModal}
          show={this.state.showOtherExpModal}
        />
        {this.renderBody()}
        <div id="work-exps">
          <h2>Work Experience</h2>
          {this.renderWorkExperiences()}
          {this.state.isEditing ? <button onClick={() => this.setState({ showWorkExpModal: true })}>Add Work Experience</button> : null}
          <h2>Other Experience</h2>
          {this.renderOtherExperiences()}
          {this.state.isEditing ? <button onClick={() => this.setState({ showOtherExpModal: true })}>Add Other Experience</button> : null}
        </div>
        <button className="edit-button"
          onClick={this.submit}
        >{this.state.isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
  email: reduxState.user.email,
  workExps: reduxState.students.current_work_exps,
  otherExps: reduxState.students.current_other_exps,
  ownIndustries: reduxState.industries.current,
  ownSkills: reduxState.skills.current,
  ownClasses: reduxState.classes.current,
  allIndustries: reduxState.industries.all,
  allSkills: reduxState.skills.all,
  allClasses: reduxState.classes.all,
  addedIndustry: reduxState.industries.new,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID,
  fetchWorkExperiences,
  updateStudent,
  fetchUser,
  updateWorkExperience,
  deleteWorkExperience,
  fetchOtherExperiences,
  updateOtherExperience,
  deleteOtherExperience,
  fetchCertainIndustries,
  fetchCertainSkills,
  fetchCertainClasses,
  fetchAllIndustries,
  fetchAllClasses,
  fetchAllSkills,
  createIndustry,
  createSkill,
  createClass,
})(StudentProfile));
