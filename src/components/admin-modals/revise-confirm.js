import React, { useState } from 'react';
const ReviseConfirm = (props) => {

    if (!props.show) {
        return null;
    }
    return (
    <div className="modal-container" style={{zIndex:101}}>
      <div className="modal-inner" id="reviseModal">
        <i className="fas fa-times"
          aria-label="close modal"
          role="button"
          tabIndex={0}
          id="close-modal"
          onClick={(e) => {
            props.onClose(e);
          }}
        />
        <div className="modal-content">
          <h3> Are you sure about your revisions and your email message to the user? </h3>
          <div className="modal-options">
            <button type="submit"
              className="modal-button"
              id="modal-no"
              onClick={(e) => {
                props.onClose(e);
              }}
            >
              Go Back
            </button>
            <button type="submit"
              className="modal-button"
              id="modal-yes"
              onClick={(e) => {
                props.onConfirm(e);
              }}
            >
              Confirm Revisions
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}
export default ReviseConfirm