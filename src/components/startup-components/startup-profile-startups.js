/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import Switch from 'react-switch';
import TextareaAutosize from 'react-textarea-autosize';
import {
  createPost, fetchPosts, fetchPost, updatePost,
  fetchStartupByUserID, updateStartup,
  fetchAllIndustries, createIndustryForStartup,
} from '../../actions';
import '../../styles/startup-profile.scss';

class StartupProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startup: {},
      selectedIndustries: [],
      displayIndustries: [],
      industry: '',
      posts: [],
      approved: true,
      archived: true,
      isEditing: false,
    };
    // this.renderPostings = this.renderPostings.bind(this);
    this.handleApprovedToggle = this.handleApprovedToggle.bind(this);
    this.handleArchivedToggle = this.handleArchivedToggle.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllIndustries();
    this.props.fetchStartupByUserID(localStorage.getItem('userID'));
    // this.props.fetchPosts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.startup !== {} && prevProps.startup !== this.props.startup) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ startup: this.props.startup });
      this.populateCurrentIndustries();
      this.populateCurrentPosts();
    }
  }

  getIndustry(name) {
    const industryObject = this.props.industries.find((industry) => {
      return (industry.name === name);
    });
    return industryObject;
  }

  addIndustry = () => {
    if (!this.props.startup.industries.includes(this.getIndustry(this.state.industry))) {
      this.props.startup.industries.push(this.getIndustry(this.state.industry));
    }
    this.state.displayIndustries = this.state.displayIndustries.filter((value) => {
      return (value.label !== this.state.industry);
    });
    this.state.industry = '';
    this.forceUpdate();
  }

  deleteIndustry = (industry) => {
    this.props.startup.industries = this.props.startup.industries.filter((value) => {
      return (value !== industry.industry);
    });
    this.state.displayIndustries.push({ label: industry.industry.name });
    this.forceUpdate();
  }

  submit = () => {
    if (this.state.isEditing) {
      this.props.updateStartup(this.state.startup.id, this.state.startup);
      this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    } else {
      this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    }
  }

  changeStartupField = (field, event) => {
    // eslint-disable-next-line prefer-destructuring
    const value = event.target.value;

    this.setState((prevState) => {
      const startup = { ...prevState.startup };
      startup[field] = value;
      return {
        ...prevState,
        startup,
      };
    });
  }

  addPosting = () => {
    const newPost = {
      startup_id: this.props.startup._id,
      title: '',
      description: '',
      industries: [],
      required_skills: [],
      preferred_skills: [],
      responsibilities: [],
      time_commitment: 0,
      desired_start_date: '',
      desired_end_date: '',
      desired_classes: [],
      available_until: '',
      status: '',
      applicants: [],
      application_id: '',
      students_selected: [],
      city: '',
      state: '',
      remote: false,
    };
    this.props.createPost(newPost, this.props.history);
  }

  handleApprovedToggle(checked) {
    console.log(checked);
    this.state.approved = checked;
    this.populateCurrentPosts();
    this.forceUpdate();
  }

  handleArchivedToggle(checked) {
    console.log(checked);
    this.state.archived = checked;
    this.populateCurrentPosts();
    this.forceUpdate();
  }

  populateCurrentIndustries() {
    this.props.startup.industries.forEach((value) => {
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

  populateCurrentPosts() {
    this.state.posts = this.props.startup.posts.filter((value) => {
      console.log(value.status);
      if (this.state.approved === this.state.archived) {
        return (value.status === 'Approved' || value.status === 'Archived');
      } else if (this.state.approved) {
        return (value.status === 'Approved');
      } else {
        return (value.status === 'Archived');
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
    if (this.state.isEditing === true) {
      return (
        <div className="add-industries">
          Add Industries:
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
              this.props.createIndustryForStartup({ name: newOption }, this.props.startup);
            }}
          />
        </div>
      );
    } else {
      return (
        'Industries:'
      );
    }
  }

  renderIndustries() {
    if (this.props.startup?.industries) {
      if (this.state.isEditing === true) {
        return (
          this.props.startup.industries.map((industry) => {
            return (
              <div className="industry" key={industry.name}>
                {industry.name}
                <button type="submit" className="delete-btn-startup-industries" style={{ cursor: 'pointer' }} onClick={() => { this.deleteIndustry({ industry }); }}>
                  <i className="far fa-trash-alt" id="icon" />
                </button>
              </div>
            );
          })
        );
      } else {
        return (
          this.props.startup.industries.map((industry) => {
            return (
              <div className="industry" key={industry.name}>{industry.name}</div>
            );
          })
        );
      }
    } else {
      return (
        <div>Loading</div>
      );
    }
  }

  renderStartup() {
    if (typeof this.props.startup !== 'undefined') {
      if (this.state.isEditing === false) {
        return (
          <div className="startup-body">
            <h1 className="startup-name">{`${this.props.startup.name}`}</h1>
            <div className="startup-location">Location: {`${this.props.startup.city}`}, {`${this.props.startup.state}`}</div>
            <div className="startup-industries">{this.renderAddIndustry()}{this.renderIndustries()}</div>
            <div className="startup-description">About {`${this.props.startup.name}`}:<br /><br />{`${this.props.startup.description}`}</div>
          </div>
        );
      } else {
        return (
          <div className="nameContainer">
            <div className="StartupBioQuestionLabelContainer">
              <p className="StartupBioLabel">
                Name
              </p>
              <TextareaAutosize onBlur={(event) => this.changeStartupField('name', event)} defaultValue={this.props.startup.name} />
              <p className="StartupBioLabel">
                City
              </p>
              <TextareaAutosize onBlur={(event) => this.changeStartupField('city', event)} defaultValue={this.props.startup.city} />
              <p className="StartupBioLabel">
                State
              </p>
              <TextareaAutosize onBlur={(event) => this.changeStartupField('state', event)} defaultValue={this.props.startup.state} />
              <div className="startup-industries">{this.renderAddIndustry()}{this.renderIndustries()}</div>
              <p className="StartupDescLabel">
                Description
              </p>
              <TextareaAutosize onBlur={(event) => this.changeStartupField('description', event)} defaultValue={this.props.startup.description} />
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>Startup profile does not exist</div>
      );
    }
  }

  // eslint-disable-next-line consistent-return
  renderDescription = (post) => {
    if (post.description !== undefined) {
      // console.log(post.description);
      if (post.description.length > 100) {
        const description = `${post.description.substring(0, 99)}...`;
        return (
          <div className="startup-posting-description">{description}</div>
        );
      } else {
        return (
          <div className="startup-posting-description">{post.description}</div>
        );
      }
    }
  }

  renderToggles() {
    return (
      <div id="filters">
        <span className="startup-postings-h1">Show Active:</span>
        <Switch id="approveToggle" handleDiameter={0} onChange={this.handleApprovedToggle} checked={this.state.approved} />
        <span className="startup-postings-h1">Show Archived:</span>
        <Switch id="archiveToggle" handleDiameter={0} onChange={this.handleArchivedToggle} checked={this.state.archived} />
      </div>
    );
  }

  renderPostings = (e) => {
    if (this.props.startup.posts && this.props.startup.posts.length && typeof this.props.startup !== 'undefined') {
      const mappingPostings = this.state.posts.map((post) => {
        return (
          <li className="startup-posting" key={post._id}>
            <Link to={`/posts/${post._id}`} key={post.id} className="postLink">
              <div className="startup-posting-title">{post.title}</div>
              <br />
              {this.renderDescription(post)}
              <br />
              <div className="startup-posting-time">Time Commitment: {post.time_commitment} hours per week</div>
              <br />
              <div className="startup-posting-status">Status: {post.status}</div>
            </Link>
          </li>
        );
      });
      return (
        this.props.startup.posts !== undefined
          ? (
            <div className="startup-postings">
              <div className="startup-add-posting-box">
                <span className="startup-postings-h1">Volunteer Positions:</span>
                <button type="button"
                  className="startup-add-posting-btn"
                  onClick={() => {
                    this.addPosting();
                  }}
                >
                  <i className="fas fa-plus" />
                </button>
              </div>
              { this.renderToggles() }
              <ul className="startup-postings-list">
                {mappingPostings}
              </ul>
            </div>
          ) : (<div />)
      );
    } else {
      return (
        <div className="startup-postings">
          <div className="startup-add-posting-box">
            <span className="startup-postings-h1">Volunteer Positions:</span>
            <button type="button"
              className="startup-add-posting-btn"
              onClick={() => {
                this.addPosting();
              }}
            >
              <i className="fas fa-plus" />
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="startup">
        { this.renderPostings() }
        { this.renderStartup() }
        <button className="edit-button"
          onClick={this.submit}
        >{this.state.isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    );
    /* if (this.props.startup.status === 'Approved') {
      return (
        <div className="startup">
          {this.renderPostings()}
          {this.renderStartup()}
        </div>
      );
    } else {
      return (
        <div>Company not Approved</div>
      );
    } */
  }
}

function mapStateToProps(reduxState) {
  return {
    startup: reduxState.startups.current,
    industries: reduxState.industries.all,
    post: reduxState.posts.current,
  };
}

export default withRouter(connect(mapStateToProps, {
  createPost, fetchStartupByUserID, fetchPosts, fetchPost, updatePost, updateStartup, fetchAllIndustries, createIndustryForStartup,
})(StartupProfile));
