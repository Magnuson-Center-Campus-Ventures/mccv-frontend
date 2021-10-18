/* eslint-disable */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StudentInfo from './student-info';
import StartupInfo from './startup-info';
import PositionInfo from './position-info'; 


function AdminDashboard(props) {
    const [selected, setSelected] = useState('Students')

    const handleChange = (event) => {
        setSelected(event.target.value)
    }
        return(
            <div className="dashboard">
                <h1>Activity Summary</h1>
                <select value={selected} onChange={handleChange}>
                    <option value="Students">View Student </option>
                    <option value="Startups">View Startup </option>
                    <option value="Position">View Position </option>
                </select>
                { selected === 'Students' ? 
                (
                    <div>
                    <StudentInfo/>
                    </div>
                ): (
                    selected === 'Startups' ? (
                        <div>
                        <StartupInfo/>
                    </div>
                    ) : (
                        <div>
                            <PositionInfo /> 
                        </div>
                    )
                )}
            </div>
        )
}

function mapStateToProps(reduxState) {
    return {
    };
  }



export default withRouter(connect(mapStateToProps, { })(AdminDashboard));
  