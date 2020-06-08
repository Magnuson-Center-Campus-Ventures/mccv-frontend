/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import '../../../styles/startup-add-post/add-post-industries.scss';
import {
  fetchPost, createClassForPost, updatePost, fetchAllClasses,
} from '../../../actions';

class AddPostClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: '',
      selectedClasses: [],
      displayClasses: [],
    };
  }

  // Get profile info
  componentDidMount() {
    this.props.fetchAllClasses();
    this.props.fetchPost(this.props.post.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post !== {} && prevProps.post !== this.props.post) {
      this.populateCurrentClasses();
    }
  }

  getClass(name) {
    const classObject = this.props.classes.find((_class) => {
      return (_class.name === name);
    });
    return classObject;
  }

  addClass = () => {
    if (!this.props.post.desired_classes.includes(this.getClass(this.state.class))) {
      this.props.post.desired_classes.push(this.getClass(this.state.class));
    }
    this.state.displayClasses = this.state.displayClasses.filter((value) => {
      return (value.label !== this.state.class);
    });
    this.state.class = '';
    this.forceUpdate();
  }

  deleteClass = (_class) => {
    this.props.post.desired_classes = this.props.post.desired_classes.filter((value) => {
      return (value !== _class._class);
    });
    this.state.displayClasses.push({ label: _class._class.name });
    this.forceUpdate();
  }

  populateCurrentClasses() {
    this.props.post.desired_classes.forEach((value) => {
      if (!this.state.selectedClasses.includes(value.name)) {
        this.state.selectedClasses.push(value.name);
      }
    });
    this.props.classes.forEach((value) => {
      if (!this.state.selectedClasses.includes(value.name)) {
        this.state.displayClasses.push({ label: value.name });
      }
    });
  }

  renderAddClass() {
    const customStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      <div className="add-classes">
        <CreateableSelect
          className="select-dropdown"
          styles={customStyles}
          name="classes"
          value={this.state.class}
          options={this.state.displayClasses}
          onChange={(selectedOption) => {
            this.state.class = selectedOption.label;
            this.addClass();
          }}
          onCreateOption={(newOption) => {
            this.state.class = newOption;
            this.props.createClassForPost({ name: newOption }, this.props.post);
          }}
        />
      </div>
    );
  }

  renderClasses() {
    // eslint-disable-next-line camelcase
    if (this.props.post?.desired_classes) {
      return (
        this.props.post.desired_classes.map((_class) => {
          return (
            <div className="class" key={_class.name}>
              {_class.name}
              <button type="submit" className="delete-btn-post-classes" style={{ cursor: 'pointer' }} onClick={() => { this.deleteClass({ _class }); }}>
                <i className="far fa-trash-alt" id="icon" />
              </button>
            </div>
          );
        })
      );
    } else {
      return (
        <div>Loading</div>
      );
    }
  }

  render() {
    if (this.props.post.desired_classes !== undefined && this.props.classes !== []) {
      return (
        <div className="AddPostClassContainer">
          <div className="AddPostClassHeaderContainer">
            <h1 className="AddPostClassHeader">
              Classes
            </h1>
          </div>
          <div className="AddPostClassDescContainer">
            <p className="AddPostClassDesc">
              What classes characterize your volunteer position?
            </p>
            <i className="fas fa-building" id="icon" />
          </div>
          <div id="classes">
            <div className="AddPostClassListHeader">Classes</div>
            {this.renderAddClass()}
            {this.renderClasses()}
          </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  post: reduxState.posts.current,
  classes: reduxState.classes.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchPost, createClassForPost, updatePost, fetchAllClasses,
})(AddPostClasses));
