/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchSubmittedApplication,
  fetchQuestions,
  fetchPost,
  fetchStudentByID,
  fetchUserByStudentID,
  fetchWorkExperiences,
  fetchOtherExperiences,
  fetchAllIndustries,
  fetchAllClasses,
  fetchAllSkills,
  fetchUser,
  updateSubmittedApplication,
} from '../../actions';
import '../../styles/startup-submitted-application.scss';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

class ApplicationListItem extends Component {
  componentDidMount() {
    this.props.fetchSubmittedApplication(this.props.match.params.applicationID);
    this.props.fetchQuestions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.current !== null && !isEmpty(this.props.current) && (prevProps.current !== this.props.current)) {
      this.props.fetchPost(this.props.current.post_id);
      this.props.fetchStudentByID(this.props.current.student_id);
    }
    if (!isEmpty(this.props.student) && prevProps.student !== this.props.student) {
      this.props.fetchUserByStudentID(this.props.student._id);
      if (this.props.student.work_exp && this.props.student.work_exp.length > 0) {
        this.props.fetchWorkExperiences(this.props.student.work_exp);
      }
      if (this.props.student.other_exp && this.props.student.other_exp.length > 0) {
        this.props.fetchOtherExperiences(this.props.student.other_exp);
      }
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

  renderPills = (pillsArray) => {
    if (pillsArray && pillsArray.length > 0) {
      return pillsArray.map((elem, index) => {
        return <div key={index} className="profile-pill">{elem.name}</div>;
      });
    } else return <div>None</div>;
  }

  renderWorkExperiences = () => {
    if (this.props.workExps !== []) {
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

  renderQuestions= () => {
    const items = [];
    if (this.props.current.responses && this.props.questions.length > 0) {
      this.props.questions.map((question) => {
        if (this.props.current.responses[question._id]) {
          items.push(
            <div key={question._id} className="question">
              <h3 id="question">{question.question}</h3>
              <h2 id="answer">{this.props.current.responses[question._id]}</h2>
            </div>,
          );
        }
      });
      return items;
    } else {
      return <div />;
    }
  }

  handleApprove = () => {
    const newSubmittedApp = this.props.current;
    newSubmittedApp.status = 'approved';
    console.log(newSubmittedApp);
    this.props.updateSubmittedApplication(newSubmittedApp._id, newSubmittedApp);
  }

  handleDecline = () => {
    const newSubmittedApp = this.props.current;
    newSubmittedApp.status = 'declined';
    console.log(newSubmittedApp);
    this.props.updateSubmittedApplication(newSubmittedApp._id, newSubmittedApp);
  }

  renderActionBtns = () => {
    return (
      <div id="action-btns">
        <button type="submit" onClick={this.handleApprove} style={{ cursor: 'pointer' }}>Approve</button>
        <button type="submit" onClick={this.handleDecline} style={{ cursor: 'pointer' }}>Decline</button>
      </div>
    );
  }

  renderBody = () => {
    return (
      <div className="profile-fixed">
        <div id="profile-header">
          <h1>{`${this.props.student?.first_name} ${this.props.student?.last_name}`}</h1>
          <div>{`Class of ${this.props.student?.grad_year}`}</div>
          <div id="major-row">
            {this.renderMajMin(this.props.student?.majors)}
          </div>
          <div id="minor-row">
            {this.renderMajMin(this.props.student?.minors)}
          </div>
          <div>{this.props.email}</div>
          <div>{this.props.student?.phone_number ? this.props.student?.phone_number : null}</div>
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
      </div>
    );
  }

  render() {
    if (this.props.post != null && !isEmpty(this.props.post) && this.props.student != null && !isEmpty(this.props.student)) {
      console.log(this.props.student);
      return (
        <div>
          {this.renderBody()}
          <div id="work-exps">
            <h2>Work Experience</h2>
            {this.renderWorkExperiences()}
            <h2>Other Experience</h2>
            {this.renderOtherExperiences()}
          </div>
          <div id="questions">
            <h2>Questions</h2>
            {this.renderQuestions()}
          </div>
          {this.renderActionBtns()}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (reduxState) => ({
  student: reduxState.students.current_student,
  email: reduxState.students.current_email,
  workExps: reduxState.students.current_work_exps,
  otherExps: reduxState.students.current_other_exps,
  user: reduxState.user.current,
  userID: reduxState.auth.userID,
  current: reduxState.submittedApplications.current,
  post: reduxState.posts.current,
  questions: reduxState.questions.all,
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
  fetchSubmittedApplication,
  fetchQuestions,
  fetchPost,
  updateSubmittedApplication,
})(ApplicationListItem));
