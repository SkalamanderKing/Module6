import React, { Component } from "react";

export default class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  signIn = (e) => {
    e.preventDefault();
    //Hurr durr, password in state, man this dev is bad.
    const user = { email: this.state.email, password: this.state.password }
    this.props.signIn(user);
  } 

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div style={{ position: "absolute", top: 10, left: 10}}>
        <form onSubmit={this.signIn}>
          <input
            type="text"
            name="email"
            className="input"
            value={this.state.email}
            onChange={this.onChange}
          />

          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <input type="submit" value="Login" className="button is-primary" />
        </form>
        <button className="button" onClick={this.props.signOut}> Sign Out </button>
      </div>
    );
  }
}
