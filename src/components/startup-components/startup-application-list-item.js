/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Confirm } from 'semantic-ui-react';
import {
  fetchSubmittedApplication,
  fetchPost,
  updatePost,
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
import StudentProfileStartup from './student-profile-startups';
// import WorkExperience from '../student-components/work-experience';
// import OtherExperience from '../student-components/other-experience';
import '../../styles/startup-submitted-application.scss';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

class StartupApplicationListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { openConfirmApprove: false };
    this.state = { openConfirmDecline: false };
  }

  componentDidMount() {
    this.props.fetchSubmittedApplication(this.props.match.params.applicationID); 
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.current !== null && !isEmpty(this.props.current) && (prevProps.current !== this.props.current)) {
      this.props.fetchPost(this.props.current.post_id);
      this.props.fetchStudentByID(this.props.current.student_id);
    }
    if (this.props.student && !isEmpty(this.props.student) && prevProps.student !== this.props.student) {
      this.props.fetchUserByStudentID(this.props.student._id);
      if (this.props.student.work_exp && this.props.student.work_exp.length > 0) {
        this.props.fetchWorkExperiences(this.props.student.work_exp);
      }
      if (this.props.student.other_exp && this.props.student.other_exp.length > 0) {
        this.props.fetchOtherExperiences(this.props.student.other_exp);
      }
    }
  }

  // not needed anymore since using student-profile-startups component
  /*
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
  } */

  // old styling
  /*renderWorkExperiences = () => {
    if (this.props.workExps !== []) {
      return this.props.workExps.map((workExp, index) => {
        return (
          <div key={index} id="work-exp">
            <h3>{workExp.role}</h3>
            <div>{workExp.employer}</div>
            <div id="work-info">
              <div>{`${workExp.city}, ${workExp.state}`}</div>
              <div className="date-row">
                {`${new Date(workExp.start_date).getMonth() + 1}/${new Date(workExp.start_date).getFullYear()} - `}
                {workExp.currently_working ? 'present' : `${new Date(workExp.end_date).getMonth() + 1}/${new Date(workExp.end_date).getFullYear()}`}
              </div>
            </div>
            <div id="work-description">{workExp.description}</div>
          </div>
        );
      });
    } else return null;
  }

  renderOtherExperiences = () => {
    if (this.props.otherExps !== []) {
      return this.props.otherExps.map((otherExp, index) => {
        return (
          <div key={index} id="work-exp">
            <h3>{otherExp.name}</h3>
            <div>{otherExp.description}</div>
          </div>
        );
      });
    } else return null;
  } */




  renderQuestions = () => {
    const items = [];
    if (this.props.current.questions && this.props.current.questions.length > 0) {
      this.props.current.questions.map((question) => { 
        items.push(
          <div key={question} className="work-exp">
            <div className="exp-title">{question}</div>
            <div className="exp-text">
              {this.props.current.answers[this.props.current.questions.findIndex((temp) => {
                return temp == question
              })]}
            </div>
          </div>,
        );
        //}
      });
      return items;
    } else {
      return <div />;
    }
  }
  

  handleApprove = () => {
    const newSubmittedApp = this.props.current;
    newSubmittedApp.status = 'approved';
    const newPost = this.props.post;
    newPost.students_selected.push(this.props.student);
    this.props.updatePost(this.props.post._id, newPost);
    this.props.updateSubmittedApplication(newSubmittedApp._id, newSubmittedApp);
    this.setState({ openConfirmApprove: false });
  }

  handleDecline = () => {
    const newSubmittedApp = this.props.current;
    newSubmittedApp.status = 'declined';
    this.props.updateSubmittedApplication(newSubmittedApp._id, newSubmittedApp);
    this.setState({ openConfirmDecline: false });
  }

  handleCancel = () => {
    this.setState({ openConfirmDecline: false, openConfirmApprove: false });
  }

  toggleClass = () => {
    const oldClassName = document.getElementById('page-wrap').className;
    const newClassName = oldClassName === 'dialogIsOpen' ? 'dialogIsClosed' : 'dialogIsOpen';
    document.getElementById('page-wrap').className = newClassName;
  }


  showConfirmApprove = () => {
    this.setState({ openConfirmApprove: true });
  }

  showConfirmDecline = () => {
    this.setState({ openConfirmDecline: true });
  }

  renderGrayPills = (pillsArray) => {
    if (pillsArray && pillsArray.length > 0) {
      return pillsArray.map((elem, index) => {
        return <div key={index} className="student-profile-pill-gray">{elem.name}</div>;
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

  renderStatusPill = () => {
    if (this.props.current.status === "approved") {
      return (
        <div id="app-status-green-pill">Approved</div>
      );
    } else if (this.props.current.status === "declined") {
      return (
        <div id="app-status-red-pill">Declined</div>
      );
    } else {
      return (
        <div id="app-status-yellow-pill">Pending</div>
      );
    }
  }

  renderActionBtns = () => {
    if (this.props.current.status === 'pending') {
      return (
        <div id="action-btns">
          <button id="action-btn-green" type="submit" onClick={this.showConfirmApprove} style={{ cursor: 'pointer' }}>Approve</button>
          <Confirm
            id="confirmation-popup"
            open={this.state.openConfirmApprove}
            content="Approve candidate for this position?"
            onCancel={this.handleCancel}
            onConfirm={this.handleApprove}
          />
          <button id="action-btn-red" type="submit" onClick={this.showConfirmDecline} style={{ cursor: 'pointer' }}>Decline</button>
          <Confirm
            id="confirmation-popup"
            open={this.state.openConfirmDecline}
            content="Decline candidate for this position?"
            onCancel={this.handleCancel}
            onConfirm={this.handleDecline}
          />
          {(this.state.openConfirmApprove || this.state.openConfirmDecline) && (
            <div id="confirmation-background" />
          )}
        </div>
      );
    } else {
      return ( 
        <div className="startup-app-status-row">
          <div id="app-status-title">Status: </div>
          {this.renderStatusPill()}
        </div>

        // <div id="action-btns">
        //   <div id="static-status">{this.props.current.status[0].toUpperCase() + this.props.current.status.slice(1)}</div>
        // </div>
      );
    }
  }
  
  renderBody = () => {
    return (
      <StudentProfileStartup 
        student={this.props.student} 
        email={this.props.email} 
        workExps={this.props.workExps} 
        otherExps={this.props.otherExps}
        user={this.props.user}
      />
      // styling before deciding to use student-profile-startups component
      /*<div className="profile-fixed">
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
      </div>*/

      // old styling
      /*<div className="profile-fixed">
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
            <div className="list-section" id="list-industries">
              <h2>Industries</h2>
              {this.renderPills(this.props.student?.interested_industries)}
            </div>
            <div className="list-section" id="list-classes">
              <h2>Classes</h2>
              {this.renderPills(this.props.student?.relevant_classes)}
            </div>
            <div className="list-section" id="list-skills">
              <h2>Skills</h2>
              {this.renderPills(this.props.student?.skills)}
            </div>
          </div>
        </div>
      </div>*/
    );
  }

  render() {
    if (this.props.post != null && !isEmpty(this.props.post) && this.props.student != null && !isEmpty(this.props.student)) {
      return (
        <div className="student-profile">
          {this.renderBody()}
          
          {/*<hr className="profile-divider" />
          <div className="exps-fixed">
            <h2>Work Experience</h2>
            {this.renderWorkExperiences()}
          </div>
          <hr className="profile-divider" />
          <div className="exps-fixed">
            <h2>Other Experience</h2>
            {this.renderOtherExperiences()}
          </div>*/}
          
          <hr className="profile-divider" />
          <div className="exps-fixed">
            <h2>Questions</h2>
            {this.renderQuestions()}
            {this.renderActionBtns()}
          </div>
        </div>

        // old styling
        /*<div>
          <div id="page-wrap">
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
          </div>
          {this.renderActionBtns()}
        </div>*/
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
  current: reduxState.submittedApplications.current,
  post: reduxState.posts.current,
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
  fetchPost,
  updatePost,
  updateSubmittedApplication,
})(StartupApplicationListItem));
