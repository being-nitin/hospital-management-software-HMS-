import React, { Fragment } from "react";
import "../styles.css";
import styles from '../style/dashboard.module.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "./Menu";

// Check if the current path is active
const isActive = (location, path) => {
	if (location.pathname === path) {
		return { color: "#ff9900", fontFamily: "Roboto sans-serif" };
	} else {
		return { color: "gray", fontFamily: "Roboto sans-serif" };
	}
};

const Layout = ({ title, children }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const location = useLocation(); 
	const navigate = useNavigate()

	const handleBack = () => {
        navigate(-1); 
    };

    // Function to handle forward navigation
    const handleForward = () => {
        navigate(1); 
    };
	const adminLinks = () => {
		return (
			<Fragment
				style={{
					fontFamily: "Roboto sans-serif",
				}}>
				<div
					className="sb-sidenav-menu-heading"
					style={{
						fontFamily: "Roboto sans-serif",
					}}>
					Core
				</div>
				<Link
					className="nav-link"
					style={isActive(location, "/")}
					to="/">
					<div
						className="sb-nav-link-icon"
						style={{
							fontFamily: "Roboto sans-serif",
						}}>
						<i className="fas fa-tachometer-alt" />
					</div>
					Dashboard
				</Link>

				<Link
					className="nav-link"
					style={isActive(location, `/profile/${userInfo._id}`)}
					to={`/profile/${userInfo._id}`}>
					<div
						className="sb-nav-link-icon"
						style={{
							fontFamily: "Roboto sans-serif",
						}}>
						<i className="bi bi-person-badge-fill" />
					</div>
					Update Profile
				</Link>

				<Link
					className="nav-link"
					style={isActive(location, "/calendar")}
					to="/calendar">
					<div
						className="sb-nav-link-icon"
						style={{
							fontFamily: "Roboto sans-serif",
						}}>
						<i className="bi bi-people" />
					</div>
					Calendar
				</Link>

				{/* <Link
					className="nav-link"
					style={isActive(location, "/list/users")}
					to="/list/users">
					<div className="sb-nav-link-icon">
						<i className="bi bi-people" />
					</div>
					List Users
				</Link> */}

				<div className="sb-sidenav-menu-heading">Modules</div>
				<a
					className="nav-link collapsed"
					href="#"
					data-toggle="collapse"
					data-target="#collapseLayouts"
					aria-expanded="false"
					aria-controls="collapseLayouts">
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
					data-parent="#sidenavAccordion">
					<nav className="sb-sidenav-menu-nested nav">
						<Link
							className="nav-link"
							style={isActive(location, "/list-cat-test")}
							to="/list-cat-test">
							Category Test
						</Link>
						<Link
							className="nav-link"
							style={isActive(location, "/test-result")}
							to="/test-result">
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
					aria-controls="collapsePages">
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
					data-parent="#sidenavAccordion">
					<nav
						className="sb-sidenav-menu-nested nav accordion"
						id="sidenavAccordionPages">
						<a
							className="nav-link collapsed"
							href="#"
							data-toggle="collapse"
							data-target="#pagesCollapseAuth"
							aria-expanded="false"
							aria-controls="pagesCollapseAuth">
							Medication
							<div className="sb-sidenav-collapse-arrow">
								<i className="fas fa-angle-down" />
							</div>
						</a>
						<div
							className="collapse"
							id="pagesCollapseAuth"
							aria-labelledby="headingOne"
							data-parent="#sidenavAccordionPages">
							<nav className="sb-sidenav-menu-nested nav">
								<Link
									className="nav-link"
									style={isActive(
										location,
										"/list-treat-cat"
									)}
									to="/list-treat-cat">
									Treatment
								</Link>
								<Link
									className="nav-link"
									style={isActive(
										location,
										"/list-prescriptions"
									)}
									to="/list-prescriptions">
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
							aria-controls="pagesCollapseError">
							Buildings-Floor
							<div className="sb-sidenav-collapse-arrow">
								<i className="fas fa-angle-down" />
							</div>
						</a>
						<div
							className="collapse"
							id="pagesCollapseError"
							aria-labelledby="headingOne"
							data-parent="#sidenavAccordionPages">
							<nav className="sb-sidenav-menu-nested nav">
								<Link
									className="nav-link"
									style={isActive(
										location,
										"/list-buildings"
									)}
									to="/list-buildings">
									Building
								</Link>
								<Link
									className="nav-link"
									style={isActive(location, "/list-floors")}
									to="/list-floors">
									Floors
								</Link>
								<Link
									className="nav-link"
									style={isActive(location, "/list-departs")}
									to="/list-departs">
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
					to="/list-patients">
					<div className="sb-nav-link-icon">
						<i className="bi bi-file-medical" />
					</div>
					Patients
				</Link>

				<Link
					className="nav-link"
					style={isActive(location, "/list-doctors")}
					to="/list-doctors">
					<div className="sb-nav-link-icon">
						<i className="bi bi-file-medical" />
					</div>
					Doctors
				</Link>
{/* 
				<div className="sb-sidenav-menu-heading">Pharmacy</div>

				<Link
					className="nav-link"
					style={isActive(location, "/list-vendors")}
					to="/list-vendors">
					<div className="sb-nav-link-icon">
						<i className="bi bi-shop" />
					</div>
					Vendors
				</Link> */}

				<Link
					className="nav-link"
					style={isActive(location, "/list/medicine")}
					to="/list/medicine">
					<div className="sb-nav-link-icon">
					   <i class="fa-solid fa-tablets"></i>
					</div>
					Medicine
				</Link>

				<div className="sb-sidenav-menu-heading">Expenses</div>
				<Link
					className="nav-link"
					style={isActive(location, "/list-expenses")}
					to="/list-expenses">
					<div className="sb-nav-link-icon">
						<i className="bi bi-cash" />
					</div>
					Expenses
				</Link>

				{/* <div className="sb-sidenav-menu-heading">Vaccine</div>
				<Link
					className="nav-link"
					style={isActive(location, "/list-vaccine-cat")}
					to="/list-vaccine-cat">
					<div className="sb-nav-link-icon">
						<i className="bi bi-eyedropper" />
					</div>
					Vaccine
				</Link> */}

				<Link
					className="nav-link"
					style={isActive(location, "/list-app-vaccine")}
					to="/list-app-vaccine">
					<div className="sb-nav-link-icon">
						<i className="bi bi-card-list" />
					</div>
					Appointments
				</Link>

				{/* <div className="sb-sidenav-menu-heading">
					Doctors Department
				</div> */}

				{/* <Link
					className="nav-link"
					style={isActive(location, "/list-designate")}
					to="/list-designate">
					<div className="sb-nav-link-icon">
						<i className="bi bi-journal-medical" />
					</div>
					Designation
				</Link> */}

				{/* <Link
					className="nav-link"
					style={isActive(location, "/list-specialize")}
					to="/list-specialize">
					<div className="sb-nav-link-icon">
						<i className="bi bi-journal-medical" />
					</div>
					Specialize
				</Link> */}
			</Fragment>
		);
	};

	const doctorLinks = () => {
		return (
			<Fragment>
				{/* <div className="sb-sidenav-menu-heading">Core</div> */}
				<Link
					className="nav-link"
					style={isActive(location, "/")}
					to="/">
					<div className="sb-nav-link-icon">
						<i className="fas fa-tachometer-alt" />
					</div>
					<span className="pl-4">Dashboard</span>
				</Link>

				<Link
					className="nav-link"
					style={isActive(location, "/calendar")}
					to="/calendar">
					<div className="sb-nav-link-icon">
						<i className="bi bi-people" />
					</div>
					<span className="pl-4">Calendar</span>
				</Link>

				{/* <Link
					className="nav-link"
					style={isActive(location, "/list/users")}
					to="/list/users">
					<div className="sb-nav-link-icon">
						<i className="bi bi-people" />
					</div>
					List Users
				</Link> */}
{/* 
				<div className="sb-sidenav-menu-heading">Modules</div>
				<a
					className="nav-link collapsed"
					href="#"
					data-toggle="collapse"
					data-target="#collapseLayouts"
					aria-expanded="false"
					aria-controls="collapseLayouts">
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
					data-parent="#sidenavAccordion">
					<nav className="sb-sidenav-menu-nested nav">
						<Link
							className="nav-link"
							style={isActive(location, "/list-cat-test")}
							to="/list-cat-test">
							Category Test
						</Link>
						<Link
							className="nav-link"
							style={isActive(location, "/test-result")}
							to="/test-result">
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
					aria-controls="collapsePages">
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
					data-parent="#sidenavAccordion">
					<nav
						className="sb-sidenav-menu-nested nav accordion"
						id="sidenavAccordionPages">
						<a
							className="nav-link collapsed"
							href="#"
							data-toggle="collapse"
							data-target="#pagesCollapseAuth"
							aria-expanded="false"
							aria-controls="pagesCollapseAuth">
							Medication
							<div className="sb-sidenav-collapse-arrow">
								<i className="fas fa-angle-down" />
							</div>
						</a>
						<div
							className="collapse"
							id="pagesCollapseAuth"
							aria-labelledby="headingOne"
							data-parent="#sidenavAccordionPages">
							<nav className="sb-sidenav-menu-nested nav">
								<Link
									className="nav-link"
									style={isActive(
										location,
										"/list-treat-cat"
									)}
									to="/list-treat-cat">
									Treatment
								</Link>
								<Link
									className="nav-link"
									style={isActive(
										location,
										"/list-prescriptions"
									)}
									to="/list-prescriptions">
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
							aria-controls="pagesCollapseError">
							Buildings-Floor
							<div className="sb-sidenav-collapse-arrow">
								<i className="fas fa-angle-down" />
							</div>
						</a>
						<div
							className="collapse"
							id="pagesCollapseError"
							aria-labelledby="headingOne"
							data-parent="#sidenavAccordionPages">
							<nav className="sb-sidenav-menu-nested nav">
								<Link
									className="nav-link"
									style={isActive(
										location,
										"/list-buildings"
									)}
									to="/list-buildings">
									Building
								</Link>
								<Link
									className="nav-link"
									style={isActive(location, "/list-floors")}
									to="/list-floors">
									Floors
								</Link>
								<Link
									className="nav-link"
									style={isActive(location, "/list-departs")}
									to="/list-departs">
									Department
								</Link>
							</nav>
						</div>
					</nav>
				</div>

				<div className="sb-sidenav-menu-heading">User Files</div> */}

				<Link
					className="nav-link"
					style={isActive(location, "/list-patients")}
					to="/list-patients">
					<div className="sb-nav-link-icon">
						<i className="bi bi-file-medical" />
					</div>
					<span className="pl-4">Patients</span>
				</Link>

				

				{/* <Link
					className="nav-link"
					style={isActive(location, "/list-vendors")}
					to="/list-vendors">
					<div className="sb-nav-link-icon">
						<i className="bi bi-shop" />
					</div>
					Vendors
				</Link> */}

				<Link
					className="nav-link"
					style={isActive(location, "/list/medicine")}
					to="/list/medicine">
					<div className="sb-nav-link-icon">
					<i class="fa fa-tablets"></i>
					</div>
					<span className="pl-4">Medicine</span>
				</Link>

				<Link
					className="nav-link"
					style={isActive(location, "/list-expenses")}
					to="/list-expenses">
					<div className="sb-nav-link-icon">
						<i className="bi bi-cash" />
					</div>
					<span className="pl-4">Expenses</span>
				</Link>

				{/* <div className="sb-sidenav-menu-heading">Vaccine</div> */}
				{/* <Link
					className="nav-link"
					style={isActive(location, "/list-vaccine-cat")}
					to="/list-vaccine-cat">
					<div className="sb-nav-link-icon">
						<i className="bi bi-eyedropper" />
					</div>
					Vaccine
				</Link> */}

				<Link
					className="nav-link"
					style={isActive(location, "/patient-app-details")}
					to="/patient-app-details">
					<div className="sb-nav-link-icon">
						<i className="bi bi-card-list" />
					</div>
					<span className="pl-4">Appointments</span>
				</Link>

				{/* <div className="sb-sidenav-menu-heading">
					Doctors Department
				</div> */}

				{/* <Link
					className="nav-link"
					style={isActive(location, "/list-designate")}
					to="/list-designate">
					<div className="sb-nav-link-icon">
						<i className="bi bi-journal-medical" />
					</div>
					Designation
				</Link>

				<Link
					className="nav-link"
					style={isActive(location, "/list-specialize")}
					to="/list-specialize">
					<div className="sb-nav-link-icon">
						<i className="bi bi-journal-medical" />
					</div>
					Specialize
				</Link> */}

				<a
					className="nav-link collapsed"
					href="#"
					data-toggle="collapse"
					data-target="#collapseLayouts"
					aria-expanded="false"
					aria-controls="collapseLayouts">
					<div className="sb-nav-link-icon">
						<i className="bi bi-gear" />
					</div>
					
					<div style={{ padding : '5px'}}>
						<i className="fas fa-angle-down" />
					</div>
				</a>
				<div
					className="collapse"
					id="collapseLayouts"
					aria-labelledby="headingOne"
					data-parent="#sidenavAccordion">
					<nav className="sb-sidenav-menu-nested nav pl-2">
						<Link
							className="nav-link"
							style={isActive(location, "/profile")}
							to="/profile">
							<div className="sb-nav-link-icon">
								<i className="bi bi-person-circle"></i>
							</div>
							Profile
						</Link>
						<Link
							className="nav-link"
							style={isActive(location, "/print-details")}
							to="/print-details">
							<div className="sb-nav-link-icon">
								<i className="bi bi-printer" />
							</div>
							Print
						</Link>
						<Link
							className="nav-link"
							style={isActive(location, "/treatments")}
							to="/treatments">
								<div className="sb-nav-link-icon">
								<i className="fa fa-hospital-user" />
							</div>
							Treatments
						</Link>
						<Link
							className="nav-link"
							style={isActive(location, "/clinical-notes")}
							to="/clinical-notes">
							<div className="sb-nav-link-icon">
								<i className="bi bi-journals" />
							</div>
							Clinical Notes
						</Link>
						<Link
							className="nav-link"
							style={isActive(location, "/roles")}
							to="/roles">
							<div className="sb-nav-link-icon">
								<i className="bi bi-user" />
							</div>
							Assign roles
						</Link>
					</nav>
				</div>
			</Fragment>
		);
	};

	const staffLink = () => {
		return (
			<Fragment>
				<div className="sb-sidenav-menu-heading">Core</div>
				<Link
					className="nav-link"
					style={isActive(location, "/")}
					to="/">
					<div className="sb-nav-link-icon">
						<i className="fas fa-tachometer-alt" />
					</div>
					Dashboard
				</Link>

				<Link
					className="nav-link"
					style={isActive(location, "/calendar")}
					to="/calendar">
					<div className="sb-nav-link-icon">
						<i className="bi bi-people" />
					</div>
					Calendar
				</Link>

				<Link
					className="nav-link"
					style={isActive(location, "/list/users")}
					to="/list/users">
					<div className="sb-nav-link-icon">
						<i className="bi bi-people" />
					</div>
					List Users
				</Link>

				<div className="sb-sidenav-menu-heading">User Files</div>

				<Link
					className="nav-link"
					style={isActive(location, "/list-patients")}
					to="/list-patients">
					<div className="sb-nav-link-icon">
						<i className="bi bi-file-medical" />
					</div>
					Patients
				</Link>

				<div className="sb-sidenav-menu-heading">Pharmacy</div>

				<Link
					className="nav-link"
					style={isActive(location, "/list-vendors")}
					to="/list-vendors">
					<div className="sb-nav-link-icon">
						<i className="bi bi-shop" />
					</div>
					Vendors
				</Link>

				<Link
					className="nav-link"
					style={isActive(location, "/list/medicine")}
					to="/list/medicine">
					<div className="sb-nav-link-icon">
					<i class="fa-solid fa-tablets"></i>
					</div>
					Medicine
				</Link>

				<Link
					className="nav-link"
					style={isActive(location, "/list-app-vaccine")}
					to="/list-app-vaccine">
					<div className="sb-nav-link-icon">
						<i className="bi bi-card-list" />
					</div>
					Appointments
				</Link>
			</Fragment>
		);
	};
	

	return (
	
		<nav style={{}} className="sb-nav-fixed">
		<Menu />

		<div id="layoutSidenav">
			<div id="layoutSidenav_nav">	
				<nav
					className="sb-sidenav"
					id="sidenavAccordion"
					style={{
						background: "linear-gradient(180deg, rgb(253, 253, 253), white)", // Gradient for sidebar background
						color: "#000", // Black text for contrast
						fontFamily: "Roboto, sans-serif", // Font style
						border : '1px solid #ddd'
					}}
				>
					<div className="sb-sidenav-menu">
						<div className="nav">
							{/* Render links dynamically */}
							{userInfo.role === 0
								? adminLinks()
								: userInfo.role === 1
								? doctorLinks()
								: staffLink()}
						</div>
					</div>
					<div
						style={{
							background: "#f9f9f9", // Gradient for sidebar background
							color: "#000", // Black text for footer
							padding: "10px",
							fontSize: "14px",
							borderBottom: "1px solid #ddd",
						}}
						className="sb-sidenav-footer"
					>
						User : {userInfo && <span>{userInfo.name}</span>}
					</div>
				</nav>
			</div>
			<div id="layoutSidenav_content">
				<main>
					<div className="container-fluid">
						<h4
							style={{
								fontFamily: "Roboto, sans-serif",
								fontWeight: "bold",
								color: "#000",
								paddingTop: "10px",
								
							}}
						>
							{title}
						</h4>
						{/* Content */}
						<div>
						{children}
						</div>
					</div>
				</main>
			</div>
		</div>

	
	
	</nav>
	
	);
};

export default Layout;
