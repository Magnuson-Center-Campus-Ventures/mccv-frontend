/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import PostListItem from './posting-item';
import SearchBar from './search-bar';
import {
  fetchPosts, fetchStartups, fetchPostSearch, getFilteredPosts,
} from '../../actions';

import '../../styles/postings.scss';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      industryOptions: [],
      selectedIndustryOptions: [],
      skillOptions: [],
      selectedSkillOptions: [],
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchStartups();
  }

  componentDidUpdate(prevProps) {
    if (this.props.posts.length > 0 && prevProps.posts !== this.props.posts) {
      // Set up lists of all fields and options for dropdowns
      const industryOptions = [];
      const skillOptions = [];
      this.props.posts.forEach((post) => {
        if (post.industries) {
          post.industries.forEach((industry) => {
            // Add option if it's not already in the array (not using sets because react-select expects an array)
            if (industryOptions.filter((option) => option.value === industry).length === 0) {
              industryOptions.push({ value: industry, label: industry });
            }
          });
          this.setState({ industryOptions });
        }
        if (post.required_skills) {
          post.required_skills.forEach((skill) => {
            // Add option if it's not already in the array
            if (skillOptions.filter((option) => option.value === skill).length === 0) {
              skillOptions.push({ value: skill, label: skill });
            }
          });
          this.setState({ skillOptions });
        }
      });
    }
  }

  search = (text) => {
    this.props.fetchPostSearch(text);
  }

  isFilterEmpty = (array) => {
    return array.length === 1 && array.includes('filler');
  }

  onChangeFilter = (industries, skills) => {
    // console.log(industries, skills);
    if (this.isFilterEmpty(industries) && this.isFilterEmpty(skills)) {
      this.props.fetchPosts();
    } else {
      this.props.getFilteredPosts(industries, skills);
    }
  }

  findStartup(id) {
    let startupInfo = null;
    this.props.startups.map((startup) => {
      if (id === startup.id) {
        startupInfo = startup;
      }
    });
    return startupInfo;
  }

  render() {
    const mappingPostings = this.props.posts !== undefined && this.props.posts !== null
      ? this.props.posts.map((post) => {
        const startup = this.props.startups !== undefined && this.props.startups !== null ? (
          this.findStartup(post.startup_id)
        )
          : (null);
        return (
          startup !== null
            ? (
              <PostListItem post={post} startup={startup} key={post.id} />
            ) : (<div />)
        );
      })
      : (
        <div>
          Sorry, no posts currently
        </div>
      );

    // Styles for filter dropdowns
    const dropdownStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      this.props.posts !== undefined
        ? (
          <div>
            <SearchBar onSearchChange={this.search} onNoSearch={this.props.fetchPosts} />
            <Select
              isMulti
              styles={dropdownStyles}
              name="industry-filter"
              placeholder="Filter by industry"
              options={this.state.industryOptions}
              value={this.state.selectedIndustryOptions}
              onChange={(selectedOptions) => {
                this.setState({ selectedIndustryOptions: selectedOptions });
                const industries = (selectedOptions && selectedOptions.length > 0)
                  ? selectedOptions.map((option) => option.value)
                  : ['filler'];
                const skills = (this.state.selectedSkillOptions && this.state.selectedSkillOptions.length > 0)
                  ? this.state.selectedSkillOptions.map((option) => option.value)
                  : ['filler'];
                this.onChangeFilter(industries, skills);
              }}
            />
            <Select
              isMulti
              styles={dropdownStyles}
              name="skill-filter"
              placeholder="Filter by skill"
              options={this.state.skillOptions}
              value={this.state.selectedSkillOptions}
              onChange={(selectedOptions) => {
                this.setState({ selectedSkillOptions: selectedOptions });
                const industries = (this.state.selectedIndustryOptions && this.state.selectedIndustryOptions.length > 0)
                  ? this.state.selectedIndustryOptions.map((option) => option.value)
                  : ['filler'];
                const skills = (selectedOptions && selectedOptions.length > 0)
                  ? selectedOptions.map((option) => option.value)
                  : ['filler'];
                this.onChangeFilter(industries, skills);
              }}
            />
            <div className="list">
              {mappingPostings}
            </div>
          </div>
        ) : (
          <div />
        )
    );
  }
}

const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
  startups: reduxState.startups.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchPosts, fetchStartups, fetchPostSearch, getFilteredPosts,
})(Posts));
