import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import '../../styles/studentSignUp/student-signup-timing.scss';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
} from '../../actions';

class StudentTiming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchStudentByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
  }

    // update student field
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

    // Send update to database
    onSubmit = (e) => {
      this.props.updateStudent(this.props.student.id, this.state.student);
    };

    // Removes time from date
    convertDate=(date) => {
      console.log(date);
      if (typeof date !== 'undefined') {
        const dateISO = date.slice(0, 10).split('-');
        return `${dateISO[1]}/${dateISO[2]}/${dateISO[0]}`;
      }
      return '';
    }


    renderBioQuestions() {
      return (
        <div className="StudentTimingContainer">
          <div className="StudentTimingHeaderContainer">
            <h1 className="StudentTimingHeader">
              Timing
            </h1>
          </div>
          <div className="StudentTimingDescContainer">
            <p className="StudentTimingDesc">
              Add your desired start date, end date, and time commitment!
            </p>
            <i className="far fa-clock" id="icon" />
          </div>
          <div className="StudentTimingQuestionsContainer">
            <div className="StudentTimingQuestionLabelContainer">
              <p className="StudentTimingLabel">
                Start Date (--/--/----)
              </p>
              <TextareaAutosize onBlur={(event) => this.changeStudentField('desired_start_date', event)} defaultValue={this.convertDate(this.props.student.desired_start_date)} />
            </div>
            <div className="StudentTimingQuestionLabelContainer">
              <p className="StudentTimingLabel">
                End Date (--/--/----)
              </p>
              <TextareaAutosize onBlur={(event) => this.changeStudentField('desired_end_date', event)} defaultValue={this.convertDate(this.props.student.desired_end_date)} />
            </div>
            <div className="StudentTimingQuestionLabelContainer">
              <p className="StudentTimingLabel">
                Hours/Week
              </p>
              <TextareaAutosize onBlur={(event) => this.changeStudentField('time_commitment', event)} defaultValue={this.props.student.time_commitment} />
            </div>
          </div>
          <div className="buttonContainer">
            <button type="submit" className="submit-btn-student-timing" style={{ cursor: 'pointer' }} onClick={this.onSubmit}>
              Submit!
            </button>
          </div>
        </div>
      );
    }

    render() {
      return this.renderBioQuestions();
    }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  student: reduxState.students.current,
});

export default withRouter(connect(mapStateToProps, { fetchStudentByUserID, fetchUser, updateStudent })(StudentTiming));
