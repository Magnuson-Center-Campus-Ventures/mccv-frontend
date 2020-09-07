import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchStartups } from '../../actions/index';


class StartupInfo extends Component {
    _isMounted = false; 

    constructor(props) {
        super(props);
        // what about multiple founders?
        // broken down by gender options 
        // grad students, undergrad founders
        // affiliation dropdown - Dartmouth, geisel, tuck, thayer, guarini
        // broken down by graduation year
        // broken down by industry
        this.state = {
            totalCount: 0, 
            active: 0,
            totalYear: 0, 
            multipleFounders: 0,
            male: 0,  
            female: 0, 
            grad: 0, 
            undergrad: 0, 
            affiliation: {},
            gradYear: {}, 
            industry: {}, 
        };
    }

    componentDidMount(){
        this.props.fetchStartups()
        this._isMounted = true;
    }

    // going through 
    componentDidUpdate(){
        if (this.props.startups.length !== 0 && this.state.totalCount === 0){
            const num = this.props.startups.length; 
            this.setState({ totalCount: num });
            let gradYear = {}; 
            this.props.startups.map((startup) => {
                // console.log(startup); 
                if (startup.status == 'Approved'){
                    this.setState((prevState) => ({
                        active: prevState.active +1,
                    })); 
                    if (this.checkDate(startup.updatedAt)){
                        this.setState((prevState) => ({
                            totalYear: prevState.totalYear +1,
                        }));  
                    }
                }
                // if (startup.grad_year){
                //     const year = student.grad_year; 
                //     if (gradYear[year] === undefined){
                //         gradYear[year] = 1; 
                //     } else{
                //         gradYear[year] = gradYear[year] + 1; 
                //     }
                // }
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


    render() {
        return( 
            this._isMounted ? 
            ( <div>
                <p>Total startups: {this.state.totalCount} </p>
                <p>Active startups: {this.state.active}</p>
                <p>Startups active this year: {this.state.totalYear}</p>
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
        startups: reduxState.startups.all,
    };
  }



export default withRouter(connect(mapStateToProps, { fetchStartups })(StartupInfo));
  