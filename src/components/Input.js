import React, { Component } from "react";
export default class Input extends Component {
    render() {
      return (
   <section>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={this.props.onChange}
            value={this.props.email}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.props.onChange}
            value={this.props.password}
          />
        </section>
      );
    }
  }