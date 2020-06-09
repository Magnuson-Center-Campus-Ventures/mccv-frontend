import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import '../../../styles/create-new-paginator.scss';
import {
  fetchStartupByUserID, fetchUser, updateStartup, fetchStartup,
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
         this.props.updateStartup(this.props.startup.id,
           startup);
         return {
           ...prevState,
           startup,
         };
       });
       this.props.updateStartup(this.props.startup.id, this.state.startup);
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
               Add a link to a short informal video pitching your startup!
             </p>
             <i className="far fa-id-badge" id="icon" />
           </div>
           <div className="StartupVideoQuestionsContainer">
             <div className="StartupVideoQuestionLabelContainer">
               <p className="StartupVideoLabel">
                 Video Link
               </p>
               <TextareaAutosize onChange={(event) => this.changeStartupField('video', event)} defaultValue={this.props.startup.video} />
             </div>
           </div>
         </div>
       );
     }

     render() {
       return this.renderVideoQuestions();
     }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  startup: reduxState.startups.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchStartupByUserID, fetchUser, updateStartup, fetchStartup,
})(StartupVideo));
