// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable react/no-array-index-key */
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import CreateableSelect from 'react-select/creatable';
// import '../../../styles/startup-sign-up/startup-signup-industries.scss';
// import {
//   fetchStartupByUserID, fetchUser, updateStartup,
//   fetchAllIndustries, fetchCertainIndustries, createIndustry, fetchStartup,
// } from '../../../actions';

// class StartupIndustries extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       startup: {},
//       industry: '',
//       nameIndustries: [],
//       allIndustryOptions: [],
//       // newIndustries: [],
//     };

//     this.onIndustryChange = this.onIndustryChange.bind(this);
//     this.deleteIndustry = this.deleteIndustry.bind(this);
//   }

//   // Get profile info
//   componentDidMount() {
//     this.props.fetchAllIndustries();
//     // this.props.fetchStartupByUserID(this.props.userID);
//     // this.props.fetchUser(this.props.userID);
//     // this.props.fetchStartup(this.props.match.params.startupID);
//     this.props.fetchStartupByUserID(this.props.userID);
//     this.props.fetchUser(this.props.userID);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.startup !== {} && prevProps.startup !== this.props.startup) {
//       // eslint-disable-next-line react/no-did-update-set-state
//       this.setState({ startup: this.props.startup });
//     }
//     if (prevProps.startup.industries !== this.props.startup.industries) {
//       this.props.startup.industries.forEach((industryID) => {
//         const name = this.getIndustryName(industryID);
//         if (!this.state.nameIndustries.includes(name)) {
//           this.state.nameIndustries.push(name);
//         }
//       });
//     }
//     if (prevProps.startup.industries !== this.props.startup.industries) {
//       // Set up options for dropdown
//       const allIndustryOptions = this.props.industries.all.map((industry) => {
//         return { value: industry.name, label: industry.name, industry };
//       });
//       // eslint-disable-next-line react/no-did-update-set-state
//       this.setState({ allIndustryOptions });
//     }
//   }

//   // not done
//   //  onSubmit = () => {
//   //    this.props.updateStartup(this.state.startup.id, this.state.startup);
//   //    this.state.newIndustries.forEach((industry) => this.props.createIndustry(industry));
//   //    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
//   //  }

//   onIndustryChange(event) {
//     this.setState({
//       industry: event.target.value,
//     });
//   }

//   getIndustryName(id) {
//     const industryObject = this.props.industries.all.find((industry) => {
//       return (industry.id === id);
//     });
//     return industryObject.name;
//   }

//    addIndustry = () => {
//      if (!this.state.nameIndustries.includes(this.state.industry)) {
//        this.state.nameIndustries.push(this.state.industry);
//      }
//      this.state.industry = '';
//      this.forceUpdate();
//    }

//     deleteIndustry = (industry) => {
//       const industries = this.state.nameIndustries.filter((value) => {
//         return (value !== industry.industry);
//       });
//       this.state.nameIndustries = industries;
//       this.forceUpdate();
//     }

//     renderAddIndustry() {
//       const customStyles = {
//         control: (base) => ({
//           ...base,
//           width: 200,
//         }),
//       };
//       return (
//         <div className="add-industries">
//           <CreateableSelect
//             className="select-dropdown"
//             styles={customStyles}
//             name="industries"
//             options={this.state.allIndustryOptions}
//             onChange={(selectedOption) => {
//               this.state.industry = selectedOption.value;
//               this.addIndustry();
//             }}
//             onCreateOption={(newOption) => {
//               this.state.industry = newOption;
//               this.addIndustry();
//             }}
//           />
//         </div>
//       );
//     }

//     renderIndustries() {
//       return (
//         this.state.nameIndustries.map((industry) => {
//           return (
//             <div className="industry" key={industry}>
//               <div className="text">
//                 {industry}
//               </div>
//               <button type="submit" className="delete-btn-startup-industries" style={{ cursor: 'pointer' }} onClick={() => { this.deleteIndustry({ industry }); }}>
//                 <i className="far fa-trash-alt" id="icon" />
//               </button>
//             </div>
//           );
//         })
//       );
//     }

//     render() {
//       // still have occasioanl rendering issue for industries.all
//       if (this.state.startup.industries !== undefined && this.props.industries.all !== []) {
//         return (
//           <div className="StartupIndustryContainer">
//             <div className="StartupIndustryHeaderContainer">
//               <h1 className="StartupIndustryHeader">
//                 Industries
//               </h1>
//             </div>
//             <div className="StartupIndustryDescContainer">
//               <p className="StartupIndustryDesc">
//                 What industries characterize your startup?
//               </p>
//               <i className="fas fa-building" id="icon" />
//             </div>
//             <div id="industries">
//               <div className="StartupIndustryListHeader">Industries</div>
//               {this.renderAddIndustry()}
//               {this.renderIndustries()}
//             </div>
//             <div className="buttonContainer">
//               <button type="submit" className="submit-btn-startup-timing" style={{ cursor: 'pointer' }} onClick={this.onSubmit}>
//                 Submit!
//               </button>
//             </div>
//           </div>
//         );
//       } else {
//         return (
//           <div>loading</div>
//         );
//       }
//     }
// }

// const mapStateToProps = (reduxState) => ({
//   userID: reduxState.auth.userID,
//   startup: reduxState.startups.current,
//   industries: reduxState.industries,
// });

// export default withRouter(connect(mapStateToProps, {
//   fetchStartupByUserID, fetchUser, updateStartup, fetchAllIndustries, fetchCertainIndustries, createIndustry, fetchStartup,
// })(StartupIndustries));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import '../../../styles/startup-sign-up/startup-signup-industries.scss';
import {
  fetchStartupByUserID, fetchUser,
  fetchAllIndustries, fetchCertainIndustries, createIndustry,
} from '../../../actions';

class StartupIndustries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startup: {},
      industry: '',
      displayIndustries: [],
      allIndustries: [],
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
      this.setState({ startup: this.props.startup });
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
              Add the industries you have!
            </p>
            <i className="fas fa-brain" id="icon" />
          </div>
          <div id="industries">
            <div className="StartupIndustryListHeader">Industries</div>
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
  startup: reduxState.startups.current,
  industries: reduxState.industries,
});

export default withRouter(connect(mapStateToProps, {
  fetchStartupByUserID, fetchUser, fetchAllIndustries, fetchCertainIndustries, createIndustry,
})(StartupIndustries));
