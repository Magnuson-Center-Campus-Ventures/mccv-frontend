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
              {`Major in ${major}`}
            </span>
          );
        } else if (index === 1){
          return (
            <span key={index} className="major">{`, ...`}</span>
          );
        }
      })
    ) : (
      <span className="major">Major Undeclared</span>
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
          Skills: <div className="greenPill" key={skill.id}> {skill.name} </div>
        </div>
      );
    } else if (index < 5){
      return (
        <div className="greenPill" key={skill.id}>
          {skill.name}
        </div>
      );
    } else if (index === 5) {
      return (
        <div className="greenPill" key={skill.id}>
          ...
        </div>
      );
    }
  });

  const industries = props.student.interested_industries?.map((industry, index) => {
    if (index === 0) {
      return (
        <div id="pillsTitle" key={industry.id}>
          Industries: <div className="yellowPill" key={industry.id}> {industry.name} </div>
        </div>
      );
    } else if (index < 5) {
      return (
        <div className="yellowPill" key={industry.id}>
          {industry.name}
        </div>
      );
    } else if (index === 5) {
      return (
        <div className="yellowPill" key={industry.id}>
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

  const route = `/students/${props.student._id}`;

  return (
    <Link to={route} key={props.student.id} className="listItem link">
      <div className="postBody">
        <div className="postText">
          {renderStudentName}
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
