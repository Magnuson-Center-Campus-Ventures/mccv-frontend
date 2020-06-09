import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import {
  fetchPost, updatePost,
} from '../../../actions';

class AddPostTitleLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchPost(this.props.post.id);
  }

  // update post field
  changePostField = (field, event) => {
    // eslint-disable-next-line prefer-destructuring
    const value = event.target.value;

    this.setState((prevState) => {
      const post = { ...prevState.post };
      post[field] = value;
      this.props.updatePost(this.props.post.id, post);
      return {
        ...prevState,
        post,
      };
    });
  }

  renderTitleQuestions() {
    if (this.props.post) {
      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Title and Location</h1>
              <p>Add the title and location of this volunteer position</p>
            </div>
            <i className="far fa-id-badge question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            <p className="question-fields-title">Title</p>
            <TextareaAutosize className="question-fields-text" onChange={(event) => this.changePostField('title', event)} defaultValue={this.props.post.title} />
            <p className="question-fields-title">City</p>
            <TextareaAutosize className="question-fields-text" onChange={(event) => this.changePostField('city', event)} defaultValue={this.props.post.city} />
            <p className="question-fields-title">State</p>
            <TextareaAutosize className="question-fields-text" onChange={(event) => this.changePostField('state', event)} defaultValue={this.props.post.state} />
          </div>
        </div>
      );
    } else {
      return (<div>Loading...</div>);
    }
  }

  render() {
    return this.renderTitleQuestions();
  }
}

const mapStateToProps = (reduxState) => ({
  post: reduxState.posts.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchPost, updatePost,
})(AddPostTitleLocation));
