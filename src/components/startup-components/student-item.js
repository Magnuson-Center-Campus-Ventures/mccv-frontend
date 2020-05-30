/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { intIndustriesByID, classesByID, skillsByID } from '../../services/datastore';

import '../../styles/postings.scss';

class StudentListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      skills: [],
      industries: [],
    };
  }

  componentDidMount() {
    intIndustriesByID(this.props.student.interested_industries, (industry) => {
      this.setState((prevState) => ({
        industries: [...prevState.industries, industry.name],
      }));
    });
    classesByID(this.props.student.relevant_classes, (singleClass) => {
      this.setState((prevState) => ({
        classes: [...prevState.classes, singleClass.name],
      }));
    });
    skillsByID(this.props.student.skills, (skill) => {
      this.setState((prevState) => ({
        skills: [...prevState.skills, skill.name],
      }));
    });
  }

  renderMajors() {
    return this.props.student.majors.length > 1
      ? (
        this.props.student.majors.map((major, index) => {
          return (
            <div key={index}>
              {major}
            </div>
          );
        })
      ) : (
        <div>
          Major: {this.props.student.majors[0]}
        </div>
      );
  }

  renderIndustries() {
    return this.state.industries.map((industry, index) => {
      return (
        <div key={index} className="pill">
          {industry}
        </div>
      );
    });
  }

  renderClasses() {
    return this.state.classes.map((singleClass, index) => {
      return (
        <div key={index} className="pill">
          {singleClass}
        </div>
      );
    });
  }

  renderSkills() {
    return this.state.skills.map((skill, index) => {
      return (
        <div key={index} className="pill">
          {skill}
        </div>
      );
    });
  }

  render() {
    const route = `/students/${this.props.student._id}`;

    return (
      <Link to={route} key={this.props.student.id} className="listItem link">
        <div className="basicInfo">
          <h1 className="studentName">{`${this.props.student.first_name} ${this.props.student.last_name}`} </h1>
          <h2 className="gradYear">Class of {this.props.student.grad_year} </h2>
          <h2 className="major"> {this.renderMajors()} </h2>
        </div>
        <div className="extraInfo">
          <h3> Interests: {this.renderIndustries()} </h3>
          <h3>Classes: {this.renderClasses() } </h3>
          <h3> Skills: {this.renderSkills()} </h3>
        </div>
      </Link>
    );
  }
}

// const mapStateToProps = (reduxState) => ({
//   classes: reduxState.classes.current,
//   industries: reduxState.industries.current,
//   skills: reduxState.skills.current,
//   allClasses: reduxState.classes.all,
//   allInd: reduxState.industries.all,
//   allSkills: reduxState.skills.all,
// });

// export default withRouter(connect(mapStateToProps, {
//   fetchCertainClasses, fetchCertainIndustries, fetchCertainSkills, fetchAllClasses, fetchAllIndustries, fetchAllSkills,
// })(StudentListItem));

export default StudentListItem;
