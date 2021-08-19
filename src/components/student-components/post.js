/* eslint-disable react/button-has-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { DateRange } from 'react-date-range';
import {
  fetchPost, updatePost, 
  fetchUser, fetchStartup,
  fetchAllIndustries, fetchAllClasses, fetchAllSkills,
  createIndustryForPost, createReqSkillForPost, createPrefSkillForPost, createClassForPost,
} from '../../actions';
import Application from './student-modals/application';
import Archive from '../admin-modals/archive';
import Revise from '../admin-modals/revise';
import FilteredSelect from '../select';
import pin from '../../../static/img/pin.png';
import '../../styles/post.scss';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      applyShow: false,
      archiveShow: false,
      reviseShow:false,
      isEditing: false,
      ownIndustries: [],
      ownReqSkills: [],
      ownPrefSkills: [],
      ownClasses: [],
      allIndustryOptions: [],
      selectedIndustryOptions: [],
      allSkillOptions: [],
      selectedPrefSkillOptions: [],
      selectedReqSkillOptions: [],
      allClassOptions: [],
      selectedClassOptions: [],
      start: new Date(),
      end: new Date(),
      validDate: true,
      newResponsibility: '',
      newQuestion: '',
      showApproveError: false, 
    };
    this.showApplyModal = this.showApplyModal.bind(this);
    this.hideApplyModal = this.hideApplyModal.bind(this);
    this.showArchiveModal = this.showArchiveModal.bind(this);
    this.hideArchiveModal = this.hideArchiveModal.bind(this);
    this.showReviseModal = this.showReviseModal.bind(this);
    this.hideReviseModal = this.hideReviseModal.bind(this);
    this.approvePost = this.approvePost.bind(this);
  } 

  componentDidMount() {
    if (window.location.search == '?edit') {
      this.state.isEditing = true;
    }
    this.props.fetchPost(this.props.match.params.postID);
    this.props.fetchUser(localStorage.getItem('userID'));
    this.props.fetchAllIndustries();
    this.props.fetchAllSkills();
    this.props.fetchAllClasses();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post && this.props.post !== {} && prevProps.post !== this.props.post) {
      this.props.fetchStartup(this.props.post.startup_id.id);
      // Set initial dropdown options to be the indutries, skills, and classes the post already has
      let selectedIndustryOptions = [];
      if (this.props.post.industries) {
        selectedIndustryOptions = this.props.post.industries.map((industry) => {
          return { value: industry.name, label: industry.name, industry };
        }); 
      }
      let selectedClassOptions = [];
      if (this.props.post.desired_classes) {
        selectedClassOptions = this.props.post.desired_classes.map((_class) => {
          return { value: _class.name, label: _class.name, _class };
        });
      }
      let selectedReqSkillOptions = [];
      if (this.props.post.required_skills) {
        selectedReqSkillOptions = this.props.post.required_skills.map((skill) => {
          return { value: skill.name, label: skill.name, skill };
        });
      }
      let selectedPrefSkillOptions = [];
      if (this.props.post.preferred_skills) {
        selectedPrefSkillOptions = this.props.post.preferred_skills.map((skill) => {
          return { value: skill.name, label: skill.name, skill };
        });
      }

      this.setState({
        post: this.props.post,
        responsibilities: this.props.post.responsibilities,
        questions: this.props.post.questions,
        ownIndustries: this.props.post.industries,
        ownClasses: this.props.post.desired_classes,
        ownPrefSkills: this.props.post.preferred_skills,
        ownReqSkills: this.props.post.required_skills,
        selectedIndustryOptions,
        selectedClassOptions,
        selectedPrefSkillOptions,
        selectedReqSkillOptions,
      });
    }

    // Set up options for dropdowns
    if (prevProps.allIndustries !== this.props.allIndustries) {
      const allIndustryOptions = this.props.allIndustries.map((industry) => {
        return { value: industry.name, label: industry.name, industry };
      });
      this.setState({ allIndustryOptions });
    }
    if (prevProps.allClasses !== this.props.allClasses) {
      const allClassOptions = this.props.allClasses.map((_class) => {
        return { value: _class.name, label: _class.name, _class };
      });
      this.setState({ allClassOptions });
    }
    if (prevProps.allSkills !== this.props.allSkills) {
      const allSkillOptions = this.props.allSkills.map((skill) => {
        return { value: skill.name, label: skill.name, skill };
      });
      this.setState({ allSkillOptions });
    }
  }

  // onArchive(id, post) {
  //   this.props.updatePost(id, post);
  // }

  showApplyModal = (e) => {
    this.setState({
      applyShow: true,
    });
    window.scrollTo(0, 0);
  };

  showArchiveModal = (e) => {
    this.setState({
      archiveShow: true,
    });
    window.scrollTo(0, 0);
  }

  showReviseModal = (e) => {
    this.setState({
      reviseShow:true,
    });
    window.scrollTo(0,0)
  }

  hideApplyModal = (e) => {
    this.setState({
      applyShow: false,
    });
  }

  hideArchiveModal = (e) => {
    this.setState({
      archiveShow: false,
    });
  }

  hideReviseModal = (e) => {
    this.setState({
      reviseShow: false,
    });
  }

  changePostField = (field, event) => {
    const value = event.target.value;
    this.setState((prevState) => {
      prevState.post[field] = value;
      return {
        ...prevState,
      };
    });
  }

  changeCheckboxField = (field, event) => {
    const checked = event.target.checked;

    this.setState((prevState) => {
      const post = { ...prevState.post };
      post[field] = checked;
      return {
        ...prevState,
        post,
      };
    });
  }

  submit = () => {
    if (this.state.isEditing) {
      console.log("R")
      this.checkDateRange();
      if (this.state.validDate == true) {
        // this.props.post = this.state.post;
        if (this.props.user.role === "admin") this.showReviseModal()
        else this.props.updatePost(this.state.post.id, this.state.post);
      }
    } else {
      this.setState({ isEditing: true });
    }
    window.scrollTo(0, 0);
    this.forceUpdate();
  }

  discard = () => {
    this.setState({isEditing:false})
    this.props.fetchPost(this.props.match.params.postID);
  }

  /*requiredSkillsHelper= () => {
    const requiredSkills = [];
    if (this.props.post?.required_skills) {
      for (const [index, value] of this.props.post.required_skills.entries()) {
        requiredSkills.push(
          // eslint-disable-next-line no-loop-func
          <li id="skill" key={index}>{value.name}</li>,
        );
      }
      return requiredSkills;
    } else {
      return <div />;
    }
  }

  preferredSkillsHelper = () => {
    const preferredSkills = [];
    if (this.props.post?.preferred_skills) {
      for (const [index, value] of this.props.post.preferred_skills.entries()) {
        preferredSkills.push(
          // eslint-disable-next-line no-loop-func
          <li id="skill" key={index}>{value.name}</li>,
        );
      }
      return preferredSkills;
    } else {
      return <div />;
    }
  }*/

  approvePost() {
    this.props.post.status = this.props.status;
    if (this.props.post.status === "Pending"){
      this.setState({showApproveError : true})
    }
    this.props.updatePost(this.props.post.id, this.props.post);
    this.forceUpdate();
  }

  checkDateRange = () => {
    if (this.props.post.desired_start_date == null){
      this.props.post.desired_start_date = new Date();
    }
    const start = new Date(this.props.post.desired_start_date);
    const end = new Date(this.props.post.desired_end_date);
    const diff = (end.getTime() - start.getTime())/(1000 * 3600 * 24 * 7);
    if (diff > 3.5 && diff <= 10) {
      this.state.validDate = true;
    } else {
      this.state.validDate = false;
      this.props.post.desired_end_date = new Date(start.getTime() + (1000 * 3600 * 24 * 7 * 4));
    }
  }

  renderDateError = () => {
    if (this.state.validDate == false) {
      return <div className="date-error">Please make the date range 4-10 weeks long before saving</div>
    } else return null;
  }

  renderDateRange = () => {
    if (this.props.post.desired_start_date != null){
      this.state.start = new Date(this.props.post.desired_start_date);
    } 
    if (this.props.post.desired_end_date != null){
      this.state.end = new Date(this.props.post.desired_end_date);
    }
    return (
      <DateRange
        editableDateInputs={true}
        onChange={(ranges) => {
          this.props.post.desired_start_date = ranges.selection.startDate.toISOString();
          this.props.post.desired_end_date = ranges.selection.endDate.toISOString();
          this.forceUpdate();
        }}
        moveRangeOnFirstSelection={false}
        ranges={[{
          startDate: this.state.start,
          endDate: this.state.end,
          key: 'selection',
        }]}
      />
    )
  }

  // eslint-disable-next-line consistent-return
  renderButtons() {
    if (this.props.user.role === 'admin') {
      return (
        <div className="post-startup-buttons">
          {!this.state.isEditing && this.props.post.status != "Archived" 
            ? (
              <button className="post-btn"
                type="submit"
                onClick={(e) => {
                  this.showArchiveModal();
                }}
              >
                Archive
              </button>
            )
            : null}
            {(!this.state.isEditing && this.props.post.status != "Approved")
            ? (
              <button className="post-btn"
                type="submit"
                onClick={this.approvePost}
              >
                Approve
              </button>
            )
            : null}
            {(!this.state.isEditing)
            ? (
              <button className="post-btn"
                type="submit"
                onClick={this.submit}
              >
                Revise
              </button>
            )
            : (
              <div>
                <button id="save-changes-btn"
                className="post-btn"
                type="submit"
                onClick={this.submit}
                >
                  Save Changes
                </button>
                <button id="discard-changes-btn"
                className="post-btn"
                onClick={this.discard}
                >
                  Discard Changes
                </button>
              </div>
            )}
        </div>
      );
    } else if (this.props.user.role === 'startup') {
      return (
        <div className="post-startup-buttons">
          {(!this.state.isEditing && this.props.post.status != "Archived")
            ? (
              <button className="post-btn"
                type="submit"
                onClick={(e) => {
                  this.showArchiveModal();
                }}
              >
                Archive
              </button>
            )
            : null}
          {(!this.state.isEditing)
            ? (
              <button className="post-btn"
                type="submit"
                onClick={this.submit}
              >
                Edit
              </button>
            )
            : (
              <button id="save-changes-btn"
              className="post-btn"
              type="submit"
              onClick={this.submit}
              >
                Save Changes
              </button>
            )}
          {/*<button id="edit-post-btn"
            className="post-btn"
            type="submit"
            onClick={this.submit}
          >{this.state.isEditing ? 'Save Changes' : 'Edit Position'}
            </button>*/}
        </div>
      );
    } else if (this.props.user.role === 'student') {
      return (
        <button className="apply-btn"
          type="submit"
          onClick={(e) => {
            this.showApplyModal();
          }}
        >Apply Now!
        </button>
      );
    }
  }

  renderEditLocation = () => {
    return (
      <div className="location-wrapper">
        <div className="input-title" id="location-type">How will volunteering be conducted? (Check all that apply)</div>
        <div className="post-input-row">
          <div className="post-checkbox">
            <input type="checkbox" id="virtual" onChange={(event) => this.changeCheckboxField('virtual', event)} checked={this.state.post?.virtual}/>
            <label htmlFor="virtual">Virtually</label>
          </div>
          <div className="post-checkbox">
            <input type="checkbox" id="inperson" onChange={(event) => this.renderEditCityState(event)} checked={this.state.post?.inperson}/>
            <label htmlFor="inperson">In-Person</label>
          </div>
        </div>
      
        <div className="post-input-row" id="city-state-row">
          <div className="input-row-elem">
            <div className="input-title">City</div>
            <input className="short-input" defaultValue={this.props.post?.city} onBlur={(event) => this.changePostField('city', event)} />
          </div>
          <div className="input-row-elem">
            <div className="input-title">State Abbreviation</div>
            <input className="short-input" defaultValue={this.props.post?.state} onBlur={(event) => this.changePostField('state', event)} />
          </div>
        </div>
      </div>
    );
  }

  renderEditCityState = (event) => {
    this.changeCheckboxField('inperson', event);
    var inPersonCheckbox = document.getElementById("inperson");
    var cityStateRow = document.getElementById("city-state-row");

    if (inPersonCheckbox.checked == true) {
      cityStateRow.style.display = "flex";
    } else {
      cityStateRow.style.display = "none";
    }
  }

  renderResponsibilitiesNoEdit = () => { 
    const responsibilities = [];
    if (this.props.post?.responsibilities) {
      for (let i = 0; i < this.props.post.responsibilities.length; i++) {
        responsibilities.push(
          <li id="responsibility" key={this.props.post.responsibilities[i]}>{this.props.post.responsibilities[i]}</li>,
        );
      }
      return responsibilities;
    } else {
      return <div />;
    }
  }
  
  renderEditResponsibilities = () => { 
    if (this.state.post.responsibilities){
      return this.state.post.responsibilities.map((resp, index) => {
        return (
          <div key={resp} className="resp-input">
            <li id="responsibility" key={index}>{resp}</li>
            <button className="del-button"
              onClick={() => {
                this.setState((prevState) => {
                  prevState.post.responsibilities.splice(index, 1);
                  return {
                    ...prevState,
                  };
                });
              }}
            ><i className="far fa-trash-alt delete-icon" />
            </button>
          </div>
        );
      });
    }
  }

  renderQuestionsNoEdit = (event) => {
    const questions = [];
    if (this.props.post.questions) {
      this.props.post.questions.map((question) => {
        questions.push(
          <li id="responsibility" key={question}>{question}</li>
        );
      });
      return questions;
    }
  }
        
  renderQuestionsEdit = (event) => {
    if (this.state.post.questions){
      return this.state.post.questions.map((resp, index) => {
        return (
          <div key={index} className="resp-input">
            <li id="responsibility" key={resp}>{resp}</li>
            <button className="del-button"
              onClick={() => {
                this.setState((prevState) => {
                  prevState.post.questions.splice(index, 1);
                  return {
                    ...prevState,
                  };
                });
                this.forceUpdate();
              }}>
            <i className="far fa-trash-alt delete-icon" />
            </button>
          </div>
        );
      });
    } else {
      return <div></div>
    }
  }

  renderEdit = () => {
    const dropdownStyles = {
      control: (base) => ({
        ...base,
        width: 300,
      }),
    };
    return (
      <div id="edit-post">
        <div id="edit-basic-info">
          <h2>Basic Information</h2>
          <div className="input-title" id="first-position-input">Position Title</div>
          <TextareaAutosize className="short-input-post" defaultValue={this.props.post?.title} onBlur={(event) => this.changePostField('title', event)} />
          {this.renderEditLocation()}
          <div className="post-input-row">
            <div className="student-edit-dates">
              <div>Desired Start and End Date</div>
              {this.renderDateError()}
              {this.renderDateRange()}
            </div>
          </div>

          <div className="post-input-row">
            <p className="question-fields-title">Max Expected Hours/Week (Please input a number, not a range)</p>
            <TextareaAutosize className="question-fields-text" onBlur={(event) => this.changePostField('time_commitment', event)} defaultValue={this.props.post?.time_commitment} />
          </div>

          <hr className="post-edit-divider" />
          
          <h2>Position Details</h2>
          <div className="resps-header">
            <div className="input-title">Description</div>
            <TextareaAutosize className="tall-input" defaultValue={this.props.post?.description} onBlur={(event) => this.changePostField('description', event)} />
          </div>
          <div className="edits-resps">
          <div className="resps-header">
            <div className="input-title">Responsibilities</div>
            <TextareaAutosize className="question-fields-text" onBlur={(event) => this.state.newResponsibility = event.target.value} />
            <button className="add-button"
              onClick={() => {
                  if (!this.state.post.responsibilities.includes(this.state.newResponsibility)){
                  this.setState((prevState) => {
                    prevState.post.responsibilities.push(this.state.newResponsibility);
                    this.state.newResponsibility = '';
                    return {
                      ...prevState,
                    };
                  });
                }
              }}>
            <i className="fa fa-plus add-icon" aria-hidden="true" />
            </button>
          </div>
          {this.renderEditResponsibilities()}
        </div>

          <hr className="post-edit-divider" />
          <div className="edits-resps">
            <div className="resps-header">
              <div className="input-title">Application Questions</div>
              <TextareaAutosize className="question-fields-text" onBlur={(event) => this.state.newQuestion = event.target.value} />
              <button className="add-button"
                onClick={() => {
                  if (!this.state.post.questions.includes(this.state.newQuestion)){
                    this.setState((prevState) => {
                      prevState.post.questions.push(this.state.newQuestion);
                      this.state.newQuestion = '';
                      return {
                        ...prevState,
                      };
                    });
                  }
                }}
              >
              <i className="fa fa-plus add-icon" aria-hidden="true" />
              </button>
            </div>
            {this.renderQuestionsEdit()}
          </div>
        </div>
        <hr className="post-edit-divider" />
        <div className="lists-row">
          <div className="list-section">
            <h2>Industries</h2>
            <FilteredSelect
              createable={true}
              className="select-dropdown"
              isMulti
              styles={dropdownStyles}
              name="industries"
              placeholder="Add Relevant Industries"
              value={this.state.selectedIndustryOptions}
              options={this.state.allIndustryOptions}
              onChange={(selectedOptions) => {
                const tempIndustries = selectedOptions
                  ? selectedOptions.map((option) => option.industry)
                  : [];
                this.setState((prevState) => {
                  const post = { ...prevState.post };
                  post.industries = tempIndustries;
                  return {
                    ...prevState,
                    selectedIndustryOptions: selectedOptions,
                    ownIndustries: tempIndustries,
                    post,
                  };
                });
              }}
              onCreateOption={(newOption) => {
                this.props.createIndustryForPost({ name: newOption }, this.state.post);
              }}
            />
          </div>
          <div className="list-section">
            <h2>Desired Classes</h2>
            <FilteredSelect
              createable={true}
              className="select-dropdown"
              isMulti
              styles={dropdownStyles}
              name="classes"
              placeholder="Add Desired Classes"
              value={this.state.selectedClassOptions}
              options={this.state.allClassOptions}
              onChange={(selectedOptions) => {
                const tempClasses = selectedOptions
                  ? selectedOptions.map((option) => option._class)
                  : [];
                this.setState((prevState) => {
                  const post = { ...prevState.post };
                  post.desired_classes = tempClasses;
                  return {
                    ...prevState,
                    selectedClassOptions: selectedOptions,
                    ownClasses: tempClasses,
                    post,
                  };
                });
              }}
              onCreateOption={(newOption) => {
                this.props.createClassForPost({ name: newOption }, this.state.post);
              }}
            />
          </div>
        </div>
        <div className="lists-row">
          <div className="list-section">
            <h2>Required Skills</h2>
            <FilteredSelect
              createable={true}
              className="select-dropdown"
              isMulti
              styles={dropdownStyles}
              name="req-skills"
              placeholder="Add Required Skills"
              value={this.state.selectedReqSkillOptions}
              options={this.state.allSkillOptions}
              onChange={(selectedOptions) => {
                const tempSkills = selectedOptions
                  ? selectedOptions.map((option) => option.skill)
                  : [];
                this.setState((prevState) => {
                  const post = { ...prevState.post };
                  post.required_skills = tempSkills;
                  return {
                    ...prevState,
                    selectedReqSkillOptions: selectedOptions,
                    ownSkills: tempSkills,
                    post,
                  };
                });
              }}
              onCreateOption={(newOption) => {
                this.props.createReqSkillForPost({ name: newOption }, this.state.post);
              }}
            />
          </div>
          <div className="list-section">
            <h2>Preferred Skills</h2>
            <FilteredSelect
              createable={true}
              className="select-dropdown"
              isMulti
              styles={dropdownStyles}
              name="pref-skills"
              placeholder="Add Preferred Skills"
              value={this.state.selectedPrefSkillOptions}
              options={this.state.allSkillOptions}
              onChange={(selectedOptions) => {
                const tempSkills = selectedOptions
                  ? selectedOptions.map((option) => option.skill)
                  : [];
                this.setState((prevState) => {
                  const post = { ...prevState.post };
                  post.preferred_skills = tempSkills;
                  return {
                    ...prevState,
                    selectedPrefSkillOptions: selectedOptions,
                    ownSkills: tempSkills,
                    post,
                  };
                });
              }}
              onCreateOption={(newOption) => {
                this.props.createPrefSkillForPost({ name: newOption }, this.state.post);
              }}
            />
          </div>
        </div>
        <hr className="post-edit-divider" />
      </div>
    );
  }


  logoCompanyName = () => {
    if (this.props.post.startup_id.logo) {
      return (
        <div className="profileCompanyInfo">
          <div className="profileCompanyLeft">
            <img src={this.props.post.startup_id.logo} alt="no logo" className="profileCompanyLogo"/>
          </div>
          <div className="profileCompanyRight">
            <div className="profileCompanyTitle"> { this.props.post.startup_id.name} </div>
          </div>  
        </div>
      );
    } else {
      return (
        <div>
          <div className="profileCompanyTitle"> { this.props.post.startup_id.name} </div>
        </div>
      );
    }
  }

  dates = () => {
    const start = new Date(this.props.post.desired_start_date);
    const end = new Date(this.props.post.desired_end_date);
    if (start) {
      return (
        <span className="dateText">Starts {`${start.getMonth() + 1}/${start.getDate()}/${start.getFullYear()}, 
        Ends ${end.getMonth() + 1}/${end.getDate()}/${end.getFullYear()}`}</span>
      );
    } else {
      return (
        <div />
      );
    }
  }

  renderVirtual = () => {
    if (this.props.post.virtual==true) {
      return (
        <div className="position-location-row">
          <span className="virtualIcon" />
          <span className="position-location">Virtual</span>
        </div>  
      );
    } else {
      return (
        <div />
      );
    }
  }

  renderInPerson = () => {
    if (this.props.post.city && this.props.post.state) {
      return (
        <div className="position-location-row">
          <span className="locationIcon" />
          <span className="position-location"> {`${this.props.post.city}, ${this.props.post.state}`} </span>
        </div> 
      );
    } else {
      return (
        <div />
      );
    }
  }

  renderGreenPills = (pillsArray) => {
    if (pillsArray && pillsArray.length > 0) {
      return pillsArray.map((elem, index) => {
        return <div key={index} className="student-profile-pill-green">{elem.name}</div>;
      });
    } else return <div>None</div>;
  }

  renderGrayPills = (pillsArray) => {
    if (pillsArray && pillsArray.length > 0) {
      return pillsArray.map((elem, index) => {
        return <div key={index} className="student-profile-pill-gray">{elem.name}</div>;
      });
    } else return <div>None</div>;
  }

  renderRedPills = (pillsArray) => {
    if (pillsArray && pillsArray.length > 0) {
      return pillsArray.map((elem, index) => {
        return <div key={index} className="student-profile-pill-red">{elem.name}</div>;
      });
    } else return <div>None</div>;
  }

  renderYellowPills = (pillsArray) => {
    if (pillsArray && pillsArray.length > 0) {
      return pillsArray.map((elem, index) => {
        return <div key={index} className="student-profile-pill-yellow">{elem.name}</div>;
      });
    } else return <div>None</div>;
  }

  renderStatusPill = () => {
    if (this.props.post.status === "Approved") {
      return (
        <div id="app-status-green-pill">Live</div>
      );
    } else if (this.props.post.status === "Archived") {
      return (
        <div id="app-status-red-pill">Archived</div>
      );
    } else {
      return (
        <div id="app-status-yellow-pill">Pending</div>
      );
    }
  }

  renderNoEdit = () => {
    return (
      //<div id="wrap-content">
      <div>
        <Application onClose={this.hideApplyModal} show={this.state.applyShow} />
        {(this.state.applyShow) && (
          <div id="confirmation-background" />
        )}
        <Archive post={this.props.post} onClose={this.hideArchiveModal} show={this.state.archiveShow} />

        <div className="profileBody">
          <div className="profileText">
            <div className="company-position-info">
              {this.logoCompanyName()}

              <div className="position-info">
                <div className="position-title">{this.props.post.title}</div>
                {this.renderVirtual()}
                {this.renderInPerson()}
                <div className="position-dates">
                  {this.dates()}
                </div>
                <div className="position-time-commitment">
                  {this.props.post.time_commitment ? 'Expected Time Commitment'.concat(': ', this.props.post.time_commitment.toString()).concat(' ', 'hrs/week') : null}
                </div>
              </div>
            </div>
            
            <hr className="profile-divider" />
            <div className="lists-row">
              <div className="list-section">
                <h2>Required Skills</h2>
                {this.renderGreenPills(this.props.post?.required_skills)}
              </div>
              <div className="list-section" >
                <h2>Preferred Skills</h2>
                {this.renderGrayPills(this.props.post?.preferred_skills)}
              </div>
              <div className="list-section">
                <h2>Desired Classes</h2>
                {this.renderRedPills(this.props.post?.desired_classes)}
              </div> 
              <div className="list-section">
                <h2>Industries</h2>
                {this.renderYellowPills(this.props.post?.industries)}
              </div>
            </div>

            <hr className="profile-divider" />
            <div className="bottom">
              <div className="exps-fixed">
                <h2>Position Details</h2>
                <div className="work-exp">
                  <div className="exp-title">Description</div>
                  <div className="exp-text">{this.props.post.description}</div>
                </div>

                <div className="work-exp">
                  <div className="exp-title">Responsibilities</div>
                  <ul className="list-no-margin">{this.renderResponsibilitiesNoEdit()}</ul>
                </div>

                <div className="work-exp">
                  <div className="exp-title">Application Questions</div>
                  <ul className="list-no-margin">{this.renderQuestionsNoEdit()}</ul>
                </div>
              </div>
            </div> 

            <div className="app-status-row">
              <div id="app-status-title">Status: </div>
              {this.renderStatusPill()}
            </div>
            {/* <div className="bar">
              <img src={this.props.post.startup_id.logo} alt="no logo" />
              <h2 id="name">{this.props.post.startup_id.name}</h2>
              <img src={pin} alt="location" />
              <h2 id="state">{`${this.props.post.city}, ${this.props.post.state}`}</h2>
              {this.props.user.role === 'startup'
                ? <h2 id="post-status-view">{`Status: ${this.props.post.status}`}</h2>
                : null }
            </div>
            <div className="bar">
              <div className="post-start-date">
                {this.props.post.desired_start_date ? 'Start Date'.concat(': ', this.props.post.desired_start_date.toString().substring(0, 10)) : null}
                </div>
              <div className="post-end-date">
                {this.props.post.desired_end_date ? 'End Date'.concat(': ', this.props.post.desired_end_date.toString().substring(0, 10)) : null}
                </div>
              <div className="post-time-commitment">
                {this.props.post.time_commitment ? 'Time Commitment'.concat(': ', this.props.post.time_commitment.toString()).concat(' ', 'hrs/week') : null}
                </div>
            </div> 

            <div className="top">
              <div id="project">
                <h3>Project Description</h3>
                <h2 id="post-description">{this.props.post.description}</h2>
              </div>
              <div id="skills-section">
                <h2>Required Skills</h2>
                <ul id="skills">{this.requiredSkillsHelper()}</ul>
                <h2>Preferred Skills</h2>
                <ul id="skills">{this.preferredSkillsHelper()}</ul>
              </div>
            </div>
            
            <div className="bottom">
              <h3>Application Questions</h3>
              <ul id="skills">{this.renderQuestionsNoEdit()}</ul>
              <h3>Responsibilities</h3>
              <ul id="skills">{this.renderResponsibilitiesNoEdit()}</ul>
            </div> 
            */}
          </div>
        </div>

        {/* <h1 id="title">{this.props.post.title}</h1>
        <div className="bar">
          <img src={this.props.post.startup_id.logo} alt="no logo" />
          <h2 id="name">{this.props.post.startup_id.name}</h2>
          <img src={pin} alt="location" />
          <h2 id="state">{`${this.props.post.city}, ${this.props.post.state}`}</h2>
          {this.props.user.role === 'startup'
            ? <h2 id="post-status-view">{`Status: ${this.props.post.status}`}</h2>
            : null }
        </div>
        <div className="bar">
          <div className="post-start-date">
            {this.props.post.desired_start_date ? 'Start Date'.concat(': ', this.props.post.desired_start_date.toString().substring(0, 10)) : null}
            </div>
          <div className="post-end-date">
            {this.props.post.desired_end_date ? 'End Date'.concat(': ', this.props.post.desired_end_date.toString().substring(0, 10)) : null}
            </div>
          <div className="post-time-commitment">
            {this.props.post.time_commitment ? 'Time Commitment'.concat(': ', this.props.post.time_commitment.toString()).concat(' ', 'hrs/week') : null}
            </div>
        </div>
        <div className="top">
          <div id="project">
            <h3>Project Description</h3>
            <h2 id="post-description">{this.props.post.description}</h2>
          </div>
          <div id="skills-section">
            <h2>Required Skills</h2>
            <ul id="skills">{this.requiredSkillsHelper()}</ul>
            <h2>Preferred Skills</h2>
            <ul id="skills">{this.preferredSkillsHelper()}</ul>
          </div>
        </div>
        <div className="bottom">
          <h3>Application Questions</h3>
          <ul id="skills">{this.renderQuestionsNoEdit()}</ul>
          <h3>Responsibilities</h3>
          <ul id="skills">{this.renderResponsibilitiesNoEdit()}</ul>
        </div> */}
      </div>
    );
  }

  render() {
    if (this.props.post?.startup_id) {
      if (this.state.isEditing) {
        return (
          <div>
            <Revise type = "post" data={this.state.post} onClose={this.hideReviseModal} show={this.state.reviseShow} onSuccess={()=>{this.setState({ isEditing: false })}} />
            <div>{this.renderEdit()}</div>
            <div>{this.renderButtons()}</div>
          </div>
        );
      } else {
        return (
          <div>
            <Revise type = "post" data={this.state.post} onClose={this.hideReviseModal} show={this.state.reviseShow} onSuccess={()=>{this.setState({ isEditing: false })}} />
            <div>{this.renderNoEdit()}</div>
            <div>{this.renderButtons()}</div>
          </div>
        );
      }
    } else {
      return <div />;
    }
  }
}


const mapStateToProps = (reduxState) => ({
  status: reduxState.startups.current.status,
  post: reduxState.posts.current,
  user: reduxState.user.current,
  allIndustries: reduxState.industries.all,
  allSkills: reduxState.skills.all,
  allClasses: reduxState.classes.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchPost,
  updatePost,
  fetchUser,
  fetchStartup,
  fetchAllIndustries,
  fetchAllClasses,
  fetchAllSkills,
  createIndustryForPost,
  createReqSkillForPost,
  createPrefSkillForPost,
  createClassForPost,
})(Post));
