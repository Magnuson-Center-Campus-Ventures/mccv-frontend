/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import TextareaAutosize from 'react-textarea-autosize';
import CreateableSelect from 'react-select/creatable';
import {
  fetchStudentByUserID, updateStudent, fetchUser,
  fetchWorkExperiences, updateWorkExperience, deleteWorkExperience,
  fetchOtherExperiences, updateOtherExperience, deleteOtherExperience,
  fetchAllIndustries, fetchAllClasses, fetchAllSkills,
  createIndustryForStudent, createSkillForStudent, createClassForStudent,
} from '../../actions';
import WorkExperience from './work-experience';
import OtherExperience from './other-experience';
import NewWorkExp from './student-modals/new-work-exp';
import NewOtherExp from './student-modals/new-other-exp';
import '../../styles/student-profile.scss';

class StudentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      showWorkExpModal: false,
      showOtherExpModal: false,
      student: {},
      majors: [],
      minors: [],
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
    this.props.fetchStudentByUserID(localStorage.getItem('userID'));
    this.props.fetchUser(localStorage.getItem('userID'));
    this.props.fetchAllIndustries();
    this.props.fetchAllSkills();
    this.props.fetchAllClasses();
  }

  // Get student fields into state (for editing),
  // and fetch a student's experiences,
  // once the student is loaded into props
  componentDidUpdate(prevProps, prevState) {
    if (this.props.student && this.props.student !== {} && prevProps.student !== this.props.student) {
      if (this.props.student.work_exp && this.props.student.work_exp.length > 0) {
        this.props.fetchWorkExperiences(this.props.student.work_exp);
      }
      if (this.props.student.other_exp && this.props.student.other_exp.length > 0) {
        this.props.fetchOtherExperiences(this.props.student.other_exp);
      }
      // Set initial dropdown options to be the indutries, skills, and classes the student already has
      let selectedIndustryOptions = [];
      if (this.props.student.interested_industries) {
        selectedIndustryOptions = this.props.student.interested_industries.map((industry) => {
          return { value: industry.name, label: industry.name, industry };
        });
      }
      let selectedClassOptions = [];
      if (this.props.student.relevant_classes) {
        selectedClassOptions = this.props.student.relevant_classes.map((_class) => {
          return { value: _class.name, label: _class.name, _class };
        });
      }
      let selectedSkillOptions = [];
      if (this.props.student.skills) {
        selectedSkillOptions = this.props.student.skills.map((skill) => {
          return { value: skill.name, label: skill.name, skill };
        });
      }

      this.setState({
        student: this.props.student,
        majors: this.props.student.majors,
        minors: this.props.student.minors,
        ownIndustries: this.props.student.interested_industries,
        selectedIndustryOptions,
        ownClasses: this.props.student.relevant_classes,
        selectedClassOptions,
        ownSkills: this.props.student.skills,
        selectedSkillOptions,
      });
    }

    // Set up options for dropdowns
    if (prevProps.allIndustries !== this.props.allIndustries) {
      const allIndustryOptions = this.props.allIndustries.map((industry) => {
        return { value: industry.name, label: industry.name, industry };
      });
      this.setState({ allIndustryOptions });
    }
    if (prevProps.allClasses !== this.props.allClasses) {
      const allClassOptions = this.props.allClasses.map((_class) => {
        return { value: _class.name, label: _class.name, _class };
      });
      this.setState({ allClassOptions });
    }
    if (prevProps.allSkills !== this.props.allSkills) {
      const allSkillOptions = this.props.allSkills.map((skill) => {
        return { value: skill.name, label: skill.name, skill };
      });
      this.setState({ allSkillOptions });
    }

    if (prevProps.workExps !== this.props.workExps) {
      this.setState({ workExps: this.props.workExps });
    }

    if (prevProps.otherExps !== this.props.otherExps) {
      this.setState({ otherExps: this.props.otherExps });
    }
  }

  changeStudentField = (field, event) => {
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
      const student = { ...this.state.student };
      student.majors = this.state.majors;
      student.minors = this.state.minors;
      this.props.updateStudent(this.state.student.id, student);
      this.state.workExps.forEach((workExp) => {
        this.props.updateWorkExperience(workExp._id, workExp);
      });
      this.state.otherExps.forEach((otherExp) => {
        this.props.updateOtherExperience(otherExp._id, otherExp);
      });
    }
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
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
            <div key={index} className="majors">{elem}</div>
          );
        }
      });
    } else return null;
  }

  renderEditMajors = () => {
    return this.state.majors.map((major, index) => {
      return (
        <div key={major}>
          <input className="short-input"
            defaultValue={major}
            onBlur={(event) => {
              const value = event.target.value;
              this.setState((prevState) => {
                const majors = [...prevState.majors];
                majors[index] = value;
                return {
                  ...prevState,
                  majors,
                };
              });
            }}
          />
          <button className="del-maj-button"
            onClick={() => {
              this.setState((prevState) => {
                const majors = [...prevState.majors];
                majors.splice(index, 1);
                return {
                  ...prevState,
                  majors,
                };
              });
            }}
          >Delete Major
          </button>
        </div>
      );
    });
  }

  renderEditMinors = () => {
    return this.state.minors.map((minor, index) => {
      return (
        <div key={minor}>
          <input className="short-input"
            defaultValue={minor}
            onBlur={(event) => {
              const value = event.target.value;
              this.setState((prevState) => {
                const minors = [...prevState.minors];
                minors[index] = value;
                return {
                  ...prevState,
                  minors,
                };
              });
            }}
          />
          <button className="del-maj-button"
            onClick={() => {
              this.setState((prevState) => {
                const minors = [...prevState.minors];
                minors.splice(index, 1);
                return {
                  ...prevState,
                  minors,
                };
              });
            }}
          >Delete Minor
          </button>
        </div>
      );
    });
  }

  renderPills = (pillsArray) => {
    if (pillsArray && pillsArray.length > 0) {
      return pillsArray.map((elem, index) => {
        return <div key={index} className="profile-pill">{elem.name}</div>;
      });
    } else return <div>None</div>;
  }

  renderBody = () => {
    if (this.state.isEditing) {
      const dropdownStyles = {
        control: (base) => ({
          ...base,
          width: 200,
        }),
      };
      return (
        <div className="profile-edit">
          <div className="input-title">First Name</div>
          <input className="short-input" defaultValue={this.props.student?.first_name} onBlur={(event) => this.changeStudentField('first_name', event)} />
          <div className="input-title">Last Name</div>
          <input className="short-input" defaultValue={this.props.student?.last_name} onBlur={(event) => this.changeStudentField('last_name', event)} />
          <div className="input-title">Phone Number</div>
          <input className="short-input"
            defaultValue={this.props.student?.phone_number ? this.props.student?.phone_number : null}
            onBlur={(event) => this.changeStudentField('phone_number', event)}
          />
          <div className="input-title">Majors</div>
          {this.renderEditMajors()}
          <button className="add-maj-button"
            onClick={() => {
              this.setState((prevState) => {
                const majors = [...prevState.majors];
                majors.push('');
                return {
                  ...prevState,
                  majors,
                };
              });
            }}
          >Add Major
          </button>
          <div className="input-title">Minors</div>
          {this.renderEditMinors()}
          <button className="add-maj-button"
            onClick={() => {
              this.setState((prevState) => {
                const minors = [...prevState.minors];
                minors.push('');
                return {
                  ...prevState,
                  minors,
                };
              });
            }}
          >Add Minor
          </button>
          <div id="lists-row">
            <div className="list-section">
              <h2>Industries</h2>
              <CreateableSelect
                className="select-dropdown"
                isMulti
                styles={dropdownStyles}
                name="industries"
                value={this.state.selectedIndustryOptions}
                options={this.state.allIndustryOptions}
                onChange={(selectedOptions) => {
                  const tempIndustries = selectedOptions
                    ? selectedOptions.map((option) => option.industry)
                    : [];
                  this.setState((prevState) => {
                    const student = { ...prevState.student };
                    student.interested_industries = tempIndustries;
                    return {
                      ...prevState,
                      selectedIndustryOptions: selectedOptions,
                      ownIndustries: tempIndustries,
                      student,
                    };
                  });
                }}
                onCreateOption={(newOption) => {
                  this.props.createIndustryForStudent({ name: newOption }, this.state.student);
                }}
              />
            </div>
            <div className="list-section">
              <h2>Classes</h2>
              <CreateableSelect
                className="select-dropdown"
                isMulti
                styles={dropdownStyles}
                name="classes"
                value={this.state.selectedClassOptions}
                options={this.state.allClassOptions}
                onChange={(selectedOptions) => {
                  const tempClasses = selectedOptions
                    ? selectedOptions.map((option) => option._class)
                    : [];
                  this.setState((prevState) => {
                    const student = { ...prevState.student };
                    student.relevant_classes = tempClasses;
                    return {
                      ...prevState,
                      selectedClassOptions: selectedOptions,
                      ownClasses: tempClasses,
                      student,
                    };
                  });
                }}
                onCreateOption={(newOption) => {
                  this.props.createClassForStudent({ name: newOption }, this.state.student);
                }}
              />
            </div>
            <div className="list-section">
              <h2>Skills</h2>
              <CreateableSelect
                className="select-dropdown"
                isMulti
                styles={dropdownStyles}
                name="skills"
                value={this.state.selectedSkillOptions}
                options={this.state.allSkillOptions}
                onChange={(selectedOptions) => {
                  const tempSkills = selectedOptions
                    ? selectedOptions.map((option) => option.skill)
                    : [];
                  this.setState((prevState) => {
                    const student = { ...prevState.student };
                    student.skills = tempSkills;
                    return {
                      ...prevState,
                      selectedSkillOptions: selectedOptions,
                      ownSkills: tempSkills,
                      student,
                    };
                  });
                }}
                onCreateOption={(newOption) => {
                  this.props.createSkillForStudent({ name: newOption }, this.state.student);
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
            <h1>{`${this.state.student.first_name} ${this.state.student.last_name}`}</h1>
            <div>{`Class of ${this.props.student?.grad_year}`}</div>
            <div id="major-row">
              {this.renderMajMin(this.props.student?.majors)}
            </div>
            <div id="minor-row">
              {this.renderMajMin(this.props.student?.minors)}
            </div>
            <div>{this.props.email}</div>
            <div>{this.state.student.phone_number ? this.state.student.phone_number : null}</div>
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
      return this.state.workExps.map((workExp, index) => {
        return (
          <WorkExperience key={index}
            className="work-exp"
            isEditing={this.state.isEditing}
            workExp={workExp}
            index={index}
            changeWorkExpField={this.changeWorkExpField}
          />
        );
      });
    } else return null;
  }

  renderOtherExperiences = () => {
    if (this.state.otherExps !== []) {
      return this.state.otherExps.map((otherExp, index) => {
        return (
          <OtherExperience key={index}
            className="work-exp"
            isEditing={this.state.isEditing}
            otherExp={otherExp}
            index={index}
            changeOtherExpField={this.changeOtherExpField}
          />
        );
      });
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
          {this.state.isEditing ? (
            <button
              onClick={() => {
                this.setState({ showWorkExpModal: true });
                window.scrollTo(0, 0);
              }}
            >Add Work Experience
            </button>
          ) : null}
          {this.renderWorkExperiences()}
          <h2>Other Experience</h2>
          {this.state.isEditing ? (
            <button
              onClick={() => {
                this.setState({ showOtherExpModal: true });
                window.scrollTo(0, 0);
              }}
            >Add Other Experience
            </button>
          ) : null}
          {this.renderOtherExperiences()}
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
  // userID: reduxState.auth.userID,
  student: reduxState.students.current_student,
  email: reduxState.user.email,
  workExps: reduxState.students.current_work_exps,
  otherExps: reduxState.students.current_other_exps,
  allIndustries: reduxState.industries.all,
  allSkills: reduxState.skills.all,
  allClasses: reduxState.classes.all,
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
  fetchAllIndustries,
  fetchAllClasses,
  fetchAllSkills,
  createIndustryForStudent,
  createSkillForStudent,
  createClassForStudent,
})(StudentProfile));
