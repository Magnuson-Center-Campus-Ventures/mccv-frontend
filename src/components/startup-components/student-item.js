/* eslint-disable array-callback-return */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */

/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchCertainClasses, fetchCertainIndustries, fetchCertainSkills,
} from '../../actions';
import '../../styles/postings.scss';

class StudentListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      skills: [],
      industries: this.props.industries,
    };
  }

  componentDidMount() {
    this.props.fetchCertainClasses(this.props.student.relevant_classes);
    this.props.fetchCertainIndustries(this.props.student.interested_industries);
    this.props.fetchCertainSkills(this.props.student.skills);
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevProps !== undefined) {
  //       if (prevProps.skills !== this.props.skills) {
  //         this.props.skills.map((skill) => {
  //           this.setState(() => ({
  //             skills: [...prevState.skills, skill.name],
  //           }));
  //         });
  //       }
  //     }
  //   }


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
    return this.props.interested_industries.map((relClass, index) => {
      return (
        <div key={index} className="pill">
          industry will go here
        </div>
      );
    });
  }

  renderClasses() {
    return this.props.relevant_classes.map((relClass, index) => {
      return (
        <div key={index} className="pill">
          class will go here
        </div>
      );
    });
  }

  renderSkills() {
    console.log(this.state.skills);
    if (this.state.skills.length > 0) {
      return this.state.skills.map((skill, index) => {
        // console.log(skill);
        return (
          <div key={index} className="pill">
            {skill}
          </div>
        );
      });
    } else {
      return (<div />);
    }
  }


  render() {
    const route = `/students/${this.props.student._id}`;
    // console.log(this.props.student);
    // console.log('rerendering');
    return (
      <Link to={route} key={this.props.student.id} className="listItem link">
        <div className="basicInfo">
          <h1 className="studentName">{`${this.props.student.first_name} ${this.props.student.last_name}`} </h1>
          <h2 className="gradYear">Class of {this.props.student.grad_year} </h2>
          <h2 className="major"> {this.renderMajors()} </h2>
        </div>
        <div className="extraInfo">
          {/* <h3> Interests: {this.renderIndustries()} </h3>
          <h3>Classes: {this.renderClasses() } </h3> */}
          <h3> Skills: {this.renderSkills()} </h3>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  classes: reduxState.classes.current,
  industries: reduxState.industries.current,
  skills: reduxState.skills.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchCertainClasses, fetchCertainIndustries, fetchCertainSkills,
})(StudentListItem));
