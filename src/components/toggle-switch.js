/* eslint-disable react/static-property-placement */
/* eslint-disable react/require-default-props */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import '../styles/toggle-switch.scss';
import PropTypes from 'prop-types';

function ToggleSwitch(props) {
  console.log("in")
  const [checked, setChecked] =  useState(props.defaultChecked)

  const onChange = (e) => {
    setChecked(e.target.checked)
    if (typeof props.onChange === 'function') props.onChange();
  };

  return (
      <div
        className={`toggle-switch${props.Small ? ' small-switch' : ''}`}
      >
        <input
          type="checkbox"
          name={props.Name}
          className="toggle-switch-checkbox"
          id={props.id}
          checked={checked}
          defaultChecked={props.defaultChecked}
          onChange={onChange}
          disabled={props.disabled}
        />
        {props.id ? (
          <label className="toggle-switch-label" htmlFor={props.id}>
            <span
              className={
                props.disabled
                  ? 'toggle-switch-inner toggle-switch-disabled'
                  : 'toggle-switch-inner'
              }
              data-yes={props.Text[0]}
              data-no={props.Text[1]}
            />
            <span
              className={
                props.disabled
                  ? 'toggle-switch-switch toggle-switch-disabled'
                  : 'toggle-switch-switch'
              }
            />
          </label>
        ) : null}
      </div>
    );
}

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  Text: PropTypes.string,
  Name: PropTypes.string,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  Small: PropTypes.bool,
  disabled: PropTypes.bool,
};


export default ToggleSwitch;
