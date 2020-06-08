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
      resp: '',
      responsibilities: [],
    };

    this.onRespChange = this.onRespChange.bind(this);
    this.addResp = this.addResp.bind(this);
    this.deleteResp = this.deleteResp.bind(this);
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchPost(this.props.post.id);
  }

  onRespChange(event) {
    console.log(event);
    this.state.resp = event.target.value;
    this.forceUpdate();
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

  addResp = () => {
    if (!this.props.post.responsibilities.includes(this.state.resp)) {
      this.props.post.responsibilities.push(this.state.resp);
    }
    this.state.resp = '';
    this.forceUpdate();
  }

  deleteResp = (resp) => {
    console.log(resp);
    this.props.post.responsibilities = this.props.post.responsibilities.filter((value) => {
      console.log(value);
      return (value !== resp.value);
    });
    this.forceUpdate();
  }

  renderResps() {
    return (
      this.props.post.responsibilities.map((value) => {
        return (
          <div className="post-add-resp" key={value}>
            <div className="post-add-resp-text">
              {value}
            </div>
            <button type="submit" className="delete-btn-post-resp" style={{ cursor: 'pointer' }} onClick={() => { this.deleteResp({ value }); }}>
              <i className="far fa-trash-alt" id="icon" />
            </button>
          </div>
        );
      })
    );
  }

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
              <div id="PostResps">
                <div className="StudentRespMinorListHeader">Responsibilities</div>
                <input onChange={this.onRespChange} value={this.state.resp} />
                <button type="submit" className="delete-btn-post-resp-minor" style={{ cursor: 'pointer' }} onClick={this.addResp} value={this.resp}>
                  <i className="far fa-plus-square" id="icon" />
                </button>
                {this.renderResps()}
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
