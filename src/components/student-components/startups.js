import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Switch from 'react-switch';
import StartupListItem from './startup-item';
import SearchBar from './search-bar';
import { fetchStartups, fetchUser } from '../../actions';
import '../../styles/postings.scss';


class Startups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      industryOptions: [],
      selectedIndustryOptions: [],
      searchterm: 'filler',
      search: false,
      filter: false,
      archive: false,
      approved: false,
      pending: false,
      results: [],
    };
    this.handleArchiveChange = this.handleArchiveChange.bind(this);
    this.handleApprovedChange = this.handleApprovedChange.bind(this);
    this.handlePendingChange = this.handlePendingChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchStartups();
    this.props.fetchUser(localStorage.getItem('userID'));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.startups.length > 0) {
      const industryOptions = [];
      nextProps.startups.forEach((startup) => {
        if (startup.industries) {
          startup.industries.forEach((industry) => {
            // Add option if it's not already in the array (not using sets because react-select expects an array)
            if (industryOptions.filter((option) => option.value === industry).length === 0) {
              industryOptions.push({ value: industry, label: industry });
            }
          });
        }
      });
      if (industryOptions.length > prevState.industryOptions.length) {
        return {
          industryOptions,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  searchAndFilter = (text, selectedIndustries) => {
    this.setState({ results: [] });
    const searchterm = text.toLowerCase();
    this.props.startups.forEach((startup) => {
      const industries = startup.industries.map((industry) => industry.toLowerCase());
      // Checks for search
      if (startup.name.toLowerCase().includes(searchterm)
      || startup.city.toLowerCase().includes(searchterm)
      || startup.state.toLowerCase().includes(searchterm)
      || startup.description.toLowerCase().includes(searchterm)
      || industries.includes(searchterm) // array
      // Checks for filter
      || selectedIndustries.some((industry) => industries.includes(industry))) {
        this.setState((prevState) => ({
          results: [...prevState.results, startup],
        }));
      }
    });
  }

  onSearch = (text) => {
    const industries = (this.state.selectedIndustryOptions && this.state.selectedIndustryOptions.length > 0)
      ? this.state.selectedIndustryOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    this.searchAndFilter(text, industries);
    this.setState({ search: true, searchterm: text });
  }

  isFilterEmpty = (array) => {
    return array.length === 1 && array.includes('emptytext');
  }

  onFilter = (industries) => {
    if (this.isFilterEmpty(industries)) {
      this.setState({ filter: false });
    } else this.setState({ filter: true });
    this.searchAndFilter(this.state.searchterm, industries);
  }

  clear = () => {
    this.setState({ search: false, searchterm: 'emptytext' });
    const industries = (this.state.selectedIndustryOptions && this.state.selectedIndustryOptions.length > 0)
      ? this.state.selectedIndustryOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    this.searchAndFilter('emptytext', industries);
  }

  handleArchiveChange(checked) {
    this.setState({ archive: checked });
    this.setState({ results: [] });
    if (checked) {
      this.props.startups.forEach((startup) => {
        if (startup.status === 'Archived') {
          this.setState((prevState) => ({
            results: [...prevState.results, startup],
          }));
        }
      });
    }
  }

  handleApprovedChange(checked) {
    this.setState({ approved: checked });
    this.setState({ results: [] });
    if (checked) {
      this.props.startups.forEach((startup) => {
        if (startup.status === 'Approved') {
          this.setState((prevState) => ({
            results: [...prevState.results, startup],
          }));
        }
      });
    }
  }

  handlePendingChange(checked) {
    this.setState({ pending: checked });
    this.setState({ results: [] });
    if (checked) {
      this.props.startups.forEach((startup) => {
        if (startup.status === 'Pending') {
          this.setState((prevState) => ({
            results: [...prevState.results, startup],
          }));
        }
      });
    }
  }

  renderStartups() {
    if (this.state.search || this.state.filter || this.state.archive || this.state.approved || this.state.pending) {
      if (this.state.results.length > 0) {
        return this.state.results.map((startup) => {
          return (
            <StartupListItem startup={startup} key={startup.id} />
          );
        });
      } else {
        return (
          <div> Sorry, no postings match that query</div>
        );
      }
    } else {
      return this.props.startups.map((startup) => {
        return (
          <StartupListItem startup={startup} key={startup.id} />
        );
      });
    }
  }

  renderToggles() {
    if (this.props.user.role === 'admin') {
      return (
        <div id="filters">
          <h3>show approved startups: </h3>
          <Switch id="approvedToggle" onChange={this.handleApprovedChange} checked={this.state.approved} />
          <h3>show pending startups:</h3>
          <Switch id="pendingToggle" onChange={this.handlePendingChange} checked={this.state.pending} />
          <h3>show archived startups:</h3>
          <Switch id="archiveToggle" onChange={this.handleArchiveChange} checked={this.state.archive} />
        </div>
      );
    } else {
      return (<div> </div>);
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
      this.props.startups && this.state.results
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
                this.onFilter(industries);
              }}
            />
            {this.renderToggles()}
            <div className="list">
              {this.renderStartups()}
            </div>
          </div>
        ) : (
          <div> </div>
        )
    );
  }
}

const mapStateToProps = (reduxState) => ({
  startups: reduxState.startups.all,
  user: reduxState.user.current,
});

export default withRouter(connect(mapStateToProps, { fetchStartups, fetchUser })(Startups));
