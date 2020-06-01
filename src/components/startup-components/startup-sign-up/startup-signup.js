import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import StartupSignUpBio from './startup-signup-bio';
import StartupSignUpDesc from './startup-signup-desc';
import StartupSignUpIndustries from './startup-signup-industries';
import StartupSignUpVideo from './startup-signup-video';

class StartupSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  handlePageClick = (data) => {
    this.setState({ index: data.selected });
    this.forceUpdate();
  };

  renderComponent() {
    switch (this.state.index) {
      case 0:
        return <StartupSignUpBio />;
      case 1:
        return <StartupSignUpDesc />;
      case 2:
        return <StartupSignUpIndustries />;
      case 3:
        return <StartupSignUpVideo />;
      default:
        return <div>Out of pages!</div>;
    }
  }

  render() {
    return (
      <div className="commentBox">
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          // breakClassName="break-me"
          pageCount={4}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          // containerClassName="pagination"
          // subContainerClassName="pages pagination"
          // activeClassName="active"
        />
        {this.renderComponent()}
      </div>
    );
  }
}
export default withRouter(connect()(StartupSignUp));
