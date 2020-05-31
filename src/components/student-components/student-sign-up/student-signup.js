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

class StudentSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  handlePageClick = (data) => {
    this.setState({ index: data.selected });
    this.forceUpdate();
  };

  renderComponent() {
    switch (this.state.index) {
      case 0:
        return <StudentSignUpBio />;
      case 1:
        return <StudentSignUpTiming />;
      case 2:
        return <StudentSignUpIndustries />;
      case 3:
        return <StudentSignUpWorkExperiences />;
      case 4:
        return <StudentSignUpOtherExperiences />;
      case 5:
        return <StudentSignUpMajorMinor />;
      case 6:
        return <StudentSignUpClasses />;
      case 7:
        return <StudentSignUpSkills />;
      default:
        return <div>Out of pages!</div>;
    }
  }

  render() {
    return (
      <div className="commentBox">
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          // breakClassName="break-me"
          pageCount={8}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          // containerClassName="pagination"
          // subContainerClassName="pages pagination"
          // activeClassName="active"
        />
        {this.renderComponent()}
      </div>
    );
  }
}
export default withRouter(connect()(StudentSignUp));
