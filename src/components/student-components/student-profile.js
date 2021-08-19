/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/sort-comp */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import CreateableSelect from 'react-select/creatable';
import { DateRange } from 'react-date-range';
import Switch from 'react-switch';
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
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

class StudentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      showWorkExpModal: false,
      showOtherExpModal: false,
      student: {},
      gender: '',
      bio: '',
      grad_year: '',
      affiliation: '',
      newMajor: '',
      newMinor: '',
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
      start: new Date(),
      end: new Date(),
      validDate: true,
    };

    this.studentStatusChange = this.studentStatusChange.bind(this);
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
      const student = this.props.student;

      if (this.props.student.first_name && this.props.student.first_name === prevProps.student.first_name && prevState.student.first_name) {
        student.first_name = prevState.student.first_name;
      }
      if (this.props.student.last_name && this.props.student.last_name === prevProps.student.last_name && prevState.student.last_name) {
        student.last_name = prevState.student.last_name;
      }
      if (this.props.student.phone_number && this.props.student.phone_number === prevProps.student.phone_number && prevState.student.phone_number) {
        student.phone_number = prevState.student.phone_number;
      }

      if (this.props.student.majors && this.props.student.majors !== prevProps.student.majors) {
        this.setState({ majors: this.props.student.majors });
      } else student.majors = this.state.majors;

      if (this.props.student.minors && this.props.student.minors !== prevProps.student.minors) {
        this.setState({ minors: this.props.student.minors });
      } else student.minors = this.state.minors;

      if (this.props.student.work_exp && this.props.student.work_exp.length > 0) {
        this.props.fetchWorkExperiences(this.props.student.work_exp);
      }
      if (this.props.student.other_exp && this.props.student.other_exp.length > 0) {
        this.props.fetchOtherExperiences(this.props.student.other_exp);
      }
      // Set initial dropdown options to be the indutries, skills, and classes the student already has
      let selectedIndustryOptions = prevState.selectedIndustryOptions;
      if (this.props.student.interested_industries && this.props.student.interested_industries !== prevProps.student.interested_industries) {
        selectedIndustryOptions = this.props.student.interested_industries.map((industry) => {
          return { value: industry.name, label: industry.name, industry };
        });
        this.setState({ selectedIndustryOptions, ownIndustries: this.props.student.interested_industries });
      } else student.interested_industries = this.state.ownIndustries;

      let selectedClassOptions = prevState.selectedClassOptions;
      if (this.props.student.relevant_classes && this.props.student.relevant_classes !== prevProps.student.relevant_classes) {
        selectedClassOptions = this.props.student.relevant_classes.map((_class) => {
          return { value: _class.name, label: _class.name, _class };
        });
        this.setState({ selectedClassOptions, ownClasses: this.props.student.relevant_classes });
      } else student.relevant_classes = this.state.ownClasses;

      let selectedSkillOptions = prevState.selectedSkillOptions;
      if (this.props.student.skills && this.props.student.skills !== prevProps.student.skills) {
        selectedSkillOptions = this.props.student.skills.map((skill) => {
          return { value: skill.name, label: skill.name, skill };
        });
        this.setState({ selectedSkillOptions, ownSkills: this.props.student.skills });
      } else student.skills = this.state.ownSkills;

      this.setState({ student });
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
      this.checkDateRange();
      if (this.state.validDate) {
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
        this.setState({ isEditing: false });
      }
    } else {
      this.setState({ isEditing: true });
    }
    this.forceUpdate();
  }

  checkDateRange = () => {
    if (this.state.student.desired_start_date == null) {
      this.state.student.desired_start_date = new Date();
    }
    const start = new Date(this.state.student.desired_start_date);
    const end = new Date(this.state.student.desired_end_date);
    const diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24 * 7);
    if (diff > 3.5 && diff <= 10) {
      this.state.validDate = true;
    } else {
      this.state.validDate = false;
      this.state.student.desired_end_date = new Date(start.getTime() + (1000 * 3600 * 24 * 7 * 4));
    }
  }

  renderDateError = () => {
    if (this.state.validDate === false) {
      return <div className="date-error">Please make the date range 4-10 weeks long before saving</div>;
    } else return null;
  }

  renderDateRange = () => {
    if (this.state.student.desired_start_date != null) {
      this.state.start = new Date(this.state.student.desired_start_date);
    } else {
      this.state.start = new Date();
    }
    if (this.state.student.desired_end_date != null) {
      this.state.end = new Date(this.state.student.desired_end_date);
    } else {
      this.state.start = new Date();
    }

    return (
      <DateRange
        editableDateInputs
        onChange={(ranges) => {
          this.state.student.desired_start_date = ranges.selection.startDate.toISOString();
          this.state.student.desired_end_date = ranges.selection.endDate.toISOString();
          this.forceUpdate();
        }}
        moveRangeOnFirstSelection={false}
        ranges={[{
          startDate: this.state.start,
          endDate: this.state.end,
          key: 'selection',
        }]}
      />
    );
  }

  renderEditGender() {
    if (this.props.student.gender) {
      if (this.state.isEditing === true) {
        return (
          <select value={this.state.gender}
            onChange={(event) => {
              this.props.student.gender = event.target.value;
              this.changeStudentField('gender', event);
              this.setState({
                gender: event.target.value,
              });
            }}
          >
            <option value={this.state.gender}>{this.props.student.gender}</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer not to say">Prefer Not to Say</option>
          </select>
        );
      }
    } else if (this.state.isEditing === true) {
      return (
        <select value={this.state.gender}
          onChange={(event) => {
            this.props.student.gender = event.target.value;
            this.changeStudentField('gender', event);
            this.setState({
              gender: event.target.value,
            });
          }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer not to say">Prefer Not to Say</option>
        </select>
      );
    }
  }

  renderEditAffiliation() {
    if (this.props.student.affiliation) {
      if (this.state.isEditing === true) {
        return (
          <select value={this.state.affiliation}
            onChange={(event) => {
              this.props.student.affiliation = event.target.value;
              this.changeStudentField('affiliation', event);
              this.setState({
                affiliation: event.target.value,
              });
            }}
          >
            <option value={this.state.affiliation}>{this.props.student.affiliation}</option>
            <option value="Undergrad">Dartmouth College</option>
            <option value="Geisel">Geisel School of Medicine </option>
            <option value="Tuck">Tuck School of Business</option>
            <option value="Thayer">Thayer School of Engineering</option>
            <option value="Guarini">Guarini School of Graduate and Advanced Studies</option>
          </select>
        );
      }
    } else if (this.state.isEditing) {
      return (
        <select value={this.state.affiliation}
          onChange={(event) => {
            this.props.student.affiliation = event.target.value;
            this.changeStudentField('affiliation', event);
            this.setState({
              affiliation: event.target.value,
            });
          }}
        >
          {/* <option value={this.state.affiliation}>{this.props.student.affiliation}</option> */}
          <option value="Undergrad">Dartmouth College</option>
          <option value="Geisel">Geisel School of Medicine </option>
          <option value="Tuck">Tuck School of Business</option>
          <option value="Thayer">Thayer School of Engineering</option>
          <option value="Guarini">Guarini School of Graduate and Advanced Studies</option>
        </select>
      );
    }
  }

  renderClassYearAffiliation() {
    if (!this.props.student?.grad_year) {
      return (
        <div />
      );
    } else if (this.props.student?.affiliation) {
      return (
        <div id="class-year">{`Class of ${this.props.student?.grad_year}`} ({this.props.student?.affiliation})</div>
      );
    } else {
      return (
        <div id="class-year">{`Class of ${this.props.student?.grad_year}`}</div>
      );
    }
  }

  renderMajorList = () => {
    const majors = [];
    if (this.state.student.majors) {
      this.state.student.majors.forEach((major, index) => {
        if (index < this.state.student.majors.length - 1) {
          majors.push(
            <div key={index} className="majors">{`${major},`}</div>,
          );
        } else {
          majors.push(
            <div key={index} className="majors">{major}</div>,
          );
        }
      });
    }
    return majors;
  }

  renderMinorList = () => {
    const minors = [];
    if (this.state.student.minors) {
      this.state.student.minors.forEach((minor, index) => {
        if (index < this.state.student.minors.length - 1) {
          minors.push(
            <div key={index} className="majors">{`${minor},`}</div>,
          );
        } else {
          minors.push(
            <div key={index} className="majors">{minor}</div>,
          );
        }
      });
    }
    return minors;
  }

  renderMajors = () => {
    if (this.state.student.majors?.length > 0 && this.state.student.majors[0] !== '') {
      return (
        <div id="major-row">
          <div className="student-major-title">Major in </div>
          {this.renderMajorList()}
        </div>
      );
    } else {
      return (
        <div id="major-row">
          <div className="student-major-title">Major Undeclared </div>
        </div>
      );
    }
  }

  renderMinors = () => {
    if (this.state.student.minors?.length > 0 && this.state.student.minors[0] !== '') {
      return (
        <div id="minor-row">
          <div className="student-minor-title">Minor in </div>
          {this.renderMinorList()}
        </div>
      );
    } else {
      return (<div />);
    }
  }

  renderEditMajors = () => {
    return this.state.student.majors?.map((major, index) => {
      return (
        <div key={major}>
          <li id="responsibility" key={index}>{major}</li>
          <button className="del-button"
            onClick={() => {
              this.setState((prevState) => {
                prevState.student.majors.splice(index, 1);
                return {
                  ...prevState,
                };
              });
            }}
          ><i className="far fa-trash-alt delete-icon" />
          </button>
        </div>
      );
    });
  }

  renderEditMinors = () => {
    return this.state.student.minors.map((minor, index) => {
      return (
        <div key={minor}>
          <li id="responsibility" key={index}>{minor}</li>
          <button className="del-button"
            onClick={() => {
              this.setState((prevState) => {
                prevState.student.minors.splice(index, 1);
                return {
                  ...prevState,
                };
              });
            }}
          ><i className="far fa-trash-alt delete-icon" />
          </button>
        </div>
      );
    });
  }

  renderGreenPills = (pillsArray) => {
    if (pillsArray && pillsArray.length > 0) {
      return pillsArray.map((elem, index) => {
        return <div key={index} className="student-profile-pill-green">{elem.name}</div>;
      });
    } else return <div>None</div>;
  }

  renderRedPills = (pillsArray) => {
    if (pillsArray && pillsArray.length > 0) {
      return pillsArray.map((elem, index) => {
        return <div key={index} className="student-profile-pill-red">{elem.name}</div>;
      });
    } else return <div>None</div>;
  }

  renderYellowPills = (pillsArray) => {
    if (pillsArray && pillsArray.length > 0) {
      return pillsArray.map((elem, index) => {
        return <div key={index} className="student-profile-pill-yellow">{elem.name}</div>;
      });
    } else return <div>None</div>;
  }

  renderStudentActivity = () => {
    if (this.state.student?.desired_start_date != null && this.state.student.job_search_status=="Active") {
      return (<span className="student-job-search-status"> Actively Searching </span>)
    }
    return ""
  }

  startDate = () => {
    if (this.state.student?.desired_start_date != null) {
      this.state.start = new Date(this.state.student.desired_start_date);
      return (
        <span className="student-start-date">Desired Start Date: {`${this.state.start.getMonth() + 1}/${this.state.start.getDate()}/${this.state.start.getFullYear()}`}</span>
      );
    } else {
      return (
        <div />
      );
    }
  }

  endDate = () => {
    if (this.state.student?.desired_end_date != null) {
      this.state.end = new Date(this.state.student.desired_end_date);
      return (
        <span className="student-end-date">Desired End Date: {`${this.state.end.getMonth() + 1}/${this.state.end.getDate()}/${this.state.end.getFullYear()}`}</span>
      );
    } else {
      return (
        <div />
      );
    }
  }

  renderStudentName = () => {
    if (this.state.student?.first_name && this.state.student?.last_name) {
      return (
        <h1 id="student-profile-name">{`${this.state.student?.first_name} ${this.state.student?.last_name}`}</h1>
      );
    } else if (this.state.student?.first_name) {
      return (
        <h1 id="student-profile-name">{`${this.state.student?.first_name}`}</h1>
      );
    } else if (this.state.student?.last_name) {
      return (
        <h1 id="student-profile-name">{`${this.state.student?.last_name}`}</h1>
      );
    } else {
      return (
        <h1 id="student-profile-name">No Name</h1>
      );
    }
  }

  studentStatusChange = (event) => {
    const status = this.state.student.job_search_status === 'Active' ? 'Inactive' : 'Active';
    this.setState((prevState) => {
      const ns = { ...prevState.student, job_search_status: status };
      return {
        ...prevState,
        student: ns,
      };
    });
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
        <div id="student-profile-edit">
          <div id="student-edit-info">
            <h2>Personal Information</h2>
            <div className="input-title" id="first-student-input">First Name</div>
            <input className="student-short-input"
              defaultValue={this.props.student?.first_name}
              onBlur={(event) => this.changeStudentField('first_name', event)}
            />

            <div className="input-title">Last Name</div>
            <input className="student-short-input"
              defaultValue={this.props.student?.last_name}
              onBlur={(event) => this.changeStudentField('last_name', event)}
            />

            <div className="input-title">Phone Number</div>
            <input className="student-short-input"
              defaultValue={this.props.student?.phone_number ? this.props.student?.phone_number : null}
              onBlur={(event) => this.changeStudentField('phone_number', event)}
            />
            <div>

              <div className="input-title">Gender</div>
              {this.renderEditGender()}
            </div>

            <div className="student-edit-dates">
              <div>Desired Start and End Date</div>
              {this.renderDateError()}
              {this.renderDateRange()}
              <p className="question-fields-title">Hours/Week</p>
              <TextareaAutosize className="question-fields-text" onBlur={(event) => this.changeStudentField('time_commitment', event)} defaultValue={this.props.student?.time_commitment} />
            </div>

            <div className="input-activity">
              <div className="input-title">Actively Searching?</div>
              <div>Shows startups you are actively looking at this platform.</div>
              <Switch onChange={this.studentStatusChange} checked={this.state.student.job_search_status === 'Active'} />
            </div>
          </div>

          <hr className="profile-divider" />
          <div id="student-edit-majmin">
            <h2>Academic Information</h2>
            <div className="lists-row">
              <div className="majmin-section">
                <div className="majmin-header">
                  <div className="input-title">Affiliation </div>
                  {this.renderEditAffiliation()}
                </div>
              </div>
              <div className="majmin-section">
                <div className="majmin-header">
                  <div className="input-title">Graduation Year</div>
                  <input className="student-short-input"
                    defaultValue={this.props.student?.grad_year}
                    onBlur={(event) => this.changeStudentField('grad_year', event)}
                  />
                </div>
              </div>
            </div>
            <div className="input-instruction">Please write the full name of your major or minor (e.x. "Computer Science" instead of "CS")</div>
            <div className="lists-row">
              <div className="majmin-section">
                <div className="majmin-header">
                  <div className="input-title">Majors </div>
                  <TextareaAutosize className="question-fields-text" onBlur={function (event) {this.setState({newMajor:event.target.value})}.bind(this)} />
                  <button className="add-button"
                    onClick={() => {
                      this.setState((prevState) => {
                        const nm = this.state.newMajor;
                        prevState.student.majors.push(nm);
                        return {
                          ...prevState,
                        };
                      });
                    }}
                  ><i className="fa fa-plus add-icon" aria-hidden="true" />
                  </button>
                </div>
                {this.renderEditMajors()}
              </div>
              <div className="majmin-section">
                <div className="majmin-header">
                  <div className="input-title">Minors </div>
                  <TextareaAutosize className="question-fields-text" onBlur={function (event) { this.state.newMinor = event.target.value; }.bind(this)} />
                  <button className="add-button"
                    onClick={() => {
                      const nm = this.state.newMajor;
                      this.setState((prevState) => {
                        prevState.student.minors.push(nm);
                        return {
                          ...prevState,
                        };
                      });
                    }}
                  ><i className="fa fa-plus add-icon" aria-hidden="true" />
                  </button>
                </div>
                {this.renderEditMinors()}
              </div>
            </div>
          </div>

          <hr className="profile-divider" />
          <div>
            <h2>Bio</h2>
            <div>The first 100 characters will be displayed when startups browse</div>
            <TextareaAutosize className="question-fields-text"
              onBlur={(event) => this.changeStudentField('bio', event)}
              defaultValue={this.props.student?.bio}
            />
            <div className="character-count">{this.state.student.bio.length} characters typed</div>
          </div>

          <hr className="profile-divider" />
          <div className="lists-row">
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
            {this.renderStudentName()}

            {this.renderClassYearAffiliation()}
            {this.renderMajors()}
            {this.renderMinors()}
            <div className="space" />
            <div className="student-contact">{this.props.email}</div>
            <div className="student-contact">{this.state.student.phone_number ? this.state.student.phone_number : null}</div>
            <div className="space" />
            <div>
              {this.renderStudentActivity()}
            </div>
            <div className="student-start-date">
              {this.startDate()}
            </div>
            <div className="student-end-date">
              {this.endDate()}
            </div>
            <div className="post-time-commitment">
              {this.state.student.time_commitment ? 'Time Commitment'.concat(': ', this.state.student.time_commitment.toString()).concat(' ', 'hrs/week') : null}
            </div>
            <hr className="profile-divider" />
            <div className="lists-row">
              <div className="list-section">
                <h2>Industries</h2>
                {this.renderYellowPills(this.state.ownIndustries)}
              </div>
              <div className="list-section">
                <h2>Classes</h2>
                {this.renderRedPills(this.state.ownClasses)}
              </div>
              <div className="list-section">
                <h2>Skills</h2>
                {this.renderGreenPills(this.state.ownSkills)}
              </div>
            </div>

            <hr className="profile-divider" />
            <div className="exps-fixed">
              <h2>Bio</h2>
              <div className="work-exp">
                <div className="exp-text">{this.props.student?.bio}</div>
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
        <hr className="profile-divider" />
        {this.state.isEditing ? (
          <div className="exps-edit">
            <div className="exp-header">
              <h2>Work Experience</h2>
              <button className="add-button"
                onClick={() => {
                  this.setState({ showWorkExpModal: true });
                  window.scrollTo(0, 0);
                }}
              ><i className="fa fa-plus add-icon" aria-hidden="true" />
              </button>
            </div>
            {this.renderWorkExperiences()}
          </div>
        ) : (
          <div className="exps-fixed">
            <h2>Work Experience</h2>
            {this.renderWorkExperiences()}
          </div>
        )}
        <hr className="profile-divider" />
        {this.state.isEditing ? (
          <div className="exps-edit">
            <div className="exp-header">
              <h2>Other Experience</h2>
              <button className="add-button"
                onClick={() => {
                  this.setState({ showOtherExpModal: true });
                  window.scrollTo(0, 0);
                }}
              ><i className="fa fa-plus add-icon" aria-hidden="true" />
              </button>
            </div>
            {this.renderOtherExperiences()}
          </div>
        ) : (
          <div className="exps-fixed">
            <h2>Other Experience</h2>
            {this.renderOtherExperiences()}
          </div>
        )}
        <button className="edit-button"
          onClick={this.submit}
        >{this.state.isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
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
