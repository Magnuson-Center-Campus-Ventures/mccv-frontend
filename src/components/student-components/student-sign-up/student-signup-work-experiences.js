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
import '../../../styles/student-sign-up/student-signup-workexperiences.scss';
import {
  fetchStudentByUserID, fetchUser, updateStudent, updateWorkExperience, fetchWorkExperiences, deleteWorkExperience,
} from '../../../actions';
import WorkExperience from '../work-experience';
import NewWorkExp from '../student-modals/new-work-exp';

class StudentWorkExperiences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      student: {},
      workExps: [],
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
      if (this.props.student.work_exp && this.props.student.work_exp.length > 0) {
        this.props.fetchWorkExperiences(this.props.student.work_exp);
      }
      this.setState({
        student: this.props.student,
      });
    }

    if (prevProps.workExps !== this.props.workExps) {
      this.setState({ workExps: this.props.workExps });
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
     this.state.workExps.forEach((workExp) => {
       this.props.updateWorkExperience(workExp._id, workExp);
     });
   }

   changeWorkExpField = (index, field, value) => {
     this.setState((prevState) => {
       const workExps = [...prevState.workExps];
       workExps[index][field] = value;
       return {
         ...prevState,
         workExps,
       };
     });
   }

   submit = () => {
     if (this.state.isEditing) {
       const student = { ...this.state.student };
       this.props.updateStudent(this.state.student.id, student);
       this.state.workExps.forEach((workExp) => {
         this.props.updateWorkExperience(workExp._id, workExp);
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

     // Removes time from date
     convertDate=(date) => {
       if (typeof date !== 'undefined') {
         const dateISO = date.slice(0, 10).split('-');
         return `${dateISO[1]}/${dateISO[2]}/${dateISO[0]}`;
       }
       return '';
     }

     hideWorkExpModal = () => {
       this.setState({ show: false });
     };

    renderWorkExperiences = () => {
      if (this.state.workExps !== []) {
        return this.state.workExps.map((workExp, index) => {
          return (
            <WorkExperience key={index}
              className="work-exp"
              isEditing={this.state.isEditing}
              workExp={workExp}
              index={index}
              changeWorkExpField={this.changeWorkExpField}
            />
          );
        });
      } else return null;
    }

    render() {
      return (
        <div>
          <div className="StudentWorkExperienceContainer">
            {/* <NewWorkExp onClose={this.hideModal} show={this.state.show} /> */}
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
              <i className="far fa-edit"
                id="editicon"
                onClick={(e) => {
                  this.submit();
                }}
              />
            </div>
            {/* <div id="work-exps">
               {this.renderWorkExperiences()};
             </div> */}
          </div>
          <div className="student-profile">
            <NewWorkExp
              onClose={this.hideWorkExpModal}
              show={this.state.show}
            />
            <div id="work-exps">
              {this.renderWorkExperiences()}
            </div>
          </div>
        </div>
      );
    }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  student: reduxState.students.current_student,
  workExps: reduxState.students.current_work_exps,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, updateStudent, updateWorkExperience, fetchWorkExperiences, deleteWorkExperience,
})(StudentWorkExperiences));
