/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable func-names */


import React, { Component, useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
} from '../../../actions';
import {usePrevious} from '../../utils'

function StudentMajorMinors(props) {
  const [student, setstudent] = useState(props.student|{})
  const [affiliation, setaffiliation] = useState('')
  const [newMajor, setnewMajor] = useState('')
  const [newMinor, setnewMinor] = useState('')
  const[m, setM] = useState(false)
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!m) {
      props.fetchStudentByUserID(props.userID);
      props.fetchUser(props.userID);
      setM(true)
    }
  })

  useEffect(() => {
    setstudent(props.student)
  }, [])


  const onAffiliationChange = (event) => {
    props.student.affiliation = event.target.value;
    setaffiliation(event.target.value,)
    props.ifFilled();
  }

  function renderMajors() {
    return props.student.majors.map((major, index) => {
      return (
        <div key={major} className="resp-input">
          <li id="responsibility" key={index}>{major}</li>
          <button type="button"
            className="del-button"
            onClick={() => {
              student.majors.splice(index, 1);
              props.student.majors = student.majors;
              setstudent(student)
            }}
          ><i className="far fa-trash-alt delete-icon" />
          </button>
        </div>
      );
    });
  }

  function renderMinors() {
    return props.student.minors.map((minor, index) => {
      return (
        <div key={minor} className="resp-input">
          <li id="responsibility" key={index}>{minor}</li>
          <button type="button"
            className="del-button"
            onClick={() => {
              student.majors.splice(index, 1);
              props.student.majors = student.majors;
              setstudent(student)
            }}
          ><i className="far fa-trash-alt delete-icon" />
          </button>
        </div>
      );
    });
  }

    if (student.majors !== undefined && student.minors !== undefined) {
      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Education Information</h1>
              <p> Dartmouth Affiliation <span className="imptMessage">*</span> </p>
              <select value={affiliation} onChange={onAffiliationChange} style={{minHeight: '35px'}}>
                {/* Dartmouth, geisel, tuck, thayer, guarini */}
                <option value="select">Select...</option>
                <option value="Undergrad">Dartmouth College</option>
                <option value="Geisel">Geisel School of Medicine </option>
                <option value="Tuck">Tuck School of Business</option>
                <option value="Thayer">Thayer School of Engineering</option>
                <option value="Guarini">Guarini School of Graduate and Advanced Studies</option>
              </select>
              {/* <p>Add your majors and minors!</p> */}
            </div>
            <i className="fas fa-user-graduate question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            <p className="question-fields-title">Majors <span /></p>
            <p className="imptMessage">Please write the full name of your major (e.x. "Computer Science" instead of "CS")</p>
            <TextareaAutosize className="question-fields-text" onBlur={function (event) { setnewMajor(event.target.value)}} />
            <button type="button"
              className="add-button"
              onClick={() => {
                const nm = newMajor;
                student.majors.push(nm);
                props.student.majors = student.majors;
                setstudent(student)
                forceUpdate()
              }}
            ><i className="fa fa-plus add-icon" aria-hidden="true" />
            </button>
            <ul className="question-fields-list-mm">
              {renderMajors()}
            </ul>
            <p className="question-fields-title">Minors</p>
            <TextareaAutosize className="question-fields-text" onBlur={function (event) { setnewMinor(event.target.value)}} />
            <button type="button"
              className="add-button"
              onClick={() => {
                const nm = newMinor;
                student.minors.push(nm);
                props.student.minors = student.minors;
                setstudent(student)
                forceUpdate()
              }}
            ><i className="fa fa-plus add-icon" aria-hidden="true" />
            </button>
            <ul className="question-fields-list-mm">
              {renderMinors()}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div>loading</div>
      );
    }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, updateStudent,
})(StudentMajorMinors));
