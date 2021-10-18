/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CanvasJSReact from '../../helpers/canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { fetchPosts } from '../../actions/index';


function PositionInfo(props) {
    const [active, setActive] =  useState(0)
    const [filled, setFilld] =  useState(0) 
    const [archived, setArchived] =  useState(0)             
    const [inperson, setInPerson] =  useState(0)
    const [virtual, setVirtual] =  useState(0) 
    const [locations, setLocations] =  useState({})
    const [industries, setIndustries] =  useState({})
    const [m, setM] = useState(false)

    useEffect(() => {
        props.fetchPosts();
        if (props.posts.length !== 0 && archived === 0 && active === 0){
            let industries_ = {};
            let locations_ = {};
            props.posts.map((post) => {
                if (post.status === 'Archived'){
                    setArchived(archived + 1)
                }
                else if (post.status === 'Approved'){
                    setActive(active + 1)
                    if (post.students_selected.length > 0){
                        setFilld(filled + 1)
                    }
                    if (post.virtual){
                        setVirtual(virtual + 1)
                    }
                    if (post.inperson){
                        setInPerson(inperson + 1)
                    }
                    if (post.industries){
                        post.industries.map((industry) => {
                            if (industries_[industry.name] === undefined){
                                industries_[industry.name] = 1;
                            } else {
                                industries_[industry.name] = industries_[industry.name] + 1;
                            }
                        })
                    }
                    if (post.city && post.state){
                        const local = post.city + ', ' + post.state; 
                        if (locations_[local] === undefined){
                            locations_[local] = 1; 
                        } else{
                            locations_[local] = locations_[local] + 1;
                        }
                    }
                }

            })
            setIndustries(industries_)
            setLocations(locations_)
        }
    })

    if (!m) {
        setM(true)
    }

    const renderRemote = () => {
        let graphData = [];
        graphData.push({
            y: virtual, 
            label: 'Virtual'
        }); 
        graphData.push({
            y: inperson,
            label: 'In Person'
        });
        const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "In Person/Virtual"
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

    const renderIndustries = () => {
        let graphData = [];
        Object.keys(industries).forEach((industry) => {
            const obj = {
                y:  Object.keys(industries).length, 
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
				/* onRef={ref => chart = ref} */
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
				/* onRef={ref => chart = ref} */
			/>
        </div>
        )   
    }


        return( 
            ( <div className="dashboardContent">
                <div className="stats">
                    <p>Active postings: <strong>{active}</strong></p>
                    <p>Filled postings: <strong>{filled}</strong></p>
                    <p>Archived postings:<strong>{archived}</strong> </p>
                </div>
                <div className="graphs">
                    <div className="graphRow">
                        {renderIndustries()}
                        {renderRemote()}
                    </div>
                   <div className="graphRow">
                        {renderLocation()}
                   </div>
                </div>
            </div>
            )
        )
}

function mapStateToProps(reduxState) {
    return {
        posts: reduxState.posts.all,
    };
  }



export default withRouter(connect(mapStateToProps, { fetchPosts })(PositionInfo));
  