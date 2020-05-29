/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../styles/studentSignUp/student-signup-workexperiences.scss';
import {
  fetchStudentByUserID, fetchUser, updateStudent, updateOtherExperience, fetchOtherExperiences,
} from '../../actions';
import OtherExperience from '../modals/new-other-exp';

class StudentOtherExperiences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      otherExps: [],
      show: false,
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchStudentByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
    console.log(this.state.student);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      console.log('here');
      console.log(this.state.student);
      this.props.fetchOtherExperiences(this.props.student.other_exp);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ student: this.props.student });
    }
    if (this.props.otherExps !== {} && prevProps.otherExps !== this.props.otherExps) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ otherExps: this.props.otherExps });
    }
  }

   showModal = (e) => {
     this.setState({
       show: true,
     });
   };

   onSubmit = () => {
     // console.log(this.state.student);
     this.props.updateStudent(this.state.student.id, this.state.student);
     this.state.otherExps.forEach((otherExp) => {
       this.props.updateWorkExperience(otherExp._id, otherExp);
     });
     this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
   }

   hideModal = (e) => {
     this.setState({
       show: false,
     });
     console.log(this.state.student);
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
     // onSubmit = (e) => {
     //   this.props.updateStudent(this.props.student.id, this.state.student);
     // };

     // Removes time from date
     convertDate=(date) => {
       console.log(date);
       if (typeof date !== 'undefined') {
         const dateISO = date.slice(0, 10).split('-');
         return `${dateISO[1]}/${dateISO[2]}/${dateISO[0]}`;
       }
       return '';
     }

     renderOtherExperiences = () => {
       if (this.state.otherExps !== []) {
         return this.state.otherExps.map((otherExp, index) => {
           return (
             <div key={index} className="work-exp">
               <div>{otherExp.name}</div>
               <div>{otherExp.description}</div>
             </div>
           );
         });
       } else return null;
     }


     renderHelper() {
       return (
         <div className="StudentWorkExperienceContainer">
           <OtherExperience onClose={this.hideModal} show={this.state.show} />
           <div className="StudentWorkExperienceHeaderContainer">
             <h1 className="StudentWorkExperienceHeader">
               Personal Projects And Other Experiencs
             </h1>
           </div>
           <div className="StudentWorkExperienceDescContainer">
             <p className="StudentWorkExperienceDesc">
               Add personal projects and other experiences that have been meaningful to you!
             </p>
             <i className="fas fa-briefcase" id="icon" />
           </div>
           <div className="WorkExperienceSubtitle">
             <u>
               Personal Projects And Other Experiencs
             </u>
             <i className="fas fa-plus-circle"
               id="addicon"
               onClick={(e) => {
                 this.showModal();
               }}
             />
           </div>
           <div id="work-exps">
             {this.renderOtherExperiences()};
           </div>
           <div className="buttonContainer">
             <button type="submit" className="submit-btn-student-timing" style={{ cursor: 'pointer' }} onClick={this.onSubmit}>
               Submit!
             </button>
           </div>
         </div>
       );
     }

     render() {
       return this.renderHelper();
     }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  student: reduxState.students.current_student,
  otherExps: reduxState.students.current_other_exps,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, updateStudent, updateOtherExperience, fetchOtherExperiences,
})(StudentOtherExperiences));
