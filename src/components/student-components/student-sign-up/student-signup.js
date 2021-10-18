import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import StudentSignUpBio from './student-signup-bio';
import StudentSignUpTiming from './student-signup-timing';
import StudentSignUpWorkExperiences from './student-signup-work-experiences';
import StudentSignUpOtherExperiences from './student-signup-other-experiences';
import StudentSignUpMajorMinor from './student-signup-major-minor';
import StudentSignUpIndustries from './student-signup-industries';
import StudentSignUpSkills from './student-signup-skills';
import StudentSignUpClasses from './student-signup-classes';
import {
  fetchStudentByUserID, fetchUser, updateStudent, submitStudent, fetchAllSkills, fetchAllIndustries, fetchAllClasses,
} from '../../../actions';
import '../../../styles/create-new-paginator.scss';

function StudentSignUp(props) {
  const [index, setIndex] = useState(0)
  const [filled, setFilled] = useState(false)
  const [m, setM] = useState(false)

  useEffect(() => {
    if (!m) {
      props.fetchStudentByUserID(props.userID);
      props.fetchUser(props.userID);
      props.fetchAllIndustries();
      props.fetchAllClasses();
      props.fetchAllSkills();
      setM(true)
    }
  })

  const handlePageClick = (data) => {
    props.updateStudent(props.student.id, props.student);
    if (data.selected === 2) {
      setIndex(data.selected)
      setFilled(false)
    } else {
      setIndex(data.selected)
      setFilled(true)
    }
  };

  const ifFilled = () => {
    setFilled(true)
  }

  const onSubmit = () => {
    props.submitStudent(props.student.id, props.student, props.history);
  }

  const renderSubmit = () => {
    if (index === 7) {
      return (
        <div className="question-submit">
          <button type="submit" className="submit-btn" style={{ cursor: 'pointer' }} onClick={onSubmit}>
            Submit!
          </button>
        </div>
      );
    } else {
      return (
        <div className="empty" />
      );
    }
  }

  const renderComponent = () => {
    switch (index) {
      case 0:
        return <StudentSignUpBio ifFilled={ifFilled} />;
      case 1:
        return <StudentSignUpTiming />;
      case 2:
        return <StudentSignUpMajorMinor ifFilled={ifFilled} />;
      case 3:
        return <StudentSignUpWorkExperiences />;
      case 4:
        return <StudentSignUpOtherExperiences />;
      case 5:
        return <StudentSignUpIndustries />;
      case 6:
        return <StudentSignUpClasses />;
      case 7:
        return <StudentSignUpSkills />;
      default:
        return <div>Out of pages!</div>;
    }
  }
    switch (index) {
      case 0:
        return (
          <div className="paginator">
            {renderComponent()}
            {renderSubmit()}
            { (props.student.first_name === '' || props.student.first_name === undefined)
              || (props.student.last_name === '' || props.student.last_name === undefined)
              || (props.student.grad_year === '' || props.student.grad_year === undefined)
              || (props.student.phone_number === '' || props.student.phone_number === undefined)
              || (props.student.gender === '' || props.student.gender === undefined)
              ? (
                <div />
              ) : (
                <ReactPaginate
                  breakLabel="..."
                  pageCount={8}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={8}
                  onPageChange={handlePageClick}
                />
              )}

          </div>
        );
      case 2:
        return (
          <div className="paginator">
            {renderComponent()}
            {renderSubmit()}
            {filled ? (
              <ReactPaginate
                breakLabel="..."
                pageCount={8}
                marginPagesDisplayed={2}
                pageRangeDisplayed={8}
                onPageChange={handlePageClick}
              />
            ) : (
              <ReactPaginate
                nextClassName="next-hide"
                nextLinkClassName="next-link-hide"
                breakLabel="..."
                pageCount={8}
                marginPagesDisplayed={2}
                pageRangeDisplayed={8}
                onPageChange={handlePageClick}
              />
            ) }
          </div>
        );
      case 7:
        return (
          <div className="paginator">
            {renderComponent()}
            {renderSubmit()}
            <ReactPaginate
              nextClassName="next-hide"
              nextLinkClassName="next-link-hide"
              breakLabel="..."
              pageCount={8}
              marginPagesDisplayed={2}
              pageRangeDisplayed={8}
              onPageChange={handlePageClick}
            />
          </div>
        );
      default:
        return (
          <div className="paginator">
            {renderComponent()}
            {renderSubmit()}
            <ReactPaginate
              breakLabel="..."
              pageCount={8}
              marginPagesDisplayed={2}
              pageRangeDisplayed={8}
              onPageChange={handlePageClick}
            />
          </div>
        );
    }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, updateStudent, submitStudent, fetchAllSkills, fetchAllIndustries, fetchAllClasses,
})(StudentSignUp));
