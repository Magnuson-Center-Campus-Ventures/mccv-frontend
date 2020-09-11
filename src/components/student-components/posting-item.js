/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Archive from '../admin-modals/archive';
import '../../styles/postings.scss';

const PostListItem = (props) => {
  const route = `/posts/${props.post._id}`;

  const logo = props.post.startup_id.logo ? (
    <img src={props.post.startup_id.logo} alt=" " className="companyLogo"/>
  ) : (
    <div />
  );

  const industries = props.post.industries.map((industry, index) => {
    if (index === 0) {
      return (
        <div id="pillsTitle" key={industry.id}>
          Industries: <div className="grayPill"> {industry.name} </div>
        </div>
      );
    } else if (index < 5) {
      return (
        <div key={industry.id} className="grayPill">
          {industry.name}
        </div>
      );
    } 
  });

  const skills = props.post.required_skills.map((skill, index) => {
    if (index === 0) {
      return (
        <div id="pillsTitle" key={skill.id}>
          Skills: <div className="greenPill"> {skill.name} </div>
        </div>
      );
    } else if (index < 3) {
      return (
        <div key={skill.id} className="greenPill">
          {skill.name}
        </div>
      );
    } 
  });

  const virtual = (props.post.virtual==true) ? (
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
    <span className="dateText">Starts {`${start.getMonth()}/${start.getDate()}/${start.getFullYear()}`}</span>
  ) : (
    <div />
  );

  const endDate = (end) ? (
    <span className="dateText">Ends {`${end.getMonth()}/${end.getDate()}/${end.getFullYear()}`}</span>
  ) : (
    <div />
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
            <h1 className="postTitle">{ props.post.title}</h1>
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
      {/*<div className="companyInfo">
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
