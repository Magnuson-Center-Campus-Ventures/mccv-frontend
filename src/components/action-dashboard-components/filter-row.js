/*eslint-disable*/
import React, { Component } from 'react'
import {
    UserFields, StudentFields, StartUpFields, UserInputMap,
    StudentInputMap, StartUpInputMap, getFieldName, handleMap
} from './filters'
import Select from 'react-select'

export default class FilterRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recepient: props.recepient,
            row_num: props.row_num,
            color_code: props.color_code,
            field: null,
            value: null,
            removeFilter: props.remove_filter,
            major_props: props.props,
            exclude: false,
        }
        this.major_props = props
        this.fieldChange = this.fieldChange.bind(this)
        this.valueChange = this.valueChange.bind(this)
        this.removeSelf = this.removeSelf.bind(this)
        this.check = this.check.bind(this)
    }
    
    fieldChange = (e) => {
        this.setState({ field: e, value: null })
        this.major_props.updateChildWithFilters()
    }
    
    valueChange = (e) => {
        let map = this.state.recepient === "Students" ? {...StudentInputMap, ...UserInputMap} : this.state.recepient === "Startups" ? {...StartUpInputMap, ...UserInputMap} : UserInputMap
        if (map[getFieldName(this.state.field.value)][0] === "multiple") {
            const val = this.state.value || []
            val.push(e)
            this.setState({value: val})
        }
        else if (map[getFieldName(this.state.field.value)][0] === "select") {
            this.setState({value: e})
        } else {
            this.setState({value: e.target.value})
        }
        this.major_props.updateChildWithFilters()
    }
    
    removeSelf = (e) => {
        e.preventDefault()
        this.state.removeFilter(this.state.row_num)
    }
    
    check = (e) => {
        this.setState({ exclude: e.target.checked })
        this.major_props.updateChildWithFilters()
    }
    
    render() {
        let fields = ["Add Field"]
        Object.entries(UserFields).forEach(field => fields.push(field[1]))
        let map = this.state.recepient === "Students" ? {...StudentInputMap, ...UserInputMap} : this.state.recepient === "Startups" ? {...StartUpInputMap, ...UserInputMap} : UserInputMap                
        if (this.state.recepient === "Students") {
            Object.entries(StudentFields).forEach(field => fields.push(field[1]))
        } else if (this.state.recepient === "Startups") {
            Object.entries(StartUpFields).forEach(field => fields.push(field[1]))
        }
        return (
            <div id={"Filter"+this.state.row_num} className={"row "+this.state.color_code}>
                <div className="col-4">
                    <Select
                        options={fields.map(field => {
                            return { value: field, label: field }
                        })}
                        className="filter-field-select"
                        value={this.state.field||{value:fields[0], label:fields[0]}}
                        onChange={this.fieldChange}
                        id={"FilterFieldSelect"+this.state.row_num}/>
                    <label htmlFor={"FilterFieldSelect"+this.state.row_num}> </label>
                </div>
                <div className="col-4">
                    {this.state.field !== null && this.state.field.value !== "Add Field"
                        ?
                        handleMap(map, getFieldName(this.state.field.value), this.valueChange, this.state.value, this.state.major_props)
                        :
                        null
                    }
                </div>
                <div className="col-2">
                    <input value={this.state.exclude} onClick={this.check} className="checkbox" type="checkbox"/>
                </div>
                <a className="col-2" href="#" onClick={this.removeSelf}><i id="Del_Icon_ + filter_light_dark + " className="fas fa-trash-alt"> </i></a>
            </div>
        )
    }
}
