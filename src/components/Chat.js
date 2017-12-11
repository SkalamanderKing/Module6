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
    this.props.addPost({
      text: this.state.value,
      postNo: e.target.id,
      createdBy: this.props.datas.uid
    });
    this.setState({ value: "" });
  };

  remove = post => {
    this.props.removePost(post);
  };

  edit = post => {
    const editedpost = Object.assign({}, post, { text: this.state.value });
    this.props.editPost(editedpost);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {

    const postList = this.props.posts.map((post, k) => {
      if (
        post.postNo === "3" &&
        (post.createdBy === this.props.datas.uid || this.props.datas.isadmin)
      ) {
        return (
          <div key={k} style={styles}>
            {post.text}
            <button
              className="button"
              onClick={() => this.remove(post)}
              style={style3}
            >
              X
            </button>
            <button
              className="button2"
              onClick={() => this.edit(post)}
              style={style4}
            >
              {" "}
              Edit{" "}
            </button>
          </div>
        );
      } else if (post.postNo === "3")
        return (
          <div key={k} style={styles}>
            {post.text}{" "}
          </div>
        );
      return null;
    });

    const postList2 = this.props.posts.map((post, k) => {
      if (
        post.postNo === "2" &&
        (post.createdBy === this.props.datas.uid || this.props.datas.isadmin)
      ) {
        return (
          <div key={k} style={styles}>
            {post.text}
        
            <button
              className="button"
              onClick={() => this.remove(post)}
              style={style3}
            >
              X
            </button>
            <button
              className="button2"
              onClick={() => this.edit(post)}
              style={style4}
            >
              {" "}
              Edit{" "}
            </button>
          </div>
        );
      } else if (post.postNo === "2")
        return (
          <div key={k} style={styles}>
            {post.text}{" "}
          </div>
        );
      return null;
    });
    return (
      <div>
        <Container>
        <SiteContent postNo={1}/>
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
          <div className="chat">{postList}</div>
        </Container>
        <br />
        <Container>
        <SiteContent postNo={2}/>
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
          <div className="chat">{postList2}</div>
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
    posts: state.posts,
    error: state.error,
    user: state.user,
    datas: state.datas
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
