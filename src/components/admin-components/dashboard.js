/* eslint-disable */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import StudentInfo from './student-info';
import StartupInfo from './startup-info';
import PositionInfo from './position-info'; 


class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'Students', 
        };
    }

    handleChange = (event) => {
        this.setState({selected: event.target.value});
    }

    render() {
        return(
            <div className="dashboard">
                <h1>Activity Summary</h1>
                <select value={this.state.selected} onChange={this.handleChange} style={{ minHeight: '40px' }}>
                    <option value="Students">View Student </option>
                    <option value="Startups">View Startup </option>
                    <option value="Position">View Position </option>
                </select>
                { this.state.selected === 'Students' ? 
                (
                    <div>
                    {/* <h2>Student Stats </h2> */}
                    <StudentInfo/>
                    </div>
                ): (
                    this.state.selected === 'Startups' ? (
                        <div>
                        {/* <h2>Startup Stats</h2> */}
                        <StartupInfo/>
                    </div>
                    ) : (
                        <div>
                            {/* <h2>Position Stats</h2> */}
                            <PositionInfo /> 
                        </div>
                    )
                )}
                <div>
                    <button onClick={(e) => {
                        this.props.history.push('/action-dashboard')
                    } }>Action Dashboard</button>
                </div>
            </div>
        )
    }

}

function mapStateToProps(reduxState) {
    return {
    };
  }



export default withRouter(connect(mapStateToProps, { })(AdminDashboard));
  