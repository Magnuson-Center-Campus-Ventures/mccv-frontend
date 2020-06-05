/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
import {
  updatePost, updateStartup, updateStudent, fetchSubmittedApplications, fetchStudentByID,
} from '../../actions';
import close from '../../../static/img/close.png';
import '../../styles/archive-modal.scss';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filled: false,
      applicants: [],
      applicantNames: [],
      filledBy: '',
      // searchterm: 'Search student name',
      // students: [],
    };
    this.notFilled = this.notFilled.bind(this);
    this.filled = this.filled.bind(this);
  }

  componentDidMount() {
    this.props.fetchSubmittedApplications();
    if (this.props.submittedAll.length > 0) {
      const applicantIDs = [];
      this.props.submittedAll.map((submitted) => {
        if (submitted.post_id === this.props.post.id) {
          console.log(submitted.student_id);
          applicantIDs.push(submitted.student_id);
        }
      });
      this.setState({ applicants: applicantIDs });
      console.log('applicants');
      console.log(this.state.applicants);
    }
  }

  notFilled = (e) => {
    this.setState({ filled: false });
  }

  filled = (e) => {
    this.setState({ filled: true });
    if (this.state.applicants.length > 0) {
      const names = [];
      this.state.applicants.map((studentID) => {
        this.props.fetchStudentByID(studentID);
        const name = `${this.props.currentStudent.first_name} ${this.props.currentStudent.last_name}`;
        names.push(name);
      });
      this.setState({ filled: true, applicantNames: names });
      console.log('names');
      console.log(this.state.applicantNames);
    }
  }

  onArchive = (e) => {
    if (this.props.post) {
      const { post } = this.props;
      post.status = 'Archived';
      this.props.updatePost(post.id, post);
      /* this.props.fetchSubmittedApplications();
      if (this.props.submittedAll.length > 0) {
        const applicantIDs = [];
        this.props.submittedAll.map((submitted) => {
          if (submitted.post_id === this.props.post.id) {
            console.log(submitted.student_id);
            applicantIDs.push(submitted.student_id);
          }
        });
        this.setState({ applicants: applicantIDs });
        console.log('applicants');
        console.log(this.state.applicants);
      }
      */
      // this.props.onClose(e);
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

  addClass = () => {

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
            options={this.state.applicantNames}
            onChange={(selectedOption) => {
              this.state.filledBy = selectedOption.value;
              this.addFilled();
            }}
            /* onCreateOption={(newOption) => {
              this.state.class = newOption;
              this.addClassDB();
              this.addClass();
            }} */
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
          <p> Has this position been filled?</p>
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
            <img id="close-app"
              src={close}
              alt="close"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                this.props.onClose(e);
              }}
            />
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
              {this.postArchive()}
            </div>

          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  submittedAll: reduxState.submittedApplications.all,
  currentStudent: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, {
  updatePost, updateStartup, updateStudent, fetchSubmittedApplications, fetchStudentByID,
})(Archive));
