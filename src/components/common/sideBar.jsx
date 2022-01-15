import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <nav className="navbar header-navbar pcoded-header">
        <div className="navbar-wrapper">
          <div className="navbar-logo">
            <Link
              className="mobile-menu waves-effect waves-light"
              id="mobile-collapse"
              to="/"
            >
              <i className="ti-menu"></i>
            </Link>
            <div className="mobile-search waves-effect waves-light">
              <div className="header-search">
                <div className="main-search morphsearch-search">
                  <div className="input-group">
                    <span className="input-group-addon search-close">
                      <i className="ti-close"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Keyword"
                    />
                    <span className="input-group-addon search-btn">
                      <i className="ti-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/">
              <strong>Rihal Challange</strong>
            </Link>
            <a className="mobile-options waves-effect waves-light">
              <i className="ti-more"></i>
            </a>
          </div>

          <div className="navbar-container container-fluid">
            <ul className="nav-right">
              <li className="user-profile header-notification">
                <Link to="#" className="waves-effect waves-light">
                  <span>John Doe</span>
                  <i className="ti-angle-down"></i>
                </Link>
                <ul className="show-notification profile-notification">
                  <li className="waves-effect waves-light">
                    <Link to="/profile">
                      <i className="ti-user"></i> Profile
                    </Link>
                  </li>

                  <li className="waves-effect waves-light">
                    <Link to onClick={handleLogout}>
                      <i className="ti-layout-sidebar-left"></i> Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
