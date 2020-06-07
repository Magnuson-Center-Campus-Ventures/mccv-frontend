/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import {
  updatePost, updateStartup, updateStudent, fetchSubmittedApplications, fetchStudentByID,
} from '../../actions';
import '../../styles/modal.scss';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filled: false,
      applicantOptions: [],
      studentsSelected: [],
    };
    this.notFilled = this.notFilled.bind(this);
    this.filled = this.filled.bind(this);
  }

  componentDidMount() {
    if (this.props.post?.applicants?.length > 0) {
      const names = this.props.post.applicants.map((applicant) => {
        const name = `${applicant.first_name} ${applicant.last_name}`;
        return { value: applicant, label: name };
      });
      this.setState({ applicantOptions: names });
    }
  }

  notFilled = (e) => {
    this.setState({ filled: false });
  }

  filled = (e) => {
    this.setState({ filled: true });
  }

  onArchive = (e) => {
    if (this.props.post) {
      const { post } = this.props;
      post.status = 'Archived';
      post.students_selected = this.state.studentsSelected;
      this.props.updatePost(post.id, post);
      this.props.onClose(e);
    }
    if (this.props.startup) {
      const { startup } = this.props;
      startup.status = 'Archived';
      this.props.updateStartup(startup.id, startup);
      startup.posts.map((post) => {
        const postCopy = post;
        postCopy.status = 'Archived';
        this.props.updatePost(post.id, postCopy);
      });
      this.props.onClose(e);
    }
    if (this.props.student) {
      const { student } = this.props;
      student.status = 'Archived';
      this.props.updateStudent(student.id, student);
      this.props.onClose(e);
    }
  }

  // add student who filled position to selected array
  addFilled = (student) => {
    console.log(student);
    const selected = this.state.studentsSelected.map((selectedStudent) => {
      return { selectedStudent };
    });
    selected.push(student.value);
    this.state.studentsSelected = selected;
  }

  filledRender() {
    const customStyles = { // from student-signup-classes
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    if (this.state.filled) {
      return (
        <div className="selectStudents">
          <p>Select the student(s) who filled the position</p>

          <CreateableSelect
            className="select-dropdown"
            styles={customStyles}
            name="classes"
            options={this.state.applicantOptions}
            onChange={(selectedOption) => {
              this.addFilled(selectedOption);
            }}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  // eslint-disable-next-line consistent-return
  postArchive() {
    if (this.props.post) {
      return (
        <div className="archiveQuestions">
          <p> Has this position been filled by a student on this platform?</p>
          <div className="archiveOptions">
            <button type="submit"
              id="noarchive"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                this.notFilled();
              }}
            >
              No
            </button>
            <button type="submit"
              id="archive"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                this.filled();
              }}
            >
              Yes
            </button>
          </div>
          {this.filledRender()}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <div className="archiveContainer">
          <div className="archiveModal" id="archiveModal">
            <i className="fas fa-times"
              aria-label="close modal"
              role="button"
              tabIndex={0}
              id="close-modal"
              onClick={(e) => {
                this.props.onClose(e);
              }}
            />
            {this.postArchive()}
            <div className="modalContent">
              <p> Are you sure you want to archive this?</p>
              <div className="archiveOptions">
                <button type="submit"
                  id="noarchive"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    this.props.onClose(e);
                  }}
                >
                  No
                </button>
                <button type="submit"
                  id="archive"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    this.onArchive(e);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>

          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  // submittedAll: reduxState.submittedApplications.all,
  currentStudent: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, {
  updatePost, updateStartup, updateStudent, fetchSubmittedApplications, fetchStudentByID,
})(Archive));
