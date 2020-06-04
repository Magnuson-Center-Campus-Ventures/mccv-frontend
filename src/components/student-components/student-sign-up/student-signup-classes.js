import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import '../../../styles/student-sign-up/student-signup-industries.scss';
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
      displayClasses: [],
      allClasses: [],
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
    }
    if (prevProps.classes !== this.props.classes) {
      const classes = this.props.classes.all.map((course) => {
        return { value: course.name, label: course.name, course };
      });
      this.state.allClasses = classes;
      const displayClasses = this.state.allClasses.filter((value) => {
        return !this.props.student.relevant_classes.includes(this.getClass(value.value));
      });
      this.state.displayClasses = displayClasses;
    }
  }

  getClass(name) {
    const classObject = this.props.classes.all.find((course) => {
      return (course.name === name);
    });
    return classObject;
  }

  addClassDB = () => {
    if (!this.state.allClasses.includes(this.state.class)) {
      this.props.createClassForStudent({ name: this.state.class });
    }
    this.props.fetchAllClasses();
  }

  addClass = () => {
    if (!this.props.student.relevant_classes.includes(this.getClass(this.state.class))) {
      this.props.student.relevant_classes.push(this.getClass(this.state.class));
    }
    const displayClasses = this.state.allClasses.filter((value) => {
      return !this.props.student.relevant_classes.includes(this.getClass(value.value));
    });
    this.state.displayClasses = displayClasses;
    this.state.class = '';
    this.forceUpdate();
  }

  deleteClass = (course) => {
    const classes = this.props.student.relevant_classes.filter((value) => {
      return (value !== course.course);
    });
    this.props.student.relevant_classes = classes;
    const displayClasses = this.state.allClasses.filter((value) => {
      return !this.props.student.relevant_classes.includes(this.getClass(value.value));
    });
    this.state.displayClasses = displayClasses;
    this.forceUpdate();
  }

  renderAddClass() {
    const customStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      <div className="add-classes">
        <CreateableSelect
          className="select-dropdown"
          styles={customStyles}
          name="classes"
          options={this.state.displayClasses}
          onChange={(selectedOption) => {
            this.state.class = selectedOption.value;
            this.addClass();
          }}
          onCreateOption={(newOption) => {
            this.state.class = newOption;
            this.addClassDB();
            this.addClass();
          }}
        />
      </div>
    );
  }

  renderClasses() {
    return (
      this.props.student.relevant_classes.map((course) => {
        return (
          <div className="class" key={course.id}>
            <div className="text">
              {course.name}
            </div>
            <button type="submit" className="delete-btn-student-classes" style={{ cursor: 'pointer' }} onClick={() => { this.deleteClass({ course }); }}>
              <i className="far fa-trash-alt" id="icon" />
            </button>
          </div>
        );
      })
    );
  }

  render() {
    if (this.state.student.relevant_classes !== undefined && this.props.classes.all !== []) {
      return (
        <div className="StudentClassContainer">
          <div className="StudentClassHeaderContainer">
            <h1 className="StudentClassHeader">
              Classes
            </h1>
          </div>
          <div className="StudentClassDescContainer">
            <p className="StudentClassDesc">
              Add the classes you have!
            </p>
            <i className="fas fa-brain" id="icon" />
          </div>
          <div id="classes">
            <div className="StudentClassListHeader">Classes</div>
            {this.renderAddClass()}
            {this.renderClasses()}
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
  classes: reduxState.classes,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, fetchAllClasses, fetchCertainClasses, createClassForStudent,
})(StudentClasses));
