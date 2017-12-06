import React, { Component } from "react";
export default class Modal extends Component {
  render() {
    return (
      <div className="container">
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h3>
                  <span className="glyphicon glyphicon-tree-conifer" /> Login
                </h3>
              </div>
              <div className="modal-body">
                <form onSubmit={this.props.signIn}>
                  <div className="form-group has-success has-feedback">
                    <label for="usrname"> Username</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      id="usrname"
                      placeholder="Enter email"
                      onChange={this.props.onChange}
                      value={this.props.email}
                      required
                    />
                  </div>
                  <div className="form-group has-warning has-feedback">
                    <label for="psw">Password</label>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="psw"
                      placeholder="Enter password"
                      onChange={this.props.onChange}
                      value={this.props.password}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block outline"
                  >
                    <span className="glyphicon glyphicon-off" /> Login
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
