import React, { Component } from 'react';
// import { Button } from '@material-ui/core';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchterm: '' };
  }

  onInputChange = (event) => {
    this.setState({ searchterm: event.target.value });
    if (event.target.value === '') {
      this.props.onNoSearch();
    }
  }

  keyPressed = (event) => {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onSearch = (event) => {
    this.props.onSearchChange(this.state.searchterm);
  }

  render() {
    return (
      <div id="searchBar">
        <input
          placeholder="Search..."
          onChange={this.onInputChange}
          value={this.state.searchterm}
          onKeyPress={this.keyPressed}
        />
        <i className="fas fa-search"
          onClick={this.onSearch}
          id="searchButton"
          role="button"
          aria-label="search"
          tabIndex={0}
        />
        {/* <button type="button" onClick={this.onSearch}> Search </button> */}
      </div>
    );
  }
}

export default SearchBar;
