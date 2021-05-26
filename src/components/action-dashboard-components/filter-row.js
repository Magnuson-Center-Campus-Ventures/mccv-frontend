/*eslint-disable*/
import React, { Component } from 'react'
import {UserFields, StudentFields, StartUpFields} from './filters'

export default class FilterRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recepient: props.recepient,
            row_num: props.row_num,
            color_code: props.color_code,
            field: "Add Field",
            value: "",
            removeFilter: props.remove_filter
        }
        this.fieldChange = this.fieldChange.bind(this)
        this.valueChange = this.valueChange.bind(this)
        this.removeSelf = this.removeSelf.bind(this)
    }
    
    fieldChange = (e) => {
        this.setState({field: e.target.value})
    }
    
    valueChange = (e) => {
        this.setState({value: e.target.value})
    }
    
    removeSelf = (e) => {
        e.preventDefault()
        this.state.removeFilter(this.state.row_num)
    }
    
    render() {
        let fields = Object.entries(UserFields).map(field => field[1])
        
        if (this.state.recepient === "Students") {
            Object.entries(StudentFields).forEach(field => fields.push(field[1]))
        } else if (this.state.recepient === "Startups") {
            Object.entries(StartUpFields).forEach(field => fields.push(field[1]))
        }
        
        return (
            <div id={"Filter"+this.state.row_num} className={"row "+this.state.color_code}>
                <div className="col-4">
                    <select id={"FilterFieldSelect"+this.state.row_num} name="filter-field-select" className="filter-field-select" value={this.state.field} onChange={this.fieldChange}>
                        <option disabled value="">Add Field</option>
                        {fields.map(field => <option key={field} value={field}>{field}</option>)}
                    </select>
                        <label htmlFor={"FilterFieldSelect"+this.state.row_num}> </label>
                </div>
                <div className="col-4">
                    <input value={this.state.value} onChange={this.valueChange} />
                </div>
                <a className="col-2 text-right text-center" href="#" onClick={this.removeSelf}><i id="Del_Icon_ + filter_light_dark + " className="fas fa-trash-alt"> </i></a>
            </div>
        )
    }
}