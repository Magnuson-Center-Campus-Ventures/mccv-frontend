import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import StartupListItem from './startup-item';
import SearchBar from './search-bar';
import { fetchStartups } from '../../actions';
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
      results: [],
    };
  }

  componentDidMount() {
    this.props.fetchStartups();
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

  renderStartups() {
    if (this.state.search || this.state.filter) {
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

  render() {
    // Styles for filter dropdowns
    const dropdownStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      (this.props.startups !== undefined || null) && (this.state.results !== null || undefined)
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
});

export default withRouter(connect(mapStateToProps, { fetchStartups })(Startups));
