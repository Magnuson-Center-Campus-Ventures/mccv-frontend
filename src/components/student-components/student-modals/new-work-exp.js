/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createWorkExperience } from '../../../actions';
import close from '../../../../static/img/close.png';
import '../../../styles/student-profile.scss';

class NewWorkExp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      employer: '',
      location: '',
      start_date: '',
      end_date: undefined,
      description: '',
      currently_working: false,
    };
  }

  // Date validation function modified from https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  isValidDate = (dateString) => {
    // Check for yyyy-mm pattern
    // if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) { return false; }
    if (!/^\d{4}-\d{2}$/.test(dateString)) { return false; }

    // Parse the date parts to integers
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);

    // Check the ranges of month and year
    return (year > 1000 && year < 3000 && month !== 0 && month <= 12);
  };

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
            <input className="short-input" onBlur={(event) => this.setState({ role: event.target.value })} />
            <div className="input-title">Employer</div>
            <input className="short-input" onBlur={(event) => this.setState({ employer: event.target.value })} />
            <div className="input-title">Location</div>
            <input className="short-input" onBlur={(event) => this.setState({ location: event.target.value })} />
            <div className="input-title">Start Date (YYYY-MM)</div>
            <input className="short-input"
              placeholder="YYYY-MM"
              onBlur={(event) => console.log(this.isValidDate(event.target.value))} // this.setState({ start_date: event.target.value })}
            />
            {!this.state.currently_working
              ? (
                <div>
                  <div className="input-title">End Date (YYYY-MM)</div>
                  <input className="short-input"
                    placeholder="YYYY-MM"
                    onBlur={(event) => this.setState({ end_date: event.target.value })}
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
                  checked={this.state.currently_working}
                  onChange={(event) => this.setState({ currently_working: event.target.checked })}
                />
              </label>
            </form>
            <div className="input-title">Description</div>
            <textarea className="tall-input" onBlur={(event) => this.setState({ description: event.target.value })} />
            <button className="modal-add-button"
              onClick={() => {
                // We're not displaying day, but the date needs to have a day, so just set it arbitrarily to the 15th here
                const workExperience = this.state;
                workExperience.start_date += '-15';
                workExperience.end_date += '-15';
                this.props.createWorkExperience(workExperience);
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
