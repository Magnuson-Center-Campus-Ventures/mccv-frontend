import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CanvasJSReact from '../../helpers/canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { fetchStartups } from '../../actions/index';


class StartupInfo extends Component {
    _isMounted = false; 

    constructor(props) {
        super(props);
        // broken down by founder gender  
        // affiliation dropdown - Dartmouth, geisel, tuck, thayer, guarini
        this.state = {
            // totalCount: 0, 
            active: 0,
            pending: 0, 
            archived: 0, 
            // totalYear: 0, 
            // multipleFounders: 0, 
            affiliation: {},
            genders: {},
            industries: {}, 
            locations: {},
        };
    }

    componentDidMount(){
        this.props.fetchStartups()
        this._isMounted = true;
    }

    // going through 
    componentDidUpdate(){
        if (this.props.startups.length !== 0 && this.state.archived === 0 && this.state.active === 0 && this.state.pending === 0){
            let industries = {};
            let locations = {};
            let genders = {};
            let affiliation = {};
            this.props.startups.map((startup) => {
                if (startup.status === 'Pending'){
                    this.setState((prevState) => ({
                        pending: prevState.pending +1,
                    })); 
                }
                else if (startup.status === 'Archived'){
                    this.setState((prevState) => ({
                        archived: prevState.archived +1,
                    })); 
                }
                else if (startup.status === 'Approved'){
                    this.setState((prevState) => ({
                        active: prevState.active +1,
                    })); 
                    // if (this.checkDate(startup.updatedAt)){
                    //     this.setState((prevState) => ({
                    //         totalYear: prevState.totalYear +1,
                    //     }));  
                    // }
                    if ( startup.industries.length !== 0) {
                        startup.industries.map((industry) => {
                            if (industries[industry.name] === undefined){
                                industries[industry.name] = 1; 
                                } else{
                                    industries[industry.name] = industries[industry.name] + 1;
                            }
                        })
                    }
                    if (startup.city && startup.state){
                        const local = startup.city + ', ' + startup.state; 
                        if (locations[local] === undefined){
                            locations[local] = 1; 
                        } else{
                            locations[local] = locations[local] + 1;
                        }
                    }
                    if (startup.founder_gender){
                        const gender = startup.founder_gender; 
                        if (genders[gender] === undefined){
                            genders[gender] = 1; 
                        } else{
                            genders[gender] = genders[gender] + 1; 
                        }
                    }
                    if (startup.affiliation){
                        const school = startup.affiliation; 
                        if (affiliation[school] === undefined){
                            affiliation[school] = 1; 
                        } else{
                            affiliation[school] = affiliation[school] + 1; 
                        }
                    }
                }
            })
            this.setState({ industries, locations, genders, affiliation });
        }
    }

    checkDate = (lastEdited) => {
        const thisYear = new Date();
        const date = new Date(lastEdited); 
        if (thisYear.getFullYear() === date.getFullYear()){
            return true; 
        } else {
            return false; 
        }
    }

    renderIndustries = () => {
        let graphData = [];
        Object.keys(this.state.industries).forEach((industry) => {
            const obj = {
                y: this.state.industries[industry], 
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
				/* onRef={ref => this.chart = ref} */
			/>
        </div>
        )   
    }

    renderLocation = () => {
        let graphData = [];
        Object.keys(this.state.locations).forEach((location) => {
            const obj = {
                y: this.state.locations[location], 
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
				/* onRef={ref => this.chart = ref} */
			/>
        </div>
        )   
    }

    renderGenders = () => {
        let graphData = [];
        Object.keys(this.state.genders).forEach((gender) => {
            const obj = {
                y: this.state.genders[gender], 
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
				/* onRef={ref => this.chart = ref} */
			/>
        </div>
        )   
    }

    renderAffiliation = () => {
        let graphData = [];
        Object.keys(this.state.affiliation).forEach((school) => {
            const obj = {
                y: (this.state.affiliation[school] / Object.keys(this.state.affiliation).length) * 100, 
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
				/* onRef={ref => this.chart = ref} */
			/>
        </div>
        )   
    }



    render() {
        return( 
            this._isMounted ? 
            ( <div className="dashboardContent">
                <div className="stats">
                    <p>Total Active: <strong>{this.state.active}</strong></p>
                    <p>Total Pending: <strong>{this.state.pending}</strong> </p>
                    <p>Total Archived: <strong>{this.state.archived}</strong> </p>
                </div>
                {/* <p>Total startups: {this.state.totalCount} </p> */}
                
                {/* <p>Startups active this year: {this.state.totalYear}</p> */}
               <div className="graphs">
                   <div className="graphRow">
                        {this.renderIndustries()}
                        {this.renderGenders()}
                   </div>
                   <div className="graphRow">
                        {this.renderLocation()}
                        {this.renderAffiliation()}
                   </div>
               </div>
           
                {/* <p>male: {this.state.male} female: {this.state.female}</p> */}
                {/* <p>affiliation </p>  */}

            </div>
            ) : <div />
            
        )
    }

}

function mapStateToProps(reduxState) {
    return {
        startups: reduxState.startups.all,
    };
  }



export default withRouter(connect(mapStateToProps, { fetchStartups })(StartupInfo));
  