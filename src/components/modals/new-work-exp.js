/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { createWorkExperience } from '../../actions';
import close from '../../../static/img/close.png';
import '../../styles/student-profile.scss';

class NewWorkExp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      employer: '',
      location: '',
      start_date: '',
      end_date: '',
      description: '',
      currently_working: false,
    };
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="new-work-exp-container">
        <div className="new-work-exp">
          <div className="new-title-modal">New Work Experience<img className="close-modal"
            src={close}
            alt="close"
            style={{ cursor: 'pointer' }}
            onClick={this.props.onClose}
          />
          </div>
          <div className="new-work-exp-body">
            <div className="input-title">Role</div>
            <TextareaAutosize className="short-input" onBlur={(event) => this.setState({ role: event.target.value })} />
            <div className="input-title">Employer</div>
            <TextareaAutosize className="short-input" onBlur={(event) => this.setState({ employer: event.target.value })} />
            <div className="input-title">Location</div>
            <TextareaAutosize className="short-input" onBlur={(event) => this.setState({ location: event.target.value })} />
            <div className="input-title">Start Date (YYYY-MM-DD)</div>
            <TextareaAutosize className="short-input"
              placeholder="YYYY-MM-DD"
              onBlur={(event) => this.setState({ start_date: event.target.value })}
            />
            <div className="input-title">End Date (YYYY-MM-DD)</div>
            <TextareaAutosize className="short-input"
              placeholder="YYYY-MM-DD"
              onBlur={(event) => this.setState({ end_date: event.target.value })}
            />
            <div className="input-title">Description</div>
            <TextareaAutosize className="tall-input" onBlur={(event) => this.setState({ description: event.target.value })} />
            <button className="modal-add-button"
              onClick={() => {
                this.props.createWorkExperience(this.state);
                this.props.onClose();
              }}
            >Add Work Experience
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { createWorkExperience })(NewWorkExp));
