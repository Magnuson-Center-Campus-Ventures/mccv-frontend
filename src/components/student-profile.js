/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchStudentByUserID, fetchWorkExperiences, updateStudent, fetchUser,
  updateWorkExperience, deleteWorkExperience, fetchCertainIndustries,
  fetchCertainSkills, fetchCertainClasses,
} from '../actions';

import '../styles/student-profile.scss';

class StudentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      student: {},
      workExps: [],
      industries: [],
      skills: [],
      classes: [],
    };
  }

  componentDidMount() {
    this.props.fetchStudentByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
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
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ student: this.props.student });
    }
    if (this.props.workExps !== {} && prevProps.workExps !== this.props.workExps) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ workExps: this.props.workExps });
    }
    if (this.props.industries !== {} && prevProps.industries !== this.props.industries) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ industries: this.props.industries });
    }
    if (this.props.skills !== {} && prevProps.skills !== this.props.skills) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ skills: this.props.skills });
    }
    if (this.props.classes !== {} && prevProps.classes !== this.props.classes) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ classes: this.props.classes });
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
                {this.renderPills(this.state.industries)}
              </div>
              <div className="list-section">
                <h2>Skills</h2>
                {this.renderPills(this.state.skills)}
              </div>
              <div className="list-section">
                <h2>Classes</h2>
                {this.renderPills(this.state.classes)}
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
              <div className="input-title">Start Date</div>
              <input className="short-input"
                placeholder="YYYY-MM-DD"
                defaultValue={`${new Date(workExp.start_date).getFullYear()}-${new Date(workExp.start_date).getMonth() + 1}-${new Date(workExp.start_date).getDate()}`}
                onBlur={(event) => this.changeWorkExpField(index, 'start_date', event)}
              />
              <div className="input-title">End Date</div>
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
        {this.renderBody()}
        <div id="work-exps">
          <h2>Work Experience</h2>
          {this.renderWorkExperiences()}
        </div>
        <button className="edit-button"
          onClick={this.submit}
        >{this.state.isEditing ? 'Finish' : 'Edit Profile'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  student: reduxState.students.current,
  email: reduxState.user.email,
  workExps: reduxState.students.current_work_exps,
  industries: reduxState.industries.current,
  skills: reduxState.skills.current,
  classes: reduxState.classes.current,
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
})(StudentProfile));
