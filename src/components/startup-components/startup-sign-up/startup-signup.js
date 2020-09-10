import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import StartupSignUpBio from './startup-signup-bio';
import StartupSignUpDesc from './startup-signup-desc';
import StartupSignUpIndustries from './startup-signup-industries';
import {
  fetchStartupByUserID, fetchUser, updateStartup, submitStartup, fetchAllSkills, fetchAllIndustries, fetchAllClasses,
} from '../../../actions';
import '../../../styles/create-new-paginator.scss';

class StartupSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      filled: false, 
    };
  }

  componentDidMount() {
    this.props.fetchStartupByUserID(this.props.userID);
    this.props.fetchUser(this.props.userID);
    this.props.fetchAllIndustries();
  }

  handlePageClick = (data) => {
    this.props.updateStartup(this.props.startup.id, this.props.startup);
    this.setState({ 
      index: data.selected, 
      filled: true, 
     });
    this.forceUpdate();
  };

  ifFilled = () => {
    console.log('in ifFilled'); 
    this.setState({
      filled: true, 
    }); 
    this.forceUpdate(); 
  }

  onSubmit = () => {
    this.props.submitStartup(this.props.startup.id, this.props.startup, this.props.history);
  }

  renderSubmit() {
    if (this.state.index === 2) {
      return (
        <div className="question-submit">
          <button type="submit" className="submit-btn" style={{ cursor: 'pointer' }} onClick={this.onSubmit}>
            Submit!
          </button>
        </div>
      );
    } else {
      return (
        <div className="empty" />
      );
    }
  }

  renderComponent() {
    switch (this.state.index) {
      case 0:
        return <StartupSignUpBio ifFilled={this.ifFilled} />;
      case 1:
        return <StartupSignUpDesc />;
      case 2:
        return <StartupSignUpIndustries />;
      default:
        return <div>Out of pages!</div>;
    }
  }

  render() {
    switch (this.state.index) {
      case 0:
        return (
          <div className="paginator"> 
            {this.renderComponent()}
            {this.renderSubmit()}
            {this.state.filled? (
              <ReactPaginate
              previousClassName="previous-hide"
              previousLinkClassName="previous-link-hide"
              breakLabel="..."
              pageCount={3}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
            />
            ) : (
              <div> </div>
            )}
            
          </div>
        );
      case 7:
        return (
          <div className="paginator"> 
            {this.renderComponent()}
            {this.renderSubmit()}
            <ReactPaginate
              nextClassName="next-hide"
              nextLinkClassName="next-link-hide"
              breakLabel="..."
              pageCount={3}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
            />
          </div>
        );
      default:
        return (
          <div className="paginator"> 
            {this.renderComponent()}
            {this.renderSubmit()}
            <ReactPaginate
              breakLabel="..."
              pageCount={3}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
            />
          </div>
        );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.user.userID,
  startup: reduxState.startups.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchStartupByUserID, fetchUser, updateStartup, submitStartup, fetchAllSkills, fetchAllIndustries, fetchAllClasses,
})(StartupSignUp));
