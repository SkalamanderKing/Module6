import Uservalue from "./Uservalue";
import React, { Component } from "react";
//import firebase from "../firebase";
import * as actions from "../actions/actions";
///import Input from "./Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class UserList extends Component {
  state = {};
  // this.state.isAdmin &&

  render() {
   // console.log("lii "+this.props.datas.isadmin);
    var userList = undefined;
    if (this.props.datas.isadmin) {
      userList = this.props.user.map((user, k) => {
        if (user !== "") {
          return (
            <div key={k}>
              <Uservalue
                value={user.email}
                title="Remove"
                onClick={() => this.props.removeUsers(user)}
              />
              <Uservalue
                value={user.isAdmin}
                title="Admin"
                onClick={() => this.props.toggleCompleted(user)}
              />
            </div>
          );
        } else return <div key={k}> </div>;
      });
    }

    return (
      <div>
        <div>{userList}</div>
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
   // isadmin: state.isadmin
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
