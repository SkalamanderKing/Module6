import React from 'react';
import Link from './Link';

export default function Navbar() {
  return (
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
                  <Link to="games.html" title="Games" />
                </li>
                <li>
                  <Link to="test.html" title= "About" />
                </li>
                <li>
                  <Link to="test.htm" data-toggle="modal" data-target="#myModal"
                    title= "Sign in"
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>

  );
}