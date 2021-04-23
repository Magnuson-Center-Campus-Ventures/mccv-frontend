/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import SearchBar from '../student-components/search-bar';
import StartupSubmittedApplicationTileItem from './startup-submitted-application-tile-item';
import {
  fetchSubmittedApplication,
  fetchSubmittedApplications,
  fetchPosts,
  fetchStartupByUserID,
  clearApplication,
  clearPost,
  fetchStudents,
} from '../../actions';
import FilteredSelect from '../select';
//import '../../styles/applications.scss';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

class SubmittedApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startupApplications: [],
      statusOptions: [],
      applicationToTitle: {},
      selectedStatusOptions: [],
      titleOptions: [],
      selectedTitleOptions: [],
      searchterm: 'emptytext',
      search: false,
      filter: false,
      results: [],
    };
    this.filterByCompany = this.filterByCompany.bind(this);
  }

  componentDidMount() {
    this.props.clearPost();
    this.props.clearApplication();
    this.props.fetchStartupByUserID(localStorage.getItem('userID'));
    this.props.fetchStudents();
    this.props.fetchSubmittedApplications();
    this.props.fetchPosts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.submittedApplications.length > 0 && this.props.posts.length > 0
      && (prevProps.submittedApplications !== this.props.submittedApplications || prevProps.posts !== this.props.posts || this.state.startupApplications.length === 0)) {
      this.filterByCompany();
    }
  }

  searchAndFilter = (text, selectedStatuses, selectedTitles) => {
    this.setState({ results: [] });
    const searchterm = text.toLowerCase();
    const { startupApplications } = this.state;
    startupApplications.map((application) => {
      if (application.status.toLowerCase().includes(searchterm)
      || this.state.applicationToTitle[application.post_id].toLowerCase().includes(searchterm)
      // Checks for filter
      || selectedStatuses.some((status) => application.status.toLowerCase().includes(status))
      || selectedTitles.some((title) => this.state.applicationToTitle[application.post_id].toLowerCase().includes(title))) {
        this.setState((prevState) => ({
          results: [...prevState.results, application],
        }));
      }
    });
  }

  onSearch = (text) => {
    const statuses = (this.state.selectedStatusOptions && this.state.selectedStatusOptions.length > 0)
      ? this.state.selectedStatusOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];

    const titles = (this.state.selectedTitleOptions && this.state.selectedTitleOptions.length > 0)
      ? this.state.selectedTitleOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    this.searchAndFilter(text, statuses, titles);
    this.setState({ search: true, searchterm: text });
  }

  isFilterEmpty = (array) => {
    return array.length === 1 && array.includes('emptytext');
  }

  onFilter = (statuses, titles) => {
    if (this.isFilterEmpty(statuses) && this.isFilterEmpty(titles)) {
      this.setState({ filter: false });
    } else this.setState({ filter: true });
    this.searchAndFilter(this.state.searchterm, statuses, titles);
  }

  clear = () => {
    this.setState({ search: false, searchterm: 'emptytext' });
    const statuses = (this.state.selectedStatusOptions && this.state.selectedStatusOptions.length > 0)
      ? this.state.selectedStatusOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    const titles = (this.state.selectedTitleOptions && this.state.selectedTitleOptions.length > 0)
      ? this.state.selectedTitleOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    this.searchAndFilter('emptytext', statuses, titles);
  }

  filterByCompany() {
    const startupPostIds = [];
    const updatedStartupApplications = [];
    const newStatusOptions = [];
    const newTitleOptions = [];
    const newApplicationToTitle = {};
    this.props.posts.map((post) => {
      if (post.startup_id._id === this.props.startup._id) {
        startupPostIds.push(post._id);
        if (newTitleOptions.filter((option) => option.value === post.title).length === 0) {
          newTitleOptions.push({ label: post.title, value: post.title });
        }
        newApplicationToTitle[post._id] = post.title;
      }
    });
    this.props.submittedApplications.map((application) => {
      if (startupPostIds.includes(application.post_id)) {
        updatedStartupApplications.push(application);
      }
    });
    if (updatedStartupApplications.length > 0) {
      updatedStartupApplications.forEach((application) => {
        // Add option if it's not already in the array (not using sets because react-select expects an array)
        if (newStatusOptions.filter((option) => option.value === application.status).length === 0) {
          newStatusOptions.push({ label: application.status, value: application.status });
        }
      });

      this.setState({
        startupApplications: updatedStartupApplications, statusOptions: newStatusOptions, titleOptions: newTitleOptions, applicationToTitle: newApplicationToTitle,
      });
    }
  }

  renderApplicationItem(application) {
    const route = `/startupsubmittedapplications/${application._id}`;
    const post = this.props.posts.filter((e) => { return (e.id === application.post_id); })[0];
    const student = this.props.students.filter((e) => { return (e.id === application.student_id); })[0];
    {/*const majors = student.majors.length > 1
      ? (
        student.majors.map((major, index) => {
          return (
            <div id="pill major" key={index}>
              {major}
            </div>
          );
        })
      ) : (
        <div id="pill major">
          Major: {student.majors[0]}
        </div>
      );*/}
    return (
      <Link to={route} key={application.id} className="listItem link">
        <StartupSubmittedApplicationTileItem key={application.id} post={post} student={student} status={application.status}/>
        {/*<div className="basic-info">
          <h1 className="studentName">{`${student.first_name} ${student.last_name}`} </h1>
          <h2 className="gradYear">Class of {student.grad_year} </h2>
          <h2 className="major"> {majors} </h2>
        </div>
        <div className="post-info">
          <div id="info">
            <div id="applied">Applied to: </div>
            <div id="pill-title">{post.title}</div>
          </div>
          <div id="info">
            <div id="status">Status: </div>
            <div id="pill-status">{application.status}</div>
          </div>
        </div>*/}
      </Link>
    );
  }

  renderApplications() {
    if (this.state.search || this.state.filter) {
      if (this.state.results.length > 0) {
        return this.state.results.map((application) => {
          return this.renderApplicationItem(application);
        });
      } else {
        return (
          <div> Sorry, no applications match that query</div>
        );
      }
    } else {
      const { startupApplications } = this.state;
      return startupApplications.map((application) => {
        return this.renderApplicationItem(application);
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
      (this.state.startupApplications !== undefined || null)
      && (this.state.results !== null || undefined)
      && ((this.props.students !== null || undefined) && !isEmpty(this.props.students))
      && ((this.props.posts !== null || undefined) && !isEmpty(this.props.students))
        ? (
          <div className="pageContent">
            <h1 className="postingsTitle"> View All Received Applications </h1>
            <div className="listContent">
              <div className="sideFilterBar">
                <SearchBar onSearchChange={this.onSearch} onNoSearch={this.clear} />
                <FilteredSelect
                  isMulti
                  styles={dropdownStyles}
                  name="status-filter"
                  className="filter"
                  placeholder="Filter by Status"
                  options={this.state.statusOptions}
                  value={this.state.selectedStatusOptions}
                  onChange={(selectedOptions) => {
                    this.setState({ selectedStatusOptions: selectedOptions });
                    const titles = (this.state.selectedTitleOptions && this.state.selectedTitleOptions.length > 0)
                      ? this.state.selectedTitleOptions.map((option) => option.value.toLowerCase())
                      : ['emptytext'];
                    const statuses = (selectedOptions && selectedOptions.length > 0)
                      ? selectedOptions.map((option) => option.value.toLowerCase())
                      : ['emptytext'];
                    this.onFilter(statuses, titles);
                  }}
                />
                <FilteredSelect
                  isMulti
                  styles={dropdownStyles}
                  name="title-filter"
                  className="filter"
                  placeholder="Filter by Position"
                  options={this.state.titleOptions}
                  value={this.state.selectedTitleOptions}
                  onChange={(selectedOptions) => {
                    this.setState({ selectedTitleOptions: selectedOptions });
                    const titles = (selectedOptions && selectedOptions.length > 0)
                      ? selectedOptions.map((option) => option.value.toLowerCase())
                      : ['emptytext'];
                    const statuses = (this.state.selectedStatusOptions && this.state.selectedStatusOptions.length > 0)
                      ? this.state.selectedStatusOptions.map((option) => option.value.toLowerCase())
                      : ['emptytext'];
                    this.onFilter(statuses, titles);
                  }}
                />
              </div>
              <div className="rightSide">
                <div className="list">
                  {this.renderApplications()}
                </div>
              </div>

            </div>

          </div>

        ) : (
          <div className="pageContent">
            <h1 className="postingsTitle"> No Applications Received </h1>
          </div>
        )
    );
  }
}
const mapStateToProps = (reduxState) => ({
  students: reduxState.students.all_students,
  startup: reduxState.startups.current,
  submittedApplications: reduxState.submittedApplications.all,
  posts: reduxState.posts.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchStudents,
  fetchPosts,
  fetchSubmittedApplication,
  fetchSubmittedApplications,
  fetchStartupByUserID,
  clearApplication,
  clearPost,
})(SubmittedApplications));
