/* eslint-disable react/jsx-props-no-spreading */
import Select from 'react-select';
import CreateableSelect from 'react-select/creatable';
import React, { Component, useState } from 'react';

// extension of react-select <Select/> component that adds placeholder to give users directions
// all react-select props usable
// instructions prop (default true) determines if instructions appear upon opening menu
// create prop (default false) determines if CreateableSelect is used
function FilteredSelect(props) {
  const [active, setActive] = useState(false)

  const toggleActive = (value) => {
    setActive(value)
  }

    const newProps = {
      ...props,
      placeholder: (active && props.instructions) ? 'Type here to filter' : (props.placeholder),
      onMenuOpen: () => { toggleActive(true); },
      onMenuClose: () => { toggleActive(false); },
    };
    return ((props.createable) ? (<CreateableSelect {...newProps} />) : (<Select {...newProps} />));
}

FilteredSelect.defaultProps = {
  instructions: true,
  createable: false,
};

export default FilteredSelect;
