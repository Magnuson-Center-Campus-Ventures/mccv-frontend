/* eslint-disable array-callback-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { submitApplication, fetchQuestions } from '../../../actions';
import close from '../../../../static/img/close.png';
import '../../../styles/addposting.scss';

class AddPosting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      industries: [],
      required_skills: [],
      preferred_skills: [],
      responsibilities: [],
      time_commitment: undefined,
      desired_start_date: undefined,
      desired_end_date: undefined,
      desired_classes: [],
      available_until: undefined,
      status: '',
      applicants: [],
      application_id: '',
      students_selected: [],
      location: '',
      remote: undefined,
    };
    this.onAnswerChange = this.onAnswerChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }

  onSubmit = (e) => {
    const newApplication = {
      student_id: '5ec989b5b73b4100389ff681',
      post_id: this.props.current.id,
      responses: this.state.questionToAnswer,
      status: 'pending',
    };
    this.props.submitApplication(newApplication);
    this.props.onClose && this.props.onClose(e);
  };

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  }

  onAnswerChange(event) {
    const { target: { name, value } } = event;
    const newQuestionToAnswer = { ...this.state.questionToAnswer, [name]: value };
    this.setState({ questionToAnswer: newQuestionToAnswer });
  }

  renderHelper= () => {
    return (
      <div className="addposting-questions">
        <h3 className="addposting-h3">Title</h3>
        <input name="title" onChange={this.onAnswerChange} value={this.state.title} />
      </div>
    );
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="addposting-container">
        <div id="addposting" className="addposting">
          <div className="addposting-title">Add Volunteer Position<img id="close-app"
            src={close}
            alt="close"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              this.onClose(e);
            }}
          />
          </div>

          { this.renderHelper() }

          <div className="actions">
            <button type="submit"
              className="addposting-submit-btn"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                this.onSubmit(e);
              }}
            >
              Submit
            </button>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  current: reduxState.posts.current,
  application: reduxState.application.current,
  questions: reduxState.questions.all,
});

export default withRouter(connect(mapStateToProps, { submitApplication, fetchQuestions })(AddPosting));
