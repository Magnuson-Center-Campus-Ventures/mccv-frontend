/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchStudentByUserID, fetchWorkExperiences, updateStudent, updateWorkExperience, deleteWorkExperience,
} from '../actions';

import '../styles/student-profile.scss';

// Filler until we have an actual userID from doing auth
// (A student document in the students collection also has this filler userID)
const userID = 'id123';

class StudentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      student: {},
      workExps: [],
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
    if (this.props.workExps !== {} && prevProps.workExps !== this.props.workExps) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ workExps: this.props.workExps });
    }
  }

  changeStudentField = (field, event) => {
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

  changeWorkExpField = (index, field, event) => {
    // eslint-disable-next-line prefer-destructuring
    const value = event.target.value;

    this.setState((prevState) => {
      const workExps = [...prevState.workExps];
      workExps[index][field] = value;
      return {
        ...prevState,
        workExps,
      };
    });
  }

  submit = () => {
    if (this.state.isEditing) {
      this.props.updateStudent(this.state.student.id, this.state.student);
      this.state.workExps.forEach((workExp) => {
        this.props.updateWorkExperience(workExp._id, workExp);
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
          <input className="short-input" defaultValue={this.props.student.first_name} onBlur={(event) => this.changeStudentField('first_name', event)} />
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

  renderWorkExperiences = () => {
    if (this.state.workExps !== []) {
      if (this.state.isEditing) {
        return this.state.workExps.map((workExp, index) => {
          return (
            <div key={index}>
              <div className="input-title">Role</div>
              <input className="short-input" defaultValue={workExp.role} onBlur={(event) => this.changeWorkExpField(index, 'role', event)} />
              <div>A BUNCH OF OTHER INPUTS HERE</div>
              <button onClick={() => this.props.deleteWorkExperience(workExp._id)}>Delete Work Experience</button>
            </div>
          );
        });
      } else {
        return this.state.workExps.map((workExp, index) => {
          return (
            <div key={index}>{workExp.role}</div>
          );
        });
      }
    } else return null;
  }

  render() {
    return (
      <div className="student-profile">
        {this.renderBody()}
        <div id="work-exps">
          {this.renderWorkExperiences()}
        </div>
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

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchWorkExperiences, updateStudent, updateWorkExperience, deleteWorkExperience,
})(StudentProfile));
