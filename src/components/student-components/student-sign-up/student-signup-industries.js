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
      displayIndustries: [],
      allIndustries: [],
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
    }
    if (prevProps.industries !== this.props.industries) {
      const industries = this.props.industries.all.map((industry) => {
        return { value: industry.name, label: industry.name, industry };
      });
      this.state.allIndustries = industries;
      const displayIndustries = this.state.allIndustries.filter((value) => {
        return !this.props.student.interested_industries.includes(this.getIndustry(value.value));
      });
      this.state.displayIndustries = displayIndustries;
    }
  }

  getIndustry(name) {
    const industryObject = this.props.industries.all.find((industry) => {
      return (industry.name === name);
    });
    return industryObject;
  }

  addIndustryDB = () => {
    if (!this.state.allIndustries.includes(this.state.industry)) {
      this.props.createIndustryForStudent({ name: this.state.industry });
    }
    this.props.fetchAllIndustries();
  }

  addIndustry = () => {
    if (!this.props.student.interested_industries.includes(this.getIndustry(this.state.industry))) {
      this.props.student.interested_industries.push(this.getIndustry(this.state.industry));
    }
    const displayIndustries = this.state.allIndustries.filter((value) => {
      return !this.props.student.interested_industries.includes(this.getIndustry(value.value));
    });
    this.state.displayIndustries = displayIndustries;
    this.state.industry = '';
    this.forceUpdate();
  }

  deleteIndustry = (industry) => {
    const industries = this.props.student.interested_industries.filter((value) => {
      return (value !== industry.industry);
    });
    this.props.student.interested_industries = industries;
    const displayIndustries = this.state.allIndustries.filter((value) => {
      return !this.props.student.interested_industries.includes(this.getIndustry(value.value));
    });
    this.state.displayIndustries = displayIndustries;
    this.forceUpdate();
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
          options={this.state.displayIndustries}
          onChange={(selectedOption) => {
            this.state.industry = selectedOption.value;
            this.addIndustry();
          }}
          onCreateOption={(newOption) => {
            this.state.industry = newOption;
            this.addIndustryDB();
            this.addIndustry();
          }}
        />
      </div>
    );
  }

  renderIndustries() {
    return (
      this.props.student.interested_industries.map((industry) => {
        return (
          <div className="industry" key={industry.id}>
            <div className="text">
              {industry.name}
            </div>
            <button type="submit" className="delete-btn-student-industries" style={{ cursor: 'pointer' }} onClick={() => { this.deleteIndustry({ industry }); }}>
              <i className="far fa-trash-alt" id="icon" />
            </button>
          </div>
        );
      })
    );
  }

  render() {
    if (this.state.student.interested_industries !== undefined && this.props.industries.all !== []) {
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
  industries: reduxState.industries,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudentByUserID, fetchUser, fetchAllIndustries, fetchCertainIndustries, createIndustryForStudent,
})(StudentIndustries));
