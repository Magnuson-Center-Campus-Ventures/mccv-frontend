/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchBar from '../student-components/search-bar';
import {
  fetchStudents, fetchAllClasses, fetchAllIndustries, fetchAllSkills,
} from '../../actions';
import '../../styles/postings.scss';
// import StudentListItem from './item';
import StudentListItem from './student-item';


class Students extends Component {
  componentDidMount() {
    this.props.fetchStudents();
  }

  //   search = (text) => {
  //     this.props.fetchStartupSearch(text);
  //   }

  renderStudents() {
    if (this.props.students !== undefined && this.props.students !== null) {
      return this.props.students.map((student) => {
        // this.props.fetchCertainClasses(student.relevant_classes);
        // this.props.fetchCertainIndustries(student.interested_industries);
        // this.props.fetchCertainSkills(student.skills);
        return (
          <StudentListItem student={student} key={student.id} />
        );
      });
    } else {
      return (
        <div>
          Sorry, no students currently
        </div>
      );
    }
  }

  render() {
    return (
      this.props.students !== undefined
        ? (
          <div>
            {/* <SearchBar onSearchChange={this.search} onNoSearch={this.props.fetchStartups} /> */}
            <div className="list">
              {this.renderStudents()}
            </div>
          </div>

        ) : (
          <div>Loading...</div>
        )
    );
  }
}

const mapStateToProps = (reduxState) => ({
  students: reduxState.students.all_students,
  classes: reduxState.classes.all,
  industries: reduxState.industries.all,
  skills: reduxState.skills.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudents, fetchAllClasses, fetchAllIndustries, fetchAllSkills,
})(Students));
