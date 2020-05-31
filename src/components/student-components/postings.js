/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import PostListItem from './posting-item';
import SearchBar from './search-bar';
import {
  fetchPosts, getFilteredPosts,
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
      search: false,
      results: [],
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
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

  search = (text) => {
    this.setState({ search: true });
    // console.log(this.props.posts);
    const searchterm = text.toLowerCase();
    this.props.posts.map((post) => {
      const skills = post.required_skills.map((skill) => skill.toLowerCase());
      const responsibilities = post.responsibilities.map((resp) => resp.toLowerCase());
      const postInd = post.industries.map((industry) => industry.toLowerCase());
      const startupInd = post.startup_id.industry.map((industry) => industry.toLowerCase());
      if (post.title.toLowerCase().includes(searchterm)
      || post.location.toLowerCase().includes(searchterm)
      || skills.includes(searchterm) // array
      || responsibilities.includes(searchterm) // array
      || postInd.includes(searchterm) // array
      || post.startup_id.name.toLowerCase().includes(searchterm)
      || startupInd.includes(searchterm)) { // array
        this.setState((prevState) => ({
          results: [...prevState.results, post],
        }));
      }
    });
  }

  clear = () => {
    this.setState({ search: false });
    this.setState({ results: [] });
  }

  renderPosts() {
    if (this.state.search) {
      if (this.state.results.length > 0) {
        return this.state.results.map((post) => {
          return (
            <PostListItem post={post} key={post.id} />
          );
        });
      } else {
        return (
          <div> Sorry, no postings match that query</div>
        );
      }
    } else {
      return this.props.posts.map((post) => {
        return (
          <PostListItem post={post} key={post.id} />
        );
      });
    }
  }

  render() {
    // Styles for filter dropdowns
    const dropdownStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      (this.props.posts !== undefined || null) && (this.state.results !== null || undefined)
        ? (
          <div>
            <SearchBar onSearchChange={this.search} onNoSearch={this.clear} />
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
              {this.renderPosts()}
            </div>
          </div>
        ) : (
          <div> </div>
        )
    );
  }
}


const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchPosts, getFilteredPosts,
})(Posts));
