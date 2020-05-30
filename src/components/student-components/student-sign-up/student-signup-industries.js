/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import '../../../styles/student-sign-up/student-signup-industries.scss';
import {
  fetchStudentByUserID, fetchUser, updateStudent,
  fetchAllIndustries, fetchCertainIndustries, createIndustry,
} from '../../../actions';

class StudentIndustries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      industry: '',
      nameIndustries: [],
      allIndustryOptions: [],
      // newIndustries: [],
    };

    this.onIndustryChange = this.onIndustryChange.bind(this);
    this.deleteIndustry = this.deleteIndustry.bind(this);
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchAllIndustries();
    this.props.fetchStudentByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.student !== {} && prevProps.student !== this.props.student) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ student: this.props.student });
    }
    if (prevProps.student.interested_industries !== this.props.student.interested_industries) {
      this.props.student.interested_industries.forEach((industryID) => {
        const name = this.getIndustryName(industryID);
        if (!this.state.nameIndustries.includes(name)) {
          this.state.nameIndustries.push(name);
        }
      });
    }
    if (prevProps.student.interested_industries !== this.props.student.interested_industries) {
      // Set up options for dropdown
      const allIndustryOptions = this.props.industries.all.map((industry) => {
        return { value: industry.name, label: industry.name, industry };
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ allIndustryOptions });
    }
  }

  // not done
  //  onSubmit = () => {
  //    this.props.updateStudent(this.state.student.id, this.state.student);
  //    this.state.newIndustries.forEach((industry) => this.props.createIndustry(industry));
  //    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  //  }

  onIndustryChange(event) {
    this.setState({
      industry: event.target.value,
    });
  }

  getIndustryName(id) {
    const industryObject = this.props.industries.all.find((industry) => {
      return (industry.id === id);
    });
    return industryObject.name;
  }

   addIndustry = () => {
     if (!this.state.nameIndustries.includes(this.state.industry)) {
       this.state.nameIndustries.push(this.state.industry);
     }
     this.state.industry = '';
     this.forceUpdate();
   }

    deleteIndustry = (industry) => {
      const industries = this.state.nameIndustries.filter((value) => {
        return (value !== industry.industry);
      });
      this.state.nameIndustries = industries;
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
            options={this.state.allIndustryOptions}
            onChange={(selectedOption) => {
              this.state.industry = selectedOption.value;
              this.addIndustry();
            }}
            onCreateOption={(newOption) => {
              this.state.industry = newOption;
              this.addIndustry();
            }}
          />
        </div>
      );
    }

    renderIndustries() {
      return (
        this.state.nameIndustries.map((industry) => {
          return (
            <div className="industry" key={industry}>
              <div className="text">
                {industry}
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
      // still have occasioanl rendering issue for industries.all
      if (this.state.student.interested_industries !== undefined && this.props.industries.all !== []) {
        return (
          <div className="StudentIndustryContainer">
            <div className="StudentIndustryHeaderContainer">
              <h1 className="StudentIndustryHeader">
                Interested Industries
              </h1>
            </div>
            <div className="StudentIndustryDescContainer">
              <p className="StudentIndustryDesc">
                Add the industries you are interested in!
              </p>
              <i className="fas fa-building" id="icon" />
            </div>
            <div id="industries">
              <div className="StudentIndustryListHeader">Industries</div>
              {this.renderAddIndustry()}
              {this.renderIndustries()}
            </div>
            <div className="buttonContainer">
              <button type="submit" className="submit-btn-student-timing" style={{ cursor: 'pointer' }} onClick={this.onSubmit}>
                Submit!
              </button>
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
  fetchStudentByUserID, fetchUser, updateStudent, fetchAllIndustries, fetchCertainIndustries, createIndustry,
})(StudentIndustries));
