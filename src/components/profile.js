// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { withRouter } from 'react-router-dom';
import { fetchStudent } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.user_id,
      // eslint-disable-next-line react/no-unused-state
      isEditing: false,
    };
  }

  componentDidMount() {
    this.props.fetchStudent(this.state.id);
  }

  /*
  render() {

  }
  */
}

function mapStateToProps(reduxState) {
  return {
    student: reduxState.students.current,
  };
}

// enables this.props.currentPost, this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, { fetchStudent })(Profile);
