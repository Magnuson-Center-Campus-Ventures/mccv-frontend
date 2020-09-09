import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CanvasJSReact from '../../helpers/canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { fetchStudents } from '../../actions/index';
import '../../styles/dashboard.scss';


class StudentInfo extends Component {
    _isMounted = false; 

    constructor(props) {
        super(props);
        // active // filled positions // total archived
        // broken down by gender options
        // affiliation dropdown - Dartmouth, geisel, tuck, thayer, guarini
        this.state = {
            active: 0, 
            archived: 0, 
            totalYear: 0, 
            genders: {},
            affiliation: {},
            gradYear: {}, 
            majors: {}, 
        };
    }

    componentDidMount(){
        this.props.fetchStudents()
        this._isMounted = true;
    }

    // going through 
    componentDidUpdate(){
        if (this.props.students.length !== 0 && this.state.active === 0 && this.state.archived === 0){
            let gradYear = {}; 
            let majors = {};
            let genders = {}; 
            let affiliation = {}; 
            this.props.students.map((student) => {
                // console.log(student); 
                if (student.status == 'Approved'){
                    this.setState((prevState) => ({
                        active: prevState.active +1,
                    })); 
                    if (this.checkDate(student.updatedAt)){
                        this.setState((prevState) => ({
                            totalYear: prevState.totalYear +1,
                        }));  
                    }
                }
                if (student.grad_year){
                    const year = student.grad_year; 
                    if (gradYear[year] === undefined){
                        gradYear[year] = 1; 
                    } else{
                        gradYear[year] = gradYear[year] + 1; 
                    }
                }
                if (student.majors){
                    student.majors.map((major) => {
                        if (majors[major] === undefined){
                            majors[major] = 1; 
                        } else{
                            majors[major] = majors[major] + 1;
                        }
                    })
                }
                if (student.gender){
                    const gender = student.gender; 
                    if (genders[gender] === undefined){
                        genders[gender] = 1; 
                    } else{
                        genders[gender] = genders[gender] + 1; 
                    }
                }
                if (student.affiliation){
                    const school = student.affiliation; 
                    if (affiliation[school] === undefined){
                        affiliation[school] = 1; 
                    } else{
                        affiliation[school] = affiliation[school] + 1; 
                    }
                }
            })
            this.setState({ gradYear, majors, genders, affiliation });
            this.setState({
                archived: this.props.students.length - this.state.active
            })
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

    renderGradYears = () => {
        let graphData = [];
        Object.keys(this.state.gradYear).forEach((year) => {
            const obj = {
                y: this.state.gradYear[year], 
                label: year
            }
            graphData.push(obj);
        })
        const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Grad Year"
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

    renderMajors = () => {
        let graphData = [];
        Object.keys(this.state.majors).forEach((major) => {
            const obj = {
                y: this.state.majors[major], 
                label: major
            }
            graphData.push(obj);
        })
        const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Majors"
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
                y: this.state.affiliation[school], 
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

    render() {
        return( 
            this._isMounted && this.state.gradYear !== {} ? 
            ( <div className="dashboardContent">
                <div className="stats">
                    <p> Total Active: <strong>{this.state.active}</strong>
                        {/* <p className="number"></p> */}
                    </p>
                    <p> Total Archived: <strong>{this.state.archived} </strong>
                    </p>  
                </div>
                <div className="graphs">
                    <div className="graphRow">
                        {this.renderGradYears()}
                        {this.renderGenders()}
                    </div>
                    <div className="graphRow">
                        {this.renderAffiliation()}
                        {this.renderMajors()}
                    </div>
                </div>
                {/* <p>Total students: {this.state.totalCount} </p> */}
                {/* <p>Students active this year: {this.state.totalYear} </p> */}
               
            </div>
            ) : <div />
            
        )
    }

}

function mapStateToProps(reduxState) {
    return {
        students: reduxState.students.all_students,
    };
  }



export default withRouter(connect(mapStateToProps, { fetchStudents })(StudentInfo));
  