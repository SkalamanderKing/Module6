import React, { Component } from "react";
const styles = { 
  marginLeft: '0.5em'
}
export default class Input extends Component {
  render() {
    return (
      <section>
        <div className="form-group">
        <input
          type="text"
          name="email"
          className="form-control input-sm"
          placeholder="email"
          onChange={this.props.onChange}
          value={this.props.email}
        />
        <input
          type="password"
          name="password"
          className="form-control input-sm"
          placeholder="password"
          onChange={this.props.onChange}
          value={this.props.password}
        />

        <input
         style={styles}
          className={this.props.className}
          id={this.props.id}
          type="submit"
          value={this.props.buttonValue}
        />
        </div>
      </section>
    );
  }
}
