/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { createOtherExperience } from '../../../actions';
import close from '../../../../static/img/close.png';
import '../../../styles/student-profile.scss';

function NewOtherExp(props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

    if (!props.show) {
      return null;
    }
    return (
      <div className="new-work-exp-container">
        <div className="new-work-exp">
          <div className="new-title-modal">New Project/Experience<img className="close-modal"
            src={close}
            alt="close"
            style={{ cursor: 'pointer' }}
            onClick={props.onClose}
          />
          </div>
          <div className="new-work-exp-body">
            <div className="input-title">Name</div>
            <input className="short-input" onBlur={(event) => setName(event.target.value)} />
            <div className="input-title">Description</div>
            <TextareaAutosize className="tall-input" onBlur={(event) => setDescription(event.target.value)} />
            <button className="modal-add-button"
              onClick={() => {
                props.createOtherExperience({name: name, description: description});
                props.onClose();
              }}
            >Add Experience
            </button>
          </div>
        </div>
      </div>
    );
}

export default withRouter(connect(null, { createOtherExperience })(NewOtherExp));
