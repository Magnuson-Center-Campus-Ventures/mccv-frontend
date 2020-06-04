import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import '../../styles/startup-sign-up/startup-signup-bio.scss';
import {
  fetchStartupByUserID, fetchUser, updateStartup,
} from '../../actions';

class StartupBio extends Component {
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


     renderBioQuestions() {
       return (

         <div className="StartupBioContainer">
           <div className="StartupBioHeaderContainer">
             <h1 className="StartupBioHeader">
               Bio
             </h1>
           </div>
           <div className="StartupBioDescContainer">
             <p className="StartupBioDesc">
               Add your startup’s name and location!
             </p>
             <i className="far fa-id-badge" id="icon" />
           </div>
           <div className="StartupBioQuestionsContainer">
             <div className="nameContainer">
               <div className="StartupBioQuestionLabelContainer">
                 <div className="StartupBioQuestionLabelContainer">
                   <p className="StartupBioLabel">
                     Name
                   </p>
                   <TextareaAutosize onBlur={(event) => this.changeStartupField('name', event)} defaultValue={this.props.startup.name} />
                 </div>
                 <p className="StartupBioLabel">
                   City
                 </p>
                 <TextareaAutosize onBlur={(event) => this.changeStartupField('city', event)} defaultValue={this.props.startup.city} />
               </div>
               <div className="StartupBioQuestionLabelContainer">
                 <p className="StartupBioLabel">
                   State
                 </p>
                 <TextareaAutosize onBlur={(event) => this.changeStartupField('state', event)} defaultValue={this.props.startup.state} />
               </div>
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
       return this.renderBioQuestions();
     }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  startup: reduxState.startups.current_startup,
});

export default withRouter(connect(mapStateToProps, { fetchStartupByUserID, fetchUser, updateStartup })(StartupBio));