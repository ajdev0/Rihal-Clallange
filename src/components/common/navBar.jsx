import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

const Navbar = () => {
  const user = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top flex-md-nowrap bg-dark">
      <Link className="navbar-brand" to="/">
        Rihal Challange
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
