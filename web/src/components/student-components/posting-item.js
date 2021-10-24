/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import { Link } from 'react-router-dom';
import Archive from '../admin-modals/archive';
import '../../styles/postings.scss';

const PostListItem = (props) => {
  const route = `/posts/${props.post._id}`;

  const logo = props.post.startup_id.logo ? (
    <img src={props.post.startup_id.logo} alt=" " className="companyLogo" />
  ) : (
    <div />
  );

  const industries = props.post.industries.map((industry, index) => {
    if (index === 0) {
      if (industry.name.length > 18) {
        return (
          <div id="pillsTitle" key={industry.id}>
            Industries: <div className="yellowPill" key={industry.id}> {industry.name.substring(0, 17)}... </div>
          </div>
        );
      } else {
        return (
          <div id="pillsTitle" key={industry.id}>
            Industries: <div className="yellowPill" key={industry.id}> {industry.name} </div>
          </div>
        );
      }
    } else if (index < 3) {
      if (industry.name.length > 18) {
        return (
          <div className="yellowPill" key={industry.id}>{industry.name.substring(0, 17)}...</div>
        );
      } else {
        return (
          <div className="yellowPill" key={industry.id}>{industry.name}</div>
        );
      }
    } else if (index === 3) {
      return (
        <div className="yellowPill" key={industry.id}>...</div>
      );
    }
  });

  const skills = props.post.required_skills.map((skill, index) => {
    if (index === 0) {
      return (
        <div id="pillsTitle" key={skill.id}>
          Skills: <div className="greenPill" key={skill.id}> {skill.name} </div>
        </div>
      );
    } else if (index < 3) {
      return (
        <div className="greenPill" key={skill.id}>
          {skill.name}
        </div>
      );
    } else if (index === 3) {
      return (
        <div className="greenPill" key={skill.id}>
          ...
        </div>
      );
    }
  });

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

  const title = (props.post.title.length > 50) ? (
    <h1 className="postTitle">{ props.post.title.substring(0, 49) }...</h1>
  ) : (
    <h1 className="postTitle">{ props.post.title }</h1>
  );

  return (
    <Link to={route} key={props.post.id} className="listItem link">
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
            {title}
            {virtual}
            {inperson}
            <div className="dates">
              {startDate}
              {endDate}
            </div>
          </div>

          <div className="pillsList">
            {skills}
          </div>

          <div className="pillsList">
            {industries}
          </div>

        </div>
      </div>
      {/* <div className="companyInfo">
        <div className="companyText">
          <h1 id="startupName"> { props.post.startup_id.name} </h1>
          <div className="location">
            <span className="locationIcon" />
            <h2> {`${props.post.city}, ${props.post.state}`} </h2>
          </div>
        </div>
        {logo}
        <img src={props.post.startup_id.logo} alt="no logo" />
      </div>
      <div className="postInfo">
        <h1 id="postTitle">{ props.post.title}</h1>
        <div className="industriesList">
          {industries}
        </div>
      </div> */}
    </Link>
  );
};

export default PostListItem;
