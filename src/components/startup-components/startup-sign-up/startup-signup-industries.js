/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import '../../../styles/startup-sign-up/startup-signup-industries.scss';
import {
  fetchStartupByUserID, fetchUser,
  fetchAllIndustries, fetchCertainIndustries, createIndustry, createIndustryForStartup, updateStartup,
} from '../../../actions';

class StartupIndustries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startup: {},
      industry: '',
      displayIndustries: [],
      allIndustries: [],
      ownIndustries: [],
      allIndustryOptions: [],
      selectedIndustryOptions: [],
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchAllIndustries();
    this.props.fetchStartupByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.startup !== {} && prevProps.startup !== this.props.startup) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ startup: this.props.startup, ownIndustries: this.props.startup.industries });
    }
    if (prevProps.industries !== this.props.industries) {
      const industries = this.props.industries.all.map((industry) => {
        return { value: industry.name, label: industry.name, industry };
      });
      this.state.allIndustries = industries;
      const displayIndustries = this.state.allIndustries.filter((value) => {
        return !this.props.startup.industries.includes(this.getIndustry(value.value));
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

  getIndustryName(id) {
    const industryObject = this.props.industries.all.find((industry) => {
      return (industry.id === id);
    });
    return industryObject.name;
  }

  addIndustryDB = () => {
    if (!this.state.allIndustries.includes(this.state.industry)) {
      this.props.createIndustry({ name: this.state.industry });
    }
    this.props.fetchAllIndustries();
  }

  addIndustry = () => {
    if (!this.props.startup.industries.includes(this.getIndustry(this.state.industry))) {
      this.props.startup.industries.push(this.getIndustry(this.state.industry));
    }
    const displayIndustries = this.state.allIndustries.filter((value) => {
      return !this.props.startup.industries.includes(this.getIndustry(value.value));
    });
    this.state.displayIndustries = displayIndustries;
    this.state.industry = '';
    this.forceUpdate();
  }

  deleteIndustry = (industry) => {
    const industries = this.props.startup.industries.filter((value) => {
      return (value !== industry.industry);
    });
    this.props.startup.industries = industries;
    const displayIndustries = this.state.allIndustries.filter((value) => {
      return !this.props.startup.industries.includes(this.getIndustry(value.value));
    });
    this.state.displayIndustries = displayIndustries;
    this.forceUpdate();
  }

  renderPills = (pillsArray) => {
    console.log(pillsArray);
    if (pillsArray) {
      return pillsArray.map((elem, index) => {
        console.log(elem);
        console.log(elem.name);
        return <div key={index} className="profile-pill">{elem.label}</div>;
      });
    } else return null;
  }

  changeStartupField = (field, value) => {
    // eslint-disable-next-line prefer-destructuring
    // const value = event.target.value;

    this.setState((prevState) => {
      const startup = { ...prevState.startup };
      startup[field] = value;
      this.props.updateStartup(this.props.startup.id,
        Object.assign(this.props.startup, startup));
      return {
        ...prevState,
        startup,
      };
    });
    this.props.updateStartup(this.props.startup.id, this.state.startup);
  }

  renderAddIndustry() {
    const dropdownStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      <div className="add-industries">
        {/* <CreateableSelect
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
        /> */}
        <CreateableSelect
          className="select-dropdown"
          isMulti
          styles={dropdownStyles}
          name="industries"
          value={this.state.selectedIndustryOptions}
          options={this.state.displayIndustries}
          onChange={(selectedOptions) => {
            const tempIndustries = selectedOptions
              ? selectedOptions.map((option) => option.industry)
              : [];
            console.log(this.state.startup);
            this.props.updateStartup(this.props.startup.id, this.state.startup);
            this.setState((prevState) => {
              const startup = { ...prevState.startup };
              startup.industries = tempIndustries;
              console.log(startup.industries);
              // this.props.updateStartup(this.props.startup.id,
              //   Object.assign(startup, { industries: selectedOptions }));
              return {
                ...prevState,
                selectedIndustryOptions: selectedOptions,
                ownIndustries: tempIndustries,
                startup,
              };
            });
            this.changeStartupField('industries', selectedOptions);
          }}
          onCreateOption={(newOption) => {
            this.props.createIndustryForStartup({ name: newOption }, this.state.startup);
          }}
        />
      </div>
    );
  }

  renderIndustries() {
    return (
      this.props.startup.industries.map((industry) => {
        return (
          <div className="industry" key={industry.id}>
            <div className="text">
              {industry.name}
            </div>
            <button type="submit" className="delete-btn-startup-industries" style={{ cursor: 'pointer' }} onClick={() => { this.deleteIndustry({ industry }); }}>
              <i className="far fa-trash-alt" id="icon" />
            </button>
          </div>
        );
      })
    );
  }

  render() {
    if (this.state.startup.industries !== undefined && this.props.industries.all !== []) {
      return (
        <div className="StartupIndustryContainer">
          <div className="StartupIndustryHeaderContainer">
            <h1 className="StartupIndustryHeader">
              Industries
            </h1>
          </div>
          <div className="StartupIndustryDescContainer">
            <p className="StartupIndustryDesc">
              What industries characterize your startup?
            </p>
            <i className="fas fa-brain" id="icon" />
          </div>
          <div id="industries">
            <div className="StartupIndustryListHeader">Industries</div>
            {this.renderAddIndustry()}
            {this.renderPills(this.state.ownIndustries)}
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
  startup: reduxState.startups.current,
  industries: reduxState.industries,
  allIndustries: reduxState.industries.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchStartupByUserID, fetchUser, fetchAllIndustries, fetchCertainIndustries, createIndustry, createIndustryForStartup, updateStartup,
})(StartupIndustries));
