/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { deleteWorkExperience } from '../../actions';

class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badStartDate: false,
      badEndDate: false,
      currentlyWorking: this.props.workExp.currently_working,
    };
  }

  // Date validation function modified from https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  isValidDate = (dateString) => {
    // Check for yyyy-mm pattern
    if (!/^\d{4}-\d{2}$/.test(dateString)) { return false; }

    // Parse the date parts to integers
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);

    // Check the ranges of month and year
    return (year > 1000 && year < 3000 && month !== 0 && month <= 12);
  };

  render() {
    return this.props.isEditing ? (
      <div className="work-exp">
        <div className="input-title">Role</div>
        <input className="short-input" defaultValue={this.props.workExp.role} onBlur={(event) => this.props.changeWorkExpField(this.props.index, 'role', event.target.value)} />
        <div className="input-title">Employer</div>
        <input className="short-input" defaultValue={this.props.workExp.employer} onBlur={(event) => this.props.changeWorkExpField(this.props.index, 'employer', event.target.value)} />
        <div className="input-title">City</div>
        <input className="short-input" defaultValue={this.props.workExp.city} onBlur={(event) => this.props.changeWorkExpField(this.props.index, 'city', event.target.value)} />
        <div className="input-title">State Abbreviation</div>
        <input className="short-input" defaultValue={this.props.workExp.state} onBlur={(event) => this.props.changeWorkExpField(this.props.index, 'state', event.target.value)} />
        <div className="input-title">Start Date (YYYY-MM)</div>
        <div style={{ color: 'red' }}>{this.state.badStartDate ? 'Please enter a valid date with the format YYYY-MM' : null}</div>
        <input className="short-input"
          placeholder="YYYY-MM"
          defaultValue={new Date(this.props.workExp.start_date).getMonth() + 1 < 10
            ? `${new Date(this.props.workExp.start_date).getFullYear()}-0${new Date(this.props.workExp.start_date).getMonth() + 1}`
            : `${new Date(this.props.workExp.start_date).getFullYear()}-${new Date(this.props.workExp.start_date).getMonth() + 1}`}
          onBlur={(event) => {
            if (!this.isValidDate(event.target.value)) {
              this.setState({ badStartDate: true });
            } else {
              this.setState({ badStartDate: false });
              // We're not displaying day, but the date needs to have a day, so just set it arbitrarily to the 15th here
              this.props.changeWorkExpField(this.props.index, 'start_date', `${event.target.value}-15`);
            }
          }}
        />
        {!this.props.workExp.currently_working
          ? (
            <div>
              <div className="input-title">End Date (YYYY-MM)</div>
              <div style={{ color: 'red' }}>{this.state.badEndDate ? 'Please enter a valid date with the format YYYY-MM' : null}</div>
              <input className="short-input"
                placeholder="YYYY-MM"
                defaultValue={new Date(this.props.workExp.end_date).getMonth() + 1 < 10
                  ? `${new Date(this.props.workExp.end_date).getFullYear()}-0${new Date(this.props.workExp.end_date).getMonth() + 1}`
                  : `${new Date(this.props.workExp.end_date).getFullYear()}-${new Date(this.props.workExp.end_date).getMonth() + 1}`}
                onBlur={(event) => {
                  if (!this.isValidDate(event.target.value)) {
                    this.setState({ badEndDate: true });
                  } else {
                    this.setState({ badEndDate: false });
                    // We're not displaying day, but the date needs to have a day, so just set it arbitrarily to the 15th here
                    this.props.changeWorkExpField(this.props.index, 'end_date', `${event.target.value}-15`);
                  }
                }}
              />
            </div>
          )
          : null}
        <form>
          <label htmlFor={`currentlyWorking-${this.props.workExp._id}`}>I currently work here
            <input
              name="currentlyWorking"
              id={`currentlyWorking-${this.props.workExp._id}`}
              type="checkbox"
              checked={this.state.currentlyWorking}
              onChange={(event) => {
                this.setState({ currentlyWorking: event.target.checked, badEndDate: false });
                this.props.changeWorkExpField(this.props.index, 'currently_working', event.target.checked);
              }}
            />
          </label>
        </form>
        <div className="input-title">Description</div>
        <TextareaAutosize className="tall-input" defaultValue={this.props.workExp.description} onBlur={(event) => this.changeWorkExpField(this.props.index, 'description', event.target.value)} />
        <button onClick={() => this.props.deleteWorkExperience(this.props.workExp._id)}>Delete Work Experience</button>
      </div>
    )
      : (
        <div key={this.props.index} className="work-exp">
          <div>{this.props.workExp.role}</div>
          <div>{this.props.workExp.employer}</div>
          <div>{`${this.props.workExp.city}, ${this.props.workExp.state}`}</div>
          <div className="date-row">
            {`${new Date(this.props.workExp.start_date).getMonth() + 1}/${new Date(this.props.workExp.start_date).getFullYear()} - `}
            {this.props.workExp.currently_working ? 'present' : `${new Date(this.props.workExp.end_date).getMonth() + 1}/${new Date(this.props.workExp.end_date).getFullYear()}`}
          </div>
          <div>{this.props.workExp.description}</div>
        </div>
      );
  }
}

export default connect(null, { deleteWorkExperience })(WorkExperience);
