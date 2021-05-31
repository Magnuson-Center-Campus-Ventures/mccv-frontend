import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../../styles/landingpage.scss';
import step1Image from '../../assets/student-lp-profile.png';
import step2Image from '../../assets/student-lp-search-post.png';
import step3Image from '../../assets/student-lp-submit.png';
import studentLandingImage from '../../assets/student-lp-whiteboard.jpg';

const StudentsLanding = (props) => {
  return (
    <div className="landingPageContainer">
      <div className="topHalfContainer">
        <div className="heroTextContainer">
          <h1>
            Gain Entrepreneurial Experience
          </h1>
          <p className="heroText">
            Volunteer at a Dartmouth-affiliated startup that matches your skills and interests.
          </p>
          <NavLink to="/signup">
            <button type="button" className="landingPageSignupBtn">
              <span>Sign Up</span>
            </button>
          </NavLink>
        </div>
        <div className="heroImageContainer">
          <img
            alt="Student Landing Page"
            src={studentLandingImage}
            className="heroImage"
          />
        </div>
      </div>
      <div className="bottomHalfContainer">
        <div className="howBackground">
          <h1>
            How It Works
          </h1>

          <div className="howContainer">
            <div className="stepContainer">
              <div className="stepImageContainer">
                <img
                  alt="Create Student Profile"
                  src={step1Image}
                  className="stepImage"
                />
              </div>
              <div className="stepText">
                1. Create a profile about your skills and interests.
              </div>
            </div>

            <div className="stepContainer">
              <div className="stepImageContainer">
                <img
                  alt="Search Volunteer Positions"
                  src={step2Image}
                  className="stepImage"
                />
              </div>
              <div className="stepText">
                2. Search, filter, and view recommended startup volunteer positions.
              </div>
            </div>

            <div className="stepContainer">
              <div className="stepImageContainer">
                <img
                  alt="Apply to Position"
                  src={step3Image}
                  className="stepImage"
                />
              </div>
              <div className="stepText">
                3. Apply by sending your profile and answering a couple questions!
              </div>
            </div>
          </div>

          <NavLink to="/studentsfaq">
            <button type="button" className="landingPageLearnMoreBtn">
              <span>Learn More</span>
            </button>
          </NavLink>

        </div>
      </div>
    </div>
  );
};

export default withRouter(StudentsLanding);
