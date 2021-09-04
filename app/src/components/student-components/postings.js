/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Switch from 'react-switch';
import moment from 'moment';
import PostListItem from './posting-item';
import SearchBar from './search-bar';
import {
  fetchPosts, fetchStudentByUserID, fetchUser, clearPost,
} from '../../actions';
import { fetchIndustriesFromID } from '../../services/datastore';
import '../../styles/postings.scss';
import FilteredSelect from '../select';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedPosts: [],
      sortedVirtualPosts: [],
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
      virtualChecked: false,
      virtualPosts: [],
      archived: [],
      archivedVirtualPosts: [],
      live: [],
      results: [],
    };
    this.handleArchiveChange = this.handleArchiveChange.bind(this);
    this.handleRecommendChange = this.handleRecommendChange.bind(this);
    this.handleVirtualChange = this.handleVirtualChange.bind(this);
  }

  componentDidMount() {
    this.props.clearPost();
    this.props.fetchPosts();
    this.props.fetchStudentByUserID(localStorage.getItem('userID'));
    this.props.fetchUser(localStorage.getItem('userID'));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.posts.length > 0) {
      // Load in approved posts
      const { live } = prevState;
      nextProps.posts.forEach((post) => {
        if (live.filter((livePost) => livePost._id === post._id).length === 0
            && post.status === 'Approved') {
          live.push(post);
        }
      });
      // Set up dropdown options
      const industryOptions = [];
      const skillOptions = [];
      const locationOptions = [];
      const dateOptions = [];
      nextProps.posts.forEach((post) => {
        if (post.industries && post.status === 'Approved') {
          post.industries.forEach((industry) => {
            // Add option if it's not already in the array (not using sets because react-select expects an array)
            if (industryOptions.filter((option) => option.value === industry.name).length === 0) {
              industryOptions.push({ value: industry.name, label: industry.name });
            }
          });
        }
        if (post.startup_id.industries && post.status === 'Approved') {
          fetchIndustriesFromID(post.startup_id.industries, (industry) => {
            if (industryOptions.filter((option) => option.value === industry.name).length === 0) {
              industryOptions.push({ value: industry.name, label: industry.name });
            }
          });
        }
        if (post.required_skills && post.status === 'Approved') {
          post.required_skills.forEach((skill) => {
            // Add option if it's not already in the array
            if (skillOptions.filter((option) => option.value === skill.name).length === 0) {
              skillOptions.push({ value: skill.name, label: skill.name });
            }
          });
        }
        if (post.city && post.state && post.status === 'Approved') {
          const locationString = `${post.city}, ${post.state}`;
          if (locationOptions.filter((option) => option.value === locationString).length === 0) {
            locationOptions.push({ value: locationString, label: locationString });
          }
        }
        if (post.startup_id.city && post.startup_id.state && post.status === 'Approved') {
          const locationString = `${post.startup_id.city}, ${post.startup_id.state}`;
          if (locationOptions.filter((option) => option.value === locationString).length === 0) {
            locationOptions.push({ value: locationString, label: locationString });
          }
        }
        if (post.desired_start_date && post.status === 'Approved') {
          const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'];
          const date = moment(post.desired_start_date);
          const monthName = months[date.month()];
          const dateString = `${monthName}, ${date.year()}`;
          if (dateOptions.filter((option) => option.label === dateString).length === 0) {
            dateOptions.push({ value: date, label: dateString });
          }
        }
      });
      if (industryOptions.length > prevState.industryOptions.length
        || skillOptions.length > prevState.skillOptions.length
        || locationOptions.length > prevState.locationOptions.length
        || dateOptions.length > prevState.dateOptions.length
        || live.length > prevState.live.length) {
        return {
          industryOptions, skillOptions, locationOptions, dateOptions, live,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.live.length > 0 && this.props.student !== {} && this.props.user !== {}
      && (prevProps.posts !== this.props.posts || prevProps.student !== this.props.student)) {
      // Score posts
      this.scorePosts();
      this.sortedVirtualPosts();
      // // Load in approved posts
      // if (prevProps.posts !== this.props.posts) {
      //   this.loadPosts();
      // }
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
      this.state.live.forEach((post) => {
        const numMatches = post.industries?.filter((industry) => studentIndustries.includes(industry.name)).length
        + post.startup_id.industries?.filter((industry) => studentIndustries.includes(industry.name)).length
        + post.desired_classes?.filter((_class) => studentClasses.includes(_class.name)).length
        + post.required_skills?.filter((skill) => studentSkills.includes(skill.name)).length
        // Preferred skills get half the weight of required skills
        + 0.5 * (post.preferred_skills?.filter((skill) => studentSkills.includes(skill.name)).length);
        postScores[post._id] = numMatches;
      });

      // Sort the posts in descending order of score
      this.setState((prevState) => {
        const tempPosts = [...prevState.live];
        tempPosts.sort((post1, post2) => {
          return postScores[post2._id] - postScores[post1._id];
        });
        // tempPosts.forEach((post) => {
        //   console.log(post.title, postScores[post._id]);
        // });
        return {
          ...prevState,
          sortedPosts: tempPosts.slice(0, 6),
        };
      });
    }
  }

  sortedVirtualPosts = () => {
    this.setState({ sortedVirtualPosts: [] });
    if (this.state.recommend && this.state.virtualChecked) {
      console.log('e');
      this.state.sortedPosts.forEach((post) => {
        if (post.virtual === true && post.status === 'Approved') {
          this.setState((prevState) => ({
            sortedVirtualPosts: [...prevState.sortedVirtualPosts, post],
          }));
        }
      });
    }
  }

  archivedVirtualPosts = () => {
    this.setState({ archivedVirtualPosts: [] });
    if (this.state.archive && this.state.virtualChecked) {
      this.props.archived.forEach((post) => {
        if (post.virtual === true && post.status === 'Archived') {
          this.setState((prevState) => ({
            archivedVirtualPosts: [...prevState.archivedVirtualPosts, post],
          }));
        }
      });
    }
  }

  searchAndFilter = (text, selectedInds, selectedSkills, selectedLocations, selectedDates, recommend) => {
    this.setState({ results: [] }, () => this.searchAndFilterCallback(text, selectedInds, selectedSkills, selectedLocations, selectedDates, recommend));
  }

  searchAndFilterCallback = (text, selectedInds, selectedSkills, selectedLocations, selectedDates, recommend) => {
    const searchterm = text.toLowerCase();
    let posts = [];
    if (this.props.user.role === 'admin') {
      if (this.state.virtualChecked && this.state.archive) {
        posts = this.state.archivedVirtualPosts;
      } else if (this.state.virtualChecked) {
        posts = this.state.virtualPosts;
      } else if (this.state.archive) {
        posts = this.state.archived;
      } else {
        posts = this.state.live;
      }
    } else if (this.state.virtualChecked && recommend) {
      posts = this.state.sortedVirtualPosts;
    } else if (this.state.virtualChecked) {
      posts = this.state.virtualPosts;
    } else if (recommend) {
      posts = this.state.sortedPosts;
    } else {
      posts = this.state.live;
    }
    posts.forEach((post) => {
      const skills = post.required_skills?.map((skill) => skill.name.toLowerCase());
      const responsibilities = post.responsibilities?.map((resp) => resp.toLowerCase());
      const postInd = post.industries?.map((industry) => industry.name.toLowerCase());
      const startupInd = [];
      fetchIndustriesFromID(post.startup_id.industries, (industry) => { startupInd.push(industry.name.toLowerCase()); });
      const postLoc = `${post.city}, ${post.state}`;
      const startupLoc = `${post.startup_id.city}, ${post.startup_id.state}`.toLowerCase();
      const startDate = moment(post.desired_start_date);
      // Checks for search
      if (post.title?.toLowerCase().includes(searchterm)
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
      || selectedLocations.includes(startupLoc)
      || selectedDates.some((date) => date.month() === startDate.month() && date.year() === startDate.year())) {
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
    const dates = (this.state.selectedDateOptions && this.state.selectedDateOptions.length > 0)
      ? this.state.selectedDateOptions.map((option) => option.value)
      : [moment('1111-11-11')];
    this.searchAndFilter(text, industries, skills, locations, dates, this.state.recommend);
    this.setState({ search: true, searchterm: text });
  }

  isFilterEmpty = (array) => {
    if (array.length === 1 && array.includes('emptytext')) return true;
    else if (array.length === 1 && array[0]._isAMomentObject) {
      return array[0].year() === 1111;
    }
    return false;
  }

  onFilter = (industries, skills, locations, dates) => {
    if (this.isFilterEmpty(industries) && this.isFilterEmpty(skills) && this.isFilterEmpty(locations) && this.isFilterEmpty(dates)) {
      this.setState({ filter: false });
    } else this.setState({ filter: true });
    this.searchAndFilter(this.state.searchterm, industries, skills, locations, dates, this.state.recommend);
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
    const dates = (this.state.selectedDateOptions && this.state.selectedDateOptions.length > 0)
      ? this.state.selectedDateOptions.map((option) => option.value)
      : [moment('1111-11-11')];
    this.searchAndFilter('emptytext', industries, skills, locations, dates, this.state.recommend);
  }

  // Now doing this in getDerivedStateFromProps to have live posts accessible in scorePosts
  // loadPosts() {
  //   this.props.posts.forEach((post) => {
  //     if (post.status === 'Approved') {
  //       this.setState((prevState) => ({
  //         live: [...prevState.live, post],
  //       }));
  //     }
  //   });
  // }

  handleVirtualChange(checked) {
    this.setState({ virtualChecked: checked });
    this.setState({ virtualPosts: [] });
    if (checked) {
      this.props.posts.forEach((post) => {
        if (post.virtual === true && post.status === 'Approved') {
          this.setState((prevState) => ({
            virtualPosts: [...prevState.virtualPosts, post],
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
    const dates = (this.state.selectedDateOptions && this.state.selectedDateOptions.length > 0)
      ? this.state.selectedDateOptions.map((option) => option.value)
      : [moment('1111-11-11')];
    this.searchAndFilter(this.state.searchterm, industries, skills, locations, dates, this.state.recommend);
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
    const dates = (this.state.selectedDateOptions && this.state.selectedDateOptions.length > 0)
      ? this.state.selectedDateOptions.map((option) => option.value)
      : [moment('1111-11-11')];
    this.searchAndFilter(this.state.searchterm, industries, skills, locations, dates, this.state.recommend);
  }

  handleRecommendChange(checked) {
    this.setState({ recommend: checked });
    const industries = (this.state.selectedIndustryOptions && this.state.selectedIndustryOptions.length > 0)
      ? this.state.selectedIndustryOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    const skills = (this.state.selectedSkillOptions && this.state.selectedSkillOptions.length > 0)
      ? this.state.selectedSkillOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    const locations = (this.state.selectedLocationOptions && this.state.selectedLocationOptions.length > 0)
      ? this.state.selectedLocationOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    const dates = (this.state.selectedDateOptions && this.state.selectedDateOptions.length > 0)
      ? this.state.selectedDateOptions.map((option) => option.value)
      : [moment('1111-11-11')];
    this.searchAndFilter(this.state.searchterm, industries, skills, locations, dates, !this.state.recommend);
  }

  renderPosts() {
    let posts;
    if (this.state.search || this.state.filter) {
      if (this.state.results.length > 0) {
        return this.state.results.map((post) => {
          return (
            <PostListItem user={this.props.user} post={post} key={post.id} />
          );
        });
      } else {
        return (
          <div> Sorry, no positions match that query</div>
        );
      }
    } else if (this.state.archive && this.state.virtualChecked) {
      posts = this.state.archivedVirtualPosts;
    } else if (this.state.archive) {
      posts = this.state.archived;
    } else if (this.state.virtualChecked && this.state.recommend) {
      posts = this.state.sortedVirtualPosts;
    } else if (this.state.virtualChecked) {
      posts = this.state.virtualPosts;
    } else {
      posts = this.state.recommend ? this.state.sortedPosts : this.state.live;
    }
    return posts.map((post) => {
      return (
        <PostListItem user={this.props.user} post={post} key={post.id} />
      );
    });
  }

  renderButtons() {
    if (this.props.user.role === 'admin') {
      return (
        <div id="filters">
          <div className="toggleGroup">
            <span>View Archived Volunteer Positions: </span>
            <div id="toggle">
              <Switch onChange={this.handleArchiveChange} checked={this.state.archive} />
            </div>
          </div>

          <div className="toggleGroup">
            <span>View Virtual Positions: </span>
            <div id="toggle">
              <Switch onChange={this.handleVirtualChange} checked={this.state.virtualChecked} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="filters">
          <div className="toggleGroup">
            <span>View Recommended Volunteer Positions: </span>
            <div id="toggle">
              <Switch onChange={this.handleRecommendChange} checked={this.state.recommend} />
            </div>
          </div>

          <div className="toggleGroup">
            <span>View Virtual Positions: </span>
            <div id="toggle">
              <Switch onChange={this.handleVirtualChange} checked={this.state.virtualChecked} />
            </div>
          </div>
        </div>
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
      multiValue: (base, state) => {
        let bgColor;
        // TODO: link bgColor automatically to css of .greenPill and .yellowPill
        if (state.selectProps.name == 'industry-filter') bgColor = 'rgba(221, 192, 88, 0.514)';
        else if (state.selectProps.name == 'skill-filter') bgColor = 'rgba(69, 185, 144, 0.5)';

        return {
          ...base,
          borderRadius: '10px',
          backgroundColor: bgColor,
        };
      },
    };
    return (
      this.props.posts && this.state.results
        ? (
          <div className="pageContent">
            <h1 className="postingsTitle"> View All Volunteer Positions</h1>
            <div className="listContent">
              <div className="sideFilterBar">
                <SearchBar onSearchChange={this.onSearch} onNoSearch={this.clear} />
                <FilteredSelect
                  isMulti
                  className="filter"
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
                    const dates = (this.state.selectedDateOptions && this.state.selectedDateOptions.length > 0)
                      ? this.state.selectedDateOptions.map((option) => option.value)
                      : [moment('1111-11-11')];
                    this.onFilter(industries, skills, locations, dates);
                  }}
                />
                <FilteredSelect
                  isMulti
                  className="filter"
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
                    const dates = (this.state.selectedDateOptions && this.state.selectedDateOptions.length > 0)
                      ? this.state.selectedDateOptions.map((option) => option.value)
                      : [moment('1111-11-11')];
                    this.onFilter(industries, skills, locations, dates);
                  }}
                />
                <FilteredSelect
                  isMulti
                  className="filter"
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
                    const dates = (this.state.selectedDateOptions && this.state.selectedDateOptions.length > 0)
                      ? this.state.selectedDateOptions.map((option) => option.value)
                      : [moment('1111-11-11')];
                    this.onFilter(industries, skills, locations, dates);
                  }}
                />
                <FilteredSelect
                  isMulti
                  className="filter"
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
                      ? selectedOptions.map((option) => option.value)
                      : [moment('1111-11-11')];
                    this.onFilter(industries, skills, locations, dates);
                  }}
                />
              </div>
              <div className="rightSide">
                {this.renderButtons()}
                <div className="list">
                  {this.renderPosts()}
                </div>
              </div>
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
  clearPost,
})(Posts));
