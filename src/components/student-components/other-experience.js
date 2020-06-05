/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { deleteOtherExperience } from '../../actions';

// class OtherExperience extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // badStartDate: false,
//       // badEndDate: false,
//       // currentlyWorking: this.props.workExp.currently_working,
//     };
//   }

const OtherExperience = (props) => {
  return props.isEditing ? (
    <div className="work-exp">
      <div className="input-title">Name</div>
      <input className="short-input" defaultValue={props.otherExp.name} onBlur={(event) => props.changeOtherExpField(props.index, 'name', event.target.value)} />
      <div className="input-title">Description</div>
      <TextareaAutosize className="tall-input" defaultValue={props.otherExp.description} onBlur={(event) => props.changeOtherExpField(props.index, 'description', event.target.value)} />
      <button onClick={() => props.deleteOtherExperience(props.otherExp._id)}>Delete Experience</button>
    </div>
  )
    : (
      <div className="work-exp">
        <div>{props.otherExp.name}</div>
        <div>{props.otherExp.description}</div>
      </div>
    );
};

export default connect(null, { deleteOtherExperience })(OtherExperience);
