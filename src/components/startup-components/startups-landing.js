import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../../styles/landingpage.scss';
import step1Image from '../../assets/startup-lp-profile.png';
import step2Image from '../../assets/startup-lp-search.png';
import step3Image from '../../assets/startup-lp-approve.png';
import studentLandingImage from '../../assets/startup-lp-discussion.jpg';

const StartupsLanding = (props) => {
  return (
    <div className="landingPageContainer">
      <div className="topHalfContainer">
        <div className="heroTextContainer">
          <h1>
            Find Volunteers For Your Startup
          </h1>
          <p className="heroText">
            Find motivated, skilled Dartmouth student volunteers to complete a project for your startup.
          </p>
          <NavLink to="/signup">
            <button type="button" className="landingPageSignupBtn">
              <span>Sign Up</span>
            </button>
          </NavLink>
        </div>
        <div className="heroImageContainer">
          <img
            alt="Startup Landing Page"
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
                1. Create your startup profile and volunteer positions.
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
                2. Search, filter, and view recommended students for each role.
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
                3. Review applications and connect with applicants!
              </div>
            </div>
          </div>

          <NavLink to="/startupsfaq">
            <button type="button" className="landingPageLearnMoreBtn">
              <span>Learn More</span>
            </button>
          </NavLink>

        </div>
      </div>
    </div>
  );
};

export default withRouter(StartupsLanding);
