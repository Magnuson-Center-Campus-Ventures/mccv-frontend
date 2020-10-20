/* eslint-disable react/static-property-placement */
/* eslint-disable react/require-default-props */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import '../styles/toggle-switch.scss';
import PropTypes from 'prop-types';

class ToggleSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.defaultChecked,
    };
  }

  onChange = (e) => {
    this.setState({
      checked: e.target.checked,
    });
    if (typeof this.props.onChange === 'function') this.props.onChange();
  };

  render() {
    return (
      <div
        className={`toggle-switch${this.props.Small ? ' small-switch' : ''}`}
      >
        <input
          type="checkbox"
          name={this.props.Name}
          className="toggle-switch-checkbox"
          id={this.props.id}
          checked={this.state.checked}
          defaultChecked={this.props.defaultChecked}
          onChange={this.onChange}
          disabled={this.props.disabled}
        />
        {this.props.id ? (
          <label className="toggle-switch-label" htmlFor={this.props.id}>
            <span
              className={
                this.props.disabled
                  ? 'toggle-switch-inner toggle-switch-disabled'
                  : 'toggle-switch-inner'
              }
              data-yes={this.props.Text[0]}
              data-no={this.props.Text[1]}
            />
            <span
              className={
                this.props.disabled
                  ? 'toggle-switch-switch toggle-switch-disabled'
                  : 'toggle-switch-switch'
              }
            />
          </label>
        ) : null}
      </div>
    );
  }

// Set text for rendering.
static defaultProps = {
  Text: ['Yes', 'No'],
  Name: 'toggle',
  defaultChecked: false,
  Small: true,
  disabled: false,
};
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
