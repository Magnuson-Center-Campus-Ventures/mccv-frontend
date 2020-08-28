import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import TextareaAutosize from 'react-textarea-autosize';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
} from '../../../actions';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

class StudentTiming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        desired_start_date: new Date().toISOString(),
        desired_end_date: new Date().toISOString(),
      },
      badStartDate: false,
      badEndDate: false,
      secondClick: true,
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
      this.props.updateStudent(this.props.student.id, student);
      return {
        ...prevState,
        student,
      };
    });
  }

  checkDateRange = () => {
    console.log(this.state.student);
    const start = new Date(this.state.student.desired_start_date);
    const end = new Date(this.state.student.desired_end_date);
    const diff = (end.getTime() - start.getTime())/(1000 * 3600 * 24 * 7);
    if (diff > 3.5 && diff <= 10) {
      this.state.validDate = true;
      this.props.updateStudent(this.props.student.id, this.state.student);
    } else {
      this.state.validDate = false;
      this.state.student.desired_end_date = new Date(start.getTime() + (1000 * 3600 * 24 * 7 * 4));
    }
  }


  renderDateError = () => {
    if (this.state.validDate == false) {
      return <div className="date-error">Please make the date range 4-10 weeks long</div>
    } else return null;
  }

  renderDateRange = () => {
    return (
      <DateRange
        editableDateInputs={true}
        onChange={(ranges) => {
          this.state.secondClick = !this.state.secondClick;
          this.state.student.desired_start_date = ranges.selection.startDate.toISOString();
          this.state.student.desired_end_date = ranges.selection.endDate.toISOString();
          if (this.state.secondClick){
            this.checkDateRange();
          }
          this.forceUpdate();
        }}
        moveRangeOnFirstSelection={false}
        ranges={[{
          startDate: new Date(this.state.student.desired_start_date),
          endDate: new Date(this.state.student.desired_end_date),
          key: 'selection',
        }]}
      />
    )
  }

    renderTimingQuestions() {
      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Timing</h1>
              <p>Add your desired start date, end date, and time commitment!</p>
            </div>
            <i className="far fa-clock question-header-icon" id="icon" />
          </div>
          <div className="question-horizontal">
            <div className="student-edit-dates">
              <div>Desired Start and End Date</div>
              {this.renderDateError()}
              {this.renderDateRange()}
            </div>
            <p className="question-fields-title">Hours/Week</p>
            <TextareaAutosize className="question-fields-text" onBlur={(event) => this.changeStudentField('time_commitment', event)} defaultValue={this.props.student.time_commitment} />
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
