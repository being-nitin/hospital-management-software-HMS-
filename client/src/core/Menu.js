import React, { Fragment , useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useNavigate } from 'react-router-dom'
import { listPatients } from "../actions/patientActions";
import { Button } from "antd";


// { history} = props.history
const Menu = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedPatient, setSelectedPatient] = useState('');
	const navigate = useNavigate(); 
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const patientList = useSelector((state) => state.patientList);
	const {
		loading,
		error,
		patients: { patient } = {},
	} = patientList;

	const logoutHandler = () => {
		dispatch(logout());
	};

	useEffect(() => {
		if (userInfo) {
			dispatch(listPatients({}));
		} else {
			navigate("/signin");
		}
	}, [dispatch, userInfo]);
  
	const handleSearchChange = (e) => {
	  setSearchTerm(e.target.value);
	};
  

  
	const handleSubmit = (e) => {
	  e.preventDefault();
	  if (selectedPatient) {
		// Navigate to the patient's page
		navigate(`/patient`);
	  }
	};

	return (
		<nav
		className="sb-topnav navbar navbar-expand-lg navbar-light"
		style={{ backgroundColor: "#f9f9f9", borderBottom: "1px solid #ddd" }}
			>
			<Link
				className="navbar-brand"
				to="/"
				style={{
					color: "black",
					fontFamily: "Roboto sans-serif",
					fontSize : '16px',
					fontWeight :700
				}}
				
			>
				Ravi Neuro - Psychiatry Centre
			</Link>
			<div className="container-fluid">

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
				<form
      className="d-flex ms-auto me-3"
      style={{ maxWidth: '300px', width: '100%' }}
      onSubmit={handleSubmit}
    >
      <input
        className="form-control border rounded mt-2"
        type="search"
        placeholder="Search for..."
        aria-label="Search"
        style={{ padding: '0.375rem 0.75rem' }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="btn btn-outline-secondary ms-2 mt-2" type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
                    </div>
					</div>
					<Button type="primary">
				     Appointment
				</Button>
			<ul className="navbar-nav ml-auto ml-md-0">
				<li className="nav-item dropdown">
					<a
						className="nav-link dropdown-toggle"
						id="userDropdown"
						href="#"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false">
						<i className="fas fa-user fa-fw"></i>
					</a>
					<div
						className="dropdown-menu dropdown-menu-right"
						aria-labelledby="userDropdown">
						<a className="dropdown-item" href="#">
							Settings
						</a>
						<a className="dropdown-item" href="#">
							Activity Log
						</a>
						<div className="dropdown-divider"></div>
						<a className="dropdown-item" onClick={logoutHandler}>
							Logout
						</a>
					</div>
				</li>
			</ul>
			
		</nav>
	);
};

export default Menu;
