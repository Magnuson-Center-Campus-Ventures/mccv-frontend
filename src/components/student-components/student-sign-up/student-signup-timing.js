import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import '../../../styles/student-sign-up/student-signup-timing.scss';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
} from '../../../actions';

class StudentTiming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      badStartDate: false,
      badEndDate: false,
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

     // Removes time from date
     convertDate=(date) => {
       if (typeof date !== 'undefined') {
         const dateISO = date.slice(0, 10).split('-');
         return `${dateISO[1]}/${dateISO[2]}/${dateISO[0]}`;
       }
       return '';
     }

     // Date validation function taken from https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
    isValidDate = (dateString) => {
      // Check for mm/dd/yyyy pattern
      if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) { return false; }

      // Parse the date parts to integers
      const parts = dateString.split('/');
      const day = parseInt(parts[1], 10);
      const month = parseInt(parts[0], 10);
      const year = parseInt(parts[2], 10);

      // Check the ranges of month and year
      if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

      const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      // Adjust for leap years
      if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;

      // Check the range of the day
      return day > 0 && day <= monthLength[month - 1];
    };

    renderTimingQuestions() {
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
                Start Date (mm/dd/yyyy)
              </p>
              <div style={{ color: 'red' }}>{this.state.badStartDate ? 'Please enter a valid date with the format mm/dd/yyyy' : null}</div>
              <TextareaAutosize
                onBlur={(event) => {
                  if (!this.isValidDate(event.target.value)) {
                    this.setState({ badStartDate: true });
                  } else {
                    this.setState({ badStartDate: false });
                    this.changeStudentField('desired_start_date', event);
                  }
                }}
                defaultValue={this.convertDate(this.props.student.desired_start_date)}
              />
            </div>
            <div className="StudentTimingQuestionLabelContainer">
              <p className="StudentTimingLabel">
                End Date (mm/dd/yyyy)
              </p>
              <div style={{ color: 'red' }}>{this.state.badEndDate ? 'Please enter a valid date with the format mm/dd/yyyy' : null}</div>
              <TextareaAutosize
                onBlur={(event) => {
                  if (!this.isValidDate(event.target.value)) {
                    this.setState({ badEndDate: true });
                  } else {
                    this.setState({ badEndDate: false });
                    this.changeStudentField('desired_end_date', event);
                  }
                }}
                defaultValue={this.convertDate(this.props.student.desired_end_date)}
              />
            </div>
            <div className="StudentTimingQuestionLabelContainer">
              <p className="StudentTimingLabel">
                Hours/Week
              </p>
              <TextareaAutosize onBlur={(event) => this.changeStudentField('time_commitment', event)} defaultValue={this.props.student.time_commitment} />
            </div>
          </div>
        </div>
      );
    }

    render() {
      return this.renderTimingQuestions();
    }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, { fetchStudentByUserID, fetchUser, updateStudent })(StudentTiming));
