import React from "react";
import Link from "./Link";
import Modal from "./Modal";
export default function Navbar() {
  return (
    <div>
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#bar"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="bar">
          <ul className="nav navbar-nav navbar-right">
          {/* <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Small Modal</button> */}
            {/* <li>
              <Link to="games.html" title="Games" />
            </li>
            <li>
              <Link to="test.html" title="About" />
            </li> */}
            {/* <li>
              <Link
                to="#"
                data-toggle="modal"
                data-target="#myModal"
                title="Sign in"
              />
            </li> */}
            	<li><a href="#" data-toggle="modal" data-target="#myModal">Sign in</a></li>
          </ul>

          {/* <form className="navbar-form navbar-left">
            <div className="form-group">
              <input
                type="email"
                className="form-control input-sm"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control input-sm"
                placeholder="password"
              />
            </div>
            <button type="submit" className="btn btn-warning btn-sm">
              Submit
            </button>
          </form> */}
        </div>
      </div>

    </nav>
<Modal />

     </div>
  );
}
