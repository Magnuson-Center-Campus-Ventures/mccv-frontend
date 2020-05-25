import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StartupListItem from './startup-item';
import { fetchStartups } from '../actions';
import '../styles/postings.scss';


class Startups extends Component {
  componentDidMount() {
    this.props.fetchStartups();
  }

  render() {
    const mappingStartups = this.props.startups !== undefined && this.props.startups !== null
      ? this.props.startups.map((startup) => {
        return (
          <StartupListItem startup={startup} key={startup.id} />
        );
      })
      : (
        <div>
          Sorry, no startups currently
        </div>
      );
    return (
      this.props.startups !== undefined
        ? (
          <div className="list">
            {mappingStartups}
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

export default withRouter(connect(mapStateToProps, { fetchStartups })(Startups));
