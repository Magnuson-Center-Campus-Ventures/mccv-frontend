/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchSubmittedApplication, fetchSubmittedApplications, fetchPosts } from '../../actions';
import ToggleSwitch from './toggle-switch';

import '../../styles/applications.scss';

class SubmittedApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      results: [],
      filtering: false,
    };
    this.filter = this.filter.bind(this);
    this.filterResults = this.filterResults.bind(this);
  }

  componentDidMount() {
    this.props.fetchSubmittedApplications();
    this.props.fetchPosts();
  }

  mapResults() {
    if (this.state.filters.length > 0) {
      this.setState({ filtering: true });
      this.props.submittedApplications.map((application) => {
        if (this.state.filters.includes(application.status)) {
          this.setState((prevState) => ({
            results: [...prevState.results, application],
          }));
        }
      });
    } else {
      this.setState({ filtering: false });
    }
  }

  filterResults(selectedFilter) {
    if (this.state.filters.includes(selectedFilter)) {
      const index = this.state.filters.indexOf(selectedFilter);
      const array = [...this.state.filters]; // make a separate copy of the array
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ filters: array }, this.mapResults);
      }
    } else {
      this.setState((prevState) => ({
        filters: [...prevState.filters, selectedFilter],
      }), this.mapResults);
    }
  }

  filter(selectedFilter) {
    this.setState({ results: [] }, this.filterResults(selectedFilter));
  }

  render() {
    let mappingApplications = null;
    if (this.state.filtering) {
      mappingApplications = this.state.results.map((application) => {
        const route = `/applications/${application._id}`;
        let post = '';
        for (const i in this.props.posts) {
          if (this.props.posts[i].id === application.post_id) {
            post = this.props.posts[i];
            break;
          }
        }
        return (
          <Link to={route} key={application.id} className="listItem link">
            <div className="Status">
              <div>{post.title}</div>
              <div>{`${post.city}, ${post.state}`}</div>
              <div>status: {application.status}</div>
            </div>
          </Link>
        );
      });
    } else {
      mappingApplications = this.props.submittedApplications.map((application) => {
        const route = `/applications/${application._id}`;
        let post = '';
        for (const i in this.props.posts) {
          if (this.props.posts[i].id === application.post_id) {
            post = this.props.posts[i];
            break;
          }
        }
        return (
          <Link to={route} key={application.id} className="listItem link">
            <div className="Status">
              <div>{post.title}</div>
              <div>{`${post.city}, ${post.state}`}</div>
              <div>status: {application.status}</div>
            </div>
          </Link>
        );
      });
    }
    return (
      this.props.submittedApplications !== undefined
        ? (
          <div>
            <div id="filters">
              <h3>Show pending: </h3>
              <ToggleSwitch id="pending" onChange={() => this.filter('pending')} />
              <h3>Show declined: </h3>
              <ToggleSwitch id="declined" onChange={() => this.filter('declined')} />
              <h3>Show approved: </h3>
              <ToggleSwitch id="approved" onChange={() => this.filter('approved')} />
            </div>
            <div className="list">
              {mappingApplications}
            </div>
          </div>
        ) : (<div />)
    );
  }
}

const mapStateToProps = (reduxState) => ({
  submittedApplications: reduxState.submittedApplications.all,
  posts: reduxState.posts.all,
});

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchSubmittedApplication, fetchSubmittedApplications })(SubmittedApplications));
