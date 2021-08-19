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
  fetchPost,
  fetchStudentByID,
  fetchUserByStudentID,
  fetchUser,
} from '../../actions';
import '../../styles/startup-submitted-application.scss';
 
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

class ApplicationListItem extends Component {
  componentDidMount() {
    this.props.fetchSubmittedApplication(this.props.match.params.applicationID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.current !== null && !isEmpty(this.props.current) && (prevProps.current !== this.props.current)) {
      this.props.fetchPost(this.props.current.post_id);
    }
  }

  logoCompanyName = () => {
    if (this.props.post.startup_id.logo) {
      return (
        <div className="profileCompanyInfo">
          <div className="profileCompanyLeft">
            <img src={this.props.post.startup_id.logo} alt="no logo" className="profileCompanyLogo"/>
          </div>
          <div className="profileCompanyRight">
            <div className="profileCompanyTitle"> { this.props.post.startup_id.name} </div>
          </div>  
        </div>
      );
    } else {
      return (
        <div>
          <div className="profileCompanyTitle"> { this.props.post.startup_id.name} </div>
        </div>
      );
    }
  }

  dates = () => {
    const start = new Date(this.props.post.desired_start_date);
    const end = new Date(this.props.post.desired_end_date);
    if (start) {
      return (
        <span className="dateText">Starts {`${start.getMonth() + 1}/${start.getDate()}/${start.getFullYear()}, 
        Ends ${end.getMonth() + 1}/${end.getDate()}/${end.getFullYear()}`}</span>
      );
    } else {
      return (
        <div />
      );
    }
  }

  renderVirtual = () => {
    if (this.props.post.virtual==true) {
      return (
        <div className="position-location-row">
          <span className="virtualIcon" />
          <span className="position-location">Virtual</span>
        </div>  
      );
    } else {
      return (
        <div />
      );
    }
  }

  renderInPerson = () => {
    if (this.props.post.city && this.props.post.state) {
      return (
        <div className="position-location-row">
          <span className="locationIcon" />
          <span className="position-location"> {`${this.props.post.city}, ${this.props.post.state}`} </span>
        </div> 
      );
    } else {
      return (
        <div />
      );
    }
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
        <div id="app-status-yellow-pill">Pending Review</div>
      );
    }
  }

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

  render() {
    if (this.props.post != null && !isEmpty(this.props.post)) {
      return (
        <div>
          {/* <div className="job-info"> */}
            {/* <h1>{this.props.post.title}</h1>
            <h2 id="startupName"> { this.props.post.startup_id.name} </h2>
            {this.renderVirtual()}
            {this.renderInPerson()} */}

            {/* <div className="location">
              <span className="locationIcon" />
              <h2> {`${this.props.post.city}, ${this.props.post.state}`} </h2>
            </div> */}

          <div className="profileBody">
            <div className="profileText">
              <div className="company-position-info">
                {this.logoCompanyName()}

                <div className="position-info">
                  <div className="position-title">{this.props.post.title}</div>
                  {this.renderVirtual()}
                  {this.renderInPerson()}
                  <div className="position-dates">
                  {this.dates()}
                </div>

                <div className="position-time-commitment">
                  {this.props.post.time_commitment ? 'Expected Time Commitment'.concat(': ', this.props.post.time_commitment.toString()).concat(' ', 'hrs/week') : null}
                </div>
              </div>
            </div>

            <hr className="profile-divider" />
            <div className="exps-fixed">
              <h2>Questions</h2>
              {this.renderQuestions()}
              <div className="app-status-row">
                <div id="app-status-title">Status: </div>
                {this.renderStatusPill()}
              </div>
            </div>
          </div>
        </div>
        </div>
      );
    } else {
      return (<div />);
    }
  }
}

const mapStateToProps = (reduxState) => ({
  student: reduxState.students.current_student,
  user: reduxState.user.current,
  current: reduxState.submittedApplications.current,
  post: reduxState.posts.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByID,
  fetchUserByStudentID,
  fetchUser,
  fetchSubmittedApplication,
  fetchPost,
})(ApplicationListItem));
