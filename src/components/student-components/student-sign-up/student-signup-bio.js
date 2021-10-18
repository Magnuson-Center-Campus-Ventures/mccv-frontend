import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
} from '../../../actions';

function StudentBio(props) {
  const [student, setStudent] = useState({})
  const [selected, setSelected] = useState('')
  const [m, setM] = useState(false)

  useEffect(() => {
    if (!m) {
      props.fetchStudentByUserID(props.userID);
      props.fetchUser(props.userID);
      setM(true)
    }
  })

  // update student field
  const changeStudentField = (field, event) => {
    // eslint-disable-next-line prefer-destructuring
    const value = event.target.value;
    const student_ = { ...student };
    student_[field] = value;
    props.updateStudent(props.student.id,
      student_);
    setStudent(student_);
  }

  const renderBioQuestions = () => {
    return (
      <div className="question">
        <div className="question-header">
          <div className="question-header-prompt">
            <h1>Bio</h1>
            <p>Add your name and graduation year!</p>
            <p className="imptMessage">* indicates a required field!</p>
          </div>
          <i className="far fa-id-badge question-header-icon" id="icon" />
        </div>
        <div className="question-fields">
          <p className="question-fields-title">First Name  <span className="imptMessage">*</span></p>
          <TextareaAutosize className="question-fields-text" onChange={(event) => changeStudentField('first_name', event)} defaultValue={props.student.first_name} />
          <p className="question-fields-title">Last Name  <span className="imptMessage">*</span></p>
          <TextareaAutosize className="question-fields-text" onChange={(event) => changeStudentField('last_name', event)} defaultValue={props.student.last_name} />
          <p className="question-fields-title">Graduation Year <span className="imptMessage">*</span></p>
          <TextareaAutosize className="question-fields-text" onChange={(event) => changeStudentField('grad_year', event)} defaultValue={props.student.grad_year} />
          <p className="question-fields-title">Phone Number  <span className="imptMessage">*</span></p>
          <TextareaAutosize className="question-fields-text" onChange={(event) => changeStudentField('phone_number', event)} defaultValue={props.student.phone_number} />
          <p className="question-fields-title">Bio </p>
          <TextareaAutosize className="question-fields-text" onChange={(event) => changeStudentField('bio', event)} defaultValue={props.student.bio} />
          <p className="question-fields-title">Gender <span className="imptMessage"> *</span></p>
          <select value={selected}
            onChange={(event) => {
              changeStudentField('gender', event);
              setSelected(event.target.value);
            }}
            style={{minHeight: '35px'}}
          >
            <option value="select">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer not to say">Prefer Not to Say</option>
          </select>
        </div>
      </div>
    );
  }
  return renderBioQuestions();
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, { fetchStudentByUserID, fetchUser, updateStudent })(StudentBio));
