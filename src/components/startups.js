import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostListItem from './posting-item';
import { fetchStartups } from '../actions';

class Startups extends Component {
  componentDidMount() {
    this.props.fetchStartups();
  }

  render() {
    const mappingStartups = this.props.startups.map((startup) => {
      return (
        <PostListItem startup={startup} key={startup.id} />
      );
    });
    return (
      this.props.startups !== undefined
        ? (
          <div className="startupList">
            {mappingStartups}
          </div>
        ) : (<div />)
    );
  }
}

const mapStateToProps = (reduxState) => ({
  startups: reduxState.startups.all,
});

export default withRouter(connect(mapStateToProps, { fetchStartups })(Startups));
