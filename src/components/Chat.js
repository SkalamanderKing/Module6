import React, { Component } from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "./Container";
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
          <div key={k}>
            {todo.text}
            <button className="button" onClick={() => this.remove(todo)}>
              X
            </button>
            <button className="button" onClick={() => this.edit(todo)}>
              {" "}
              Edit{" "}
            </button>
          </div>
        );
      } else if (todo.postNo === "3") return <div key={k}>{todo.text} </div>;
    });

    const todoList2 = this.props.todos.map((todo, k) => {
      if (
        todo.postNo === "2" &&
        (todo.createdBy === this.props.datas.uid || this.props.datas.isadmin)
      ) {
        return (
          <div key={k}>
            {todo.text}
            <button className="button" onClick={() => this.remove(todo)}>
              X
            </button>
            <button className="button" onClick={() => this.edit(todo)}>
              {" "}
              Edit{" "}
            </button>
          </div>
        );
      } else if (todo.postNo === "2") return <div key={k}>{todo.text} </div>;
    });
    return (
      <div>
        <Container>
          {this.props.error}

          <textarea
            placeholder="Din kommentar (logga in först!)"
            type="text"
            onChange={this.onChange}
            name="value"
            ref="someName"
            className="form-control"
            rows="3"
            id="comment"
            style={{
              textAlign: "left",
              borderStyle: "solid",
              margin: "auto",
              border: "3px solid #73AD21",
              padding: "10px",
              backgroundColor: "lightblue"
            }}
          />
          <p />
          {this.props.datas.uid && (
            <button
              type="submit"
              id="3"
              className="btn btn-success"
              onClick={this.add}
            >
              Skicka kommentar
            </button>
          )}
          <p />
          <div
            className="chat"
            style={{
              textAlign: "left",
              borderStyle: "solid",
              margin: "auto",
              width: "60%",
              border: "3px solid #73AD21",
              padding: "10px",
              backgroundColor: "lightblue"
            }}
          >
            {todoList}
          </div>
        </Container>

        <Container>
          {this.props.error}

          <textarea
            placeholder="Din kommentar (logga in först!)"
            type="text"
            onChange={this.onChange}
            name="value"
            ref="someName"
            className="form-control"
            rows="3"
            id="comment"
            style={{
              textAlign: "left",
              borderStyle: "solid",
              margin: "auto",
              border: "3px solid #73AD21",
              padding: "10px",
              backgroundColor: "lightblue"
            }}
          />
          <p />
          {this.props.datas.uid && (
            <button
              type="submit"
              id="2"
              className="btn btn-success"
              onClick={this.add}
            >
              Skicka kommentar
            </button>
          )}
          <p />
          <div
            className="chat"
            style={{
              textAlign: "left",
              borderStyle: "solid",
              margin: "auto",
              width: "60%",
              border: "3px solid #73AD21",
              padding: "10px",
              backgroundColor: "lightblue"
            }}
          >
            {todoList2}
          </div>
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
