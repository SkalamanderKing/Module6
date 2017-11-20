import React, { Component } from "react";
export default class ToggleCheckbox extends React.Component {
    // state initialized outside constructor
    state = {
      checked: false,
    };
  
    // Using an *arrow* function ensures `this` bound to component
    toggleChecked = () => {
      this.setState((prevState) => (
        { checked: !prevState.checked }
      ));
    }
  
    render() {
        const className = this.state.checked ?
        'toggle checkbox checked' : 'toggle checkbox';
        return ( 
            <div className={className}>
        <input
          type='checkbox'
          name='public'
          onClick={this.toggleChecked}
        />
        <label>Subscribe to weekly newsletter</label>
      </div>
        );
    }
  }