import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidemenu = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <nav className="pcoded-navbar">
      <div className="sidebar_toggle">
        <Link to="#">
          <i className="icon-close icons"></i>
        </Link>
      </div>
      <div className="pcoded-inner-navbar main-menu">
        <div
          className="pcoded-navigation-label"
          data-i18n="nav.category.navigation"
        ></div>
        <ul className="pcoded-item pcoded-left-item">
          <li className={pathname === "/" ? "active" : ""}>
            <Link to="/" className="waves-effect waves-dark ">
              <span className="pcoded-micon">
                <i className="ti-home"></i>
                <b>D</b>
              </span>
              <span className="pcoded-mtext" data-i18n="nav.dash.main">
                Dashboard
              </span>
              <span className="pcoded-mcaret"></span>
            </Link>
          </li>
        </ul>
        <div className="pcoded-navigation-label" data-i18n="nav.category.forms">
          Content
        </div>
        <ul className="pcoded-item pcoded-left-item">
          <li className={pathname === "/students" ? "active" : ""}>
            <Link to="/students" className="waves-effect waves-dark">
              <span className="pcoded-micon">
                <i className="ti-layers"></i>
                <b>ST</b>
              </span>
              <span
                className="pcoded-mtext"
                data-i18n="nav.form-components.main"
              >
                Students
              </span>
              <span className="pcoded-mcaret"></span>
            </Link>
          </li>
          <li className={pathname === "/classes" ? "active" : ""}>
            <Link to="/classes" className="waves-effect waves-dark">
              <span className="pcoded-micon">
                <i className="ti-layers"></i>
                <b>Cl</b>
              </span>
              <span
                className="pcoded-mtext"
                data-i18n="nav.form-components.main"
              >
                Classes
              </span>
              <span className="pcoded-mcaret"></span>
            </Link>
          </li>
          <li className={pathname === "/countries" ? "active" : ""}>
            <Link to="/countries" className="waves-effect waves-dark">
              <span className="pcoded-micon">
                <i className="ti-layers"></i>
                <b>CR</b>
              </span>
              <span
                className="pcoded-mtext"
                data-i18n="nav.form-components.main"
              >
                Countries
              </span>
              <span className="pcoded-mcaret"></span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidemenu;
