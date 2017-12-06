import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/actions";
import "../App.css";
import Jumbotron from "./Jumbotron";
import Footer from "./Footer";
import SiteContent from "./SiteContent";
import LoginForm from "./LoginForm";
import UserList from "./UserList";
import Chat from "./Chat";

class App extends Component {

  componentDidMount() {
    this.props.addTodoListener();
    this.props.removeTodoListener();
    this.props.changeTodoListener();
    this.props.changeUserListener();
    this.props.addUserListener();
    this.props.removeUserListener();
    this.props.userData();
  }

  render() {
    return (
      <div className="App">
        <LoginForm signIn={this.props.signIn} signOut={this.props.signOut} />
        <Jumbotron />
        <div>
          <UserList />
        </div>
        <SiteContent />
        <Chat />
        <Footer />
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
    datas: state.datas
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
