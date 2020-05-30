/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../styles/studentSignUp/student-signup-major-minor.scss';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
} from '../../actions';

class StudentMajorMinors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      major: '',
      minor: '',
    };

    this.onMajorChange = this.onMajorChange.bind(this);
    this.onMinorChange = this.onMinorChange.bind(this);
    this.deleteMajor = this.deleteMajor.bind(this);
    this.deleteMinor = this.deleteMinor.bind(this);
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchStudentByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ student: this.props.student });
    }
  }

   onSubmit = () => {
     this.props.updateStudent(this.state.student.id, this.state.student);
     this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
   }

   onMajorChange(event) {
     this.setState({
       major: event.target.value,
     });
   }

   onMinorChange(event) {
     this.setState({
       minor: event.target.value,
     });
   }

   addMajor = () => {
     if (!this.state.student.majors.includes(this.state.major)) {
       this.state.student.majors.push(this.state.major);
     }
     this.state.major = '';
     this.forceUpdate();
   }

   addMinor = () => {
     if (!this.state.student.minors.includes(this.state.minor)) {
       this.state.student.minors.push(this.state.minor);
     }
     this.state.minor = '';
     this.forceUpdate();
   }

    deleteMajor = (major) => {
      const majors = this.state.student.majors.filter((value) => {
        return (value !== major.major);
      });
      this.state.student.majors = majors;
      this.forceUpdate();
    }

    deleteMinor = (minor) => {
      const minors = this.state.student.minors.filter((value) => {
        return (value !== minor.minor);
      });
      this.state.student.minors = minors;
      this.forceUpdate();
    }

    renderMajors() {
      return (
        this.props.student.majors.map((major) => {
          return (
            <div className="major" key={major}>
              <div className="text">
                {major}
              </div>
              <button type="submit" className="delete-btn-student-major-minor" style={{ cursor: 'pointer' }} onClick={() => { this.deleteMajor({ major }); }}>
                <i className="far fa-trash-alt" id="icon" />
              </button>
            </div>
          );
        })
      );
    }

    renderMinors() {
      return (
        this.state.student.minors.map((minor) => {
          return (
            <div className="minor" key={minor}>
              <div className="text">
                {minor}
              </div>
              <button type="submit" className="delete-btn-student-major-minor" style={{ cursor: 'pointer' }} onClick={() => { this.deleteMinor({ minor }); }}>
                <i className="far fa-trash-alt" id="icon" />
              </button>
            </div>
          );
        })
      );
    }

    render() {
      if (this.state.student.majors !== undefined && this.state.student.minors !== undefined) {
        return (
          <div className="StudentMajorMinorContainer">
            <div className="StudentMajorMinorHeaderContainer">
              <h1 className="StudentMajorMinorHeader">
                Majors/Minors
              </h1>
            </div>
            <div className="StudentMajorMinorDescContainer">
              <p className="StudentMajorMinorDesc">
                Add your majors and minors!
              </p>
              <i className="fas fa-user-graduate" id="icon" />
            </div>
            <div id="majors">
              <div className="StudentMajorMinorListHeader">Majors</div>
              <input onChange={this.onMajorChange} value={this.state.major} />
              <button type="submit" className="delete-btn-student-major-minor" style={{ cursor: 'pointer' }} onClick={this.addMajor} value={this.major}>
                <i className="far fa-plus-square" id="icon" />
              </button>
              {this.renderMajors()}
            </div>
            <div id="minors">
              <div className="StudentMajorMinorListHeader">Minors</div>
              <input onChange={this.onMinorChange} value={this.state.minor} />
              <button type="submit" className="delete-btn-student-major-minor" style={{ cursor: 'pointer' }} onClick={this.addMinor} value={this.minor}>
                <i className="far fa-plus-square" id="icon" />
              </button>
              {this.renderMinors()}
            </div>
            <div className="buttonContainer">
              <button type="submit" className="submit-btn-student-timing" style={{ cursor: 'pointer' }} onClick={this.onSubmit}>
                Submit!
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div>loading</div>
        );
      }
    }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, updateStudent,
})(StudentMajorMinors));
