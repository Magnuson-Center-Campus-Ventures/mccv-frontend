/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import {
  fetchStartupByUserID, fetchPosts, fetchPost, updateStartup,
  fetchAllIndustries, createIndustryForStartup,
} from '../../actions';
import AddPosting from './startups-modals/startup-add-posting';
import '../../styles/startup-profile.scss';

class StartupProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      startup: {},
      isEditing: false,
    };
    // this.renderPostings = this.renderPostings.bind(this);
  }

  componentDidMount() {
    console.log('didMount');
    this.props.fetchStartupByUserID(localStorage.getItem('userID'));
    this.props.fetchAllIndustries();
    // this.props.fetchPosts();
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

  submit = () => {
    if (this.state.isEditing) {
      this.props.updateStartup(this.state.startup.id, this.state.startup);
      this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    } else {
      this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    }
  }

  showModal = () => {
    this.setState({
      show: true,
    });
  };

  hideModal = () => {
    this.setState({
      show: false,
    });
  };

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

  renderPostings = (e) => {
    if (this.props.startup.posts && this.props.startup.posts.length && typeof this.props.startup !== 'undefined') {
      const mappingPostings = this.props.startup.posts.map((post) => {
        if (this.state.isEditing === true) {
          return (
            <li className="startup-posting" key={post._id}>
              <button type="submit" className="delete-btn-startup-industries" style={{ cursor: 'pointer' }} onClick={() => { this.deletePost({ post }); }}>
                <i className="far fa-trash-alt" id="icon" />
              </button>
              <div className="startup-posting-title">{post.title}</div>
              <br />
              {this.renderDescription(post)}
              <br />
              <div className="startup-posting-time">Time Commitment: {post.time_commitment} hours per week</div>
            </li>
          );
        } else {
          return (
            <li className="startup-posting" key={post._id}>
              <div className="startup-posting-title">{post.title}</div>
              <br />
              {this.renderDescription(post)}
              <br />
              <div className="startup-posting-time">Time Commitment: {post.time_commitment} hours per week</div>
            </li>
          );
        }
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
                    this.showModal();
                  }}
                >
                  <i className="fas fa-plus" />
                </button>
              </div>
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
                this.showModal();
              }}
            >
              <i className="fas fa-plus" />
            </button>
          </div>
        </div>
      );
    }
  }

  renderAddIndustry() {
    console.log('here');
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
    } else {
      return (
        'Indsutries:'
      );
    }
  }

  renderIndustries() {
    console.log(this.props.startup.industries);
    if (typeof this.props.startup.industries !== 'undefined') {
      if (this.state.isEditing === false) {
        return (
          this.props.startup.industries.map((industry) => {
            return (
              <div className="industry" key={industry}>{industry}</div>
            );
          })
        );
      } else {
        this.renderAddIndustry();
        return (
          this.props.startup.industries.map((industry) => {
            return (
              <div className="industry" key={industry}>{industry}
                <button type="submit" className="delete-btn-startup-industries" style={{ cursor: 'pointer' }} onClick={() => { this.deleteIndustry({ industry }); }}>
                  <i className="far fa-trash-alt" id="icon" />
                </button>
              </div>
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
      return (
        <div className="startup-body">
          <AddPosting onClose={this.hideModal} show={this.state.show} />
          <h1 className="startup-name">{`${this.props.startup.name}`}</h1>
          <div className="startup-location">Location: {`${this.props.startup.city}`}, {`${this.props.startup.state}`}</div>
          <div className="startup-industries">{this.renderAddIndustry()}{this.renderIndustries()}</div>
          <div className="startup-description">About {`${this.props.startup.name}`}:<br /><br />{`${this.props.startup.description}`}</div>
        </div>
      );
    } else {
      return (
        <div>Startup profile does not exist</div>
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
    // posts: reduxState.posts.all,
  };
}

export default withRouter(connect(mapStateToProps, {
  fetchStartupByUserID, fetchPosts, fetchPost, updateStartup, fetchAllIndustries, createIndustryForStartup,
})(StartupProfile));
