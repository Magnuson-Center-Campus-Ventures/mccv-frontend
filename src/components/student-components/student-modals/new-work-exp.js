/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { createWorkExperience } from '../../../actions';
import close from '../../../../static/img/close.png';
import '../../../styles/student-profile.scss';

function NewWorkExp(props) {
  const [role, setRole] = useState('')
  const [employer, setEmployer] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [start_date, setStartDate] = useState('')
  const [end_date, setEndDate] = useState(null)
  const [description, setDescription] = useState('')
  const [currently_working, setCurrentlyWorking] = useState(false)
  const [badStartDate, setBadStartDate] = useState(false)
  const [badEndDate, setBadEndDate] = useState(false)

  // Date validation function modified from https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  const isValidDate = (dateString) => {
    // Check for yyyy-mm pattern
    if (!/^\d{4}-\d{2}$/.test(dateString)) { return false; }

    // Parse the date parts to integers
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);

    // Check the ranges of month and year
    return (year > 1000 && year < 3000 && month !== 0 && month <= 12);
  };

    if (!props.show) {
      return null;
    }
    return (
      <div className="new-work-exp-container">
        <div className="new-work-exp">
          <div className="new-title-modal">New Work Experience<img className="close-modal"
            src={close}
            alt="close"
            style={{ cursor: 'pointer' }}
            onClick={props.onClose}
          />
          </div>
          <div className="new-work-exp-body">
            <div className="input-title">Role</div>
            <input className="short-input" onBlur={(event) => setRole(event.target.value)} />
            <div className="input-title">Employer</div>
            <input className="short-input" onBlur={(event) => setEmployer(event.target.value)} />
            <div className="input-title">City</div>
            <input className="short-input" onBlur={(event) => setCity(event.target.value)} />
            <div className="input-title">State Abbreviation</div>
            <input className="short-input" onBlur={(event) => setState(event.target.value)} />
            <div className="input-title">Start Date (YYYY-MM)</div>
            <div style={{ color: 'red' }}>{badStartDate ? 'Please enter a valid date with the format YYYY-MM' : null}</div>
            <input className="short-input"
              placeholder="YYYY-MM"
              onBlur={(event) => setStartDate(event.target.value)}
            />
            {!currently_working
              ? (
                <div>
                  <div className="input-title">End Date (YYYY-MM)</div>
                  <div style={{ color: 'red' }}>{badEndDate ? 'Please enter a valid date with the format YYYY-MM' : null}</div>
                  <input className="short-input"
                    placeholder="YYYY-MM"
                    onBlur={(event) => setEndDate(event.target.value)}
                  />
                </div>
              )
              : null}
            <form>
              <label htmlFor="currentlyWorking">I currently work here
                <input
                  name="currentlyWorking"
                  id="currentlyWorking"
                  type="checkbox"
                  checked={currently_working}
                  onChange={(event) => {
                    setCurrentlyWorking(event.target.checked)
                    setEndDate(null)
                  }}
                />
              </label>
            </form>
            <div className="input-title">Description</div>
            <TextareaAutosize className="tall-input" onBlur={(event) => setDescription(event.target.value)} />
            <button className="modal-add-button"
              onClick={() => {
                if (!isValidDate(start_date) || (!currently_working && !isValidDate(end_date))) {
                  if (!isValidDate(start_date)) {
                    setBadStartDate(true);
                  }
                  if (!currently_working && !isValidDate(end_date)) {
                    setBadEndDate(true);
                  }
                } else {
                  // We're not displaying day, but the date needs to have a day, so just set it arbitrarily to the 15th here
                  const workExperience = {
                    role: role,
                    employer: employer,
                    city: city,
                    state: state,
                    start_date: start_date,
                    end_date: end_date,
                    description: description,
                    currently_working: currently_working,
                  };
                  workExperience.start_date += '-15';
                  if (workExperience.end_date !== null) {
                    workExperience.end_date += '-15';
                  }
                  props.createWorkExperience(workExperience);
                  props.onClose();
                }
              }}
            >Add Work Experience
            </button>
          </div>
        </div>
      </div>
    );
}

export default withRouter(connect(null, { createWorkExperience })(NewWorkExp));
