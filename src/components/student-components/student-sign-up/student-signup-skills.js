/* eslint-disable camelcase */
import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilteredSelect from '../../select';
import {
  fetchStudentByUserID, fetchUser,
  fetchAllSkills, fetchCertainSkills, createSkillForStudent,
} from '../../../actions';

function StudentSkills(props) {
  const [student, setstudent] = useState({})
  const [skill, setskill] = useState('')
  const [selectedSkills, setselectedSkills] = useState([])
  const [displaySkills, setdisplaySkills] = useState([])
  const[m, setM] = useState(false)

  useEffect(() => {
    if (!m) {
      props.fetchAllSkills();
      props.fetchStudentByUserID(props.userID);
      setM(true);
    }
  })
  useEffect((prevProps, prevState) => {
    if (props.student !== {} && prevProps.student !== props.student) {
      // eslint-disable-next-line react/no-did-update-set-state
      setstudent(props.student)
      populateCurrentSkills();
    }
  }, [])


  function getSkill(name) {
    const skillObject = props.skills.find((skill) => {
      return (skill.name === name);
    });
    return skillObject;
  }

  const addSkill = () => {
    if (!props.student.skills.includes(getSkill(skill))) {
      props.student.skills.push(getSkill(skill));
    }
    displaySkills = displaySkills.filter((value) => {
      return (value.label !== skill);
    });
    setskill('')
  }

  const deleteSkill = (skill) => {
    props.student.skills = props.student.skills.filter((value) => {
      return (value !== skill.skill);
    });
    displaySkills.push({ label: skill.skill.name });
    setdisplaySkills(displaySkills)
  }

  function populateCurrentSkills() {
    if (displaySkills.length === 0) {
      props.student.skills.forEach((value) => {
        if (!selectedSkills.includes(value.name)) {
          selectedSkills.push(value.name);
          setselectedSkills(selectedSkills)
        }
      });
      props.skills.forEach((value) => {
        if (!selectedSkills.includes(value.name)) {
          displaySkills.push({ label: value.name });
          setdisplaySkills(displaySkills)
        }
      });
    }
  }

  function renderAddSkill() {
    const customStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      <div className="question-fields-items-header">
        <p className="question-fields-title">Skills</p>
        <FilteredSelect
          createable
          className="select-dropdown"
          styles={customStyles}
          name="skills"
          placeholder="Select Skills"
          value={skill}
          options={displaySkills}
          onChange={(selectedOption) => {
            setskill(selectedOption.label)
            addSkill();
          }}
          onCreateOption={(newOption) => {
            skill = newOption;
            skill = newOption;
            props.createSkillForStudent({ name: newOption }, props.student);
          }}
        />
      </div>
    );
  }

  function renderSkills() {
    if (props.student?.skills) {
      return (
        props.student.skills.map((skill) => {
          return (
            <div className="question-fields-item" key={skill.name}>
              {skill.name}
              <button type="submit" className="question-fields-button" style={{ cursor: 'pointer' }} onClick={() => { deleteSkill({ skill }); }}>
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

    if (student.skills !== undefined && props.skills !== []) {
      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Skills</h1>
              <p>(Optional) Search/Select the skills you have!</p>
            </div>
            <i className="fas fa-brain question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            {renderAddSkill()}
            <div className="question-fields-items">{renderSkills()}</div>
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
  skills: reduxState.skills.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, fetchAllSkills, fetchCertainSkills, createSkillForStudent,
})(StudentSkills));
