/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchStudentByUserID, fetchWorkExperiences, updateStudent } from '../actions';

import '../styles/student-profile.scss';

// Filler until we have an actual userID from doing auth
// (A student document in the students collection also has this filler userID)
const userID = 'id123';

class StudentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      student: {
        first_name: '',
      },
    };
  }

  componentDidMount() {
    this.props.fetchStudentByUserID(userID);
  }

  // Get student fields into state (for editing),
  // and fetch a student's work experiences,
  // once the student is loaded into props
  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      this.props.fetchWorkExperiences(this.props.student.work_exp);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ student: this.props.student });
    }
  }

  changeStateField = (field, event) => {
    // eslint-disable-next-line prefer-destructuring
    const value = event.target.value;

    this.setState((prevState) => {
      const student = { ...prevState.student };
      student[field] = value;
      return {
        ...prevState,
        student,
      };
    });
  }

  submit = () => {
    if (this.state.isEditing) {
      this.props.updateStudent(this.props.student.id, {
        first_name: this.state.student.first_name,
      });
      this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    } else {
      this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    }
  }

  renderArray = (array) => {
    if (array) {
      return array.map((elem, index) => {
        return (
          <div key={index}>{elem}</div>
        );
      });
    } else return null;
  }

  renderBody = () => {
    if (this.state.isEditing) {
      return (
        <div className="profile-edit">
          <div className="input-title">First Name</div>
          <input className="short-input" defaultValue={this.props.student.first_name} onBlur={(event) => this.changeStateField('first_name', event)} />
        </div>
      );
    } else {
      return (
        <div className="profile-fixed">
          <div id="profile-header">
            <div>{`${this.state.student.first_name} ${this.props.student.last_name}`}</div>
            <div>{`Class of ${this.props.student.grad_year}`}</div>
            <div id="major-row">
              {this.renderArray(this.props.student.majors)}
            </div>
            <div id="minor-row">
              {this.renderArray(this.props.student.minors)}
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="student-profile">
        {this.renderBody()}
        <button className="edit-button"
          onClick={this.submit}
        >{this.state.isEditing ? 'Finish' : 'Edit Profile'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  student: reduxState.students.current,
  workExps: reduxState.students.current_work_exps,
});

export default withRouter(connect(mapStateToProps, { fetchStudentByUserID, fetchWorkExperiences, updateStudent })(StudentProfile));
