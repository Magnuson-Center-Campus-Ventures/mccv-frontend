/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Switch from 'react-switch';
import moment from 'moment';
import PostListItem from './posting-item';
import SearchBar from './search-bar';
import {
  fetchPosts, fetchStudentByUserID, fetchUser,
} from '../../actions';
import { fetchIndustriesFromID } from '../../services/datastore';
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
      dateOptions: [],
      selectedDateOptions: [],
      searchterm: 'emptytext',
      recommend: false,
      search: false,
      filter: false,
      archive: false,
      archived: [],
      live: [],
      results: [],
    };
    this.handleArchiveChange = this.handleArchiveChange.bind(this);
    // this.handleLiveChange = this.handleLiveChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchStudentByUserID(localStorage.getItem('userID'));
    this.props.fetchUser(localStorage.getItem('userID'));

    // Set up options for date dropdown
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    const dateOptions = [];
    for (let i = 0; i < 13; i += 1) {
      const newMonth = moment().add(i, 'months');
      const monthName = newMonth.month() === 11 ? months[0] : months[newMonth.month() + 1];
      dateOptions.push({ value: newMonth, label: `${monthName}, ${newMonth.year()}` });
    }
    console.log(dateOptions);
    this.setState({ dateOptions });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.posts.length > 0) {
      const industryOptions = [];
      const skillOptions = [];
      const locationOptions = [];
      nextProps.posts.forEach((post) => {
        console.log(post.desired_start_date, post.desired_end_date);
        if (post.industries) {
          post.industries.forEach((industry) => {
            // Add option if it's not already in the array (not using sets because react-select expects an array)
            if (industryOptions.filter((option) => option.value === industry.name).length === 0) {
              industryOptions.push({ value: industry.name, label: industry.name });
            }
          });
        }
        if (post.startup_id.industries) {
          post.startup_id.industries.forEach((industry) => {
            // Add option if it's not already in the array (not using sets because react-select expects an array)
            if (industryOptions.filter((option) => option.value === industry.name).length === 0) {
              industryOptions.push({ value: industry.name, label: industry.name });
            }
          });
        }
        if (post.required_skills) {
          post.required_skills.forEach((skill) => {
            // Add option if it's not already in the array
            if (skillOptions.filter((option) => option.value === skill.name).length === 0) {
              skillOptions.push({ value: skill.name, label: skill.name });
            }
          });
        }
        if (post.city && post.state) {
          const locationString = `${post.city}, ${post.state}`;
          if (locationOptions.filter((option) => option.value === locationString).length === 0) {
            locationOptions.push({ value: locationString, label: locationString });
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
      // Load in approved posts
      if (prevProps.posts !== this.props.posts) {
        this.loadPosts();
      }
    }
  }

  scorePosts = () => {
    const studentIndustries = [];
    const studentSkills = [];
    const studentClasses = [];
    if (this.props.user.role === 'student') {
      if (this.props.student?.interested_industries) {
        this.props.student.interested_industries.forEach((industry) => {
          studentIndustries.push(industry.name);
        });
      }
      if (this.props.student?.skills) {
        this.props.student.skills.forEach((skill) => {
          studentSkills.push(skill.name);
        });
      }
      if (this.props.student?.relevant_classes) {
        this.props.student.relevant_classes.forEach((_class) => {
          studentClasses.push(_class.name);
        });
      }
      // Score each post by the number of common elements between the student's and post's industry, skill, and class arrays
      const postScores = {};
      this.props.posts.forEach((post) => {
        const numMatches = post.industries.filter((industry) => studentIndustries.includes(industry.name)).length
        + post.startup_id.industries.filter((industry) => studentIndustries.includes(industry.name)).length
        + post.desired_classes.filter((_class) => studentClasses.includes(_class.name)).length
        + post.required_skills.filter((skill) => studentSkills.includes(skill.name)).length
        // Preferred skills get half the weight of required skills
        + 0.5 * (post.preferred_skills.filter((skill) => studentSkills.includes(skill.name)).length);
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
    this.setState({ results: [] }, () => this.searchAndFilterCallback(text, selectedInds, selectedSkills, selectedLocations, recommend));
  }

  searchAndFilterCallback = (text, selectedInds, selectedSkills, selectedLocations, recommend) => {
    const searchterm = text.toLowerCase();
    let posts = [];
    if (this.props.user.role === 'admin') {
      posts = this.state.archive ? this.state.archived : this.state.live;
    } else {
      posts = recommend ? this.state.sortedPosts : this.state.live;
    }
    posts.forEach((post) => {
      const skills = post.required_skills.map((skill) => skill.name.toLowerCase());
      const responsibilities = post.responsibilities.map((resp) => resp.toLowerCase());
      const postInd = post.industries.map((industry) => industry.name.toLowerCase());
      const startupInd = [];
      fetchIndustriesFromID(post.startup_id.industries, (industry) => { startupInd.push(industry.name.toLowerCase()); });
      const postLoc = `${post.city}, ${post.state}`;
      const startupLoc = `${post.startup_id.city}, ${post.startup_id.state}`.toLowerCase();
      // console.log(startupLoc);
      // Checks for search
      if (post.title.toLowerCase().includes(searchterm)
      || postLoc.toLowerCase().includes(searchterm)
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

  loadPosts() {
    this.props.posts.forEach((post) => {
      if (post.status === 'Approved') {
        this.setState((prevState) => ({
          live: [...prevState.live, post],
        }));
      }
    });
  }

  handleArchiveChange(checked) {
    this.setState({ archive: checked });
    this.setState({ archived: [] });
    if (checked) {
      this.props.posts.forEach((post) => {
        if (post.status === 'Archived') {
          this.setState((prevState) => ({
            archived: [...prevState.archived, post],
          }));
        }
      });
    }
    const industries = (this.state.selectedIndustryOptions && this.state.selectedIndustryOptions.length > 0)
      ? this.state.selectedIndustryOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    const skills = (this.state.selectedSkillOptions && this.state.selectedSkillOptions.length > 0)
      ? this.state.selectedSkillOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    const locations = (this.state.selectedLocationOptions && this.state.selectedLocationOptions.length > 0)
      ? this.state.selectedLocationOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    this.searchAndFilter(this.state.searchterm, industries, skills, locations, this.state.recommend);
  }

  renderPosts() {
    if (this.state.search || this.state.filter) {
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
    } else if (this.state.archive) {
      const posts = this.state.archived;
      return posts.map((post) => {
        return (
          <PostListItem user={this.props.user} post={post} key={post.id} />
        );
      });
    } else {
      const posts = this.state.recommend ? this.state.sortedPosts : this.state.live;
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
            <Select
              isMulti
              styles={dropdownStyles}
              name="start-date-filter"
              placeholder="Filter by start date"
              options={this.state.dateOptions}
              value={this.state.selectedDateOptions}
              onChange={(selectedOptions) => {
                this.setState({ selectedDateOptions: selectedOptions });
                const industries = (this.state.selectedIndustryOptions && this.state.selectedIndustryOptions.length > 0)
                  ? this.state.selectedIndustryOptions.map((option) => option.value.toLowerCase())
                  : ['emptytext'];
                const skills = (this.state.selectedSkillOptions && this.state.selectedSkillOptions.length > 0)
                  ? this.state.selectedSkillOptions.map((option) => option.value.toLowerCase())
                  : ['emptytext'];
                const locations = (this.state.selectedLocationOptions && this.state.selectedLocationOptions.length > 0)
                  ? this.state.selectedLocationOptions.map((option) => option.value)
                  : ['emptytext'];
                const dates = (selectedOptions && selectedOptions.length > 0)
                  ? selectedOptions.map((option) => option.value.month())
                  : ['emptytext'];
                console.log(dates);
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
