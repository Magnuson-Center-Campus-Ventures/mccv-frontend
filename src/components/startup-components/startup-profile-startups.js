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
  uploadImage,
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
      pending: true,
      isEditing: false,
      preview: '',
      error: '',
    };
    // this.renderPostings = this.renderPostings.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.handleApprovedToggle = this.handleApprovedToggle.bind(this);
    this.handleArchivedToggle = this.handleArchivedToggle.bind(this);
    this.handlePendingToggle = this.handlePendingToggle.bind(this);
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

  onImageUpload(event) {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      this.state.preview = window.URL.createObjectURL(file);
      if (file) {
        uploadImage(file).then(url => {
          console.log(url);
          this.state.startup.logo = url;
        }).catch(error => {
          this.state.error = 'error';
        });
      }
    } else {
      this.state.error = 'file is null';
    }
    this.forceUpdate();
  }

  submit = () => {
    if (this.state.isEditing) {
      this.props.updateStartup(this.state.startup.id, this.state.startup);
      this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    } else {
      this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    }
    this.state.preview = this.state.startup.logo;
    this.forceUpdate();
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
      status: 'Pending',
      applicants: [],
      application_id: '',
      students_selected: [],
      city: '',
      state: '',
      remote: false,
    };
    this.props.createPost(newPost, this.props.startup, this.props.history);
  }

  handleApprovedToggle(checked) {
    this.state.approved = checked;
    this.populateCurrentPosts();
    this.forceUpdate();
  }

  handleArchivedToggle(checked) {
    this.state.archived = checked;
    this.populateCurrentPosts();
    this.forceUpdate();
  }

  handlePendingToggle(checked) {
    this.state.pending = checked;
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
      if (value.status === 'Archived') {
        return (this.state.archived);
      } else if (value.status === 'Pending') {
        return (this.state.pending);
      } else if (value.status === 'Approved') {
        return (this.state.approved);
      } else {
        return false;
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
        <div className="startup-header">
          <p>Add Industries:</p>
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
        <div className="startup-header">Industries:</div>
      );
    }
  }

  renderIndustries() {
    if (this.props.startup?.industries) {
      if (this.state.isEditing === true) {
        return (
          this.props.startup.industries.map((industry) => {
            return (
              <div className="startup-industry" key={industry.name}>
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
              <div className="startup-industry" key={industry.name}>{industry.name}</div>
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
            <div className="startup-header">
              <img className="startup-logo" id="logo" alt="preview" src={this.state.startup.logo} />
              <h1>{`${this.props.startup.name}`}</h1>
            </div>
            <div className="startup-location startup-header">Location: {`${this.props.startup.city}`}, {`${this.props.startup.state}`}</div>
            {this.renderAddIndustry()}
            <div className="startup-industries">{this.renderIndustries()}</div>
            <div className="startup-description">
              <p>About {`${this.props.startup.name}`}:</p>
              <div className="startup-description">{`${this.props.startup.description}`}</div>
            </div>
            <div className="startup-video">
              <iframe title="videoLarge" className="embed-responsive-item" src={this.state.startup.video} />
            </div>
            <button className="startup-edit-button edit-button"
              onClick={this.submit}
            >{this.state.isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        );
      } else {
        return (
          <div className="startup-body">
            <div className="startup-header startup-logo-container">
              <p>Logo</p>
              <img className="startup-logo" id="preview" alt="preview" src={this.state.preview} />
              <input type="file" name="coverImage" onChange={this.onImageUpload} />
              <p>(Use company's name for filename)</p>
            </div>
            <div className="startup-header">
              <p>Name</p>
              <TextareaAutosize onBlur={(event) => this.changeStartupField('name', event)} defaultValue={this.props.startup.name} />
            </div>
            <div className="startup-location startup-header">
              <p>City</p>
              <TextareaAutosize onBlur={(event) => this.changeStartupField('city', event)} defaultValue={this.props.startup.city} />
              <p>State</p>
              <TextareaAutosize onBlur={(event) => this.changeStartupField('state', event)} defaultValue={this.props.startup.state} />
            </div>
            {this.renderAddIndustry()}
            <div className="startup-industries">{this.renderIndustries()}</div>
            <div className="startup-description">
              <p>Description</p>
              <TextareaAutosize onBlur={(event) => this.changeStartupField('description', event)} defaultValue={this.props.startup.description} />
            </div>
            <div className="startup-video">
              <p>Link to your startup's pitch! (use the embed link for the video)</p>
              <TextareaAutosize onBlur={(event) => this.changeStartupField('video', event)} defaultValue={this.props.startup.video} />
              <iframe title="videoLarge" className="embed-responsive-item" src={this.state.startup.video} />
            </div>
            <button className="startup-edit-button edit-button"
              onClick={this.submit}
            >{this.state.isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
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
      <div className="startup-filters">
        <div className="startup-toggles">
          <span className="startup-postings-h1">Approved:</span>
          <Switch id="approveToggle" handleDiameter={0} onChange={this.handleApprovedToggle} checked={this.state.approved} />
        </div>
        <div className="startup-toggles">
          <span className="startup-postings-h1">Pending:</span>
          <Switch id="pendingToggle" handleDiameter={0} onChange={this.handlePendingToggle} checked={this.state.pending} />
        </div>
        <div className="startup-toggles">
          <span className="startup-postings-h1">Archived:</span>
          <Switch id="archiveToggle" handleDiameter={0} onChange={this.handleArchivedToggle} checked={this.state.archived} />
        </div>
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
                  <i className="fas fa-plus-circle" />
                </button>
              </div>
              { this.renderToggles() }
              <ul className="startup-postings-list-startup">
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
              <i className="fas fa-plus-circle" />
            </button>
          </div>
          { this.renderToggles() }
          <ul className="startup-postings-list-startup" />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="startup">
        { this.renderPostings() }
        { this.renderStartup() }
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
