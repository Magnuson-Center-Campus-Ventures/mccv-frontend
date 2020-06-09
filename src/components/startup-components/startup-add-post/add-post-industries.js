/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import {
  fetchPost, createIndustryForPost, updatePost, fetchAllIndustries,
} from '../../../actions';

class AddPostIndustries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      industry: '',
      selectedIndustries: [],
      displayIndustries: [],
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchAllIndustries();
    this.props.fetchPost(this.props.post.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post !== {} && prevProps.post !== this.props.post) {
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
    if (!this.props.post.industries.includes(this.getIndustry(this.state.industry))) {
      this.props.post.industries.push(this.getIndustry(this.state.industry));
    }
    this.state.displayIndustries = this.state.displayIndustries.filter((value) => {
      return (value.label !== this.state.industry);
    });
    this.state.industry = '';
    this.forceUpdate();
  }

  deleteIndustry = (industry) => {
    this.props.post.industries = this.props.post.industries.filter((value) => {
      return (value !== industry.industry);
    });
    this.state.displayIndustries.push({ label: industry.industry.name });
    this.forceUpdate();
  }

  populateCurrentIndustries() {
    this.props.post.industries.forEach((value) => {
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
            this.props.createIndustryForPost({ name: newOption }, this.props.post);
          }}
        />
      </div>
    );
  }

  renderIndustries() {
    if (this.props.post?.industries) {
      return (
        this.props.post.industries.map((industry) => {
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
    // still have occasioanl rendering issue for industries.all
    if (this.props.post.industries !== undefined && this.props.industries.all !== []) {
      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Industries</h1>
              <p>What industries characterize your volunteer position?</p>
            </div>
            <i className="fas fa-building question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            {this.renderAddIndustry()}
            <div className="question-fields-items">{this.renderIndustries()}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  post: reduxState.posts.current,
  industries: reduxState.industries.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchPost, createIndustryForPost, updatePost, fetchAllIndustries,
})(AddPostIndustries));
