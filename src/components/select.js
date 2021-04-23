import Select from 'react-select';
import React, { Component } from 'react';

// extension of react-select <Select/> component that adds placeholder to give users directions
// all react-select props usable, and instructions prop determines if placeholder switched (default true)
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
        return (
            <Select 
            {...this.props} 
            placeholder= {(this.state.active&&this.props.instructions) ? "Type here to filter" : (this.props.placeholder)}
            onMenuOpen={()=>{this.toggleActive(true)}}
            onMenuClose={()=>{this.toggleActive(false)}}
            />
        );
    }
}

FilteredSelect.defaultProps = {instructions:true};

export default FilteredSelect;

