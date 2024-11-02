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

const Layout = ({ title, children }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const location = useLocation(); // Get current location

  const adminLinks = () => {
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
          style={isActive(location, "/calendar")}
          to="/calendar"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-people" />
          </div>
          Calendar
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

        <div className="sb-sidenav-menu-heading">Modules</div>
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseLayouts"
          aria-expanded="false"
          aria-controls="collapseLayouts"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-eyedropper" />
          </div>
          Laboratory
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down" />
          </div>
        </a>
        <div
          className="collapse"
          id="collapseLayouts"
          aria-labelledby="headingOne"
          data-parent="#sidenavAccordion"
        >
          <nav className="sb-sidenav-menu-nested nav">
            <Link
              className="nav-link"
              style={isActive(location, "/list-cat-test")}
              to="/list-cat-test"
            >
              Category Test
            </Link>
            <Link
              className="nav-link"
              style={isActive(location, "/test-result")}
              to="/test-result"
            >
              Tests Result
            </Link>
          </nav>
        </div>

        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="false"
          aria-controls="collapsePages"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-journal-medical" />
          </div>
          Modules Mgmt
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down" />
          </div>
        </a>
        <div
          className="collapse"
          id="collapsePages"
          aria-labelledby="headingTwo"
          data-parent="#sidenavAccordion"
        >
          <nav
            className="sb-sidenav-menu-nested nav accordion"
            id="sidenavAccordionPages"
          >
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#pagesCollapseAuth"
              aria-expanded="false"
              aria-controls="pagesCollapseAuth"
            >
              Medication
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down" />
              </div>
            </a>
            <div
              className="collapse"
              id="pagesCollapseAuth"
              aria-labelledby="headingOne"
              data-parent="#sidenavAccordionPages"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link
                  className="nav-link"
                  style={isActive(location, "/list-treat-cat")}
                  to="/list-treat-cat"
                >
                  Treatment
                </Link>
                <Link
                  className="nav-link"
                  style={isActive(location, "/list-prescriptions")}
                  to="/list-prescriptions"
                >
                  Prescription List
                </Link>
              </nav>
            </div>
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#pagesCollapseError"
              aria-expanded="false"
              aria-controls="pagesCollapseError"
            >
              Buildings-Floor
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down" />
              </div>
            </a>
            <div
              className="collapse"
              id="pagesCollapseError"
              aria-labelledby="headingOne"
              data-parent="#sidenavAccordionPages"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link
                  className="nav-link"
                  style={isActive(location, "/list-buildings")}
                  to="/list-buildings"
                >
                  Building
                </Link>
                <Link
                  className="nav-link"
                  style={isActive(location, "/list-floors")}
                  to="/list-floors"
                >
                  Floors
                </Link>
                <Link
                  className="nav-link"
                  style={isActive(location, "/list-departs")}
                  to="/list-departs"
                >
                  Department
                </Link>
              </nav>
            </div>
          </nav>
        </div>

        <div className="sb-sidenav-menu-heading">User Files</div>

        <Link
          className="nav-link"
          style={isActive(location, "/list-patients")}
          to="/list-patients"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-file-medical" />
          </div>
          Patients
        </Link>

        <Link
          className="nav-link"
          style={isActive(location, "/list-doctors")}
          to="/list-doctors"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-file-medical" />
          </div>
          Doctors
        </Link>

        <div className="sb-sidenav-menu-heading">Pharmacy</div>

        <Link
          className="nav-link"
          style={isActive(location, "/list-vendors")}
          to="/list-vendors"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-shop" />
          </div>
          Vendors
        </Link>

        <Link
          className="nav-link"
          style={isActive(location, "/list/medicine")}
          to="/list/medicine"
        >
          <div className="sb-nav-link-icon"></div>
          Medicine
        </Link>

        <div className="sb-sidenav-menu-heading">Expenses</div>
        <Link
          className="nav-link"
          style={isActive(location, "/list-expenses")}
          to="/list-expenses"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-cash" />
          </div>
          Expenses
        </Link>

        <div className="sb-sidenav-menu-heading">Vaccine</div>
        <Link
          className="nav-link"
          style={isActive(location, "/list-vaccine-cat")}
          to="/list-vaccine-cat"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-eyedropper" />
          </div>
          Vaccine
        </Link>

        <Link
          className="nav-link"
          style={isActive(location, "/list-app-vaccine")}
          to="/list-app-vaccine"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-card-list" />
          </div>
          Appointments
        </Link>

        <div className="sb-sidenav-menu-heading">Doctors Department</div>

        <Link
          className="nav-link"
          style={isActive(location, "/list-designate")}
          to="/list-designate"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-journal-medical" />
          </div>
          Designation
        </Link>

        <Link
          className="nav-link"
          style={isActive(location, "/list-specialize")}
          to="/list-specialize"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-journal-medical" />
          </div>
          Specialize
        </Link>
      </Fragment>
    );
  };

  const doctorLinks = () => {
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
          style={isActive(location, "/calendar")}
          to="/calendar"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-people" />
          </div>
          Calendar
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

        <div className="sb-sidenav-menu-heading">Modules</div>
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseLayouts"
          aria-expanded="false"
          aria-controls="collapseLayouts"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-eyedropper" />
          </div>
          Laboratory
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down" />
          </div>
        </a>
        <div
          className="collapse"
          id="collapseLayouts"
          aria-labelledby="headingOne"
          data-parent="#sidenavAccordion"
        >
          <nav className="sb-sidenav-menu-nested nav">
            <Link
              className="nav-link"
              style={isActive(location, "/list-cat-test")}
              to="/list-cat-test"
            >
              Category Test
            </Link>
            <Link
              className="nav-link"
              style={isActive(location, "/test-result")}
              to="/test-result"
            >
              Tests Result
            </Link>
          </nav>
        </div>

        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="false"
          aria-controls="collapsePages"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-journal-medical" />
          </div>
          Modules Mgmt
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down" />
          </div>
        </a>
        <div
          className="collapse"
          id="collapsePages"
          aria-labelledby="headingTwo"
          data-parent="#sidenavAccordion"
        >
          <nav
            className="sb-sidenav-menu-nested nav accordion"
            id="sidenavAccordionPages"
          >
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#pagesCollapseAuth"
              aria-expanded="false"
              aria-controls="pagesCollapseAuth"
            >
              Medication
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down" />
              </div>
            </a>
            <div
              className="collapse"
              id="pagesCollapseAuth"
              aria-labelledby="headingOne"
              data-parent="#sidenavAccordionPages"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link
                  className="nav-link"
                  style={isActive(location, "/list-treat-cat")}
                  to="/list-treat-cat"
                >
                  Treatment
                </Link>
                <Link
                  className="nav-link"
                  style={isActive(location, "/list-prescriptions")}
                  to="/list-prescriptions"
                >
                  Prescription List
                </Link>
              </nav>
            </div>
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#pagesCollapseError"
              aria-expanded="false"
              aria-controls="pagesCollapseError"
            >
              Buildings-Floor
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down" />
              </div>
            </a>
            <div
              className="collapse"
              id="pagesCollapseError"
              aria-labelledby="headingOne"
              data-parent="#sidenavAccordionPages"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link
                  className="nav-link"
                  style={isActive(location, "/list-buildings")}
                  to="/list-buildings"
                >
                  Building
                </Link>
                <Link
                  className="nav-link"
                  style={isActive(location, "/list-floors")}
                  to="/list-floors"
                >
                  Floors
                </Link>
                <Link
                  className="nav-link"
                  style={isActive(location, "/list-departs")}
                  to="/list-departs"
                >
                  Department
                </Link>
              </nav>
            </div>
          </nav>
        </div>

        <div className="sb-sidenav-menu-heading">User Files</div>

        <Link
          className="nav-link"
          style={isActive(location, "/list-patients")}
          to="/list-patients"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-file-medical" />
          </div>
          Patients
        </Link>

        <div className="sb-sidenav-menu-heading">Pharmacy</div>

        <Link
          className="nav-link"
          style={isActive(location, "/list-vendors")}
          to="/list-vendors"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-shop" />
          </div>
          Vendors
        </Link>

        <Link
          className="nav-link"
          style={isActive(location, "/list/medicine")}
          to="/list/medicine"
        >
          <div className="sb-nav-link-icon"></div>
          Medicine
        </Link>

        <div className="sb-sidenav-menu-heading">Expenses</div>
        <Link
          className="nav-link"
          style={isActive(location, "/list-expenses")}
          to="/list-expenses"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-cash" />
          </div>
          Expenses
        </Link>

        <div className="sb-sidenav-menu-heading">Vaccine</div>
        <Link
          className="nav-link"
          style={isActive(location, "/list-vaccine-cat")}
          to="/list-vaccine-cat"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-eyedropper" />
          </div>
          Vaccine
        </Link>

        <Link
          className="nav-link"
          style={isActive(location, "/list-app-vaccine")}
          to="/list-app-vaccine"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-card-list" />
          </div>
          Appointments
        </Link>

        <div className="sb-sidenav-menu-heading">Doctors Department</div>

        <Link
          className="nav-link"
          style={isActive(location, "/list-designate")}
          to="/list-designate"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-journal-medical" />
          </div>
          Designation
        </Link>

        <Link
          className="nav-link"
          style={isActive(location, "/list-specialize")}
          to="/list-specialize"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-journal-medical" />
          </div>
          Specialize
        </Link>
      </Fragment>
    );
  };

  const staffLink = () => {
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
          style={isActive(location, "/calendar")}
          to="/calendar"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-people" />
          </div>
          Calendar
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

        <div className="sb-sidenav-menu-heading">User Files</div>

        <Link
          className="nav-link"
          style={isActive(location, "/list-patients")}
          to="/list-patients"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-file-medical" />
          </div>
          Patients
        </Link>

        <div className="sb-sidenav-menu-heading">Pharmacy</div>

        <Link
          className="nav-link"
          style={isActive(location, "/list-vendors")}
          to="/list-vendors"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-shop" />
          </div>
          Vendors
        </Link>

        <Link
          className="nav-link"
          style={isActive(location, "/list/medicine")}
          to="/list/medicine"
        >
          <div className="sb-nav-link-icon"></div>
          Medicine
        </Link>

        <Link
          className="nav-link"
          style={isActive(location, "/list-app-vaccine")}
          to="/list-app-vaccine"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-card-list" />
          </div>
          Appointments
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
    <nav style={{}} className="sb-nav-fixed">
      <Menu />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                {userInfo.role === 0
                  ? adminLinks()
                  : userInfo.role === 1
                  ? doctorLinks()
                  : staffLink()}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#1d2869",
              }}
              className="sb-sidenav-footer"
            >
              {loggedIn()}
              {userInfo && userInfo.name}
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid">
              <h1 className="mt-3">{title}</h1>
              {children}
            </div>
          </main>
        </div>
      </div>
    </nav>
  );
};

export default Layout;
