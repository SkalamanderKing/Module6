import Uservalue from "./Uservalue";
import React, { Component } from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const styles = {
  textAlign: "center",
  color: "black",
  margin: "auto",
  width: "60%",
  border: "1px dotted #AAA",
  padding: "10px",
  backgroundColor: "lightyellow",
  position: "relative",
  display: "inline-block"
};

class UserList extends Component {
  render() {
    const userList = this.props.user.map((user, k) => {
      return (
        <div key={k} style={styles}>
          <Uservalue
            value={user.email}
            title="Remove this user?"
            onClick={() => this.props.removeUsers(user)}
          />
          <Uservalue
            value={user.isAdmin}
            title="Set/unset user as admin?"
            onClick={() => this.props.toggleCompleted(user)}
          />
        </div>
      );
    });

    return (
      <div>
        {this.props.datas.isadmin && <h1>Welcome Admin!</h1>}
        {this.props.datas.isadmin && <div>{userList}</div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
