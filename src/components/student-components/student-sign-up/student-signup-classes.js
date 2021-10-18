/* eslint-disable camelcase */
import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilteredSelect from '../../select';
import {
  fetchStudentByUserID, fetchUser,
  fetchAllClasses, fetchCertainClasses, createClassForStudent,
} from '../../../actions';

function StudentClasses(props) {
  const [student, setStudent] = useState({})
  const [class_, setClass_] = useState('')
  const [selectedClasses, setSelectedClasses] = useState([])
  const [displayClasses, setDisplayClasses] = useState([])
  const[m, setM] = useState(false)

  useEffect(() => {
    if (!m) {
      props.fetchAllClasses();
      props.fetchStudentByUserID(props.userID);
      setM(true)
    }
  })

  useEffect(() => {
    setStudent(props.student);
    populateCurrentClasses();
  }, [props.student])

  const getClass = (name) => {
    const classObject = props.classes.find((course) => {
      return (course.name === name);
    });
    return classObject;
  }

  const addClass = () => {
    if (!props.student.relevant_classes.includes(getClass(class_))) {
      props.student.relevant_classes.push(getClass(class_));
    }
    displayClasses = displayClasses.filter((value) => {
      return (value.label !== class_);
    });
    setClass_('')
  }

  const deleteClass = (course) => {
    props.student.relevant_classes = props.student.relevant_classes.filter((value) => {
      return (value !== course.course);
    });
    displayClasses.push({ label: course.course.name });
    setDisplayClasses(displayClasses)

  }

  const populateCurrentClasses = () => {
    if (displayClasses.length === 0) {
      props.student.relevant_classes.forEach((value) => {
        if (!selectedClasses.includes(value.name)) {
          selectedClasses.push(value.name);
          setSelectedClasses(selectedClasses)
        }
      });
      props.classes.forEach((value) => {
        if (!selectedClasses.includes(value.name)) {
          displayClasses.push({ label: value.name });
          setDisplayClasses(displayClasses)
        }
      });
    }
  }

  const enderAddClass = () => {
    const customStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      <div className="question-fields-items-header">
        <p className="question-fields-title">Classes</p>
        <FilteredSelect
          createable
          className="select-dropdown"
          styles={customStyles}
          name="classes"
          placeholder="Select Classes"
          value={class_}
          options={displayClasses}
          onChange={(selectedOption) => {
            setClass_(selectedOption.label)
            addClass();
          }}
          onCreateOption={(newOption) => {
            setClass_(newOption)
            props.createClassForStudent({ name: newOption }, props.student);
          }}
        />
      </div>
    );
  }

  const renderClasses = ()  =>{
    if (props.student?.relevant_classes) {
      return (
        props.student.relevant_classes.map((_class) => {
          return (
            <div className="question-fields-item" key={_class.name}>
              {_class.name}
              <button type="submit" className="question-fields-button" style={{ cursor: 'pointer' }} onClick={() => { deleteClass({ _class }); }}>
                <i className="far fa-trash-alt" id="icon" />
              </button>
            </div>
          );
        })
      );
    } else {
      return (
        <div>Loading</div>
      );
    }
  }

    if (student.relevant_classes !== undefined && props.classes !== []) {
      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Classes</h1>
              <p>(Optional) Search/Select the classes you have taken!</p>
            </div>
            <i className="fas fa-book-reader question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            {renderAddClass()}
            <div className="question-fields-items">{renderClasses()}</div>
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
  classes: reduxState.classes.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, fetchAllClasses, fetchCertainClasses, createClassForStudent,
})(StudentClasses));
