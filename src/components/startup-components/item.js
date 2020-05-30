/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/postings.scss';

const StudentListItem = (props) => {
  const majors = props.student.majors.length > 1
    ? (
      props.student.majors.map((major, index) => {
        return (
          <div key={index}>
            {major}
          </div>
        );
      })
    ) : (
      <div>
        Major: {props.student.majors[0]}
      </div>
    );

  const industries = props.student.interested_industries.map((industry, index) => {
    return (
      <div key={index} className="pill">
        industry will go here
      </div>
    );
  });


  const classes = props.student.relevant_classes.map((relClass, index) => {
    return (
      <div key={index} className="pill">
        class will go here
      </div>
    );
  });

  const skills = props.student.skills.map((skill, index) => {
    return (
      <div key={index} className="pill">
        skills
      </div>
    );
  });

  const route = `/students/${props.student._id}`;

  return (
    <Link to={route} key={props.student.id} className="listItem link">
      <div className="basicInfo">
        <h1 className="studentName">{`${props.student.first_name} ${props.student.last_name}`} </h1>
        <h2 className="gradYear">Class of {props.student.grad_year} </h2>
        <h2 className="major"> {majors} </h2>
      </div>
      <div className="extraInfo">
        <h3> Interests: { industries} </h3>
        <h3>Classes: { classes } </h3>
        <h3> Skills: {skills} </h3>
      </div>
    </Link>
  );
};

export default StudentListItem;
