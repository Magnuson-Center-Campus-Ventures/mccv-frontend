import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import '../../styles/studentSignUp/student-signup-bio.scss';
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
            <div className="nameContainer">
              <div className="StudentTimingQuestionLabelContainer">
                <p className="StudentTimingLabel">
                  First Name
                </p>
                <TextareaAutosize onBlur={(event) => this.changeStudentField('first_name', event)} defaultValue={this.props.student.first_name} />
              </div>
              <div className="StudentTimingQuestionLabelContainer">
                <p className="StudentTimingLabel">
                  Last Name
                </p>
                <TextareaAutosize onBlur={(event) => this.changeStudentField('last_name', event)} defaultValue={this.props.student.last_name} />
              </div>
            </div>
            <div className="StudentTimingQuestionLabelContainer">
              <p className="StudentTimingLabel">
                Graduation Year
              </p>
              <TextareaAutosize onBlur={(event) => this.changeStudentField('grad_year', event)} defaultValue={this.props.student.grad_year} />
            </div>
            <div className="StudentTimingQuestionLabelContainer">
              <p className="StudentTimingLabel">
                Phone Number
              </p>
              <TextareaAutosize onBlur={(event) => this.changeStudentField('phone_number', event)} defaultValue={this.props.student.phone_number} />
            </div>
          </div>
          <div className="buttonContainer">
            <button type="submit" className="submit-btn-student-timing" style={{ cursor: 'pointer' }} onClick={this.onSubmit}>
              Next
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
