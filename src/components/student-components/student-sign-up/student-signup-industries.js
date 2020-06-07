/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import '../../../styles/student-sign-up/student-signup-industries.scss';
import {
  fetchStudentByUserID, fetchUser,
  fetchAllIndustries, fetchCertainIndustries, createIndustryForStudent,
} from '../../../actions';

class StudentIndustries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      industry: '',
      selectedIndustries: [],
      displayIndustries: [],
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchAllIndustries();
    this.props.fetchStudentByUserID(this.props.userID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ student: this.props.student });
      this.populateCurrentIndustries();
    }
  }

  getIndustry(name) {
    const industryObject = this.props.industries.find((industry) => {
      return (industry.name === name);
    });
    return industryObject;
  }

  addIndustry = () => {
    if (!this.props.student.interested_industries.includes(this.getIndustry(this.state.industry))) {
      this.props.student.interested_industries.push(this.getIndustry(this.state.industry));
    }
    this.state.displayIndustries = this.state.displayIndustries.filter((value) => {
      return (value.label !== this.state.industry);
    });
    this.state.industry = '';
    this.forceUpdate();
  }

  deleteIndustry = (industry) => {
    this.props.student.interested_industries = this.props.student.interested_industries.filter((value) => {
      return (value !== industry.industry);
    });
    this.state.displayIndustries.push({ label: industry.industry.name });
    this.forceUpdate();
  }

  populateCurrentIndustries() {
    this.props.student.interested_industries.forEach((value) => {
      if (!this.state.selectedIndustries.includes(value.name)) {
        this.state.selectedIndustries.push(value.name);
      }
    });
    this.props.industries.forEach((value) => {
      if (!this.state.selectedIndustries.includes(value.name)) {
        this.state.displayIndustries.push({ label: value.name });
      }
    });
  }

  renderAddIndustry() {
    const customStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      <div className="add-industries">
        <CreateableSelect
          className="select-dropdown"
          styles={customStyles}
          name="industries"
          value={this.state.industry}
          options={this.state.displayIndustries}
          onChange={(selectedOption) => {
            this.state.industry = selectedOption.label;
            this.addIndustry();
          }}
          onCreateOption={(newOption) => {
            this.state.industry = newOption;
            this.state.industry = newOption;
            this.props.createIndustryForStudent({ name: newOption }, this.props.student);
          }}
        />
      </div>
    );
  }

  renderIndustries() {
    if (this.props.student?.interested_industries) {
      return (
        this.props.student.interested_industries.map((industry) => {
          return (
            <div className="industry" key={industry.name}>
              {industry.name}
              <button type="submit" className="delete-btn-student-industries" style={{ cursor: 'pointer' }} onClick={() => { this.deleteIndustry({ industry }); }}>
                <i className="far fa-trash-alt" id="icon" />
              </button>
            </div>
          );
        })
      );
    } else {
      return (
        <div>Loading</div>
      );
    }
  }

  render() {
    if (this.state.student.interested_industries !== undefined && this.props.industries !== []) {
      return (
        <div className="StudentIndustryContainer">
          <div className="StudentIndustryHeaderContainer">
            <h1 className="StudentIndustryHeader">
              Industries
            </h1>
          </div>
          <div className="StudentIndustryDescContainer">
            <p className="StudentIndustryDesc">
              Add the industries you have!
            </p>
            <i className="fas fa-brain" id="icon" />
          </div>
          <div id="industries">
            <div className="StudentIndustryListHeader">Industries</div>
            {this.renderAddIndustry()}
            {this.renderIndustries()}
          </div>
        </div>
      );
    } else {
      return (
        <div>loading</div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  student: reduxState.students.current_student,
  industries: reduxState.industries.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, fetchAllIndustries, fetchCertainIndustries, createIndustryForStudent,
})(StudentIndustries));
