/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitApplication } from '../../actions';
import close from '../../../static/img/close.png';
import '../../styles/application.scss';

class WorkExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: {
        employer: '',
        role: '',
        location: '',
        start_date: Date('01/01/2000'),
        end_date: Date('01/01/2000'),
        currently_working: false,
        description: '',
      },
    };
  }

  onSubmit = (e) => {
    // const newApplication = {
    //   student_id: '5ec989b5b73b4100389ff681',
    //   post_id: this.props.current.id,
    //   responses: this.state.questionToAnswer,
    //   status: 'pending',
    // };
    // this.props.submitApplication(newApplication);
    // this.props.onClose && this.props.onClose(e);
  };

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  }

    // update student field
    changeWorkExpereinceField = (field, event) => {
      // eslint-disable-next-line prefer-destructuring
      const value = event.target.value;

      this.setState((prevState) => {
        const workExperience = { ...prevState.student };
        workExperience[field] = value;
        return {
          ...prevState,
          workExperience,
        };
      });
    }

  checkBoxChange = (e) => {
    const status = !this.state.experience.currently_working;
    this.setState((prevState) => {
      const experience = { ...prevState.experience };
      experience.currently_working = status;
      return {
        ...prevState,
        experience,
      };
    });
  }

  renderHelper= () => {
    const items = [];
    // if (this.props.application.questions) {
    //   for (const [index, value] of this.props.application.questions.entries()) {
    //     items.push(
    //       <div>
    //         <h3 id="question" key={index}>{value}</h3>
    //         <input name={value} onChange={this.onAnswerChange} value={this.state.questionToAnswer[value]} />
    //       </div>,
    //     );
    //   }
    //   return items;
    // } else {
    //   return <div />;
    // }

    return (
      <div>
        <div>
          <h3>
            Role
          </h3>
          <input onChange={(event) => this.changeWorkExperienceField('role', event)} value={this.state.experience.role} />
        </div>
        <div>
          <h3>
            Employer
          </h3>
          <input onChange={(event) => this.changeWorkExperienceField('employer', event)} value={this.state.experience.employer} />
        </div>
        <div>
          <h3>
            Location
          </h3>
          <input onChange={(event) => this.changeWorkExperienceField('location', event)} value={this.state.experience.location} />
        </div>
        <div>
          <h3>
            Start Date (--/--/----)
          </h3>
          <input onChange={(event) => this.changeWorkExperienceField('start_date', event)} value={this.state.experience.start_date} />
        </div>
        <div>
          <h3>
            End Date (--/--/----)
          </h3>
          <input onChange={(event) => this.changeWorkExperienceField('end_date', event)} value={this.state.experience.end_date} />
        </div>
        <div>
          <h3>
            Are you currently working at this position?
          </h3>
          <input type="checkbox" onClick={this.checkBoxChange} />
        </div>
        <div>
          <h3>
            Description
          </h3>
          <input onChange={(event) => this.changeWorkExperienceField('description', event)} value={this.state.experience.description} />
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="application-container">
        <div id="application" className="application">
          <div className="title">{this.props.current.title}<img id="close-app"
            src={close}
            alt="close"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              this.onClose(e);
            }}
          />
          </div>
          <div className="questions">
            {this.renderHelper()}
          </div>
          <div className="actions">
            <button type="submit"
              className="submit-btn"
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
});

export default withRouter(connect(mapStateToProps, { submitApplication })(WorkExperience));
