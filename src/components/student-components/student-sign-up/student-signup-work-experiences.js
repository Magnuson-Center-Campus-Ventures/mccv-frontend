/* eslint-disable react/no-did-update-set-state */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchStudentByUserID, fetchUser, updateStudent, updateWorkExperience, fetchWorkExperiences, deleteWorkExperience,
} from '../../../actions';
import WorkExperience from '../work-experience';
import NewWorkExp from '../student-modals/new-work-exp';

function StudentWorkExperiences(props) {
  const [isEditing, setisEditing] = useState(false)
  const [student, setstudent] = useState({})
  const [workExps, setworkExps] = useState([])
  const [show, setshow] = useState(false)
  const[m, setM] = useState(false)

  useEffect(() => {
    if (!m) {
      props.fetchStudentByUserID(props.userID);
      props.fetchUser(props.userID);
      setM(true);
    }
  })
  useEffect((prevProps, prevState) => {
    if (props.student && props.student !== {} && prevProps.student !== props.student) {
      if (props.student.work_exp && props.student.work_exp.length > 0) {
        props.fetchWorkExperiences(props.student.work_exp);
      }
      setstudent(props.student)
    }

    if (prevProps.workExps !== props.workExps) {
      setworkExps(props.workExps)
    }
  }, [])

  const showModal = (e) => {
    setshow(true)
  };

  const isEditing_ = (e) => {
    setisEditing(!isEditing)
  };

  const hideModal = (e) => {
    setshow(false)
    workExps.forEach((workExp) => {
      props.updateWorkExperience(workExp._id, workExp);
    });
    props.updateStudent(student.id, student);
  }

  const changeWorkExpField = (index, field, value) => {
    workExps[index][field] = value;
    setworkExps(workExps)
  }

  const submit = () => {
    if (isEditing) {
      const student = { ...student };
      props.updateStudent(student.id, student);
      workExps.forEach((workExp) => {
        props.updateWorkExperience(workExp._id, workExp);
      });
    }
    isEditing_(null)
  }

  // update student field
  const changeStudentField = (field, event) => {
    // eslint-disable-next-line prefer-destructuring
    const value = event.target.value;
    student[field] = value;
    setstudent(student)
  }

  const hideWorkExpModal = () => {
    setshow(false)
  };

  const renderWorkExperiences = () => {
    if (workExps !== []) {
      return workExps.map((workExp, index) => {
        return (
          <WorkExperience key={index}
            className="work-exp"
            isEditing={isEditing}
            workExp={workExp}
            index={index}
            changeWorkExpField={changeWorkExpField}
          />
        );
      });
    } else return null;
  }

    return (
      <div className="question">
        <div className="student-profile">
          <NewWorkExp
            onClose={hideWorkExpModal}
            show={show}
          />
        </div>
        <div className="question-header">
          <div className="question-header-prompt">
            <h1>Work Experience</h1>
            <p>Add your relevant work experience!</p>
          </div>
          <i className="fas fa-briefcase question-header-icon" id="icon" />
        </div>
        <div className="question-fields">
          <div className="question-fields-exp-header">
            <p className="question-fields-title">Work Experiences</p>
            <i className="fas fa-plus-circle question-fields-button" id="addicon" onClick={(e) => { showModal(); }} />
            <i className="far fa-edit question-fields-button" id="editicon" onClick={(e) => { submit(); }} />
          </div>
          <div className="exps-fixed">
            {renderWorkExperiences()}
          </div>
        </div>

      </div>
    );
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
  workExps: reduxState.students.current_work_exps,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, updateStudent, updateWorkExperience, fetchWorkExperiences, deleteWorkExperience,
})(StudentWorkExperiences));
