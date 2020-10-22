/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { deleteWorkExperience } from '../../actions';

// class WorkExperience extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       badStartDate: false,
//       badEndDate: false,
//       currentlyWorking: props.workExp.currently_working,
//     };
//   }

//   // Date validation function modified from https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
//   isValidDate = (dateString) => {
//     // Check for yyyy-mm pattern
//     if (!/^\d{4}-\d{2}$/.test(dateString)) { return false; }

//     // Parse the date parts to integers
//     const parts = dateString.split('-');
//     const year = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10);

//     // Check the ranges of month and year
//     return (year > 1000 && year < 3000 && month !== 0 && month <= 12);
//   };

//   render() {
  const WorkExperience = (props) => {
    return props.isEditing ? (
      <div className="work-exp">
        <div className="exp-button-row">
          <div>
            <div className="input-title">Role</div>
            <input className="short-input" defaultValue={props.workExp.role} onBlur={(event) => props.changeWorkExpField(props.index, 'role', event.target.value)} />
          </div>
          <button className="del-button" onClick={() => props.deleteWorkExperience(props.workExp._id)}>
            <i className="far fa-trash-alt delete-icon" />
          </button>
        </div>
        <div className="input-title">Employer</div>
        <input className="short-input" defaultValue={props.workExp.employer} onBlur={(event) => props.changeWorkExpField(props.index, 'employer', event.target.value)} />
        <div className="input-title">City</div>
        <input className="short-input" defaultValue={props.workExp.city} onBlur={(event) => props.changeWorkExpField(props.index, 'city', event.target.value)} />
        <div className="input-title">State Abbreviation</div>
        <input className="short-input" defaultValue={props.workExp.state} onBlur={(event) => props.changeWorkExpField(props.index, 'state', event.target.value)} />
        <div className="input-title">Start Date (YYYY-MM)</div>
        {/* <div style={{ color: 'red' }}>{this.state.badStartDate ? 'Please enter a valid date with the format YYYY-MM' : null}</div> */}
        <input className="short-input"
          placeholder="YYYY-MM"
          defaultValue={new Date(props.workExp.start_date).getMonth() + 1 < 10
            ? `${new Date(props.workExp.start_date).getFullYear()}-0${new Date(props.workExp.start_date).getMonth() + 1}`
            : `${new Date(props.workExp.start_date).getFullYear()}-${new Date(props.workExp.start_date).getMonth() + 1}`}
          onBlur={(event) => {
            if (!this.isValidDate(event.target.value)) {
              // this.setState({ badStartDate: true });
            } else {
              // this.setState({ badStartDate: false });
              // We're not displaying day, but the date needs to have a day, so just set it arbitrarily to the 15th here
              props.changeWorkExpField(props.index, 'start_date', `${event.target.value}-15`);
            }
          }}
        />
        {!props.workExp.currently_working
          ? (
            <div>
              <div className="input-title">End Date (YYYY-MM)</div>
              {/* <div style={{ color: 'red' }}>{this.state.badEndDate ? 'Please enter a valid date with the format YYYY-MM' : null}</div> */}
              <input className="short-input"
                placeholder="YYYY-MM"
                defaultValue={props.workExp.end_date
                  ? (new Date(props.workExp.end_date).getMonth() + 1 < 10
                    ? `${new Date(props.workExp.end_date).getFullYear()}-0${new Date(props.workExp.end_date).getMonth() + 1}`
                    : `${new Date(props.workExp.end_date).getFullYear()}-${new Date(props.workExp.end_date).getMonth() + 1}`
                  )
                  : ''}
                onBlur={(event) => {
                  if (!this.isValidDate(event.target.value)) {
                    this.setState({ badEndDate: true });
                  } else {
                    this.setState({ badEndDate: false });
                    // We're not displaying day, but the date needs to have a day, so just set it arbitrarily to the 15th here
                    props.changeWorkExpField(props.index, 'end_date', `${event.target.value}-15`);
                  }
                }}
              />
            </div>
          )
          : null}
        <form>
          <label htmlFor={`currentlyWorking-${props.workExp._id}`}>I currently work here
            <input
              name="currentlyWorking"
              id={`currentlyWorking-${props.workExp._id}`}
              type="checkbox"
              // checked={this.state.currentlyWorking}
              onChange={(event) => {
                this.setState({ currentlyWorking: event.target.checked, badEndDate: false });
                props.changeWorkExpField(props.index, 'currently_working', event.target.checked);
                props.changeWorkExpField(props.index, 'end_date', null);
              }}
            />
          </label>
        </form>
        <div className="input-title">Description</div>
        <TextareaAutosize className="tall-input" defaultValue={props.workExp.description} onBlur={(event) => this.changeWorkExpField(props.index, 'description', event.target.value)} />
      </div>
    )
      : (
        <div key={props.index} className="work-exp">
          <div className="exp-title">{props.workExp.employer}</div>
          <div className="work-exp-role">{props.workExp.role}</div>
          <div className="work-exp-location-row">
            <span className="locationIcon" />
            <span className="work-exp-location"> {`${props.workExp.city}, ${props.workExp.state}`} </span>
          </div>  
          <div className="date-row">
            {`${new Date(props.workExp.start_date).getMonth() + 1}/${new Date(props.workExp.start_date).getFullYear()} - `}
            {props.workExp.currently_working ? 'present' : `${new Date(props.workExp.end_date).getMonth() + 1}/${new Date(props.workExp.end_date).getFullYear()}`}
          </div>
          <div className="exp-text">{props.workExp.description}</div>
        </div>
      );
  }
// }

export default connect(null, { deleteWorkExperience })(WorkExperience);
