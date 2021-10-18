/* eslint-disable*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/postings.scss';

const StudentListItem = (props) => {
  const route = `/students/${props.student._id}`
  const affiliationShortener = (aff) => {
    switch (aff) {
      case 'Undergrad':
        return 'UG';
      case 'Tuck':
        return'Tu';
      case 'Thayer':
        return 'Th';
      case 'Geisel':
        return 'Ge';
      case 'Guarini':
        return 'Gu';
      default:
        return '';
    }
  };
  const affiliationGradYear = (
    <h1 className="gradYear">{(props.student.affiliation && props.student.grad_year) ? (
      `${affiliationShortener(props.student.affiliation)}'${props.student.grad_year.substring(2)}`
    ) : (
      (props.student.grad_year) ? (
        `'${props.student.grad_year.substring(2)}`
      ) : (
        <div />
      )
    )}
    </h1>
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

  const classes = props.student.relevant_classes.map((singleClass) => {
    return (
      <div key={singleClass.id} className="pill">
        {singleClass.name}
      </div>
    );
  });
  // maybe combine all these pill methods into one function
  let skillChars = 0;
  const skillCharLimit = (!props.student.bio || props.student.bio.length < 40) ? 60 : 24;
  const skillPillLimit = (!props.student.bio || props.student.bio.length < 40) ? 6 : 3;
  const skills = props.student.skills?.map((skill, index) => {
    skillChars += skill.name.length;
    if (index === 0) {
      return (
        <div id="pillsTitle" key={skill.id}>
          <div className="greenPill" key={skill.id}> {skill.name} </div>
        </div>
      );
    } else if (skillChars <= skillCharLimit && index < skillPillLimit) {
      return (
        <div className="greenPill" key={skill.id}>
          {skill.name}
        </div>
      );
    } else if (index <= skillPillLimit && ((skillChars > skillCharLimit && skillChars - skill.name.length <= skillCharLimit) 
                || (index == skillPillLimit && skillChars <= skillCharLimit))) {
      //console.log(skillChars+"/"+skillCharLimit+" index: "+index)
      return (
        <div className="greenPill" key={skill.id}>
          ...
        </div>
      );
    }
  });
  const activelySearching= (props.student?.job_search_status === 'Active')
  const activeClass = (activelySearching) ? 'activelySearching' : "";
  let industryChars = 0;
  const industryCharLimit = (!props.student.bio || props.student.bio.length < 40) ? 60 : 24;
  const industryPillLimit = (!props.student.bio || props.student.bio.length < 40) ? 6 : 3;
  const industries = props.student.interested_industries?.map((industry, index) => {
    industryChars += industry.name.length;
    if (index === 0) {
      return (
        <div id="pillsTitle" key={industry.id}>
          <div className="yellowPill" key={industry.id}> {industry.name} </div>
        </div>
      );
    } else if (industryChars <= industryCharLimit && index < industryPillLimit) {
      return (
        <div className="yellowPill" key={industry.id}>
          {industry.name}
        </div>
      );
    } else if ( index <= industryPillLimit && ((industryChars > industryCharLimit && industryChars - industry.name.length <= industryCharLimit) 
                || (index == industryPillLimit && industryChars <= industryCharLimit))) {
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
      ''
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

  const activeTimeFrame = (date) => {
    const months = ['', 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Noc', 'Dec']
    const dayTimeStart = props.student.desired_start_date.split("T")
    const dayDataStart = dayTimeStart[0].split("-")
    const dayTimeEnd = props.student.desired_end_date.split("T")
    const dayDataEnd = dayTimeEnd[0].split("-")
    return <p>Actively Searching: <b>{dayDataStart[1]}/{dayDataStart[0]}</b> - <b>{dayDataEnd[1]}/{dayDataEnd[0]}</b></p>
  };
  const activeStatus = () => {
  return (
      <div className={`status ${props.student.job_search_status === 'Active' ? 'activeStatus' : 'inActiveStatus'}`}>
        {props.student.job_search_status === 'Active'
          ? activeTimeFrame()
          :
          'Not currently searching'
        }
      </div>
    )
  }
  return (
    <Link to={route} key={props.student.id} className="listItem link">
      <div className={`postBody ${activeClass}`}>
        <div className="postText">
          {activeStatus()}
          <div className="postHeader">
            <div className="studentNameWrapper">{renderStudentName}</div>
            <div className="gradYearWrapper">{affiliationGradYear}</div>
          </div>
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
