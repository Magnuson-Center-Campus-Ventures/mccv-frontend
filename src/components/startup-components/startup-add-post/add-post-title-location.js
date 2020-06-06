import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import '../../../styles/startup-add-post/add-post-title-location.scss';
import {
  fetchStartupByUserID, fetchUser, updateStartup, fetchStartup,
} from '../../../actions';

class TitleLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  // Get profile info
  componentDidMount() {
    console.log(this.props.match.params.startupID);
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
       //  this.props.updateStartup(this.props.startup.id,
       //    Object.assign(this.state.student, startup));
       //  this.props.updateStartup(this.props.startup.id, this.state.startup);
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
                 <p className="StartupBioLabel">
                   Name
                 </p>
                 <TextareaAutosize onChange={(event) => this.changeStartupField('name', event)} defaultValue={this.props.startup.name} />
                 <p className="StartupBioLabel">
                   City
                 </p>
                 <TextareaAutosize onChange={(event) => this.changeStartupField('city', event)} defaultValue={this.props.startup.city} />
                 <p className="StartupBioLabel">
                   State
                 </p>
                 <TextareaAutosize onChange={(event) => this.changeStartupField('state', event)} defaultValue={this.props.startup.state} />
               </div>
             </div>
             <div className="StartupBioQuestionLabelContainer">
               <div className="StartupBioQuestionLabelContainer" />
             </div>
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
  startup: reduxState.startups.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchStartupByUserID, fetchUser, updateStartup, fetchStartup,
})(TitleLocation));
