/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CanvasJSReact from '../../helpers/canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { fetchStartups } from '../../actions/index';


function StartupInfo(props) {

    const[active, setActive] = useState(0)
    const [pending, setPending] = useState(0)
    const [archived, setArchived] = useState(0)
    const [affiliation, setAffiliation] = useState({})
    const [genders, setGenders] = useState({})
    const [industries, setIndustries] = useState({}) 
    const [locations, setLocations] = useState({})

    useEffect(() => {
        props.fetchStartups()
        if (props.startups.length !== 0 && archived === 0 && active === 0 && pending === 0){
            let industries_ = {};
            let locations_ = {};
            let genders_ = {};
            let affiliation_ = {};
            props.startups.map((startup) => {
                if (startup.status === 'Pending'){
                    setPending(pending +1)
                }
                else if (startup.status === 'Archived'){
                    setArchived(archived +1)
                }
                else if (startup.status === 'Approved'){
                    setActive(active +1)
                    if ( startup.industries.length !== 0) {
                        startup.industries.map((industry) => {
                            if (industries_[industry.name] === undefined){
                                industries_[industry.name] = 1; 
                                } else{
                                    industries_[industry.name] = industries_[industry.name] + 1;
                            }
                        })
                    }
                    if (startup.city && startup.state){
                        const local = startup.city + ', ' + startup.state; 
                        if (locations_[local] === undefined){
                            locations_[local] = 1; 
                        } else{
                            locations_[local] = locations_[local] + 1;
                        }
                    }
                    if (startup.founder_gender){
                        const gender = startup.founder_gender; 
                        if (genders_[gender] === undefined){
                            genders_[gender] = 1; 
                        } else{
                            genders_[gender] = genders_[gender] + 1; 
                        }
                    }
                    if (startup.affiliation){
                        const school = startup.affiliation; 
                        if (affiliation_[school] === undefined){
                            affiliation_[school] = 1; 
                        } else{
                            affiliation_[school] = affiliation_[school] + 1; 
                        }
                    }
                }
            })
            
            setGenders(genders_)
            setAffiliation(affiliation_)
            setLocations(locations_)
            setIndustries(industries_)
        }
    }, [])

    const checkDate = (lastEdited) => {
        const thisYear = new Date();
        const date = new Date(lastEdited); 
        if (thisYear.getFullYear() === date.getFullYear()){
            return true; 
        } else {
            return false; 
        }
    }

    const renderIndustries = () => {
        let graphData = [];
        Object.keys(industries).forEach((industry) => {
            const obj = {
                y: industries[industry], 
                label: industry
            }
            graphData.push(obj);
        })
        const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Industries"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				dataPoints: graphData
			}]
		}
		return (
		<div className="pieGraph">
			<CanvasJSChart options = {options}
			/>
        </div>
        )   
    }

    const renderLocation = () => {
        let graphData = [];
        Object.keys(locations).forEach((location) => {
            const obj = {
                y: locations[location], 
                label: location
            }
            graphData.push(obj);
        })
        const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Locations"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				dataPoints: graphData
			}]
		}
		return (
		<div className="pieGraph">
			<CanvasJSChart options = {options}
			/>
        </div>
        )   
    }

    const renderGenders = () => {
        let graphData = [];
        Object.keys(genders).forEach((gender) => {
            const obj = {
                y: genders[gender], 
                label: gender
            }
            graphData.push(obj);
        })
        const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Gender Breakdown"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				dataPoints: graphData
			}]
		}
		return (
		<div className="pieGraph">
			<CanvasJSChart options = {options}
			/>
        </div>
        )   
    }

    const renderAffiliation = () => {
        let graphData = [];
        Object.keys(affiliation).forEach((school) => {
            const obj = {
                y: (affiliation[school] / Object.keys(affiliation).length) * 100, 
                label: school
            }
            graphData.push(obj);
        })
        const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Dartmouth Affiliation"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				dataPoints: graphData
			}]
		}
		return (
		<div className="pieGraph">
			<CanvasJSChart options = {options}
			/>
        </div>
        )   
    }



        return( 
            ( <div className="dashboardContent">
                <div className="stats">
                    <p>Total Active: <strong>{active}</strong></p>
                    <p>Total Pending: <strong>{pending}</strong> </p>
                    <p>Total Archived: <strong>{archived}</strong> </p>
                </div>
               <div className="graphs">
                   <div className="graphRow">
                        {renderIndustries()}
                        {renderGenders()}
                   </div>
                   <div className="graphRow">
                        {renderLocation()}
                        {renderAffiliation()}
                   </div>
               </div>
            </div>
            )
        )
}

function mapStateToProps(reduxState) {
    return {
        startups: reduxState.startups.all,
    };
  }



export default withRouter(connect(mapStateToProps, { fetchStartups })(StartupInfo));
  