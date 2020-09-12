import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CanvasJSReact from '../../helpers/canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { fetchPosts } from '../../actions/index';


class PositionInfo extends Component {
    _isMounted = false; 

    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            filled: 0, 
            archived: 0,             
            inperson: 0,
            virtual: 0, 
            locations: {},
            industries: {}, 
        };
    }

    componentDidMount(){
        this.props.fetchPosts();
        this._isMounted = true;
    }

    // going through 
    componentDidUpdate(){
        if (this.props.posts.length !== 0 && this.state.archived === 0 && this.state.active === 0){
            let industries = {};
            let locations = {};
            this.props.posts.map((post) => {
                console.log(post);
                if (post.status === 'Archived'){
                    this.setState((prevState) => ({
                        archived: prevState.archived + 1, 
                    }));
                }
                else if (post.status === 'Approved'){
                    this.setState((prevState) => ({
                        active: prevState.active + 1,
                    })); 
                    if (post.students_selected.length > 0){
                        this.setState((prevState) => ({
                            filled: prevState.filled + 1, 
                        }));
                    }
                    if (post.virtual){
                        this.setState((prevState) => ({
                            virtual: prevState.virtual + 1, 
                        }));
                    }
                    if (post.inperson){
                        this.setState((prevState) => ({
                            inperson: prevState.inperson + 1, 
                        }));
                    }
                    if (post.industries){
                        post.industries.map((industry) => {
                            console.log(industry.name);
                            if (industries[industry.name] === undefined){
                                industries[industry.name] = 1;
                            } else {
                                industries[industry.name] = industries[industry.name] + 1;
                            }
                            console.log(industries);
                        })
                    }
                    if (post.city && post.state){
                        const local = post.city + ', ' + post.state; 
                        if (locations[local] === undefined){
                            locations[local] = 1; 
                        } else{
                            locations[local] = locations[local] + 1;
                        }
                    }
                }

            })
            this.setState({ industries, locations });
        }
    }

    renderRemote = () => {
        let graphData = [];
        graphData.push({
            y: this.state.virtual, 
            label: 'Virtual'
        }); 
        graphData.push({
            y: this.state.inperson,
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
				/* onRef={ref => this.chart = ref} */
			/>
        </div>
        )   
    }

    renderIndustries = () => {
        let graphData = [];
        console.log(this.state.industries)
        Object.keys(this.state.industries).forEach((industry) => {
            const obj = {
                y:  Object.keys(this.state.industries).length, 
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
        // console.log(this.state.industries)
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


    render() {
        return( 
            this._isMounted ? 
            ( <div className="dashboardContent">
                <div className="stats">
                    <p>Active postings: <strong>{this.state.active}</strong></p>
                    <p>Filled postings: <strong>{this.state.filled}</strong></p>
                    <p>Archived postings:<strong>{this.state.archived}</strong> </p>
                </div>
                <div className="graphs">
                    <div className="graphRow">
                        {this.renderIndustries()}
                        {this.renderRemote()}
                    </div>
                   <div className="graphRow">
                        {this.renderLocation()}
                   </div>
                </div>
            </div>
            ) : <div />
            
        )
    }

}

function mapStateToProps(reduxState) {
    return {
        posts: reduxState.posts.all,
    };
  }



export default withRouter(connect(mapStateToProps, { fetchPosts })(PositionInfo));
  