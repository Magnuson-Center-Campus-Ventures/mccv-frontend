import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
} from '../../../actions';

class StudentBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      selected: '',
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchStudentByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
  }

  // update student field
  changeStudentField = (field, event) => {
    // eslint-disable-next-line prefer-destructuring
    const value = event.target.value;

    this.setState((prevState) => {
      const student = { ...prevState.student };
      student[field] = value;
      this.props.updateStudent(this.props.student.id,
        student);
      return {
        ...prevState,
        student,
      };
    });
  }

  renderBioQuestions() {
    return (
      <div className="question">
        <div className="question-header">
          <div className="question-header-prompt">
            <h1>Bio</h1>
            <p>Add your name and graduation year!</p>
          </div>
          <i className="far fa-id-badge question-header-icon" id="icon" />
        </div>
        <div className="question-fields">
          <p className="question-fields-title">First Name  <span className="imptMessage">*</span></p>
          <TextareaAutosize className="question-fields-text" onBlur={(event) => this.changeStudentField('first_name', event)} defaultValue={this.props.student.first_name} />
          <p className="question-fields-title">Last Name  <span className="imptMessage">*</span></p>
          <TextareaAutosize className="question-fields-text" onBlur={(event) => this.changeStudentField('last_name', event)} defaultValue={this.props.student.last_name} />
          <p className="question-fields-title">Graduation Year <span className="imptMessage">*</span></p>
          <TextareaAutosize className="question-fields-text" onBlur={(event) => this.changeStudentField('grad_year', event)} defaultValue={this.props.student.grad_year} />
          <p className="question-fields-title">Phone Number  <span className="imptMessage">*</span></p>
          <TextareaAutosize className="question-fields-text" onBlur={(event) => this.changeStudentField('phone_number', event)} defaultValue={this.props.student.phone_number} />
          <p className="question-fields-title">Gender <span className="imptMessage"> *</span></p>
          <select value={this.props.selected} onBlur={(event) => {
            this.changeStudentField('gender', event);
            this.setState({selected: event.target.value}); 
            this.props.ifFilled(); 
            }}>
              <option value="select">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer not to say">Prefer Not to Say</option>
          </select>
          {/* <TextareaAutosize className="question-fields-text" onBlur={(event) => this.changeStudentField('phone_number', event)} defaultValue={this.props.student.gender} /> */}
        </div>
      </div>
    );
  }

  render() {
    return this.renderBioQuestions();
  }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, { fetchStudentByUserID, fetchUser, updateStudent })(StudentBio));
