import React, { Fragment } from "react";
import "../styles.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "./Menu";

// Check if the current path is active
const isActive = (location, path) => {
  if (location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const DocLayout = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const location = useLocation(); // Get current location

  const docLinks = () => {
    return (
      <Fragment>
        <div className="sb-sidenav-menu-heading">Core</div>
        <Link className="nav-link" style={isActive(location, "/")} to="/">
          <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt" />
          </div>
          Dashboard
        </Link>

        <Link
          className="nav-link"
          style={isActive(location, `/profile/${userInfo._id}`)}
          to={`/profile/${userInfo._id}`}
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-person-badge-fill" />
          </div>
          Update Profile
        </Link>

        <Link
          className="nav-link"
          style={isActive(location, "/list/users")}
          to="/list/users"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-people" />
          </div>
          List Users
        </Link>
      </Fragment>
    );
  };

  const loggedIn = () => (
    <div
      style={{
        backgroundColor: "#1d2869",
      }}
      className="small"
    >
      Logged in as:
    </div>
  );

  return (
    <nav className="sb-nav-fixed">
      <Menu />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">{docLinks()}</div>
            </div>
            <divv
              style={{
                backgroundColor: "#1d2869",
              }}
              className="sb-sidenav-footer"
            >
              {loggedIn()}
              {userInfo && userInfo.name}
            </divv>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid">
              <h1 className="mt-4">Dashboard</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
              {children}
            </div>
          </main>
        </div>
      </div>
    </nav>
  );
};

export default DocLayout;
