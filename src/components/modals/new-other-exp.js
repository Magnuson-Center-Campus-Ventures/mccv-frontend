/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { createOtherExperience } from '../../actions';
import close from '../../../static/img/close.png';
import '../../styles/student-profile.scss';

class NewOtherExp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="new-work-exp-container">
        <div className="new-work-exp">
          <div className="new-title-modal">New Experience<img className="close-modal"
            src={close}
            alt="close"
            style={{ cursor: 'pointer' }}
            onClick={this.props.onClose}
          />
          </div>
          <div className="new-work-exp-body">
            <div className="input-title">Name</div>
            <TextareaAutosize className="short-input" onBlur={(event) => this.setState({ name: event.target.value })} />
            <div className="input-title">Description</div>
            <TextareaAutosize className="tall-input" onBlur={(event) => this.setState({ description: event.target.value })} />
            <button className="modal-add-button"
              onClick={() => {
                this.props.createOtherExperience(this.state);
                this.props.onClose();
              }}
            >Add Other Experience
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { createOtherExperience })(NewOtherExp));
