/* eslint-disable array-callback-return */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchBar from '../student-components/search-bar';
import { fetchStudents } from '../../actions';
import '../../styles/postings.scss';
import StudentListItem from './student-item';


class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      results: [],
    };
  }

  componentDidMount() {
    this.props.fetchStudents();
  }

  search = (text) => {
    this.setState({ search: true });
    const searchterm = text.toLowerCase();
    this.props.students.map((student) => {
      const majors = student.majors.map((major) => major.toLowerCase());
      const minors = student.minors.map((minor) => minor.toLowerCase());
      const skills = student.skills.map((skill) => skill.name.toLowerCase());
      const classes = student.relevant_classes.map((clas) => clas.name.toLowerCase());
      const industries = student.interested_industries.map((industry) => industry.name.toLowerCase());
      if (student.first_name.toLowerCase().includes(searchterm)
      || student.last_name.toLowerCase().includes(searchterm)
      || student.grad_year.includes(searchterm)
      || majors.includes(searchterm) // array
      || minors.includes(searchterm) // array
      || skills.includes(searchterm) // array
      || classes.includes(searchterm) // array
      || industries.includes(searchterm)) { // array
        this.setState((prevState) => ({
          results: [...prevState.results, student],
        }));
      }
    });
  }

  clear = () => {
    this.setState({ search: false });
    this.setState({ results: [] });
  }

  renderStudents() {
    console.log(this.props.students);
    if (this.state.search) {
      if (this.state.results.length > 0) {
        return this.state.results.map((student) => {
          return <StudentListItem student={student} key={student.id} />;
        });
      } else {
        return (
          <div> Sorry, no students match that query</div>
        );
      }
    } else {
      return this.props.students.map((student) => {
        return (
          <StudentListItem student={student} key={student.id} />
        );
      });
    }
  }

  render() {
    return (
      (this.props.students !== undefined || null) && (this.state.results !== null || undefined)
        ? (
          <div>
            <SearchBar onSearchChange={this.search} onNoSearch={this.clear} />
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
