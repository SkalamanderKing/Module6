import React, { Component } from "react";
import firebase from "../firebase";
import * as actions from "../actions/actions";
import Input from "./Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    signInOrUp: true
  };

  signIn = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password);
    //  .then(this.setState({ loggedIn: true }));
   this.props.isAdmin();
  };

  register = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        const newUser = {
          email: user.email,
          isAdmin: false,
          posts: ""
        };
        if (user !== null)
          firebase
            .database()
            .ref(`users/${user.uid}`)
            .set(newUser);
        //  .then(this.setState({ loggedIn: true }));
      });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  setOption = event => {
    if (this.state.signInOrUp) this.setState({ signInOrUp: false });
    else this.setState({ signInOrUp: true });
  };
  render() {
 //  console.log(this.props.isadmin);

    return (
      <div>
        {this.state.signInOrUp &&
          !this.props.datas.uid && (
            <form onSubmit={this.signIn}>
              <div className="form-inline">
                <Input onChange={this.onChange} value={this.state.name} />
                <input
                  className="button"
                  id="myButt"
                  type="submit"
                  value="Sign In"
                />{" "}
              </div>
            </form>
          )}

        {!this.state.signInOrUp &&
          !this.props.datas.uid && (
            <form onSubmit={this.register}>
              <div className="form-inline">
                {" "}
                <Input onChange={this.onChange} value={this.state.name} />
                <input
                  className="button"
                  id="myButt2"
                  type="submit"
                  value="Register"
                />
              </div>
            </form>
          )}

        {this.props.datas.uid && (
          <p>
            {this.props.datas.email}
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
          <div onClick={event => this.setOption(event)}>
            <label className="radio-button">
              {" "}
              <input
                type="radio"
                value="SignIn"
                defaultChecked
                name="signInOrUp"
              />
              Sign In{" "}
            </label>
            <label className="radio-button">
              {" "}
              <input type="radio" value="Register" name="signInOrUp" />
              Register{" "}
            </label>
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
    todos: state.todos,
    error: state.error,
    user: state.user,
    datas: state.datas,
  //  isadmin: state.isadmin
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
