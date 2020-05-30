/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createIndustry } from '../../../actions';
import close from '../../../../static/img/close.png';
import '../../../styles/student-profile.scss';

class NewIndustry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="new-pill-field-container">
        <div className="new-pill-field">
          <div className="new-title-modal">New Industry<img className="close-modal"
            src={close}
            alt="close"
            style={{ cursor: 'pointer' }}
            onClick={this.props.onClose}
          />
          </div>
          <div className="new-pill-field-body">
            <div className="input-title">Name</div>
            <input className="short-input" onBlur={(event) => this.setState({ name: event.target.value })} />
            <button className="modal-add-button"
              onClick={() => {
                this.props.createIndustry(this.state);
                this.props.onClose();
              }}
            >Add Industry
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { createIndustry })(NewIndustry));
