/* eslint-disable react/no-did-update-set-state */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchStudentByUserID, fetchUser, updateStudent, updateOtherExperience, fetchOtherExperiences, deleteOtherExperience,
} from '../../../actions';
import OtherExperience from '../other-experience';
import NewOtherExp from '../student-modals/new-other-exp';

function StudentOtherExperiences(props) {
  const [isEditing, setisEditing] = useState(false)
  const [student, setstudent] = useState({})
  const [otherExps, setotherExps] = useState([])
  const [show, setshow] = useState(false)
  const[m, setM] = useState(false)

  useEffect(() => {
    if (!m) {
      props.fetchStudentByUserID(props.userID);
      props.fetchUser(props.userID);
      setM(true);
    }
  })
  useEffect(() => {
    if (props.student.other_exp && props.student.other_exp.length > 0) {
      props.fetchOtherExperiences(props.student.other_exp);
    }
    setstudent(props.student);
    setotherExps(props.otherExps);
  }, [props.student, props.otherExps])

   const showModal = (e) => {
     setshow(true);
   };

   const isEditing_ = (e) => {
     setisEditing(!isEditing)
   };

   const hideModal = (e) => {
     setshow(false)
     otherExps.forEach((otherExp) => {
       props.updateOtherExperience(otherExp._id, otherExp);
     });
     props.updateStudent(student.id, student);
   }

   const changeOtherExpField = (index, field, value) => {
    otherExps[index][field] = value;
    setotherExps(otherExp)
   }

   const submit = () => {
     if (isEditing) {
       const student = { ...student };
       props.updateStudent(student.id, student);
       otherExps.forEach((otherExp) => {
         props.updateOtherExperience(otherExp._id, otherExp);
       });
     }
     setisEditing(!isEditing)
   }

     // update student field
     const changeStudentField = (field, event) => {
       // eslint-disable-next-line prefer-destructuring
       const value = event.target.value;
       student[field] = value;
       setstudent(student)
     }

     const hideOtherExpModal = () => {
       setshow(false)
     };

    const renderOtherExperiences = () => {
      if (otherExps !== []) {
        return otherExps.map((otherExp, index) => {
          return (
            <OtherExperience key={index}
              className="other-exp"
              isEditing={isEditing}
              otherExp={otherExp}
              index={index}
              changeOtherExpField={changeOtherExpField}
            />
          );
        });
      } else return null;
    }

      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Personal Projects And Other Experiences</h1>
              <p>Add personal projects and other experiences that have been meaningful to you!</p>
            </div>
            <i className="fas fa-briefcase question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            <div className="question-fields-exp-header">
              <p className="question-fields-title">Personal Projects And Other Experiences</p>
              <i className="fas fa-plus-circle question-fields-button" id="addicon" onClick={(e) => { showModal(); }} />
              <i className="far fa-edit question-fields-button" id="editicon" onClick={(e) => { submit(); }} />
            </div>
            <div id="other-exps">
              {renderOtherExperiences()}
              <div className="student-profile">
                <NewOtherExp
                  onClose={hideOtherExpModal}
                  show={show}
                />
              </div>
            </div>
          </div>
        </div>
      );
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
  otherExps: reduxState.students.current_other_exps,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, updateStudent, updateOtherExperience, fetchOtherExperiences, deleteOtherExperience,
})(StudentOtherExperiences));
