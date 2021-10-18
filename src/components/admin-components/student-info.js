/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CanvasJSReact from '../../helpers/canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { fetchStudents, fetchPosts } from '../../actions/index';
import '../../styles/dashboard.scss';


function  StudentInfo(props) {

    const [active, setActive] = useState(0)
    const [archived, setArchived] = useState(0) 
    const [totalYear, setTotalYear] = useState(0)
    const [filled, setFilled] = useState(0)
    const [studentsMatched, setStudentsMAtched] = useState(new Set()) 
    const [genders, setGenders] = useState({})
    const [affiliation, setAffiliation] = useState({})
    const [gradYear, setGradYear] = useState({})
    const [majors, setMajors] = useState({})
    const [m, setM] = useState(false)
    const fetches = async () => {
        if (!m) {
            await props.fetchStudents();
            await props.fetchPosts();
            setM(true)
        }
        console.log(m)
    }
    useEffect(() => {

        if (props.students.length !== 0 && active === 0 && archived === 0 && props.posts.length !== 0){
            let gradYear_ = {}; 
            let majors_ = {};
            let genders_ = {}; 
            let affiliation_ = {}; 
            props.students.map((student) => {
                if (student.status == 'Approved'){
                    setActive(active +1)
                    if (checkDate(student.updatedAt)){
                        setTotalYear(totalYear +1)
                    }
                }
                if (student.grad_year){
                    const year = student.grad_year; 
                    if (gradYear_[year] === undefined){
                        gradYear_[year] = 1; 
                    } else{
                        gradYear_[year] = gradYear_[year] + 1; 
                    }
                }
                if (student.majors){
                    student.majors.map((major) => {
                        const maj = checkMajor(major); 
                        if (majors_[maj.toLowerCase()] === undefined){
                            majors_[maj.toLowerCase()] = 1; 
                        } else {
                            majors_[maj.toLowerCase()] = majors_[maj.toLowerCase()] + 1;
                        }
                    })
                }
                if (student.gender){
                    const gender = student.gender; 
                    if (genders_[gender] === undefined){
                        genders_[gender] = 1; 
                    } else{
                        genders_[gender] = genders_[gender] + 1; 
                    }
                }
                if (student.affiliation){
                    const school = student.affiliation; 
                    if (affiliation_[school] === undefined){
                        affiliation_[school] = 1; 
                    } else{
                        affiliation_[school] = affiliation_[school] + 1; 
                    }
                }
            })
            setGradYear(gradYear_)
            setMajors(majors_)
            setGenders(genders_)
            setAffiliation(affiliation_)
            setArchived(props.students.length - active)
            let studentsMatched_ = new Set(studentsMatched); 
            props.posts.map((post) => {
                if (post.status === 'Archived'){
                    post.students_selected?.map((student) => {
                        studentsMatched_.add(student); 
                    })
                }
            })
            setStudentsMAtched(studentsMatched_)
            setFilled(Object.keys(studentsMatched).length)
        }
    }, [m,])

    fetches()

    const checkMajor = (major) => {
        if (major === 'cs' || major === 'CS'){
            return 'computer science';
        } else if (major === 'qss' || major === 'QSS'){
            return 'quantitative social science'; 
        } else if (major === 'econ' || major === 'Econ'){
            return 'economics';
        } else if (major === 'engs' || major === "Engs" || major === 'ENGS'){
            return "engineering";
        } else{
            return major; 
        }
    }

    const checkDate = (lastEdited) => {
        const thisYear = new Date();
        const date = new Date(lastEdited); 
        if (thisYear.getFullYear() === date.getFullYear()){
            return true; 
        } else {
            return false; 
        }
    }

    const renderGradYears = () => {
        let graphData = [];
        Object.keys(gradYear).forEach((year) => {
            const obj = {
                y: gradYear[year], 
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
				/* onRef={ref => chart = ref} */
			/>
        </div>
        )   
    }

    const renderMajors = () => {
        let graphData = [];
        Object.keys(majors).forEach((major) => {
            const obj = {
                y: majors[major], 
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
				/* onRef={ref => chart = ref} */
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
				/* onRef={ref => chart = ref} */
			/>
        </div>
        )   
    }

    const renderAffiliation = () => {
        let graphData = [];
        Object.keys(affiliation).forEach((school) => {
            const obj = {
                y: affiliation[school], 
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
				/* onRef={ref => chart = ref} */
			/>
        </div>
        )   
    }

        return( 
            ( <div className="dashboardContent">
                <div className="stats">
                    <p> Total Active: <strong>{active}</strong> </p>
                    <p> Total Archived: <strong>{archived} </strong> </p>  
                    <p> Students Who Filled Positions: <strong>{filled} </strong> </p>
                </div>
                <div className="graphs">
                    <div className="graphRow">
                        {renderGradYears()}
                        {renderGenders()}
                    </div>
                    <div className="graphRow">
                        {renderAffiliation()}
                        {renderMajors()}
                    </div>
                </div>
                {/* <p>Total students: {totalCount} </p> */}
                {/* <p>Students active this year: {totalYear} </p> */}
               
            </div>
            )
            
        )
}

function mapStateToProps(reduxState) {
    return {
        students: reduxState.students.all_students,
        posts: reduxState.posts.all,
    };
  }



export default withRouter(connect(mapStateToProps, { fetchStudents, fetchPosts })(StudentInfo));
  