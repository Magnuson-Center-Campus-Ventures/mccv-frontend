/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import {
  fetchStudentByUserID, fetchUser,
  fetchAllClasses, fetchCertainClasses, createClassForStudent,
} from '../../../actions';

class StudentClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      class: '',
      selectedClasses: [],
      displayClasses: [],
    }; 
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchAllClasses();
    this.props.fetchStudentByUserID(this.props.userID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ student: this.props.student });
      this.populateCurrentClasses();
    }
  }

  getClass(name) {
    const classObject = this.props.classes.find((course) => {
      return (course.name === name);
    });
    return classObject;
  }

  addClass = () => {
    if (!this.props.student.relevant_classes.includes(this.getClass(this.state.class))) {
      this.props.student.relevant_classes.push(this.getClass(this.state.class));
    }
    this.state.displayClasses = this.state.displayClasses.filter((value) => {
      return (value.label !== this.state.class);
    });
    this.state.class = '';
    this.forceUpdate();
  }

  deleteClass = (course) => {
    console.log(course);
    this.props.student.relevant_classes = this.props.student.relevant_classes.filter((value) => {
      return (value !== course.course);
    });
    this.state.displayClasses.push({ label: course.course.name });
    this.forceUpdate();
  }

  populateCurrentClasses() {
    if (this.state.displayClasses.length === 0) {
      this.props.student.relevant_classes.forEach((value) => {
        if (!this.state.selectedClasses.includes(value.name)) {
          this.state.selectedClasses.push(value.name);
        }
      });
      this.props.classes.forEach((value) => {
        if (!this.state.selectedClasses.includes(value.name)) {
          this.state.displayClasses.push({ label: value.name });
        }
      });
    }
  }

  renderAddClass() {
    const customStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      <div className="question-fields-items-header">
        <p className="question-fields-title">Classes</p>
        <CreateableSelect
          className="select-dropdown"
          styles={customStyles}
          name="classes"
          value={this.state.class}
          options={this.state.displayClasses}
          onChange={(selectedOption) => {
            this.state.class = selectedOption.label;
            this.addClass();
          }}
          onCreateOption={(newOption) => {
            this.state.class = newOption;
            this.state.class = newOption;
            this.props.createClassForStudent({ name: newOption }, this.props.student);
          }}
        />
      </div>
    );
  }

  renderClasses() {
    if (this.props.student?.relevant_classes) {
      return (
        this.props.student.relevant_classes.map((_class) => {
          return (
            <div className="question-fields-item" key={_class.name}>
              {_class.name}
              <button type="submit" className="question-fields-button" style={{ cursor: 'pointer' }} onClick={() => { this.deleteClass({ _class }); }}>
                <i className="far fa-trash-alt" id="icon" />
              </button>
            </div>
          );
        })
      );
    } else {
      return (
        <div>Loading</div>
      );
    }
  }

  render() {
    if (this.state.student.relevant_classes !== undefined && this.props.classes !== []) {
      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Classes</h1>
              <p>(Optional) Search/Select the classes you have taken!</p>
            </div>
            <i className="fas fa-book-reader question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            {this.renderAddClass()}
            <div className="question-fields-items">{this.renderClasses()}</div>
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
  classes: reduxState.classes.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, fetchAllClasses, fetchCertainClasses, createClassForStudent,
})(StudentClasses));
