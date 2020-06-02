import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import '../../../styles/startup-sign-up/startup-signup-desc.scss';
import {
  fetchStartupByUserID, fetchUser, updateStartup, fetchStartup,
} from '../../../actions';

class StartupDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startup: {},
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchStartupByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
  }

     // update startup field
     changeStartupField = (field, event) => {
       // eslint-disable-next-line prefer-destructuring
       const value = event.target.value;

       this.setState((prevState) => {
         const startup = { ...prevState.startup };
         startup[field] = value;
         return {
           ...prevState,
           startup,
         };
       });
     }

     // Send update to database
     onSubmit = (e) => {
       this.props.updateStartup(this.props.startup.id, this.state.startup);
     };


     renderDescQuestions() {
       return (

         <div className="StartupDescContainer">
           <div className="StartupDescHeaderContainer">
             <h1 className="StartupDescHeader">
               Desc
             </h1>
           </div>
           <div className="StartupDescDescContainer">
             <p className="StartupDescDesc">
               Add your startup’s name and location!
             </p>
             <i className="far fa-id-badge" id="icon" />
           </div>
           <div className="StartupDescQuestionsContainer">
             <div className="StartupDescQuestionLabelContainer">
               <p className="StartupDescLabel">
                 Description
               </p>
               <TextareaAutosize onBlur={(event) => this.changeStartupField('description', event)} defaultValue={this.props.startup.description} />
             </div>
           </div>
           <div className="buttonContainer">
             <button type="submit" className="submit-btn-startup-bio" style={{ cursor: 'pointer' }} onClick={this.onSubmit}>
               Next
             </button>
           </div>
         </div>
       );
     }

     render() {
       return this.renderDescQuestions();
     }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  startup: reduxState.startups.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchStartupByUserID, fetchUser, updateStartup, fetchStartup,
})(StartupDesc));
