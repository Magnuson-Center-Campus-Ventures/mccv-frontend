/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import SearchBar from '../student-components/search-bar';
import { fetchStudents, fetchStartupByUserID } from '../../actions';
import '../../styles/postings.scss';
import StudentListItem from './student-item';

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedStudents: [],
      industryOptions: [],
      selectedIndustryOptions: [],
      skillOptions: [],
      selectedSkillOptions: [],
      searchterm: 'emptytext',
      recommend: false,
      search: false,
      filter: false,
      results: [],
    };
  }

  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchStartupByUserID(localStorage.getItem('userID'));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.students.length > 0) {
      const industryOptions = [];
      const skillOptions = [];
      nextProps.students.forEach((student) => {
        if (student.interested_industries) {
          student.interested_industries.forEach((industry) => {
            // Add option if it's not already in the array (not using sets because react-select expects an array)
            if (industryOptions.filter((option) => option.value === industry.name).length === 0) {
              industryOptions.push({ label: industry.name, value: industry.name });
            }
          });
        }
        if (student.skills) {
          student.skills.forEach((skill) => {
            // Add option if it's not already in the array
            if (skillOptions.filter((option) => option.value === skill.name).length === 0) {
              skillOptions.push({ label: skill.name, value: skill.name });
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
    if (this.props.students.length > 0 && this.props.startup !== {}
      && (prevProps.students !== this.props.students || prevProps.startup !== this.props.startup)) {
      // Score students
      this.scoreStudents();
    }
  }

  scoreStudents = () => {
    const startupIndustries = [];
    const postsReqSkills = [];
    const postsPrefSkills = [];
    const postsClasses = [];
    if (this.props.startup.industries) {
      this.props.startup.industries.forEach((industry) => {
        startupIndustries.push(industry);
      });
    }
    if (this.props.startup.posts) {
      this.props.startup.posts.forEach((post) => {
        post.required_skills.forEach((skill) => {
          postsReqSkills.push(skill);
        });
        post.preferred_skills.forEach((skill) => {
          postsPrefSkills.push(skill);
        });
        post.desired_classes.forEach((_class) => {
          postsClasses.push(_class);
        });
      });
    }
    // Score each student by the number of common elements between the student's and startup's industry arrays
    const studentScores = {};
    this.props.students.forEach((student) => {
      const numMatches = student.interested_industries.filter((industry) => startupIndustries.includes(industry.name)).length
        + student.skills.filter((skill) => postsReqSkills.includes(skill.name)).length
        // Preferred skills get half the weight of required skills
        + 0.5 * (student.skills.filter((skill) => postsPrefSkills.includes(skill.name)).length)
        + student.relevant_classes.filter((_class) => postsClasses.includes(_class.name)).length;
      studentScores[student._id] = numMatches;
    });

    // Sort the posts in descending order of score
    const tempStudents = this.props.students;
    tempStudents.sort((student1, student2) => {
      return studentScores[student2._id] - studentScores[student1._id];
    });
    tempStudents.forEach((student) => {
      console.log(student.first_name, studentScores[student._id]);
    });
    this.setState({ sortedStudents: tempStudents.slice(0, 1) });
  }

  searchAndFilter = (text, selectedInds, selectedSkills, recommend) => {
    this.setState({ results: [] });
    const searchterm = text.toLowerCase();
    const students = recommend ? this.state.sortedStudents : this.props.students;
    students.map((student) => {
      const majors = student.majors.map((major) => major.toLowerCase());
      const minors = student.minors.map((minor) => minor.toLowerCase());
      const skills = student.skills.map((skill) => skill.name.toLowerCase());
      const classes = student.relevant_classes.map((_class) => _class.name.toLowerCase());
      const industries = student.interested_industries.map((industry) => industry.name.toLowerCase());
      // Checks for search
      if (student.first_name.toLowerCase().includes(searchterm)
      || student.last_name.toLowerCase().includes(searchterm)
      || student.grad_year.includes(searchterm)
      || majors.includes(searchterm) // array
      || minors.includes(searchterm) // array
      || skills.includes(searchterm) // array
      || classes.includes(searchterm) // array
      || industries.includes(searchterm) // array
      // Checks for filter
      || selectedInds.some((industry) => industries.includes(industry))
      || selectedSkills.some((skill) => skills.includes(skill))) {
        this.setState((prevState) => ({
          results: [...prevState.results, student],
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
    this.searchAndFilter(text, industries, skills, this.state.recommend);
    this.setState({ search: true, searchterm: text });
  }

  isFilterEmpty = (array) => {
    return array.length === 1 && array.includes('emptytext');
  }

  onFilter = (industries, skills) => {
    if (this.isFilterEmpty(industries) && this.isFilterEmpty(skills)) {
      this.setState({ filter: false });
    } else this.setState({ filter: true });
    this.searchAndFilter(this.state.searchterm, industries, skills, this.state.recommend);
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
    this.searchAndFilter('emptytext', industries, skills, this.state.recommend);
  }

  renderStudents() {
    if (this.state.search || this.state.filter) {
      if (this.state.results.length > 0) {
        return this.state.results.map((student) => {
          return <StudentListItem student={student} key={student.id} />;
        });
      } else {
        return (
          <div> Sorry, no students match that query</div>
        );
      }
    } else {
      const students = this.state.recommend ? this.state.sortedStudents : this.props.students;
      return students.map((student) => {
        return (
          <StudentListItem student={student} key={student.id} />
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
      (this.props.students !== undefined || null) && (this.state.results !== null || undefined)
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
                this.onFilter(industries, skills);
              }}
            />
            <button type="button"
              onClick={this.onRecommendPress}
            >{this.state.recommend ? 'Show All Students' : 'Show Recommended Students'}
            </button>
            <div className="list">
              {this.renderStudents()}
            </div>
          </div>

        ) : (
          <div>Loading...</div>
        )
    );
  }
}

const mapStateToProps = (reduxState) => ({
  students: reduxState.students.all_students,
  startup: reduxState.startups.current,
});

export default withRouter(connect(mapStateToProps, { fetchStudents, fetchStartupByUserID })(Students));
