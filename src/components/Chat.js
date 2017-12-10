import React, { Component } from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./Container";
import SiteContent from "./SiteContent";

const styles = {
  textAlign: "left",

  margin: "auto",
  width: "60%",
  border: "1px solid #73AD21",
  padding: "10px",
  backgroundColor: "lightblue",
  position: "relative",
  display: "inline-block"
};
const styles2 = {
  width: "60%",
  textAlign: "left",
  borderStyle: "solid",
  margin: "auto",
  border: "3px solid #73AD21",
  padding: "10px",
  backgroundColor: "lightgrey"
};
const style3 = {
  position: "absolute",
  top: 0,
  right: 0
};
const style4 = {
  position: "absolute",
  bottom: 0,
  right: 0
};
class Chat extends Component {
  state = {
    text: "",
    value: ""
  };

  add = e => {
    this.props.addTodo({
      text: this.state.value,
      postNo: e.target.id,
      createdBy: this.props.datas.uid
    });
    this.setState({ value: "" });
  };

  remove = todo => {
    this.props.removeTodo(todo);
  };

  edit = todo => {
    const editedTodo = Object.assign({}, todo, { text: this.state.value });
    this.props.editTodo(editedTodo);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {

    const todoList = this.props.todos.map((todo, k) => {
      if (
        todo.postNo === "3" &&
        (todo.createdBy === this.props.datas.uid || this.props.datas.isadmin)
      ) {
        return (
          <div key={k} style={styles}>
            {todo.text}
            <button
              className="button"
              onClick={() => this.remove(todo)}
              style={style3}
            >
              X
            </button>
            <button
              className="button2"
              onClick={() => this.edit(todo)}
              style={style4}
            >
              {" "}
              Edit{" "}
            </button>
          </div>
        );
      } else if (todo.postNo === "3")
        return (
          <div key={k} style={styles}>
            {todo.text}{" "}
          </div>
        );
      return null;
    });

    const todoList2 = this.props.todos.map((todo, k) => {
      if (
        todo.postNo === "2" &&
        (todo.createdBy === this.props.datas.uid || this.props.datas.isadmin)
      ) {
        return (
          <div key={k} style={styles}>
            {todo.text}
            <button
              className="button"
              onClick={() => this.remove(todo)}
              style={style3}
            >
              X
            </button>
            <button
              className="button2"
              onClick={() => this.edit(todo)}
              style={style4}
            >
              {" "}
              Edit{" "}
            </button>
          </div>
        );
      } else if (todo.postNo === "2")
        return (
          <div key={k} style={styles}>
            {todo.text}{" "}
          </div>
        );
      return null;
    });
    return (
      <div>
        <Container>
        <SiteContent />
          {this.props.error}
          <p> Comments (Please login)</p>
          {this.props.datas.uid && (
            <textarea
              placeholder="Your comments ..."
              type="text"
              onChange={this.onChange}
              name="value"
              ref="someName"
              className="form-control"
              rows="3"
              id="comment"
              style={styles2}
            />
          )}
          <p />
          {this.props.datas.uid && (
            <button
              type="submit"
              id="3"
              className="btn btn-success"
              onClick={this.add}
            >
              Send comment
            </button>
          )}
          <p />
          <div className="chat">{todoList}</div>
        </Container>
        <br />
        <Container>
        <SiteContent />
          {this.props.error}
         <p> Comments (Please login)</p>
          {this.props.datas.uid && (
            <textarea
              placeholder="Your comments ..."
              type="text"
              onChange={this.onChange}
              name="value"
              ref="someName"
              className="form-control"
              rows="3"
              id="comment"
              style={styles2}
            />
          )}
          <p />
          {this.props.datas.uid && (
            <button
              type="submit"
              id="2"
              className="btn btn-success"
              onClick={this.add}
            >
              Send comment
            </button>
          )}
          <p />
          <div className="chat">{todoList2}</div>
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
