 /* eslint-disable react/button-has-type */
 import React from 'react';
 import { connect } from 'react-redux';
 import { withRouter } from 'react-router-dom';
 import close from '../../../../static/img/close.png';
 import '../../../styles/terms.scss';
 
 class StartupTerms extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       signature: '',
     };
   }
 
  acceptTC() {
    this.props.acceptTC({ 
      signature: this.state.signature,
    });
  }

  renderAcceptTC() {
    if (this.state.signature != '') {
      return  <button className="modal-signed-button" onClick={() => {
        this.props.acceptTC({ signature: this.state.signature, })}}>
                Accept Terms and Conditions
              </button>;
    }
    else {
      return  <button className="modal-unsigned-button">
                Accept Terms and Conditions
              </button>;
    }
  }

   render() {
     if (!this.props.show) {
       return null;
     }
     return (
       <div className="terms-container">
         <div className="terms-title">
           <img className="terms-close-modal"
           src={close}
           alt="close"
           style={{ cursor: 'pointer' }}
           onClick={this.props.onClose}
         />
         <h1 className="terms-title">Magnuson Center Campus Ventures Terms and Conditions For Startups</h1>
         <p>
           The Magnuson Center for Entrepreneurship (Magnuson Center) provides a student experience marketplace platform (platform)
           in the form of the Magnuson Center Campus Ventures (MCCV) program.
           The MCCV program is a platform that provides Dartmouth undergraduate and graduate students (MCCV Student Participant)
           a chance to be connected with a Dartmouth or Tuck student start-up venture (MCCV Venture Partners) to get valuable volunteer experience.
         </p>
         <p>
           MCCV Venture Partners are given the opportunity through this platform to connect with Dartmouth undergraduate and graduate MCCV Student
           Participants with the purpose of completing a term assignment. At the same time, students interested in specific MCCV Venture Partners
           will be able to apply on the platform. This MCCV program gives MCCV Venture Partners more visibility on campus, although the Magnuson Center
           does not actively help with promotion or advertising for participating MCCV Venture Partners. When signing up for the platform,
           MCCV Venture Partners will provide a brief description of their start-up venture and can continuously add student volunteer assignments with recommended skill sets.
           This information will be available on the platform for interested students to peruse.
           The MSLB/MCCV Administrator will manage the MCCV Platform (review MCCV Venture Partner and Student Volunteer entries and archive when appropriate.)
         </p>
         <p>
           Please note that while the Magnuson Center may facilitate the connection of MCCV Student Participants in the MCCV program to the MCCV Venture Partners
           with whom they connect with on the platform, the MCCV program is not an “internship” run by the Magnuson Center or any other Dartmouth College division.
         </p>
         <p className="emphasize">
           MCCV Student Participants are not employees of the Magnuson Center, nor does Dartmouth or the Magnuson Center make any representations or warranties to
           MCCV Student Participants or MCCV Venture Partners of any kind, including without limitation with regard to the quality of assignments given by an MCCV Partner
           or completed by a MCCV Student Participant.
         </p>
         <p>
           All arrangements for the completion of assignments are made between the MCCV Venture Partners and the MCCV Student Participants,
           though the general expectations for how you will work together are set out here.
           MCCV Venture Partners are expected to communicate regularly through digital or in-person communication with the MCCV Student Participants they have chosen from the platform.
           MCCV Venture Partners are also learning valuable management and leadership skills and are encouraged to schedule regular meetings and give clearly defined assignments
           with realistic expectations to the MCCV Student Participants with the MCCV Student Participants they have chosen from the platform. MCCV Student Participants
           are also expected to maintain regular contact with the MCCV Venture Partners of the student ventures with whom they are volunteering.
         </p>
         <p>
           In the spirit of the MCCV Program, MCCV Student Participants are expected to complete the assignments they have agreed to work on during the academic term in which they have been assigned.
           It is, however, the responsibility of the MCCV Partner to monitor and review the MCCV Student Participant’s assignments.
         </p>
         <p>
           The length of a MCCV Student Participant’s commitment to the MCCV Partner with whom they are volunteering is expected to be no less than 4 weeks and no longer than 10 weeks
           (the length of an academic term). MCCV Venture Partners are under no obligation to maintain any sort of contact or business relationship with MCCV Student Participants after this period ends.
         </p>
       </div>
       <div className="terms-signature-container">
         <div className="new-work-exp-body">
          <div className="input-title">Sign your name here</div>
          <input className="terms-short-input" onInput={(event) => this.setState({ signature: event.target.value })} />
          {this.renderAcceptTC()}
         </div>
       </div>
     </div>
     );
   }
 }
 
 export default withRouter(connect(null, {  })(StartupTerms));
 