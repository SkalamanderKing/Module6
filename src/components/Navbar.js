import React from "react";
import LoginForm from "./LoginForm";

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target="#bar"
        >
          {" "}
        </button>

        <div className="collapse navbar-collapse" id="bar">
          <LoginForm />
          <ul className="nav navbar-nav navbar-right"> </ul>
        </div>
      </div>
    </nav>
  );
}
