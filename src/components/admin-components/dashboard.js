import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import StudentInfo from './student-info';
import StartupInfo from './startup-info';


class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

// total students
// total headcount at the moment - active students
// grand total for academic year - students have been active the whole year
// broken down by gender options
// grad students, undergrad 
// affiliation dropdown - Dartmouth, geisel, tuck, thayer, guarini
// broken down by graduation year
// broken down by major


    render() {
        return(
            <div>
                this is where the Admin Dashboard will go
                <h1>Student Stats </h1>
                <StudentInfo/>
                <h1>Startup Stats</h1>
                <StartupInfo/>
            </div>
        )
    }

}

function mapStateToProps(reduxState) {
    return {
    };
  }



export default withRouter(connect(mapStateToProps, { })(AdminDashboard));
  