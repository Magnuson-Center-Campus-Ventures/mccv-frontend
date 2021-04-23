import Select from 'react-select';
import CreateableSelect from 'react-select/creatable';
import React, { Component } from 'react';

// extension of react-select <Select/> component that adds placeholder to give users directions
// all react-select props usable
// instructions prop (default true) determines if instructions appear upon opening menu
// create prop (default false) determines if CreateableSelect is used
class FilteredSelect extends Component {
    constructor (props) {
        super(props);
        this.state ={
            active: false,
        };
    }
    toggleActive(value) {
        this.setState({active:value});
    }
    render() {
        let newProps = {
            ...this.props,
            placeholder:(this.state.active&&this.props.instructions) ? "Type here to filter" : (this.props.placeholder),
            onMenuOpen:()=>{this.toggleActive(true)},
            onMenuClose:()=>{this.toggleActive(false)}
        }
        return ((this.props.createable) ? (<CreateableSelect {...newProps} />) : (<Select {...newProps } />))
    }
}

FilteredSelect.defaultProps = {
    instructions:true, 
    createable:false
};

export default FilteredSelect;

