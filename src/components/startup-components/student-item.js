/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/postings.scss';

const StudentListItem = (props) => {
  const affiliationGradYear = (props.student.affiliation && props.student.grad_year) ? (
    <h2 className="gradYear">{`Class of ${props.student.grad_year} (${props.student.affiliation.charAt(0).toUpperCase() + 
      props.student.affiliation.slice(1)})`} </h2>
  ) : (
    (props.student.grad_year) ? (
      <h2 className="gradYear">{`Class of ${props.student.grad_year}`} </h2>
    ) : (
      <div/>
    )
  );

  const majors = props.student.majors.length > 0
    ? (
      props.student.majors.map((major, index) => {
        if (index === 0) {
          return (
            <span key={index} className="major">
              {`Major: ${major}`}
            </span>
          );
        } else if (index === 1){
          return (
            <span key={index} className="major">{`, ...`}</span>
            /*<span key={index} className="major">
              {`, ${major}`}
            </span>*/
          );
        }
      })
    ) : (
      <span className="major">Major Undecided</span>
    );

  const classes = props.student.relevant_classes.map((singleClass) => {
    return (
      <div key={singleClass.id} className="pill">
        {singleClass.name}
      </div>
    );
  });

  const skills = props.student.skills?.map((skill, index) => {
    if (index === 0) {
      return (
        <div id="pillsTitle" key={skill.id}>
          Skills: <div className="greenPill"> {skill.name} </div>
        </div>
      );
    } else if (index < 5){
      return (
        <div key={skill.id} className="greenPill">
          {skill.name}
        </div>
      );
    } else if (index === 5) {
      return (
        <div key={skill.id} className="greenPill">
          ...
        </div>
      );
    }
  });

  const industries = props.student.interested_industries?.map((industry, index) => {
    if (index === 0) {
      return (
        <div id="pillsTitle" key={industry.id}>
          Industries: <div className="yellowPill"> {industry.name} </div>
        </div>
      );
    } else if (index < 5) {
      return (
        <div key={industry.id} className="yellowPill">
          {industry.name}
        </div>
      );
    } else if (index === 5) {
      return (
        <div key={industry.id} className="yellowPill">
          ...
        </div>
      );
    }
  });

  const renderBio = (props.student.bio?.length > 100) ? (
    <div className="postInfo">
      <p className="bioText">{`${props.student.bio.substring(0, 99)}...`}</p>
    </div>
  ) : (
    (props.student.bio) ? (
      <div className="postInfo">
        <p className="bioText">{props.student.bio}</p>
      </div>
    ) : (
      <div className="postSpace"/>
    )
  );

  const route = `/students/${props.student._id}`;

  return (
    <Link to={route} key={props.student.id} className="listItem link">
      <div className="postBody">
        <div className="postText">
          <h1 className="studentName">{`${props.student.first_name} ${props.student.last_name}`} </h1>
          {affiliationGradYear}
          <div className="majorWrapper">
            {majors}
          </div>
          {renderBio}
          <div className="pillsList">
            {skills}
          </div>
          <div className="pillsList">
            {industries}
          </div>
        </div>
      </div>
    </Link>
  );
};


export default StudentListItem;
