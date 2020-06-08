import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import '../../../styles/startup-add-post/add-post-title-location.scss';
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
        <div className="PostTitleContainer">
          <div className="PostTitleHeaderContainer">
            <h1 className="PostTitleHeader">
              Title and Location
            </h1>
          </div>
          <div className="PostTitleDescContainer">
            <p className="PostTitleDesc">
              Add the title and location of this volunteer position
            </p>
            <i className="far fa-id-badge" id="icon" />
          </div>
          <div className="PostTitleQuestionsContainer">
            <div className="PostTitleNameContainer">
              <div className="PostTitleQuestionLabelContainer">
                <p className="PostTitleLabel">
                  Title
                </p>
                <TextareaAutosize onChange={(event) => this.changePostField('title', event)} defaultValue={this.props.post.title} />
                <p className="PostTitleLabel">
                  City
                </p>
                <TextareaAutosize onChange={(event) => this.changePostField('city', event)} defaultValue={this.props.post.city} />
                <p className="PostTitleLabel">
                  State
                </p>
                <TextareaAutosize onChange={(event) => this.changePostField('state', event)} defaultValue={this.props.post.state} />
              </div>
            </div>
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
