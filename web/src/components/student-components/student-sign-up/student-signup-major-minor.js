/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable func-names */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
} from '../../../actions';

class StudentMajorMinors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      affiliation: '',
      newMajor: '',
      newMinor: '',
    };
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
    this.props.ifFilled();
    this.forceUpdate();
  }

  renderMajors() {
    return this.props.student.majors.map((major, index) => {
      return (
        <div key={major} className="resp-input">
          <li id="responsibility" key={index}>{major}</li>
          <button type="button"
            className="del-button"
            onClick={() => {
              this.setState((prevState) => {
                prevState.student.majors.splice(index, 1);
                this.props.student.majors = prevState.student.majors;
                return {
                  ...prevState,
                };
              });
            }}
          ><i className="far fa-trash-alt delete-icon" />
          </button>
        </div>
      );
    });
  }

  renderMinors() {
    return this.props.student.minors.map((minor, index) => {
      return (
        <div key={minor} className="resp-input">
          <li id="responsibility" key={index}>{minor}</li>
          <button type="button"
            className="del-button"
            onClick={() => {
              this.setState((prevState) => {
                prevState.student.minors.splice(index, 1);
                this.props.student.minors = prevState.student.minors;
                return {
                  ...prevState,
                };
              });
            }}
          ><i className="far fa-trash-alt delete-icon" />
          </button>
        </div>
      );
    });
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
              {/* <p>Add your majors and minors!</p> */}
            </div>
            <i className="fas fa-user-graduate question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            <p className="question-fields-title">Majors <span /></p>
            <p className="imptMessage">Please write the full name of your major (e.x. "Computer Science" instead of "CS")</p>
            <TextareaAutosize className="question-fields-text" onBlur={function (event) { this.state.newMajor = event.target.value; }} />
            <button type="button"
              className="add-button"
              onClick={() => {
                const nm = this.state.newMajor;
                this.setState((prevState) => {
                  prevState.student.majors.push(nm);
                  this.props.student.majors = prevState.student.majors;
                  return {
                    ...prevState,
                  };
                });
              }}
            ><i className="fa fa-plus add-icon" aria-hidden="true" />
            </button>
            <ul className="question-fields-list-mm">
              {this.renderMajors()}
            </ul>
            <p className="question-fields-title">Minors</p>
            <TextareaAutosize className="question-fields-text" onBlur={function (event) { this.state.newMinor = event.target.value; }} />
            <button type="button"
              className="add-button"
              onClick={() => {
                const nm = this.state.newMinor;
                this.setState((prevState) => {
                  prevState.student.minors.push(nm);
                  this.props.student.minors = prevState.student.minors;
                  return {
                    ...prevState,
                  };
                });
              }}
            ><i className="fa fa-plus add-icon" aria-hidden="true" />
            </button>
            <ul className="question-fields-list-mm">
              {this.renderMinors()}
            </ul>
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
