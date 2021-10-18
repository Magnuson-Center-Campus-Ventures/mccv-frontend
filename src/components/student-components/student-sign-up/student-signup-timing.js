import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import TextareaAutosize from 'react-textarea-autosize';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
} from '../../../actions';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function StudentTiming(props) {
  const [student, setstudent] = useState({
    desired_start_date: new Date().toISOString(),
    desired_end_date: new Date().toISOString(),
  })
  const [badStartDate, setbadStartDate] = useState(false)
  const [badEndDate, setbadEndDate] = useState(false)
  const [secondClick, setsecondClick] = useState(true)
  const[m, setM] = useState(false)
  useEffect(() => {
    if (!m) {
      props.fetchStudentByUserID(props.userID);
      props.fetchUser(props.userID);
      setM(true);
    }
  })

  // update student field
  const changeStudentField = (field, event) => {
    // eslint-disable-next-line prefer-destructuring
    const value = event.target.value;
    student[field] = value;
    props.updateStudent(props.student.id, student);
    setstudent(student)
  }

  const checkDateRange = () => {
    const start = new Date(student.desired_start_date);
    const end = new Date(student.desired_end_date);
    const diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24 * 7);
    if (diff > 3.5 && diff <= 10) {
      validDate = true;
      props.updateStudent(props.student.id, student);
    } else {
      validDate = false;
      student.desired_end_date = new Date(start.getTime() + (1000 * 3600 * 24 * 7 * 4));
      setstudent(student)
    }
  }


  const renderDateError = () => {
    if (validDate === false) {
      return <div className="date-error">Please make the date range 4-10 weeks long</div>;
    } else return null;
  }

  const renderDateRange = () => {
    return (
      <DateRange
        editableDateInputs
        onChange={(ranges) => {
          secondClick = !secondClick;
          student.desired_start_date = ranges.selection.startDate.toISOString();
          student.desired_end_date = ranges.selection.endDate.toISOString();
          if (secondClick) {
            checkDateRange();
          }
          setstudent(student)
        }}
        moveRangeOnFirstSelection={false}
        ranges={[{
          startDate: new Date(student.desired_start_date),
          endDate: new Date(student.desired_end_date),
          key: 'selection',
        }]}
      />
    );
  }

  function renderTimingQuestions() {
    return (
      <div className="question">
        <div className="question-header">
          <div className="question-header-prompt">
            <h1>Timing</h1>
            <p>(Optional) Add your desired start date, end date, and time commitment!</p>
          </div>
          <i className="far fa-clock question-header-icon" id="icon" />
        </div>
        <div className="question-horizontal">
          <div className="student-edit-dates">
            <div>Desired Start and End Date</div>
            {renderDateError()}
            {renderDateRange()}
          </div>
          <p className="question-fields-title">Hours/Week</p>
          <TextareaAutosize className="question-fields-text" onBlur={(event) => changeStudentField('time_commitment', event)} defaultValue={props.student.time_commitment} />
        </div>
      </div>
    );
  }

    return renderTimingQuestions();
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, { fetchStudentByUserID, fetchUser, updateStudent })(StudentTiming));
