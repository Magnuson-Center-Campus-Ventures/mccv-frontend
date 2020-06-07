import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import '../../../styles/startup-add-post/add-post-description.scss';
import {
  fetchPost, updatePost,
} from '../../../actions';

class AddPostDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      // responsibilities: [],
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchPost(this.props.postID);
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

  // Send update to database
  onSubmit = (e) => {
    this.props.updatePost(this.props.post.id, this.state.post);
  };

  // handleRespChange = (e) => {
  //   const responsibilities = [...this.state.responsibilities];
  //   responsibilities[e.target.dataset.id] = e.target.value;
  //   this.setState({ responsibilities }, () => console.log(this.state.responsibilities));
  // }

  // addRespInput = (e) => {
  //   this.setState((prevState) => ({
  //     responsibilities: [...prevState.responsibilities, {}],
  //   }));
  // }

  renderDescQuestions() {
    if (this.props.post) {
      return (
        <div className="PostDescContainer">
          <div className="PostDescHeaderContainer">
            <h1 className="PostDescHeader">
              About
            </h1>
          </div>
          <div className="PostDescDescContainer">
            <p className="PostDescDesc">
              Tell us more about the volunteer position and responsibilities
            </p>
            <i className="far fa-id-badge" id="icon" />
          </div>
          <div className="PostDescQuestionsContainer">
            <div className="PostDescNameContainer">
              <div className="PostDescQuestionLabelContainer">
                <p className="PostDescLabel">
                  Description
                </p>
                <TextareaAutosize onChange={(event) => this.changePostField('description', event)} defaultValue={this.props.post.description} />
              </div>
            </div>
            <div className="PostDescNameContainer">
              {/* <div className="PostDescQuestionLabelContainer">
                <p className="PostDescLabel">
                  Responsibilities
                </p>

                <div>
                  <TextareaAutosize id="respInput" onChange={(event) => this.changePostField('description', event)} defaultValue="" />
                </div>

                <div className="startup-add-posting-box">
                  <button type="button"
                    className="startup-add-posting-btn"
                    onClick={() => {
                      this.addRespInput();
                    }}
                  >
                    <i className="fas fa-plus" />
                  </button>
                </div>

                  </div> */}
            </div>
          </div>
        </div>
      );
    } else {
      return (<div>Loading...</div>);
    }
  }

  render() {
    return this.renderDescQuestions();
  }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  post: reduxState.posts.current,
});

export default withRouter(connect(mapStateToProps, {
  fetchPost, updatePost,
})(AddPostDescription));
