/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../../styles/student-sign-up/student-signup-workexperiences.scss';
import {
  fetchStudentByUserID, fetchUser, updateStudent, updateWorkExperience, fetchWorkExperiences,
} from '../../../actions';
import WorkExperience from '../student-modals/new-work-exp';

class StudentWorkExperiences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      workExps: [],
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
      this.props.fetchWorkExperiences(this.props.student.work_exp);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ student: this.props.student });
    }
    if (this.props.workExps !== {} && prevProps.workExps !== this.props.workExps) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ workExps: this.props.workExps });
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
     this.state.workExps.forEach((workExp) => {
       this.props.updateWorkExperience(workExp._id, workExp);
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

     renderWorkExperiences = () => {
       if (this.state.workExps !== []) {
         return this.state.workExps.map((workExp, index) => {
           return (
             <div key={index} className="work-exp">
               <div>{workExp.role}</div>
               <div>{workExp.employer}</div>
               <div>{workExp.location}</div>
               <div className="date-row">
                 {`${new Date(workExp.start_date).getMonth() + 1}/${new Date(workExp.start_date).getFullYear()} - `}
                 {workExp.currently_working ? 'present' : `${new Date(workExp.end_date).getMonth() + 1}/${new Date(workExp.end_date).getFullYear()}`}
               </div>
               <div>{workExp.description}</div>
             </div>
           );
         });
       } else return null;
     }


     renderHelper() {
       return (
         <div className="StudentWorkExperienceContainer">
           <WorkExperience onClose={this.hideModal} show={this.state.show} />
           <div className="StudentWorkExperienceHeaderContainer">
             <h1 className="StudentWorkExperienceHeader">
               Work Experience
             </h1>
           </div>
           <div className="StudentWorkExperienceDescContainer">
             <p className="StudentWorkExperienceDesc">
               Add your relevant work experience!
             </p>
             <i className="fas fa-briefcase" id="icon" />
           </div>
           <div className="WorkExperienceSubtitle">
             <u>
               Work Experiences
             </u>
             <i className="fas fa-plus-circle"
               id="addicon"
               onClick={(e) => {
                 this.showModal();
               }}
             />
           </div>
           <div id="work-exps">
             {this.renderWorkExperiences()};
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
  workExps: reduxState.students.current_work_exps,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, updateStudent, updateWorkExperience, fetchWorkExperiences,
})(StudentWorkExperiences));
