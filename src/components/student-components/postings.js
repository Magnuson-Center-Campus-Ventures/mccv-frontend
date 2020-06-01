import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import PostListItem from './posting-item';
import SearchBar from './search-bar';
import {
  fetchPosts, fetchStudentByUserID,
} from '../../actions';

import '../../styles/postings.scss';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedPosts: [],
      industryOptions: [],
      selectedIndustryOptions: [],
      skillOptions: [],
      selectedSkillOptions: [],
      searchterm: 'emptytext',
      // recommend: false,
      search: false,
      filter: false,
      results: [],
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchStudentByUserID(localStorage.getItem('userID'));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.posts.length > 0) {
      const industryOptions = [];
      const skillOptions = [];
      nextProps.posts.forEach((post) => {
        if (post.industries) {
          post.industries.forEach((industry) => {
            // Add option if it's not already in the array (not using sets because react-select expects an array)
            if (industryOptions.filter((option) => option.value === industry).length === 0) {
              industryOptions.push({ value: industry, label: industry });
            }
          });
        }
        if (post.startup_id.industries) {
          post.startup_id.industries.forEach((industry) => {
            // Add option if it's not already in the array (not using sets because react-select expects an array)
            if (industryOptions.filter((option) => option.value === industry).length === 0) {
              industryOptions.push({ value: industry, label: industry });
            }
          });
        }
        if (post.required_skills) {
          post.required_skills.forEach((skill) => {
            // Add option if it's not already in the array
            if (skillOptions.filter((option) => option.value === skill).length === 0) {
              skillOptions.push({ value: skill, label: skill });
            }
          });
        }
      });
      if (industryOptions.length > prevState.industryOptions.length || skillOptions.length > prevState.skillOptions.length) {
        return {
          industryOptions, skillOptions,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.posts.length > 0 && this.props.student !== {}
      && (prevProps.posts !== this.props.posts || prevProps.student !== this.props.student)) {
      // Score posts
      this.scorePosts();
    }
  }

  // Moved filtering to frontend as per thomas's advice, but leaving this here for now just in case
  // onChangeFilter = (industries, skills) => {
  //   // console.log(industries, skills);
  //   if (this.isFilterEmpty(industries) && this.isFilterEmpty(skills)) {
  //     this.props.fetchPosts();
  //   } else {
  //     this.props.getFilteredPosts(industries, skills);
  //   }
  // }

  scorePosts = () => {
    let studentIndustries = [];
    let studentSkills = [];
    if (this.props.student.interested_industries) {
      studentIndustries = this.props.student.interested_industries.map((industry) => {
        return industry.name;
      });
    }
    if (this.props.student.skills) {
      studentSkills = this.props.student.skills.map((skill) => {
        return skill.name;
      });
    }
    // Score each post by the number of common elements between the student's and post's industry and skill arrays
    const postScores = {};
    this.props.posts.forEach((post) => {
      const numMatches = post.industries.filter((industry) => studentIndustries.includes(industry)).length
      + post.startup_id.industries.filter((industry) => studentIndustries.includes(industry)).length
      + post.required_skills.filter((skill) => studentSkills.includes(skill)).length
      // Preferred skills get half the weight of required skills
      + 0.5 * (post.preferred_skills.filter((skill) => studentSkills.includes(skill)).length);
      postScores[post._id] = numMatches;
    });

    // Sort the posts in descending order of score
    const tempPosts = this.props.posts;
    tempPosts.sort((post1, post2) => {
      return postScores[post2._id] - postScores[post1._id];
    });
    tempPosts.forEach((post) => {
      console.log(post.title, postScores[post._id]);
    });
    this.setState({ sortedPosts: tempPosts });
  }

  searchAndFilter = (text, selectedInds, selectedSkills) => {
    this.setState({ results: [] });
    const searchterm = text.toLowerCase();
    this.props.posts.forEach((post) => {
      const skills = post.required_skills.map((skill) => skill.toLowerCase());
      const responsibilities = post.responsibilities.map((resp) => resp.toLowerCase());
      const postInd = post.industries.map((industry) => industry.toLowerCase());
      const startupInd = post.startup_id.industries.map((industry) => industry.toLowerCase());
      // Checks for search
      if (post.title.toLowerCase().includes(searchterm)
      || post.location.toLowerCase().includes(searchterm)
      || skills.includes(searchterm) // array
      || responsibilities.includes(searchterm) // array
      || postInd.includes(searchterm) // array
      || post.startup_id.name.toLowerCase().includes(searchterm)
      || startupInd.includes(searchterm) // array
      // Checks for filter
      || selectedInds.some((industry) => postInd.includes(industry))
      || selectedInds.some((industry) => startupInd.includes(industry))
      || selectedSkills.some((skill) => skills.includes(skill))) {
        this.setState((prevState) => ({
          results: [...prevState.results, post],
        }));
      }
    });
  }

  onSearch = (text) => {
    const industries = (this.state.selectedIndustryOptions && this.state.selectedIndustryOptions.length > 0)
      ? this.state.selectedIndustryOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    const skills = (this.state.selectedSkillOptions && this.state.selectedSkillOptions.length > 0)
      ? this.state.selectedSkillOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    this.searchAndFilter(text, industries, skills);
    this.setState({ search: true, searchterm: text });
  }

  isFilterEmpty = (array) => {
    return array.length === 1 && array.includes('emptytext');
  }

  onFilter = (industries, skills) => {
    if (this.isFilterEmpty(industries) && this.isFilterEmpty(skills)) {
      this.setState({ filter: false });
    } else this.setState({ filter: true });
    this.searchAndFilter(this.state.searchterm, industries, skills);
  }

  clear = () => {
    this.setState({ search: false, searchterm: 'emptytext' });
    const industries = (this.state.selectedIndustryOptions && this.state.selectedIndustryOptions.length > 0)
      ? this.state.selectedIndustryOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    const skills = (this.state.selectedSkillOptions && this.state.selectedSkillOptions.length > 0)
      ? this.state.selectedSkillOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    this.searchAndFilter('emptytext', industries, skills);
  }

  renderPosts() {
    if (this.state.search || this.state.filter) {
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
      return this.state.sortedPosts.map((post) => {
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
            <SearchBar onSearchChange={this.onSearch} onNoSearch={this.clear} />
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
                  ? selectedOptions.map((option) => option.value.toLowerCase())
                  : ['emptytext'];
                const skills = (this.state.selectedSkillOptions && this.state.selectedSkillOptions.length > 0)
                  ? this.state.selectedSkillOptions.map((option) => option.value.toLowerCase())
                  : ['emptytext'];
                // this.onChangeFilter(industries, skills);
                this.onFilter(industries, skills);
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
                  ? this.state.selectedIndustryOptions.map((option) => option.value.toLowerCase())
                  : ['emptytext'];
                const skills = (selectedOptions && selectedOptions.length > 0)
                  ? selectedOptions.map((option) => option.value.toLowerCase())
                  : ['emptytext'];
                // this.onChangeFilter(industries, skills);
                this.onFilter(industries, skills);
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
  student: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, {
  fetchPosts,
  fetchStudentByUserID,
})(Posts));
