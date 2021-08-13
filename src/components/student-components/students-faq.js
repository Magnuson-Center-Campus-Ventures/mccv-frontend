import React from 'react';
import '../../styles/faq.scss';

const StudentsFAQ = (props) => {
  return (
    <div className="faqContainer">
      <h1 className="faqTitle">Magnuson Center Campus Ventures For Students</h1>
      <p>
        The Magnuson Center for Entrepreneurship (Magnuson Center) provides a student experience marketplace platform (MCCV Platform) in the form of the Magnuson Center Campus Ventures (MCCV) program.
        The MCCV program is a platform that provides Dartmouth undergraduate and graduate students (MCCV Student Participant)
        a chance to be connected with a Dartmouth or Tuck student start-up venture (MCCV Venture Partners) to get valuable volunteer experience.
      </p>
      <p>
        The Magnuson Student Leadership Board provides the MCCV Platform where the MCCV Student Participant can find interesting MCCV Venture Partners and projects that they can apply for.
        MCCV Venture Partners select MCCV Student Participants to interview and offer student volunteer roles to MCCV Student Participants.
        No academic or personal information other than what the students provide in the sign-up page is collected. The information gathered from participants is listed below:
      </p>
      <ul className="faqList">
        <li>Student name</li>
        <li>Gender (this will not be shown to startups)</li>
        <li>Class year</li>
        <li>Email address</li>
        <li>Major(s)</li>
        <li>Minor(s)</li>
        <li>Work experiences</li>
        <li>Other experiences</li>
        <li>General skill set</li>
        <li>General interests</li>
        <li>Time available to complete assignments per week</li>
      </ul>
      <p>
        The MSLB/MCCV Administrator will manage the MCCV Platform (review MCCV Venture Partner and Student Volunteer entries and archive when appropriate.)
      </p>
      <p>
        Please note that while the Magnuson Center may facilitate the connection of MCCV Student Participants in the MCCV program to the MCCV Venture Partners
        with whom they connect on the MCCV Platform, the MCCV program is not an “internship” run by the Magnuson Center or any other Dartmouth College division.
      </p>
      <p className="emphasize">
        MCCV Student Participants are not employees of the Magnuson Center, nor does Dartmouth or the Magnuson Center make any representations or warranties
        to MCCV Student Participants or MCCV Venture Partners of any kind,
        including without limitation with regard to the quality of assignments given by an MCCV Partner or completed by a MCCV Student Participant.
      </p>
      <p>
        All arrangements for the completion of assignments are made between the MCCV Venture Partners and the MCCV Student Participants,
        though the general expectations for how you will work together are set out here.
        MCCV Venture Partners are expected to communicate regularly through digital or in-person communication with the MCCV Student Participants they have chosen from the MCCV Platform.
        MCCV Venture Partners are also learning valuable management and leadership skills
        and are encouraged to schedule regular meetings and give clearly defined assignments with realistic expectations to the MCCV Student Participants they have chosen from the MCCV Platform.
        MCCV Student Participants are also expected to maintain regular contact with the MCCV Venture Partners of the student ventures with whom they are volunteering.
      </p>
      <p>
        In the spirit of the MCCV Program, MCCV Student Participants are expected to complete the assignments they have agreed to work on during the academic term in which they have been assigned.
        It is, however, the responsibility of the MCCV Partner to monitor and review the MCCV Student Participant’s assignments.
      </p>
      <p>
        The length of a MCCV Student Participant’s commitment to the MCCV Partner with whom they are volunteering is expected to be no less than 4 weeks
        and no longer than 10 weeks (the length of an academic term).
        MCCV Venture Partners are under no obligation to maintain any sort of contact or business relationship with MCCV Student Participants after this period ends.
      </p>
    </div>
  );
};

export default StudentsFAQ;
