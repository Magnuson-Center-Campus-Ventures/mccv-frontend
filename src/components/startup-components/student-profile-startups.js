/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchStudentByID, fetchUserByStudentID, fetchWorkExperiences, fetchOtherExperiences,
  fetchAllIndustries, fetchAllClasses, fetchAllSkills, fetchUser,
} from '../../actions';
import WorkExperience from '../student-components/work-experience';
import OtherExperience from '../student-components/other-experience';
import Archive from '../admin-modals/archive';

import '../../styles/student-profile.scss';

class StudentProfileStartup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archiveShow: false,
    };
  }

  componentDidMount() {
    this.props.fetchStudentByID(this.props.match.params.studentID);
    this.props.fetchUser(localStorage.getItem('userID'));
    // this.props.fetchUserByStudentID();
  }

  // Fetch a student's experiences once the student is loaded into props
  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      this.props.fetchUserByStudentID(this.props.student._id);
      if (this.props.student.work_exp && this.props.student.work_exp.length > 0) {
        this.props.fetchWorkExperiences(this.props.student.work_exp);
      }
      if (this.props.student.other_exp && this.props.student.other_exp.length > 0) {
        this.props.fetchOtherExperiences(this.props.student.other_exp);
      }
    }
  }

  showArchiveModal = (e) => {
    this.setState({
      archiveShow: true,
    });
  }

  hideArchiveModal = (e) => {
    this.setState({
      archiveShow: false,
    });
  }

  renderButtons() {
    if (this.props.user?.role === 'admin' && this.props.student?.status === 'Approved') {
      return (
        <button
          className="edit-button"
          type="submit"
          onClick={(e) => {
            this.showArchiveModal();
          }}
        >
          Archive
        </button>
      );
    }
  }

  renderClassYearAffiliation() {
    if (this.props.student?.affiliation) {
      return (
        <div id="class-year">{`Class of ${this.props.student?.grad_year}`} ({this.props.student?.affiliation})</div>
      );
    } else {
      return (
        <div id="class-year">{`Class of ${this.props.student?.grad_year}`}</div>
      );
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
            <div key={index} className="majors">{elem}</div>
          );
        }
      });
    } else return null;
  }
  
  renderMajors = () => {
    if (this.props.student?.majors?.length > 0 && this.props.student?.majors[0] != "") {
      return (
        <div id="major-row">
          <div className="student-major-title">Major in </div>
          {this.renderMajMin(this.props.student.majors)}
        </div>
      );
    } else {
      return (<div/>);
    }
  }

  renderMinors = () => {
    if (this.props.student?.minors?.length > 0 && this.props.student?.minors[0] != "") {
      return (
        <div id="minor-row">
          <div className="student-minor-title">Minor in </div>
          {this.renderMajMin(this.props.student.minors)}
        </div>
      );
    } else {
      return (<div/>);
    }
  }

  startDate = () => {
    if (this.props.student?.desired_start_date != null) {
      const start = new Date(this.props.student.desired_start_date);
      return (
        <span className="student-start-date">Desired Start Date: {`${start.getMonth()}/${start.getDate()}/${start.getFullYear()}`}</span>
      );
    } else {
      return (
        <div />
      );
    }
  }

  endDate = () => {
    if (this.props.student?.desired_end_date != null) {
      const end = new Date(this.props.student.desired_end_date);
      return (
        <span className="student-end-date">Desired End Date: {`${end.getMonth()}/${end.getDate()}/${end.getFullYear()}`}</span>
      );
    } else {
      return (
        <div />
      );
    }
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

  renderBody = () => {
    return (
      <div className="profile-fixed">
        <div id="profile-header">
          <h1 id="student-profile-name">{`${this.props.student?.first_name} ${this.props.student?.last_name}`}</h1>
          {this.renderClassYearAffiliation()}
          {this.renderMajors()}
          {this.renderMinors()}
          <div className="space"/>
          <div className="student-contact">{this.props.email}</div>
          <div className="student-contact">{this.props.student?.phone_number ? this.props.student?.phone_number : null}</div>
          <div className="space"/>
          <div className="student-start-date">
              {this.startDate()}
          </div>
          <div className="student-end-date">
            {this.endDate()}
          </div>
          <div className="post-time-commitment">
            {this.props.student.time_commitment ? 'Time Commitment'.concat(': ', this.props.student.time_commitment.toString()).concat(' ', 'hrs/week') : null}
            </div>
          <hr className="profile-divider" />
          <div id="lists-row">
            <div className="list-section">
              <h2>Industries</h2>
              {this.renderYellowPills(this.props.student?.interested_industries)}
            </div>
            <div className="list-section" >
              <h2>Classes</h2>
              {this.renderRedPills(this.props.student?.relevant_classes)}
            </div>
            <div className="list-section">
              <h2>Skills</h2>
              {this.renderGreenPills(this.props.student?.skills)}
            </div>
          </div>
        </div>
      </div>
      /*<div className="profile-fixed">
        <div id="profile-header">
          <h1>{`${this.props.student?.first_name} ${this.props.student?.last_name}`}</h1>
          <div id="class-year">{`Class of ${this.props.student?.grad_year}`}  ({this.props.student?.affiliation})</div>
          <div id="major-row">
            <div>Major in</div>
            {this.renderMajMin(this.props.student?.majors)}
          </div>
          <div id="minor-row">
            <div>Minor in</div>
            {this.renderMajMin(this.props.student?.minors)}
          </div>
          <div className="student-contact">{this.props.email}</div>
          <div className="student-contact">{this.props.student?.phone_number ? this.props.student?.phone_number : null}</div>
          <div className="student-start-date">
            {this.props.student.desired_start_date ? 'Desired Start Date'.concat(': ', this.props.student.desired_start_date.toString().substring(0, 10)) : null}
            </div>
          <div className="student-end-date">
            {this.props.student.desired_end_date ? 'Desired End Date'.concat(': ', this.props.student.desired_end_date.toString().substring(0, 10)) : null}
            </div>
          <div className="post-time-commitment">
            {this.props.student.time_commitment ? 'Time Commitment'.concat(': ', this.props.student.time_commitment.toString()).concat(' ', 'hrs/week') : null}
            </div>
          <hr className="profile-divider" />
          <div id="lists-row">
            <div className="list-section">
              <h2>Industries</h2>
              {this.renderPills(this.props.student?.interested_industries)}
            </div>
            <div className="list-section">
              <h2>Classes</h2>
              {this.renderPills(this.props.student?.relevant_classes)}
            </div>
            <div className="list-section">
              <h2>Skills</h2>
              {this.renderPills(this.props.student?.skills)}
            </div>
          </div>
        </div>
    </div>*/
    );
  }

  renderWorkExperiences = () => {
    if (this.props.workExps !== []) {
      return this.props.workExps.map((workExp, index) => {
        return (
          <WorkExperience key={index}
            className="work-exp"
            isEditing={false}
            workExp={workExp}
            index={index}
          />
        );
      });
    } else return null;
    /*if (this.props.workExps !== []) {
      return this.props.workExps.map((workExp, index) => {
        return (
          <div key={index} className="work-exp">
            <div>{workExp.role}</div>
            <div>{workExp.employer}</div>
            <div>{`${workExp.city}, ${workExp.state}`}</div>
            <div className="date-row">
              {`${new Date(workExp.start_date).getMonth() + 1}/${new Date(workExp.start_date).getFullYear()} - `}
              {workExp.currently_working ? 'present' : `${new Date(workExp.end_date).getMonth() + 1}/${new Date(workExp.end_date).getFullYear()}`}
            </div>
            <div>{workExp.description}</div>
          </div>
        );
      });
    } else return null;*/
  }

  renderOtherExperiences = () => {
    if (this.props.otherExps !== []) {
      return this.props.otherExps.map((otherExp, index) => {
        return (
          <OtherExperience key={index}
            className="work-exp"
            isEditing={false}
            otherExp={otherExp}
            index={index}
          />
        );
      });
    } else return null;
    /*if (this.props.otherExps !== []) {
      return this.props.otherExps.map((otherExp, index) => {
        return (
          <div key={index} className="work-exp">
            <div>{otherExp.name}</div>
            <div>{otherExp.description}</div>
          </div>
        );
      });
    } else return null;*/
  }

  render() {
    return (
      <div className="student-profile">
        <Archive
          student={this.props.student}
          onClose={this.hideArchiveModal}
          show={this.state.archiveShow}
        />
        {this.renderBody()}
        <hr className="profile-divider" />
        <div className="exps-fixed">
          <h2>Work Experience</h2>
          {this.renderWorkExperiences()}
        </div>
        <hr className="profile-divider" />
        <div className="exps-fixed">
          <h2>Other Experience</h2>
          {this.renderOtherExperiences()}
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  student: reduxState.students.current_student,
  email: reduxState.students.current_email,
  workExps: reduxState.students.current_work_exps,
  otherExps: reduxState.students.current_other_exps,
  user: reduxState.user.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByID,
  fetchUserByStudentID,
  fetchWorkExperiences,
  fetchOtherExperiences,
  fetchAllIndustries,
  fetchAllClasses,
  fetchAllSkills,
  fetchUser,
})(StudentProfileStartup));
