/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../../styles/student-sign-up/student-signup-workexperiences.scss';
import {
  fetchStudentByUserID, fetchUser, updateStudent, updateOtherExperience, fetchOtherExperiences,
} from '../../../actions';
import OtherExperience from '../student-modals/new-other-exp';

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
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
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

   hideModal = (e) => {
     this.setState({
       show: false,
     });
     this.state.otherExps.forEach((otherExp) => {
       this.props.updateOtherExperience(otherExp._id, otherExp);
     });
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

     // Removes time from date
     convertDate=(date) => {
       if (typeof date !== 'undefined') {
         const dateISO = date.slice(0, 10).split('-');
         return `${dateISO[1]}/${dateISO[2]}/${dateISO[0]}`;
       }
       return '';
     }

     renderOtherExperiences = () => {
       if (this.props.otherExps !== []) {
         return this.props.otherExps.map((otherExp, index) => {
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
           <div className="StudentOtherExperienceHeaderContainer">
             <h1 className="StudentOtherExperienceHeader">
               Personal Projects And Other Experiences
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
               Personal Projects And Other Experiences
             </u>
             <i className="fas fa-plus-circle"
               id="addicon"
               onClick={(e) => {
                 this.showModal();
               }}
             />
           </div>
           <div id="work-exps">
             {this.renderOtherExperiences()}
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
