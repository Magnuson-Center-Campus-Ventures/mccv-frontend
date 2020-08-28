import React, { Component } from 'react';
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

class StudentSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    this.props.fetchStudentByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
    this.props.fetchAllIndustries();
    this.props.fetchAllClasses();
    this.props.fetchAllSkills();
  }

  handlePageClick = (data) => {
    this.props.updateStudent(this.props.student.id, this.props.student);
    this.setState({ index: data.selected });
    this.forceUpdate();
  };

  onSubmit = () => {
    this.props.submitStudent(this.props.student.id, this.props.student, this.props.history);
  }

  renderSubmit() {
    if (this.state.index === 7) {
      return (
        <div className="question-submit">
          <button type="submit" className="submit-btn" style={{ cursor: 'pointer' }} onClick={this.onSubmit}>
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

  renderComponent() {
    switch (this.state.index) {
      case 0:
        return <StudentSignUpBio />;
      case 1:
        return <StudentSignUpTiming />;
      case 2:
        return <StudentSignUpMajorMinor />;
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

  render() {
    switch (this.state.index) {
      case 0:
        return (
          <div className="paginator"> 
            {this.renderComponent()}
            {this.renderSubmit()}
            <ReactPaginate
              previousClassName="previous-hide"
              previousLinkClassName="previous-link-hide"
              breakLabel="..."
              pageCount={8}
              marginPagesDisplayed={2}
              pageRangeDisplayed={8}
              onPageChange={this.handlePageClick}
            />
          </div>
        );
      case 7:
        return (
          <div className="paginator"> 
            {this.renderComponent()}
            {this.renderSubmit()}
            <ReactPaginate
              nextClassName="next-hide"
              nextLinkClassName="next-link-hide"
              breakLabel="..."
              pageCount={8}
              marginPagesDisplayed={2}
              pageRangeDisplayed={8}
              onPageChange={this.handlePageClick}
            />
          </div>
        );
      default:
        return (
          <div className="paginator"> 
            {this.renderComponent()}
            {this.renderSubmit()}
            <ReactPaginate
              breakLabel="..."
              pageCount={8}
              marginPagesDisplayed={2}
              pageRangeDisplayed={8}
              onPageChange={this.handlePageClick}
            />
          </div>
        );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, updateStudent, submitStudent, fetchAllSkills, fetchAllIndustries, fetchAllClasses,
})(StudentSignUp));
