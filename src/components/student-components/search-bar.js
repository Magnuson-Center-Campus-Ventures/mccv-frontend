import React, { Component } from 'react';
import { Button } from '@material-ui/core';

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

  onSearch = (event) => {
    this.props.onSearchChange(this.state.searchterm);
  }

  render() {
    return (
      <div id="searchBar">
        <input onChange={this.onInputChange} value={this.state.searchterm} />
        <Button variant="contained" color="primary" id="button" onClick={this.onSearch}> Search </Button>
      </div>
    );
  }
}

export default SearchBar;
