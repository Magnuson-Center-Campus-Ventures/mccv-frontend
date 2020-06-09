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
import CreateableSelect from 'react-select/creatable';
import {
  fetchPost, updatePost, fetchApplication, fetchUser, clearApplication, clearPost,
  fetchAllIndustries, fetchAllClasses, fetchAllSkills,
  createIndustryForPost, createReqSkillForPost, createPrefSkillForPost, createClassForPost,
} from '../../actions';
import Application from './student-modals/application';
import Archive from '../admin-modals/archive';
import pin from '../../../static/img/pin.png';
import '../../styles/post.scss';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      responsibilities: [],
      badStartDate: false,
      badEndDate: false,
      applyShow: false,
      archiveShow: false,
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
    };
    this.showApplyModal = this.showApplyModal.bind(this);
    this.hideApplyModal = this.hideApplyModal.bind(this);
    this.showArchiveModal = this.showArchiveModal.bind(this);
    this.hideArchiveModal = this.hideArchiveModal.bind(this);
    this.approvePost = this.approvePost.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
    this.props.fetchUser(localStorage.getItem('userID'));
    this.props.fetchAllIndustries();
    this.props.fetchAllSkills();
    this.props.fetchAllClasses();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post && this.props.post !== {} && prevProps.post !== this.props.post) {
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
    this.props.fetchApplication(this.props.post?.application_id);
    this.setState({
      applyShow: true,
    });
  };

  showArchiveModal = (e) => {
    this.setState({
      archiveShow: true,
    });
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

  changePostField = (field, event) => {
    const value = event.target.value;

    this.setState((prevState) => {
      const post = { ...prevState.post };
      post[field] = value;
      return {
        ...prevState,
        post,
      };
    });
  }

  submit = () => {
    if (this.state.isEditing) {
      const post = { ...this.state.post };
      post.responsibilities = this.state.responsibilities;
      this.props.updatePost(this.state.post.id, post);
    }
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    window.scrollTo(0, 0);
  }

  requiredSkillsHelper= () => {
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
  }

  responsibilitiesHelper = () => {
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

  // Date validation function taken from https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  isValidDate = (dateString) => {
    // Check for mm/dd/yyyy pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) { return false; }

    // Parse the date parts to integers
    const parts = dateString.split('/');
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };

  formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const month = date.getMonth() + 1;
    const monthString = month < 10 ? `0${month}` : month;
    const day = date.getDate();
    const dayString = day < 10 ? `0${day}` : month;
    const year = date.getFullYear();
    return `${monthString}/${dayString}/${year}`;
  }

  approvePost() {
    this.props.post.status = 'Approved';
    this.props.updatePost(this.props.post.id, this.props.post);
    this.forceUpdate();
  }

  // eslint-disable-next-line consistent-return
  renderButtons() {
    if (this.props.user.role === 'admin') {
      return (
        <button className="post-btn"
          type="submit"
          onClick={(e) => {
            this.showArchiveModal();
          }}
        >
          Archive Position
        </button>
      );
    } else if (this.props.user.role === 'startup') {
      return (
        <div className="post-startup-buttons">
          <button className="post-btn"
            type="submit"
            onClick={(e) => {
              this.showArchiveModal();
            }}
          >
            Archive Position
          </button>

          <button className="post-btn"
            type="submit"
            onClick={this.approvePost}
          >
            Approve Posting
          </button>

          <button id="edit-post"
            className="post-btn"
            type="submit"
            onClick={this.submit}
          >{this.state.isEditing ? 'Save Changes' : 'Edit Position'}
          </button>
        </div>
      );
    } else if (this.props.user.role === 'student') {
      return (
        <button className="post-btn"
          type="submit"
          onClick={(e) => {
            this.showApplyModal();
          }}
        >Apply Now!
        </button>
      );
    }
  }

  renderEditResponsibilities = () => {
    return this.state.responsibilities.map((resp, index) => {
      return (
        <div key={resp} className="resp-input">
          <TextareaAutosize className="short-input-post"
            defaultValue={resp}
            onBlur={(event) => {
              const value = event.target.value;
              this.setState((prevState) => {
                const responsibilities = [...prevState.responsibilities];
                responsibilities[index] = value;
                return {
                  ...prevState,
                  responsibilities,
                };
              });
            }}
          />
          <button className="del-button"
            onClick={() => {
              this.setState((prevState) => {
                const responsibilities = [...prevState.responsibilities];
                responsibilities.splice(index, 1);
                return {
                  ...prevState,
                  responsibilities,
                };
              });
            }}
          ><i className="far fa-trash-alt delete-icon" />
          </button>
        </div>
      );
    });
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
          <div className="input-title">Description</div>
          <TextareaAutosize className="tall-input" defaultValue={this.props.post?.description} onBlur={(event) => this.changePostField('description', event)} />
          <div className="post-input-row">
            <div className="input-row-elem">
              <div className="input-title">City</div>
              <input className="short-input" defaultValue={this.props.post?.city} onBlur={(event) => this.changePostField('city', event)} />
            </div>
            <div className="input-row-elem">
              <div className="input-title">State Abbreviation</div>
              <input className="short-input" defaultValue={this.props.post?.state} onBlur={(event) => this.changePostField('state', event)} />
            </div>
          </div>
          <div className="post-input-row">
            <div className="input-row-elem">
              <div className="input-title">Start Date (mm/dd/yyyy)</div>
              <div style={{ color: 'red' }}>{this.state.badStartDate ? 'Please enter a valid date with the format mm/dd/yyyy' : null}</div>
              <input className="short-input"
                placeholder="mm/dd/yyyy"
                defaultValue={this.formatDate(this.props.post?.desired_start_date)}
                onBlur={(event) => {
                  if (!this.isValidDate(event.target.value)) {
                    this.setState({ badStartDate: true });
                  } else {
                    this.setState({ badStartDate: false });
                    this.changePostField('desired_start_date', event);
                  }
                }}
              />
            </div>
            <div className="input-row-elem">
              <div className="input-title">End Date (mm/dd/yyyy)</div>
              <div style={{ color: 'red' }}>{this.state.badEndDate ? 'Please enter a valid date with the format mm/dd/yyyy' : null}</div>
              <input className="short-input"
                placeholder="mm/dd/yyyy"
                defaultValue={this.formatDate(this.props.post?.desired_end_date)}
                onBlur={(event) => {
                  if (!this.isValidDate(event.target.value)) {
                    this.setState({ badEndDate: true });
                  } else {
                    this.setState({ badEndDate: false });
                    this.changePostField('desired_end_date', event);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <hr className="post-edit-divider" />
        <div className="lists-row">
          <div className="list-section">
            <h2>Industries</h2>
            <CreateableSelect
              className="select-dropdown"
              isMulti
              styles={dropdownStyles}
              name="industries"
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
            <CreateableSelect
              className="select-dropdown"
              isMulti
              styles={dropdownStyles}
              name="classes"
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
            <CreateableSelect
              className="select-dropdown"
              isMulti
              styles={dropdownStyles}
              name="req-skills"
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
            <CreateableSelect
              className="select-dropdown"
              isMulti
              styles={dropdownStyles}
              name="pref-skills"
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
        <div className="edits-resps">
          <div className="resps-header">
            <div className="input-title">Responsibilities</div>
            <button className="add-button"
              onClick={() => {
                this.setState((prevState) => {
                  const responsibilities = [...prevState.responsibilities];
                  responsibilities.push('');
                  return {
                    ...prevState,
                    responsibilities,
                  };
                });
              }}
            ><i className="fa fa-plus add-icon" aria-hidden="true" />
            </button>
          </div>
          {this.renderEditResponsibilities()}
        </div>
        <hr className="post-edit-divider" />
      </div>
    );
  }

  renderNoEdit = () => {
    return (
      <div id="wrap-content">
        <Application onClose={this.hideApplyModal} show={this.state.applyShow} />
        {(this.state.applyShow) && (
          <div id="confirmation-background" />
        )}
        <Archive post={this.props.post} onClose={this.hideArchiveModal} show={this.state.archiveShow} />
        <h1 id="title">{this.props.post.title}</h1>
        <div className="bar">
          <img src={this.props.post.startup_id.logo} alt="no logo" />
          <h2 id="name">{this.props.post.startup_id.name}</h2>
          <img src={pin} alt="location" />
          <h2 id="state">{`${this.props.post.city}, ${this.props.post.state}`}</h2>
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
          <h3>Responsibilities</h3>
          <ul id="skills">{this.responsibilitiesHelper()}</ul>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.post?.startup_id) {
      if (this.state.isEditing) {
        return (
          <div>
            <div>{this.renderEdit()}</div>
            <div>{this.renderButtons()}</div>
          </div>
        );
      } else {
        return (
          <div>
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
  fetchApplication,
  fetchAllIndustries,
  fetchAllClasses,
  fetchAllSkills,
  createIndustryForPost,
  createReqSkillForPost,
  createPrefSkillForPost,
  createClassForPost,
})(Post));
