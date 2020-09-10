/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
} from '../../../actions';

class StudentMajorMinors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      affiliation: '',
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


  onAffiliationChange = (event) => {
    this.props.student.affiliation = event.target.value;
    this.setState({
      affiliation: event.target.value, 
    });
    this.forceUpdate(); 
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
      this.props.student.majors.map((value) => {
        return (
          <li className="question-fields-resp" key={value}>
            {value}
            <button type="submit" className="question-fields-button" style={{ cursor: 'pointer' }} onClick={() => { this.deleteMajor({ value }); }}>
              <i className="far fa-trash-alt" id="icon" />
            </button>
          </li>
        );
      })
    );
  }

  renderMinors() {
    return (
      this.state.student.minors.map((value) => {
        return (
          <li className="question-fields-resp" key={value}>
            {value}
            <button type="submit" className="question-fields-button" style={{ cursor: 'pointer' }} onClick={() => { this.deleteMinor({ value }); }}>
              <i className="far fa-trash-alt" id="icon" />
            </button>
          </li>
        );
      })
    );
  }

  render() {
    if (this.state.student.majors !== undefined && this.state.student.minors !== undefined) {
      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Education Information</h1>
              <p> Dartmouth Affiliation <span className="imptMessage">*</span> </p>
              <select value={this.state.affiliation} onChange={this.onAffiliationChange}>
              {/* Dartmouth, geisel, tuck, thayer, guarini */}
                <option value="select">Select...</option>
                <option value="Undergrad">Dartmouth College</option>
                <option value="Geisel">Geisel School of Medicine </option>
                <option value="Tuck">Tuck School of Business</option>
                <option value="Thayer">Thayer School of Engineering</option>
                <option value="Guarini">Guarini School of Graduate and Advanced Studies</option>
              </select>
              <p>Add your majors and minors!</p>
            </div>
            <i className="fas fa-user-graduate question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            <p className="question-fields-title">Majors</p>
            <p className="imptMessage">please make sure to write the full name of your major (e.x. "Computer Science" instead of "CS")</p>
            <input className="question-fields-text" onChange={this.onMajorChange} value={this.state.major} />
            <button className="question-fields-button" type="submit" style={{ cursor: 'pointer' }} onClick={this.addMajor} value={this.major}>
              <i className="far fa-plus-square" id="icon" />
            </button>
            <ul className="question-fields-list-mm">{this.renderMajors()}</ul>
            <p className="question-fields-title">Minors</p>
            <input className="question-fields-text" onChange={this.onMinorChange} value={this.state.minor} />
            <button className="question-fields-button" type="submit" style={{ cursor: 'pointer' }} onClick={this.addMinor} value={this.minor}>
              <i className="far fa-plus-square" id="icon" />
            </button>
            <ul className="question-fields-list-mm">{this.renderMinors()}</ul>
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
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, updateStudent,
})(StudentMajorMinors));
