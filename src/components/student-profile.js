/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import {
  fetchStudentByUserID, fetchWorkExperiences, updateStudent, fetchUser,
  updateWorkExperience, deleteWorkExperience, fetchCertainIndustries,
  fetchCertainSkills, fetchCertainClasses, fetchAllIndustries,
} from '../actions';
import NewWorkExp from './modals/new-work-exp';
import '../styles/student-profile.scss';

class StudentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      showWorkExpModal: false,
      student: {},
      workExps: [],
      ownIndustries: [],
      ownSkills: [],
      ownClasses: [],
      allIndustryOptions: [],
      defaultIndustryOptions: [],
    };
  }

  componentDidMount() {
    this.props.fetchStudentByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
    this.props.fetchAllIndustries();
  }

  // Get student fields into state (for editing),
  // and fetch a student's work experiences,
  // once the student is loaded into props
  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      this.props.fetchWorkExperiences(this.props.student.work_exp);
      this.props.fetchCertainIndustries(this.props.student.interested_industries);
      this.props.fetchCertainSkills(Object.keys(this.props.student.skills));
      this.props.fetchCertainClasses(this.props.student.relevant_classes);
      this.setState({ student: this.props.student });
    }
    if (prevProps.workExps !== this.props.workExps) {
      this.setState({ workExps: this.props.workExps });
    }
    if (prevProps.ownIndustries !== this.props.ownIndustries) {
      this.setState({ ownIndustries: this.props.ownIndustries });

      // Set up options for dropdown
      const allIndustryOptions = this.props.allIndustries.map((industry) => {
        return { value: industry.name, label: industry.name, industry };
      });
      // Set initial dropdown options to be the indutries the student already has
      const industryIDs = this.props.ownIndustries.map((industry) => { return industry._id; });
      const defaultIndustryOptions = allIndustryOptions.filter((option) => {
        return industryIDs.includes(option.industry._id);
      });
      this.setState({ allIndustryOptions, defaultIndustryOptions });
    }
    if (prevProps.ownSkills !== this.props.ownSkills) {
      this.setState({ ownSkills: this.props.ownSkills });
    }
    if (prevProps.ownClasses !== this.props.ownClasses) {
      this.setState({ ownClasses: this.props.ownClasses });
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

  changeWorkExpField = (index, field, event) => {
    // eslint-disable-next-line prefer-destructuring
    const value = event.target.value;

    this.setState((prevState) => {
      const workExps = [...prevState.workExps];
      workExps[index][field] = value;
      return {
        ...prevState,
        workExps,
      };
    });
  }

  showWorkExpModal = () => {
    this.setState({ showWorkExpModal: true });
  };

  hideWorkExpModal = () => {
    this.setState({ showWorkExpModal: false });
  };

  submit = () => {
    if (this.state.isEditing) {
      this.props.updateStudent(this.state.student.id, this.state.student);
      this.state.workExps.forEach((workExp) => {
        this.props.updateWorkExperience(workExp._id, workExp);
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
              {this.renderPills(this.state.ownIndustries)}
              <Select
                isMulti
                name="industries"
                defaultValue={this.state.defaultIndustryOptions}
                options={this.state.allIndustryOptions}
                onChange={(selectedOptions) => {
                  const tempIndustries = selectedOptions.map((option) => option.industry);
                  const industryIDs = selectedOptions.map((option) => option.industry._id);
                  this.setState((prevState) => {
                    const student = { ...prevState.student };
                    student.interested_industries = industryIDs;
                    return {
                      ...prevState,
                      ownIndustries: tempIndustries,
                      student,
                    };
                  });
                }}
              />
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
              <input className="short-input" defaultValue={workExp.role} onBlur={(event) => this.changeWorkExpField(index, 'role', event)} />
              <div className="input-title">Employer</div>
              <input className="short-input" defaultValue={workExp.employer} onBlur={(event) => this.changeWorkExpField(index, 'employer', event)} />
              <div className="input-title">Location</div>
              <input className="short-input" defaultValue={workExp.location} onBlur={(event) => this.changeWorkExpField(index, 'location', event)} />
              <div className="input-title">Start Date (YYYY-MM-DD)</div>
              <input className="short-input"
                placeholder="YYYY-MM-DD"
                defaultValue={`${new Date(workExp.start_date).getFullYear()}-${new Date(workExp.start_date).getMonth() + 1}-${new Date(workExp.start_date).getDate()}`}
                onBlur={(event) => this.changeWorkExpField(index, 'start_date', event)}
              />
              <div className="input-title">End Date (YYYY-MM-DD)</div>
              <input className="short-input"
                placeholder="YYYY-MM-DD"
                defaultValue={`${new Date(workExp.end_date).getFullYear()}-${new Date(workExp.end_date).getMonth() + 1}-${new Date(workExp.end_date).getDate()}`}
                onBlur={(event) => this.changeWorkExpField(index, 'end_date', event)}
              />
              <div className="input-title">Description</div>
              <textarea className="tall-input" defaultValue={workExp.description} onBlur={(event) => this.changeWorkExpField(index, 'description', event)} />
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
                {`${new Date(workExp.start_date).getMonth() + 1}/${new Date(workExp.start_date).getDate()}/${new Date(workExp.start_date).getFullYear()} - `}
                {workExp.currently_working ? 'present' : `${new Date(workExp.end_date).getMonth() + 1}/${new Date(workExp.end_date).getDate()}/${new Date(workExp.end_date).getFullYear()}`}
              </div>
              <div>{workExp.description}</div>
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
        {this.renderBody()}
        <div id="work-exps">
          <h2>Work Experience</h2>
          {this.renderWorkExperiences()}
          {this.state.isEditing ? <button onClick={() => this.setState({ showWorkExpModal: true })}>Add Work Experience</button> : null}
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
  userID: reduxState.auth.userID,
  student: reduxState.students.current_student,
  email: reduxState.user.email,
  workExps: reduxState.students.current_work_exps,
  ownIndustries: reduxState.industries.current,
  ownSkills: reduxState.skills.current,
  ownClasses: reduxState.classes.current,
  allIndustries: reduxState.industries.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID,
  fetchWorkExperiences,
  updateStudent,
  fetchUser,
  updateWorkExperience,
  deleteWorkExperience,
  fetchCertainIndustries,
  fetchCertainSkills,
  fetchCertainClasses,
  fetchAllIndustries,
})(StudentProfile));
