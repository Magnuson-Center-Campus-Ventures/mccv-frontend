/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize'

import ReviseConfirm from './revise-confirm'
import { updateStartup, updatePost, updateStudent, sendNotificationEmail } from '../../actions';
// import close from '../../../static/img/close.png';
import '../../styles/modal.scss';

const Revise = (props) => {
  const [confirmShow, toggleConfirm] = useState(false)
  const [emailMessage, changeEmailMessage] = useState("")
  if (!props.show) {
    return null;
  }
  const showConfirmModal = () => { toggleConfirm(true) }
  const hideConfirmModal = () => { toggleConfirm(false) }

  const onSubmit = (e) => { showConfirmModal() }
  const updateMessage = (e) => {
    changeEmailMessage(e.target.value)
  }

  const emailBody = (
    "<h2> An MCCV admin has revised your " + props.type + " " + ((props.type=="post") ? "- "+props.data.title:"profile") + "</h2>" +
    ((emailMessage.length!=0) ? "Here is a message from them explaining why: <br/><p><i>" + emailMessage+"</i></p>" : "") + "<br/>" +
    "Feel free to check your "+props.type+" and re-edit it if needed, and please get in touch with us at magnuson.student.leadership.board@dartmouth.edu with any questions."
  );

  const onConfirm = (e) => {
    let data = props.data
    let id;
    switch (props.type) {
      case "post":
        id = data.startup_id.user_id
        props.sendNotificationEmail({
          user_id: id, 
          type: 'post revise',
          info: emailBody,
        });
        props.updatePost(data._id,data)
        break;
      case "startup":
        id = data.user_id
        props.sendNotificationEmail({
          user_id: id, 
          type: 'startup revise',
          info: emailBody,
        });
        props.updateStartup(data._id, data)
        break;
      case "student":
        id = data.user_id
        props.sendNotificationEmail({
          user_id: id, 
          type: 'student revise',
          info: emailBody,
        });
        props.updateStudent(data._id,data)
        break;
    }
    props.onClose();
    props.onSuccess();
  };


  return (
    <div className="modal-container">
      <ReviseConfirm onClose={hideConfirmModal} show={confirmShow} onConfirm={onConfirm} />
      <div className="modal-inner" id="reviseModal">
        {/* <img id="close-app"
          src={close}
          alt="close"
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            props.onClose(e);
          }}
        /> */}
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
          <h3> Your revisions will be saved and the user will be notified of the edits through email. </h3>
          <h3> Write a short message explaining your revisions to be included in the email. </h3>
          
          <TextareaAutosize minRows={6} className="revision-message-text" onBlur={updateMessage}/>
          <div className="modal-options">
            <button type="submit"
              className="modal-button"
              id="modal-no"
              onClick={(e) => {
                props.onClose(e);
              }}
            >
              Cancel
            </button>
            <button type="submit"
              className="modal-button"
              id="modal-yes"
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(connect(null, { updateStartup, updatePost, updateStudent, sendNotificationEmail })(Revise));
