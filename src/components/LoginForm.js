import React, { Component } from "react";
import * as actions from "../actions/actions";
import Input from "./Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const styles = {
  marginTop: "0.5em",
  float: "left"
};
const styles2 = {
  color: "white"
};

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    signInOrUp: "true"
  };

  signIn = e => {
    e.preventDefault();
    this.props.signIn({
      email: this.state.email,
      password: this.state.password
    });
  };

  register = e => {
    e.preventDefault();
    this.props.register({
      email: this.state.email,
      password: this.state.password
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  setOption = event => {
    if (this.state.signInOrUp) this.setState({ signInOrUp: false });
    else this.setState({ signInOrUp: true });
  };

  render() {
    return (
      <div>
        {this.state.signInOrUp &&
          !this.props.datas.uid && (
            <form onSubmit={this.signIn} className="navbar-form navbar-left">
              <Input
                onChange={this.onChange}
                value={this.state.name}
                className="button"
                id="myButt"
                type="submit"
                buttonValue="Sign In"
              />
            </form>
          )}
        <section className="error"> {this.props.error}</section>
        {!this.state.signInOrUp &&
          !this.props.datas.uid && (
            <form onSubmit={this.register} className="navbar-form navbar-left">
              <Input
                onChange={this.onChange}
                value={this.state.name}
                className="button"
                id="myButt2"
                type="submit"
                buttonValue="Register"
              />
            </form>
          )}

        {this.props.datas.uid && (
          <p style={styles2}>
            {" "}
            Welcome! {this.props.datas.email}
            <button
              className="button"
              id="myButt3"
              onClick={this.props.signOut}
            >
              {" "}
              Log out{" "}
            </button>{" "}
          </p>
        )}

        {!this.props.datas.uid && (
          <div onClick={event => this.setOption(event)} style={styles}>
            <div className="btn-group" data-toggle="buttons">
              <label className="btn btn-primary active">
                <input
                  type="radio"
                  value="SignIn"
                  defaultChecked
                  name="optradio"
                  id={String(this.state.signInOrUp)}
                  autoComplete="off"
                />
                Sign In
              </label>
              <label className="btn btn-primary">
                <input
                  type="radio"
                  value="Register"
                  name="optradio"
                  id={String(this.state.signInOrUp)}
                  autoComplete="off"
                />
                New user?
              </label>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    error: state.error,
    user: state.user,
    datas: state.datas
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
