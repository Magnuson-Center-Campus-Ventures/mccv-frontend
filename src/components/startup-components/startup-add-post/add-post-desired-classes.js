/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
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
    if (this.state.displayClasses.length === 0) {
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
  }

  renderAddClass() {
    const customStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      <div className="question-fields-items-header">
        <p className="question-fields-title">Desired Classes</p>
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
            <div className="question-fields-item" key={_class.name}>
              {_class.name}
              <button type="submit" className="question-fields-button" style={{ cursor: 'pointer' }} onClick={() => { this.deleteClass({ _class }); }}>
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
        <div className="question">
          <div className="question-header">
            <div className="question-header-prompt">
              <h1>Classes</h1>
              <p>What classes characterize your volunteer position?</p>
            </div>
            <i className="fas fa-book-reader question-header-icon" id="icon" />
          </div>
          <div className="question-fields">
            {this.renderAddClass()}
            <div className="question-fields-items">{this.renderClasses()}</div>
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
  post: reduxState.posts.current,
  classes: reduxState.classes.all,
});

export default withRouter(connect(mapStateToProps, {
  fetchPost, createClassForPost, updatePost, fetchAllClasses,
})(AddPostClasses));
