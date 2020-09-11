import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import {
  fetchStartupByUserID, fetchUser, updateStartup, fetchStartup, uploadImage,
} from '../../../actions';

class StartupBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startup: {},
      preview: '',
      selected: '',
      affiliation: '',
      badGender: true, 
      badAffiliation: true, 
    };
    this.onImageUpload = this.onImageUpload.bind(this);
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
      this.props.updateStartup(this.props.startup.id, startup);
      return {
        ...prevState,
        startup,
      };
    });
  }

  onImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    this.state.preview = window.URL.createObjectURL(file);
    if (file) {
      uploadImage(file).then(url => {
        this.props.startup.logo = url;
        this.state.startup.logo = url;
        this.state.preview = url;
      }).catch(error => {
        this.state.error = error;
      });
    }
  } else {
    this.state.error = 'file is null';
  }
  this.forceUpdate();
}

  // Send update to database
  onSubmit = (e) => {
    this.props.updateStartup(this.props.startup.id, this.state.startup);
  };

renderLogo(){
  if (this.state.preview === ''){
    this.state.preview = this.props.startup.logo;
  }
  return(<img className="startup-logo" id="preview" alt="preview" src={this.state.preview} />);
}

      <div className="question-fields">
        <p className="question-fields-title">Name</p>
        <TextareaAutosize className="question-fields-text" onChange={(event) => this.changeStartupField('name', event)} defaultValue={this.props.startup.name} />
        <p className="question-fields-title">City</p>
        <TextareaAutosize className="question-fields-text" onChange={(event) => this.changeStartupField('city', event)} defaultValue={this.props.startup.city} />
        <p className="question-fields-title">State</p>
        <TextareaAutosize className="question-fields-text" onChange={(event) => this.changeStartupField('state', event)} defaultValue={this.props.startup.state} />

        </div>
      </div>
     renderBioQuestions() {
       return (
         <div className="question">
           <div className="question-header">
             <div className="question-header-prompt">
               <h1>Bio</h1>
               <p>Add your startup’s name and location!</p>
               <p className="imptMessage">* indicates a required field!</p>
             </div>
             <i className="far fa-id-badge question-header-icon" id="icon" />
           </div>
           <div className="question-fields">
             <p className="question-fields-title">Name <span className="imptMessage">*</span></p>
             <TextareaAutosize className="question-fields-text" onChange={(event) => this.changeStartupField('name', event)} defaultValue={this.props.startup.name} />
             <p className="question-fields-title">City <span className="imptMessage">*</span></p>
             <TextareaAutosize className="question-fields-text" onChange={(event) => this.changeStartupField('city', event)} defaultValue={this.props.startup.city} />
             <p className="question-fields-title">State <span className="imptMessage">*</span></p>
             <TextareaAutosize className="question-fields-text" onChange={(event) => this.changeStartupField('state', event)} defaultValue={this.props.startup.state} />
             <p className="question-fields-title">Founder's Gender <span className="imptMessage">*</span></p>
              <select value={this.props.selected} onBlur={(event) => {
                this.changeStartupField('founder_gender', event);
                this.setState({
                  selected: event.target.value, 
                  badGender: false, 
                });
                if (!this.state.badAffiliation){
                  this.props.ifFilled(); 
                }
                }}>
                <option value="status">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer not to say">Prefer Not to Say</option>
              </select>
              <p className="question-fields-title">Dartmouth Affiliation <span className="imptMessage">*</span></p>
              <select value={this.state.affiliation} onChange={(event) => {
                this.changeStartupField('affiliation', event);
                this.setState({
                  affiliation: event.target.value, 
                  badAffiliation: false, 
                });
                if (!this.state.badGender){
                  this.props.ifFilled();
                  // console.log('in affiliation IF');
                }
              }}>
              {/* Dartmouth, geisel, tuck, thayer, guarini */}
                <option value="Select">Select...</option>
                <option value="Undergrad">Dartmouth College</option>
                <option value="Geisel">Geisel School of Medicine </option>
                <option value="Tuck">Tuck School of Business</option>
                <option value="Thayer">Thayer School of Engineering</option>
                <option value="Guarini">Guarini School of Graduate and Advanced Studies</option>
                <option value="None">No Dartmouth affiliation</option>
              </select>
           </div>
           <p>Logo (Use company's name for filename)</p>
            {this.renderLogo()}
            <input type="file" name="coverImage" onChange={this.onImageUpload} />
            <p>Link to your startup's pitch! (use the embed link for the video)</p>
            <TextareaAutosize onBlur={(event) => this.changeStartupField('video', event)} defaultValue={this.props.startup.video} />
            <iframe title="videoLarge" className="embed-responsive-item" src={this.state.startup.video} />
         </div>
       );
     }

  render() {
    return this.renderBioQuestions();
  }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  startup: reduxState.startups.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchStartupByUserID, fetchUser, updateStartup, fetchStartup,
})(StartupBio));
