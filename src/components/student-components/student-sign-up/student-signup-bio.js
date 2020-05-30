import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import '../../../styles/student-sign-up/student-signup-bio.scss';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
} from '../../../actions';

class StudentBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
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
         return {
           ...prevState,
           student,
         };
       });
     }

     // Send update to database
     onSubmit = (e) => {
       this.props.updateStudent(this.props.student.id, this.state.student);
     };


     renderBioQuestions() {
       return (

         <div className="StudentBioContainer">
           <div className="StudentBioHeaderContainer">
             <h1 className="StudentBioHeader">
               Bio
             </h1>
           </div>
           <div className="StudentBioDescContainer">
             <p className="StudentBioDesc">
               Add your name and graduation year!
             </p>
             <i className="far fa-id-badge" id="icon" />
           </div>
           <div className="StudentBioQuestionsContainer">
             <div className="nameContainer">
               <div className="StudentBioQuestionLabelContainer">
                 <p className="StudentBioLabel">
                   First Name
                 </p>
                 <TextareaAutosize onBlur={(event) => this.changeStudentField('first_name', event)} defaultValue={this.props.student.first_name} />
               </div>
               <div className="StudentBioQuestionLabelContainer">
                 <p className="StudentBioLabel">
                   Last Name
                 </p>
                 <TextareaAutosize onBlur={(event) => this.changeStudentField('last_name', event)} defaultValue={this.props.student.last_name} />
               </div>
             </div>
             <div className="StudentBioQuestionLabelContainer">
               <p className="StudentBioLabel">
                 Graduation Year
               </p>
               <TextareaAutosize onBlur={(event) => this.changeStudentField('grad_year', event)} defaultValue={this.props.student.grad_year} />
             </div>
             <div className="StudentBioQuestionLabelContainer">
               <p className="StudentBioLabel">
                 Phone Number
               </p>
               <TextareaAutosize onBlur={(event) => this.changeStudentField('phone_number', event)} defaultValue={this.props.student.phone_number} />
             </div>
           </div>
           <div className="buttonContainer">
             <button type="submit" className="submit-btn-student-bio" style={{ cursor: 'pointer' }} onClick={this.onSubmit}>
               Next
             </button>
           </div>
         </div>
       );
     }

     render() {
       return this.renderBioQuestions();
     }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, { fetchStudentByUserID, fetchUser, updateStudent })(StudentBio));
