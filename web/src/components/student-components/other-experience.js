/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { deleteOtherExperience } from '../../actions';

const OtherExperience = (props) => {
  return props.isEditing ? (
    <div className="work-exp">
      <div className="exp-button-row">
        <div>
          <div className="input-title">Title</div>
          <input className="short-input" defaultValue={props.otherExp.name} onBlur={(event) => props.changeOtherExpField(props.index, 'name', event.target.value)} />
        </div>
        <button className="del-button" onClick={() => props.deleteOtherExperience(props.otherExp._id)}>
          <i className="far fa-trash-alt delete-icon" />
        </button>
      </div>
      <div className="input-title">Description</div>
      <TextareaAutosize className="tall-input" defaultValue={props.otherExp.description} onBlur={(event) => props.changeOtherExpField(props.index, 'description', event.target.value)} />
    </div>
  )
    : (
      <div className="work-exp">
        <div className="exp-title">{props.otherExp.name}</div>
        <div className="exp-text">{props.otherExp.description}</div>
      </div>
    );
};

export default connect(null, { deleteOtherExperience })(OtherExperience);
