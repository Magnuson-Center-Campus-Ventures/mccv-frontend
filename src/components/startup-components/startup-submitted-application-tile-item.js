/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/postings.scss';

const StartupSubmittedApplicationTileItem = (props) => {
  const affiliationGradYear = (props.student.affiliation && props.student.grad_year) ? (
    <h2 className="gradYear">{`Class of ${props.student.grad_year} (${props.student.affiliation.charAt(0).toUpperCase()
      + props.student.affiliation.slice(1)})`}
    </h2>
  ) : (
    (props.student.grad_year) ? (
      <h2 className="gradYear">{`Class of ${props.student.grad_year}`} </h2>
    ) : (
      <div />
    )
  );

  const majors = props.student.majors.length > 0
    ? (
      props.student.majors.map((major, index) => {
        if (index === 0) {
          return (
            <span key={index} className="major">
              {`Major in ${major}`}
            </span>
          );
        } else if (index === 1) {
          return (
            <span key={index} className="major">, ...</span>
          );
        }
      })
    ) : (
      <span className="major">Major Undeclared</span>
    );

  const renderPosition = (props.post?.title) ? (
    <div className="postInfo">
      <span id="pillsTitle">Applied to:</span>
      <p className="postTitle">{props.post.title}</p>
    </div>
  ) : (
    <div className="postSpace" />
  );

  const statusPill = (props.status === 'approved') ? (
    <div id="statusGreenPill">Approved</div>
  ) : (
    (props.status === 'declined') ? (
      <div id="statusRedPill">Declined</div>
    ) : (
      <div id="statusYellowPill">Pending Review</div>
    )
  );

  const renderStudentName = (props.student?.first_name && props.student?.last_name) ? (
    <h1 className="studentName">{`${props.student?.first_name} ${props.student?.last_name}`}</h1>
  ) : (
    (props.student?.first_name) ? (
      <h1 className="studentName">{`${props.student?.first_name}`}</h1>
    ) : (
      (props.student?.last_name) ? (
        <h1 className="studentName">{`${props.student?.last_name}`}</h1>
      ) : (
        <h1 className="studentName">No Name</h1>
      )
    )
  );

  return (
    <div className="postBody">
      <div className="postText">
        {renderStudentName}
        {affiliationGradYear}
        <div className="majorWrapper">
          {majors}
        </div>
        {renderPosition}

        <div className="applicationStatusRow">
          <div id="pillsTitle">Status: </div>
          {statusPill}
        </div>
      </div>
    </div>
  );
};

export default StartupSubmittedApplicationTileItem;
