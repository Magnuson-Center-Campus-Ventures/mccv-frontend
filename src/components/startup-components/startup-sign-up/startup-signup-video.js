import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import '../../../styles/startup-sign-up/startup-signup-video.scss';
import {
  fetchStartupByUserID, fetchUser, updateStartup,
} from '../../../actions';

class StartupVideo extends Component {
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


     renderVideoQuestions() {
       return (

         <div className="StartupVideoContainer">
           <div className="StartupVideoHeaderContainer">
             <h1 className="StartupVideoHeader">
               Video Pitch
             </h1>
           </div>
           <div className="StartupVideoDescContainer">
             <p className="StartupVideoDesc">
               Add a link of a short informal video pitching your startup!
             </p>
             <i className="far fa-id-badge" id="icon" />
           </div>
           <div className="StartupVideoQuestionsContainer">
             <div className="StartupVideoQuestionLabelContainer">
               <p className="StartupVideoLabel">
                 Video Link
               </p>
               <TextareaAutosize onBlur={(event) => this.changeStartupField('name', event)} defaultValue={this.props.startup.name} />
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
       return this.renderVideoQuestions();
     }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  startup: reduxState.startups.current_startup,
});

export default withRouter(connect(mapStateToProps, { fetchStartupByUserID, fetchUser, updateStartup })(StartupVideo));
