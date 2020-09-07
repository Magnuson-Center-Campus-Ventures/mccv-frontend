import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchStudents } from '../../actions/index';


class StudentInfo extends Component {
    _isMounted = false; 

    constructor(props) {
        super(props);
        // broken down by gender options
        // grad students, undergrad 
        // affiliation dropdown - Dartmouth, geisel, tuck, thayer, guarini
        // broken down by graduation year
        // broken down by major
        this.state = {
            totalCount: 0, 
            active: 0, 
            totalYear: 0, 
            male: 0, 
            female: 0, 
            grad: 0, 
            undergrad: 0, 
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
        if (this.props.students.length !== 0 && this.state.totalCount === 0){
            const num = this.props.students.length; 
            this.setState({ totalCount: num });
            let gradYear = {}; 
            this.props.students.map((student) => {
                console.log(student); 
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

            })
            this.setState({ gradYear });
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
        return Object.keys(this.state.gradYear).forEach((year) => {
            console.log('year', year);
            console.log('count: ', this.state.gradYear[year]); 
            return(
            <p> {year}:{this.state.gradYear[year]}</p>
            )
        })
        
    }

    render() {
        // console.log(this.state.gradYear);
        return( 
            this._isMounted && this.state.gradYear !== {} ? 
            ( <div>
                <p>Total students: {this.state.totalCount} </p>
                <p>Active students: {this.state.active}</p>
                <p>Students active this year: {this.state.totalYear} </p>
                {this.renderGradYears()}
                {/* { Object.keys(this.state.gradYear).forEach((year) => {
                    // console.log('year', year);
                    // console.log('count: ', this.state.gradYear[year]); 
                    return(
                    <p key={year}> {year}:{this.state.gradYear[year]}</p>
                    )
                })} */}
                {/* <p>male: {this.state.male} female: {this.state.female}</p> */}
                {/* <p>grad: {this.state.grad} undergrad: {this.state.undergrad}</p> */}
                {/* <p>affiliation </p>  */}

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
  