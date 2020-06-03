import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Switch from 'react-switch';
import PostListItem from './posting-item';
import SearchBar from './search-bar';
import {
  fetchPosts, fetchStudentByUserID, fetchUser,
} from '../../actions';
// import ToggleSwitch from './toggle-switch';

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
      locationOptions: [],
      selectedLocationOptions: [],
      searchterm: 'emptytext',
      recommend: false,
      search: false,
      filter: false,
      archive: false,
      live: false,
      results: [],
    };
    this.handleArchiveChange = this.handleArchiveChange.bind(this);
    this.handleLiveChange = this.handleLiveChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchStudentByUserID(localStorage.getItem('userID'));
    this.props.fetchUser(localStorage.getItem('userID'));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.posts.length > 0) {
      const industryOptions = [];
      const skillOptions = [];
      const locationOptions = [];
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
        if (post.location) {
          if (locationOptions.filter((option) => option.value === post.location).length === 0) {
            locationOptions.push({ value: post.location, label: post.location });
          }
        }
        if (post.startup_id.city && post.startup_id.state) {
          const locationString = `${post.startup_id.city}, ${post.startup_id.state}`;
          if (locationOptions.filter((option) => option.value === locationString).length === 0) {
            locationOptions.push({ value: locationString, label: locationString });
          }
        }
      });
      if (industryOptions.length > prevState.industryOptions.length
        || skillOptions.length > prevState.skillOptions.length
        || locationOptions.length > prevState.locationOptions.length) {
        return {
          industryOptions, skillOptions, locationOptions,
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

  scorePosts = () => {
    const studentIndustries = [];
    const studentSkills = [];
    const studentClasses = [];
    if (this.props.user.role === 'student') {
      if (this.props.student.interested_industries) {
        this.props.student.interested_industries.forEach((industry) => {
          studentIndustries.push(industry.name);
        });
      }
      if (this.props.student.skills) {
        this.props.student.skills.forEach((skill) => {
          studentSkills.push(skill.name);
        });
      }
      if (this.props.student.relevant_classes) {
        this.props.student.relevant_classes.forEach((_class) => {
          studentClasses.push(_class.name);
        });
      }
      // Score each post by the number of common elements between the student's and post's industry, skill, and class arrays
      const postScores = {};
      this.props.posts.forEach((post) => {
        const numMatches = post.industries.filter((industry) => studentIndustries.includes(industry)).length
        + post.startup_id.industries.filter((industry) => studentIndustries.includes(industry)).length
        + post.desired_classes.filter((_class) => studentClasses.includes(_class)).length
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
        // console.log(post.title, postScores[post._id]);
      });
      this.setState({ sortedPosts: tempPosts.slice(0, 3) });
    }
  }

  searchAndFilter = (text, selectedInds, selectedSkills, selectedLocations, recommend) => {
    this.setState({ results: [] });
    const searchterm = text.toLowerCase();
    const posts = recommend ? this.state.sortedPosts : this.props.posts;
    posts.forEach((post) => {
      const skills = post.required_skills.map((skill) => skill.toLowerCase());
      const responsibilities = post.responsibilities.map((resp) => resp.toLowerCase());
      const postInd = post.industries.map((industry) => industry.toLowerCase());
      const startupInd = post.startup_id.industries.map((industry) => industry.toLowerCase());
      const postLoc = post.location;
      const startupLoc = `${post.startup_id.city}, ${post.startup_id.state}`;
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
      || selectedSkills.some((skill) => skills.includes(skill))
      || selectedLocations.includes(postLoc)
      || selectedLocations.includes(startupLoc)) {
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
    const locations = (this.state.selectedLocationOptions && this.state.selectedLocationOptions.length > 0)
      ? this.state.selectedLocationOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    this.searchAndFilter(text, industries, skills, locations, this.state.recommend);
    this.setState({ search: true, searchterm: text });
  }

  isFilterEmpty = (array) => {
    return array.length === 1 && array.includes('emptytext');
  }

  onFilter = (industries, skills, locations) => {
    if (this.isFilterEmpty(industries) && this.isFilterEmpty(skills) && this.isFilterEmpty(locations)) {
      this.setState({ filter: false });
    } else this.setState({ filter: true });
    this.searchAndFilter(this.state.searchterm, industries, skills, locations, this.state.recommend);
  }

  onRecommendPress = () => {
    const industries = (this.state.selectedIndustryOptions && this.state.selectedIndustryOptions.length > 0)
      ? this.state.selectedIndustryOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    const skills = (this.state.selectedSkillOptions && this.state.selectedSkillOptions.length > 0)
      ? this.state.selectedSkillOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    this.searchAndFilter(this.state.searchterm, industries, skills, !this.state.recommend);
    this.setState((prevState) => ({ recommend: !prevState.recommend }));
  }

  clear = () => {
    this.setState({ search: false, searchterm: 'emptytext' });
    const industries = (this.state.selectedIndustryOptions && this.state.selectedIndustryOptions.length > 0)
      ? this.state.selectedIndustryOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    const skills = (this.state.selectedSkillOptions && this.state.selectedSkillOptions.length > 0)
      ? this.state.selectedSkillOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    const locations = (this.state.selectedLocationOptions && this.state.selectedLocationOptions.length > 0)
      ? this.state.selectedLocationOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    this.searchAndFilter('emptytext', industries, skills, locations, this.state.recommend);
  }

  handleArchiveChange(checked) {
    this.setState({ archive: checked });
    this.setState({ results: [] });
    if (checked) {
      this.props.posts.forEach((post) => {
        if (post.status === 'Archived') {
          this.setState((prevState) => ({
            results: [...prevState.results, post],
          }));
        }
      });
    }
  }

  handleLiveChange(checked) {
    this.setState({ live: checked });
    this.setState({ results: [] });
    if (checked) {
      this.props.posts.forEach((post) => {
        if (post.status === 'Approved') {
          this.setState((prevState) => ({
            results: [...prevState.results, post],
          }));
        }
      });
    }
  }

  renderPosts() {
    if (this.state.search || this.state.filter || this.state.archive || this.state.live) {
      if (this.state.results.length > 0) {
        return this.state.results.map((post) => {
          return (
            <PostListItem user={this.props.user} post={post} key={post.id} />
          );
        });
      } else {
        return (
          <div> Sorry, no postings match that query</div>
        );
      }
    } else {
      const posts = this.state.recommend ? this.state.sortedPosts : this.props.posts;
      return posts.map((post) => {
        return (
          <PostListItem user={this.props.user} post={post} key={post.id} />
        );
      });
    }
  }

  renderButtons() {
    if (this.props.user.role === 'admin') {
      return (
        <div id="filters">
          <h3>show archived: </h3>
          <Switch id="archiveToggle" onChange={this.handleArchiveChange} checked={this.state.archive} />
          <h3>show live posts:</h3>
          <Switch id="archiveToggle" onChange={this.handleLiveChange} checked={this.state.live} />
        </div>
      );
    } else {
      return (
        <button type="button"
          onClick={this.onRecommendPress}
        >{this.state.recommend ? 'Show All Posts' : 'Show Recommended Posts'}
        </button>
      );
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
      this.props.posts && this.state.results
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
                const locations = (this.state.selectedLocationOptions && this.state.selectedLocationOptions.length > 0)
                  ? this.state.selectedLocationOptions.map((option) => option.value)
                  : ['emptytext'];
                this.onFilter(industries, skills, locations);
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
                const locations = (this.state.selectedLocationOptions && this.state.selectedLocationOptions.length > 0)
                  ? this.state.selectedLocationOptions.map((option) => option.value)
                  : ['emptytext'];
                this.onFilter(industries, skills, locations);
              }}
            />
            <Select
              isMulti
              styles={dropdownStyles}
              name="location-filter"
              placeholder="Filter by location"
              options={this.state.locationOptions}
              value={this.state.selectedLocationOptions}
              onChange={(selectedOptions) => {
                this.setState({ selectedLocationOptions: selectedOptions });
                const industries = (this.state.selectedIndustryOptions && this.state.selectedIndustryOptions.length > 0)
                  ? this.state.selectedIndustryOptions.map((option) => option.value.toLowerCase())
                  : ['emptytext'];
                const skills = (this.state.selectedSkillOptions && this.state.selectedSkillOptions.length > 0)
                  ? this.state.selectedSkillOptions.map((option) => option.value.toLowerCase())
                  : ['emptytext'];
                const locations = (selectedOptions && selectedOptions.length > 0)
                  ? selectedOptions.map((option) => option.value)
                  : ['emptytext'];
                this.onFilter(industries, skills, locations);
              }}
            />
            {this.renderButtons()}
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
  user: reduxState.user.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchPosts,
  fetchStudentByUserID,
  fetchUser,
})(Posts));
