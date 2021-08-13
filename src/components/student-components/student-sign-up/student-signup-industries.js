/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilteredSelect from '../../select';
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
    if (this.state.displayIndustries.length === 0) {
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
  }

  renderAddIndustry() {
    const customStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      <div className="question-fields-items-header">
        <p className="question-fields-title">Industries</p>
        <FilteredSelect
          createable
          className="select-dropdown"
          styles={customStyles}
          name="industries"
          placeholder="Select Industries"
          value={this.state.industry}
          options={this.state.displayIndustries}
          onChange={(selectedOption) => {
            this.state.industry = selectedOption.label;
            this.addIndustry();
          }}
          onCreateOption={(newOption) => {
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
            <div className="question-fields-item" key={industry.name}>
              {industry.name}
              <button type="submit" className="question-fields-button" style={{ cursor: 'pointer' }} onClick={() => { this.deleteIndustry({ industry }); }}>
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
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Industries</h1>
              <p>(Optional) Search/Select the industries you have an interest in!</p>
            </div>
            <i className="fas fa-book-reader question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            {this.renderAddIndustry()}
            <div className="question-fields-items">{this.renderIndustries()}</div>
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
  userID: reduxState.user.userID,
  student: reduxState.students.current_student,
  industries: reduxState.industries.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, fetchAllIndustries, fetchCertainIndustries, createIndustryForStudent,
})(StudentIndustries));
