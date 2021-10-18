/*eslint-disable*/
import React, { useRef, useState } from "react";


export default class ViewTargets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            target_rows: []
        }
        
        this.filtersUpdated = this.filtersUpdated.bind(this)
    }

    componentDidMount() {
        this.filtersUpdated()
    }
        
        
    filtersUpdated = () => {
        this.props.getTargetUsers()
        .then(res => {
        const data = [['Sn', 'Name', 'Role', 'Email']];
        let count = 1;
        res.forEach(obj => {
            data.push([
            count,
            (obj.name || obj.first_name + " " + obj.last_name || '').trim().split('.').join(' '),
            obj.user_data.role,
            (obj.contact_email || obj.user_data.email).split(',').join(' '),
            ]);
            count++;
        });
            this.setState({target_rows: data});
        });
    };
    makeRows = () => {
        const light_dark = ['file-item-light', 'file-item-dark'];
        let pos = 1;
        const seen = {};
        const rows =  this.state.target_rows.map(row => {
            if (!seen.hasOwnProperty(row[3])) {
                seen[row[3]] = 0
                return (
                <div key={row[0]} className={'row filtered-display' + light_dark[(pos++) % 2]}>
                    <div className="col-1">{row[0]}</div>
                    <div className="col-4">{row[1]}</div>
                    <div className="col-3">{row[2]}</div>
                    <div className="col-4">{row[3] }</div>
                </div>
                );
            }
        })
        if (rows.length === 1){
            rows.push(<><h1>No Targets Meet Current Criteria</h1></>)
        }

        return rows
    }
    render() {
        return (
            <div>
            {this.makeRows()}
            </div>
        );
    }
}
