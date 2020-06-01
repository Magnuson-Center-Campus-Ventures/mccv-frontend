/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchStudentByID, fetchUserByStudentID, fetchWorkExperiences, fetchOtherExperiences,
  fetchAllIndustries, fetchAllClasses, fetchAllSkills,
} from '../../actions';
import '../../styles/student-profile.scss';

class StudentProfileStartup extends Component {
  componentDidMount() {
    this.props.fetchStudentByID(this.props.match.params.studentID);
    // this.props.fetchUserByStudentID();
  }

  // Fetch a student's experiences once the student is loaded into props
  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      console.log(this.props.student);
      this.props.fetchUserByStudentID(this.props.student._id);
      this.props.fetchWorkExperiences(this.props.student.work_exp);
      this.props.fetchOtherExperiences(this.props.student.other_exp);
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
    return (
      <div className="profile-fixed">
        <div id="profile-header">
          <h1>{`${this.props.student.first_name} ${this.props.student.last_name}`}</h1>
          <div>{`Class of ${this.props.student.grad_year}`}</div>
          <div id="major-row">
            {this.renderMajMin(this.props.student.majors)}
          </div>
          <div id="minor-row">
            {this.renderMajMin(this.props.student.minors)}
          </div>
          <div>{this.props.email}</div>
          <div>{this.props.student.phone_number}</div>
          <div id="lists-row">
            <div className="list-section">
              <h2>Industries</h2>
              {this.renderPills(this.props.student.interested_industries)}
            </div>
            <div className="list-section">
              <h2>Classes</h2>
              {this.renderPills(this.props.student.relevant_classes)}
            </div>
            <div className="list-section">
              <h2>Skills</h2>
              {this.renderPills(this.props.student.skills)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderWorkExperiences = () => {
    if (this.props.workExps !== []) {
      return this.props.workExps.map((workExp, index) => {
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
    } else return null;
  }

  renderOtherExperiences = () => {
    if (this.props.otherExps !== []) {
      return this.props.otherExps.map((otherExp, index) => {
        return (
          <div key={index} className="work-exp">
            <div>{otherExp.name}</div>
            <div>{otherExp.description}</div>
          </div>
        );
      });
    } else return null;
  }

  render() {
    return (
      <div className="student-profile">
        {this.renderBody()}
        <div id="work-exps">
          <h2>Work Experience</h2>
          {this.renderWorkExperiences()}
          <h2>Other Experience</h2>
          {this.renderOtherExperiences()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  student: reduxState.students.current_student,
  email: reduxState.students.current_email,
  workExps: reduxState.students.current_work_exps,
  otherExps: reduxState.students.current_other_exps,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByID,
  fetchUserByStudentID,
  fetchWorkExperiences,
  fetchOtherExperiences,
  fetchAllIndustries,
  fetchAllClasses,
  fetchAllSkills,
})(StudentProfileStartup));
