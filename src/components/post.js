/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPost } from '../actions';
import Application from './modals/application';
import '../styles/post.scss';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  showModal = (e) => {
    this.setState({
      show: true,
    });
  };

  hideModal = (e) => {
    this.setState({
      show: false,
    });
  }

  renderHelper= () => {
    const items = [];
    if (this.props.current.required_skills) {
      for (const [index, value] of this.props.current.required_skills.entries()) {
        items.push(
          // eslint-disable-next-line no-loop-func
          <li id="skill" key={index}>{value}</li>,
        );
      }
      return items;
    } else {
      return <div />;
    }
  }

  render() {
    return (
      <div>
        <Application onClose={this.hideModal} show={this.state.show} />
        <h1 id="title">{this.props.current.title}</h1>
        <div className="top">
          <div id="project">
            <h2>Project Description</h2>
            <h3 id="post-description">{this.props.current.description}</h3>
          </div>
          <div id="skills-section">
            <h2>Required Skills</h2>
            <ul id="skills">{this.renderHelper()}</ul>
          </div>
        </div>
        <button id="submit-app"
          type="submit"
          onClick={(e) => {
            this.showModal();
          }}
        >Apply Now!
        </button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  current: reduxState.posts.current,
});

export default withRouter(connect(mapStateToProps, { fetchPost })(Post));
