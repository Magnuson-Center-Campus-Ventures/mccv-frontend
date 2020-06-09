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


     renderDescQuestions() {
       return (
         <div className="question">
           <div className="question-header">
             <div className="question-header-prompt">
               <h1>Description</h1>
               <p>Add your startup’s description!</p>
             </div>
             <i className="far fa-id-badge question-header-icon" id="icon" />
           </div>
           <div className="question-fields">
             <p className="question-fields-title">Description</p>
             <TextareaAutosize className="question-fields-text" onChange={(event) => this.changeStartupField('description', event)} defaultValue={this.props.startup.description} />
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
