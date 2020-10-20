/* eslint-disable react/no-did-update-set-state */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchStudentByUserID, fetchUser, updateStudent, updateOtherExperience, 
  // fetchOtherExperiences, 
  deleteOtherExperience,
} from '../../../actions';
import OtherExperience from '../other-experience';
import NewOtherExp from '../student-modals/new-other-exp';

class StudentOtherExperiences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      student: {},
      otherExps: [],
      show: false,
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchStudentByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.student && this.props.student !== {} && prevProps.student !== this.props.student) {
      // commenting this out bc other_exp now populated by fetchStudent
      // if (this.props.student.other_exp && this.props.student.other_exp.length > 0) {
      //   this.props.fetchOtherExperiences(this.props.student.other_exp);
      // }
      this.setState({
        student: this.props.student,
      });
    }

    if (prevProps.otherExps !== this.props.otherExps) {
      this.setState({ otherExps: this.props.otherExps });
    }
  }

   showModal = (e) => {
     this.setState({
       show: true,
     });
   };

   isEditing = (e) => {
     this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
   };

   hideModal = (e) => {
     this.setState({
       show: false,
     });
     this.state.otherExps.forEach((otherExp) => {
       this.props.updateOtherExperience(otherExp._id, otherExp);
     });
     this.props.updateStudent(this.state.student.id, this.state.student);
   }

   changeOtherExpField = (index, field, value) => {
     this.setState((prevState) => {
       const otherExps = [...prevState.otherExps];
       otherExps[index][field] = value;
       return {
         ...prevState,
         otherExps,
       };
     });
   }

   submit = () => {
     if (this.state.isEditing) {
       const student = { ...this.state.student };
       this.props.updateStudent(this.state.student.id, student);
       this.state.otherExps.forEach((otherExp) => {
         this.props.updateOtherExperience(otherExp._id, otherExp);
       });
     }
     this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
   }

     // update student field
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

     hideOtherExpModal = () => {
       this.setState({ show: false });
     };

    renderOtherExperiences = () => {
      if (this.state.otherExps !== []) {
        return this.state.otherExps.map((otherExp, index) => {
          return (
            <OtherExperience key={index}
              className="other-exp"
              isEditing={this.state.isEditing}
              otherExp={otherExp}
              index={index}
              changeOtherExpField={this.changeOtherExpField}
            />
          );
        });
      } else return null;
    }

    render() {
      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Personal Projects And Other Experiences</h1>
              <p>Add personal projects and other experiences that have been meaningful to you!</p>
            </div>
            <i className="fas fa-briefcase question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            <div className="question-fields-exp-header">
              <p className="question-fields-title">Personal Projects And Other Experiences</p>
              <i className="fas fa-plus-circle question-fields-button" id="addicon" onClick={(e) => { this.showModal(); }} />
              <i className="far fa-edit question-fields-button" id="editicon" onClick={(e) => { this.submit(); }} />
            </div>
            <div id="other-exps">
              {this.renderOtherExperiences()}
            </div>
          </div>
          <div className="student-profile">
            <NewOtherExp
              onClose={this.hideOtherExpModal}
              show={this.state.show}
            />
          </div>
        </div>
      );
    }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
  otherExps: reduxState.students.current_other_exps,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, updateStudent, updateOtherExperience, 
  // fetchOtherExperiences, 
  deleteOtherExperience,
})(StudentOtherExperiences));
