/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import '../../styles/postings.scss';

const ApplicationTileItem = (props) => {
  const logo = props.post.startup_id.logo ? (
    <img src={props.post.startup_id.logo} alt=" " className="companyLogo" />
  ) : (
    <div />
  );

  const virtual = (props.post.virtual === true) ? (
    <div className="location">
      <span className="virtualIcon" />
      <span className="postLocation">Virtual</span>
    </div>
  ) : (
    <div />
  );

  const inperson = (props.post.city && props.post.state) ? (
    <div className="location">
      <span className="locationIcon" />
      <span className="postLocation"> {`${props.post.city}, ${props.post.state}`} </span>
    </div>
  ) : (
    <div />
  );

  const start = new Date(props.post.desired_start_date);
  const end = new Date(props.post.desired_end_date);

  const startDate = (start) ? (
    <span className="dateText">Starts {`${start.getMonth() + 1}/${start.getDate()}/${start.getFullYear()}`}</span>
  ) : (
    <div />
  );

  const endDate = (end) ? (
    <span className="dateText">Ends {`${end.getMonth() + 1}/${end.getDate()}/${end.getFullYear()}`}</span>
  ) : (
    <div />
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

  return (
    <div className="postBody">
      <div className="postText">

        <div className="companyInfo">
          <div className="companyLeft">
            <h1 className="startupName"> { props.post.startup_id.name} </h1>
          </div>
          <div className="companyRight">
            {logo}
          </div>
        </div>

        <div className="postInfo">
          <h1 className="postTitle">{ props.post.title}</h1>
          {virtual}
          {inperson}
          <div className="dates">
            {startDate}
            {endDate}
          </div>
        </div>

        <div className="applicationStatusRow">
          <div id="pillsTitle">Status: </div>
          {statusPill}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTileItem;
