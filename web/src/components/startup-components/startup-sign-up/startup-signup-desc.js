/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import {
  fetchStartupByUserID, fetchUser, updateStartup, fetchStartup, uploadImage,
} from '../../../actions';
import embedInstructions from '../../../assets/embed-instructions.png';

class StartupDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startup: {},
      preview: '',
    };
    this.onImageUpload = this.onImageUpload.bind(this);
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchStartupByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.state.preview = window.URL.createObjectURL(file);
      if (file) {
        uploadImage(file).then((url) => {
          this.props.startup.logo = url;
          this.state.startup.logo = url;
          this.state.preview = url;
        }).catch((error) => {
          this.state.error = error;
        });
      }
    } else {
      this.state.error = 'file is null';
    }
    this.forceUpdate();
  }

  renderLogo() {
    if (this.state.preview === '') {
      this.state.preview = this.props.startup.logo;
    }
    return (<img className="startup-logo" id="preview" alt="preview" src={this.state.preview} />);
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
            <p>Fill out information about your startup!</p>
          </div>
          <i className="far fa-id-badge question-header-icon" id="icon" />
        </div>
        <div className="question-fields-desc">
          <p className="question-fields-title">Logo</p>
          {this.renderLogo()}
          <input type="file" name="coverImage" onChange={this.onImageUpload} />
        </div>
        <div className="question-fields-desc">
          <p className="question-fields-title">Description</p>
          <TextareaAutosize className="question-fields-text" onChange={(event) => this.changeStartupField('description', event)} defaultValue={this.props.startup.description} />
        </div>
        <div className="question-fields-desc">
          <p className="question-fields-title">Link to your startup's pitch video! (use the embed link for the video)</p>
          <TextareaAutosize onBlur={(event) => this.changeStartupField('video', event)} defaultValue={this.props.startup.video} />
          <img
            alt="Embed Link Example"
            src={embedInstructions}
            className="embed-instructions-image-signup"
          />
          <iframe
            title="videoLarge"
            className="embed-responsive-item"
            allow="fullscreen"
            src={this.state.startup.video}
          />
        </div>
      </div>
    );
  }

  render() {
    return this.renderDescQuestions();
  }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  startup: reduxState.startups.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchStartupByUserID, fetchUser, updateStartup, fetchStartup,
})(StartupDesc));
