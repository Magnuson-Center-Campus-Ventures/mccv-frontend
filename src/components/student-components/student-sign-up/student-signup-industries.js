/* eslint-disable camelcase */
import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilteredSelect from '../../select';
import {
  fetchStudentByUserID, fetchUser,
  fetchAllIndustries, fetchCertainIndustries, createIndustryForStudent,
} from '../../../actions';

function StudentIndustries(props) {
  const [student, setStudent]  = useState(props.student|{})
  const [industry, setIndustry] = useState('')
  const [selectedIndustries, setSelectedIndustries] = useState([])
  const [displayIndustries, setDisplayIndustries] = useState([])
  const[m, setM] = useState(false)

  useEffect(() => {
    if (!m) {
      props.fetchAllIndustries();
      props.fetchStudentByUserID(props.userID);
      setM(true)
    }
  })

  useEffect(() => {
    if (props.student && props.student.interested_industries) {
      setSelectedIndustries(props.student.interested_industries)
    }
    setStudent(props.student)
    populateCurrentIndustries();
  }, [props.student])

  const getIndustry = (name) => {
    const industryObject = props.industries.find((industry_) => {
      return (industry_.name === name);
    });
    return industryObject;
  }

  const addIndustry = (industry_) => {
    const ids = getIndustry(industry_)
    if (!props.student.interested_industries.includes(ids)) {
      props.student.interested_industries.push(ids);
    }
    setDisplayIndustries(displayIndustries.filter((value) => {
      return (value.label !== industry_);
    }))
    setIndustry('')
  }

  const deleteIndustry = (industry_) => {
    props.student.interested_industries = props.student.interested_industries.filter((value) => {
      return (value !== industry_);
    });
    displayIndustries.push({ label: industry_.name });
    setDisplayIndustries(displayIndustries);
  }

  const populateCurrentIndustries = () => {
    if (displayIndustries.length === 0) {
      props.student.interested_industries.forEach((value) => {
        if (!selectedIndustries.includes(value.name)) {
          selectedIndustries.push(value.name);
          setSelectedIndustries(selectedIndustries);
        }
      });
      props.industries.forEach((value) => {
        if (!selectedIndustries.includes(value.name)) {
          displayIndustries.push({ label: value.name });
          setDisplayIndustries(displayIndustries);
        }
      });
    }
  }

  const renderAddIndustry = () => {
    const customStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      <div className="question-fields-items-header">
        <p className="question-fields-title">Industries</p>
        <FilteredSelect
          createable
          className="select-dropdown"
          styles={customStyles}
          name="industries"
          placeholder="Select Industries"
          options={displayIndustries}
          value={industry}
          onChange={async (selectedOption) => {
            addIndustry(selectedOption.label);
          }}
          onCreateOption={(newOption) => {
            setIndustry(newOption)
            props.createIndustryForStudent({ name: newOption }, props.student);
          }}
        />
      </div>
    );
  }

  const renderIndustries = () => {
    if (props.student?.interested_industries) {
      return (
        props.student.interested_industries.map((industry_) => {
          return (
            <div className="question-fields-item" key={industry_.name}>
              {industry_.name}
              <button type="submit" className="question-fields-button" style={{ cursor: 'pointer' }} onClick={() => { deleteIndustry({ industry_ }); }}>
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

    if (student.interested_industries !== undefined && props.industries !== []) {
      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Industries</h1>
              <p>(Optional) Search/Select the industries you have an interest in!</p>
            </div>
            <i className="fas fa-book-reader question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            {renderAddIndustry()}
            <div className="question-fields-items">{renderIndustries()}</div>
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
  industries: reduxState.industries.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, fetchAllIndustries, fetchCertainIndustries, createIndustryForStudent,
})(StudentIndustries));
