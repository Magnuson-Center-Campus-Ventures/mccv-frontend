/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchBar from '../student-components/search-bar';
import { fetchStudents } from '../../actions';
import '../../styles/postings.scss';
import StudentListItem from './student-item';


class Students extends Component {
  componentDidMount() {
    this.props.fetchStudents();
  }

  //   search = (text) => {
  //     this.props.fetchStartupSearch(text);
  //   }

  renderStudents() {
    console.log(this.props.students);
    if (this.props.students !== undefined && this.props.students !== null) {
      return this.props.students.map((student) => {
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
});

export default withRouter(connect(mapStateToProps, { fetchStudents })(Students));
