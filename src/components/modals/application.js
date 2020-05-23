/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../styles/application.scss';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionToAnswer: {},
    };
  }

    onClose = (e) => {
      this.props.onClose && this.props.onClose(e);
    };

    render() {
      if (!this.props.show) {
        return null;
      }
      return (
        <div className="application-container">
          <div id="application" className="application">
            <div className="title">{this.props.current.title}</div>
            <div className="questions">
              <h3>Question 1</h3>
              <input />
            </div>
            <div className="actions">
              <button type="submit"
                className="submit-btn"
                onClick={(e) => {
                  this.onClose(e);
                }}
              >
                Submit
              </button>
            </div>
          </div>

        </div>
      );
    }
}

const mapStateToProps = (reduxState) => ({
  current: reduxState.posts.current,
});

export default withRouter(connect(mapStateToProps, null)(Application));
