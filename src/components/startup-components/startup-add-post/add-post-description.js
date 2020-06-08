import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
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
          <li className="question-fields-resp" key={value}>
            {value}
            <button type="submit" className="question-fields-button" style={{ cursor: 'pointer' }} onClick={() => { this.deleteResp({ value }); }}>
              <i className="far fa-trash-alt" id="icon" />
            </button>
          </li>
        );
      })
    );
  }

  renderDescQuestions() {
    if (this.props.post) {
      return (
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>About</h1>
              <p>Tell us more about the volunteer position and responsibilities</p>
            </div>
            <i className="far fa-id-badge question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            <p className="question-fields-title">Description</p>
            <TextareaAutosize className="question-fields-text" onChange={(event) => this.changePostField('description', event)} defaultValue={this.props.post.description} />
            <p className="question-fields-title">Responsibilities</p>
            <input className="question-fields-text" onChange={this.onRespChange} value={this.state.resp} />
            <button className="question-fields-button" type="submit" style={{ cursor: 'pointer' }} onClick={this.addResp} value={this.resp}>
              <i className="far fa-plus-square" id="icon" />
            </button>
            <ul className="question-fields-list">{this.renderResps()}</ul>
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
