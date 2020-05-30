/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import '../../styles/studentSignUp/student-signup-industries.scss';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
  fetchAllClasses, fetchCertainClasses, createClass,
} from '../../actions';

class StudentClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      class: '',
      nameClasses: [],
      allClassOptions: [],
    };

    this.onClassChange = this.onClassChange.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchAllClasses();
    this.props.fetchStudentByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ student: this.props.student });
    }
    if (prevProps.student.relevant_classes !== this.props.student.relevant_classes) {
      this.props.student.relevant_classes.forEach((classID) => {
        const name = this.getClassName(classID);
        if (!this.state.nameClasses.includes(name)) {
          this.state.nameClasses.push(name);
        }
      });
    }
    if (prevProps.student.relevant_classes !== this.props.student.relevant_classes) {
      // Set up options for dropdown
      const allClassOptions = this.props.classes.all.map((current) => {
        return { value: current.name, label: current.name, current };
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ allClassOptions });
    }
  }

  // not done
  //  onSubmit = () => {
  //    this.props.updateStudent(this.state.student.relevant_id, this.state.student);
  //    this.state.newClasses.forEach((class) => this.props.createClass(class));
  //    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  //  }

  onClassChange(event) {
    this.setState({
      class: event.target.value,
    });
  }

  getClassName(id) {
    const classObject = this.props.classes.all.find((current) => {
      return (current.id === id);
    });
    return classObject.name;
  }

   addClass = () => {
     if (!this.state.nameClasses.includes(this.state.class)) {
       this.state.nameClasses.push(this.state.class);
     }
     this.state.class = '';
     this.forceUpdate();
   }

    deleteClass = (current) => {
      const classes = this.state.nameClasses.filter((value) => {
        return (value !== current.current);
      });
      this.state.nameClasses = classes;
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
            options={this.state.allClassOptions}
            onChange={(selectedOption) => {
              this.state.class = selectedOption.value;
              this.addClass();
            }}
            onCreateOption={(newOption) => {
              this.state.class = newOption;
              this.addClass();
            }}
          />
        </div>
      );
    }

    renderClasses() {
      return (
        this.state.nameClasses.map((current) => {
          return (
            <div className="class" key={current}>
              <div className="text">
                {current}
              </div>
              <button type="submit" className="delete-btn-student-classes" style={{ cursor: 'pointer' }} onClick={() => { this.deleteClass({ current }); }}>
                <i className="far fa-trash-alt" id="icon" />
              </button>
            </div>
          );
        })
      );
    }

    render() {
      // still have occasional rendering issue
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
                Add the classes you have taken!
              </p>
              <i className="fas fa-school" id="icon" />
            </div>
            <div id="classes">
              <div className="StudentClassListHeader">Classes</div>
              {this.renderAddClass()}
              {this.renderClasses()}
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
  classes: reduxState.classes,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, updateStudent, fetchAllClasses, fetchCertainClasses, createClass,
})(StudentClasses));
