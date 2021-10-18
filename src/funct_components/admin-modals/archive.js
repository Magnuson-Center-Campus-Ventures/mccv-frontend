/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilteredSelect from '../select'
import {
  updatePost, updateStartup, updateStudent, fetchSubmittedApplications, fetchStudentByID,
} from '../../actions';
import '../../styles/modal.scss';

function Archive(props) {
  const [filled, setFilled] = useState(false)
  const [applicantOptions, setApplicantOptions] = useState([])
  const [studentsSelected, setStudentsSelected] = useState([])
  const [answeredSelected, setAnsweredSelected] = useState(false)

  useEffect(() => {
    if (props.post?.applicants?.length > 0) {
        const names = props.post.applicants.map((applicant) => {
        const name = `${applicant.first_name} ${applicant.last_name}`;
        return { value: applicant, label: name };
      });
      setApplicantOptions(names)
    }
    if ( !props.post){
      setAnsweredSelected(true)
    }
  }, [])

  const toggleFilled = (e) =>{
    const { filled, answeredSelected } = state; 
    setFilled(!filled)
    setAnsweredSelected(!answeredSelected)
  }

  const notFilled = (e) => {
    setFilled(false)
    setAnsweredSelected(true)
  }

  const filled_ = (e) => {
    setFilled(true)
    setAnsweredSelected(true)
  }

  const onArchive = (e) => {
    if (props.post) {
      const { post } = props;
      post.status = 'Archived';
      post.students_selected = studentsSelected;
      props.updatePost(post.id, post);
      props.onClose(e);
    }
    if (props.startup) {
      const { startup } = props;
      startup.status = 'Archived';
      props.updateStartup(startup.id, startup);
      startup.posts.map((post) => {
        const postCopy = post;
        postCopy.status = 'Archived';
        props.updatePost(post.id, postCopy);
      });
      props.onClose(e);
    }
    if (props.student) {
      const { student } = props;
      student.status = 'Archived';
      props.updateStudent(student.id, student);
      props.onClose(e);
    }
  }

  // add student who filled position to selected array
  const addFilled = (student) => {
    const selected = studentsSelected.map((selectedStudent) => {
      return { selectedStudent };
    });
    selected.push(student.value);
    studentsSelected = selected;
  }

  const filledRender = () => {
    const customStyles = { // from student-signup-classes
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    if (filled) {
      return (
        <div className="selectStudents">
          <p>Select the student(s) who filled the position</p>

          <FilteredSelect
            createable={true}
            className="select-dropdown"
            styles={customStyles}
            name="classes"
            placeholder="Select Students"
            options={applicantOptions}
            onChange={(selectedOption) => {
              addFilled(selectedOption);
            }}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  // eslint-disable-next-line consistent-return
  const postArchive = ()=> {
    if (props.post) {
      return (
        <div className="archiveQuestions">
          <p> Has this position been filled by a student on this platform?</p>
          <div className="archiveOptions">
            <button type="submit"
              id="noarchive"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                notFilled(); 
              }}
            >
              No
            </button>
            <button type="submit"
              id="archive"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                filled_(); 
              }}
            >
              Yes
            </button>
          </div>
          {filledRender()}
        </div>
      );
    } else {
      return null;
    }
  }

    if (!props.show) {
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
                props.onClose(e);
              }}
            />
            {postArchive()}
            {answeredSelected ? (
              <div className="modalContent">
              <p> Are you sure you want to archive this?</p>
              <div className="archiveOptions">
                <button type="submit"
                  id="noarchive"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    props.onClose(e);
                  }}
                >
                  No
                </button>
                <button type="submit"
                  id="archive"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    onArchive(e);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
            ): (
              <div />
            )}
          </div>
        </div>
      );
    }
}

const mapStateToProps = (reduxState) => ({
  // submittedAll: reduxState.submittedApplications.all,
  currentStudent: reduxState.students.current_student,
});

export default withRouter(connect(mapStateToProps, {
  updatePost, updateStartup, updateStudent, fetchSubmittedApplications, fetchStudentByID,
})(Archive));
