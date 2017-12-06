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
              <li>
                <a href="#" data-toggle="modal" data-target="#myModal">
                  Sign in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Modal />
    </div>
  );
}
