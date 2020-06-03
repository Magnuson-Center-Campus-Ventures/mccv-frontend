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
      locationOptions: [],
      selectedLocationOptions: [],
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
      const locationOptions = [];
      nextProps.startups.forEach((startup) => {
        if (startup.industries) {
          startup.industries.forEach((industry) => {
            // Add option if it's not already in the array (not using sets because react-select expects an array)
            if (industryOptions.filter((option) => option.value === industry).length === 0) {
              industryOptions.push({ value: industry, label: industry });
            }
          });
        }
        if (startup.city && startup.state) {
          const locationString = `${startup.city}, ${startup.state}`;
          if (locationOptions.filter((option) => option.value === locationString).length === 0) {
            locationOptions.push({ value: locationString, label: locationString });
          }
        }
      });
      if (industryOptions.length > prevState.industryOptions.length
        || locationOptions.length > prevState.locationOptions.length) {
        return {
          industryOptions, locationOptions,
        };
      }
    }
    // Return null if the state hasn't changed
    return null;
  }

  searchAndFilter = (text, selectedIndustries, selectedLocations) => {
    this.setState({ results: [] });
    const searchterm = text.toLowerCase();
    this.props.startups.forEach((startup) => {
      const industries = startup.industries.map((industry) => industry.toLowerCase());
      const location = `${startup.city}, ${startup.state}`;
      // Checks for search
      if (startup.name.toLowerCase().includes(searchterm)
      || startup.city.toLowerCase().includes(searchterm)
      || startup.state.toLowerCase().includes(searchterm)
      || startup.description.toLowerCase().includes(searchterm)
      || industries.includes(searchterm) // array
      // Checks for filter
      || selectedIndustries.some((industry) => industries.includes(industry))
      || selectedLocations.includes(location)) {
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
    const locations = (this.state.selectedLocationOptions && this.state.selectedLocationOptions.length > 0)
      ? this.state.selectedLocationOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    this.searchAndFilter(text, industries, locations);
    this.setState({ search: true, searchterm: text });
  }

  isFilterEmpty = (array) => {
    return array.length === 1 && array.includes('emptytext');
  }

  onFilter = (industries, locations) => {
    if (this.isFilterEmpty(industries) && (this.isFilterEmpty(locations))) {
      this.setState({ filter: false });
    } else this.setState({ filter: true });
    this.searchAndFilter(this.state.searchterm, industries, locations);
  }

  clear = () => {
    this.setState({ search: false, searchterm: 'emptytext' });
    const industries = (this.state.selectedIndustryOptions && this.state.selectedIndustryOptions.length > 0)
      ? this.state.selectedIndustryOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    const locations = (this.state.selectedLocationOptions && this.state.selectedLocationOptions.length > 0)
      ? this.state.selectedLocationOptions.map((option) => option.value.toLowerCase())
      : ['emptytext'];
    this.searchAndFilter('emptytext', industries, locations);
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
                const locations = (this.state.selectedLocationOptions && this.state.selectedLocationOptions.length > 0)
                  ? this.state.selectedLocationOptions.map((option) => option.value)
                  : ['emptytext'];
                this.onFilter(industries, locations);
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
                const locations = (selectedOptions && selectedOptions.length > 0)
                  ? selectedOptions.map((option) => option.value)
                  : ['emptytext'];
                this.onFilter(industries, locations);
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
