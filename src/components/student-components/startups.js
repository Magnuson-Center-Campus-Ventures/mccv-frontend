import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StartupListItem from './startup-item';
import SearchBar from './search-bar';
import { fetchStartups, fetchStartupSearch } from '../../actions';
import '../../styles/postings.scss';


class Startups extends Component {
  componentDidMount() {
    this.props.fetchStartups();
  }

  search = (text) => {
    this.props.fetchStartupSearch(text);
  }

  renderStartups() {
    return this.props.startups.map((startup) => {
      return <StartupListItem startup={startup} key={startup.id} />;
    });
  }

  render() {
    // console.log(this.props.startups);
    return (
      this.props.startups !== undefined
        ? (
          <div>
            <SearchBar onSearchChange={this.search} onNoSearch={this.props.fetchStartups} />
            <div className="list">
              {this.renderStartups()}
            </div>
          </div>
        ) : (
          <div />
        )
    );
  }
}

const mapStateToProps = (reduxState) => ({
  startups: reduxState.startups.all,
});

export default withRouter(connect(mapStateToProps, { fetchStartups, fetchStartupSearch })(Startups));
