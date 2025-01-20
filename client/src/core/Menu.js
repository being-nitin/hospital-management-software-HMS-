import React, { Fragment , useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useNavigate } from 'react-router-dom'
import { listPatients } from "../actions/patientActions";
import { Button } from "antd";
import AddAppVaccineModal from "../component/modal/addAppointment";


const Menu = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedPatient, setSelectedPatient] = useState('');
	const [showModal , setShowModal] = useState(false)
	const [query, setQuery] = useState('');
	const [filteredResults, setFilteredResults] = useState([]);
	const [showList, setShowList] = useState(false);
	const [patientId , setPatientId] = useState(null)

	const navigate = useNavigate(); 
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const patientList = useSelector((state) => state.patientList);
	const {
		patients
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
  
	
	  
		const handleInputChange = (e) => {
		  const input = e.target.value;
		  setQuery(input);
	  
		   dispatch(listPatients({ firstName : input}))
		  
		  setShowList(input.length > 0);
		};
	
		useEffect(()=>{
			setFilteredResults(patients);
		},[patients])
	  
		const handleItemClick = (item) => {
		  setQuery(item.firstName); // Fill input with the selected item's name
		  setShowList(false); // Hide the list
		  setPatientId(item._id)
		  setShowModal(true)
		};
  

  
	const handleSubmit = (e) => {
	  e.preventDefault();
	  if (selectedPatient) {
		// Navigate to the patient's page
		navigate(`/patient`);
	  }
	};

	return (
		<>
		{ showModal && (
			<AddAppVaccineModal
					show={showModal}
					onClose={() => setShowModal(false)}
					patientId={patientId}
				/>)}
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
       <div className="mb-3">
       <label className="form-label" style={{ fontWeight :700}}>Patient</label>
                                    <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '10px',
        }}
      />
      {showList && (
        <ul
          style={{
			position: 'fixed',
			top : "50px",
            listStyleType: 'none',
            padding: '0',
            margin: '0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            maxHeight: '150px',
            overflowY: 'auto',
            backgroundColor: '#fff',
          }}
        >
          {filteredResults && filteredResults.patient.length > 0 ? (
            filteredResults.patient.map((item) => (
              <li
                key={item._id}
                onClick={() => handleItemClick(item)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = '#f0f0f0')
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = '#fff')
                }
              >
                {item.firstName}
              </li>
            ))
          ) : (
            <li style={{ padding: '10px', color: '#999' }}>
              No matching results
            </li>
          )}
        </ul>
      )}
    </div>
    </form>
                    </div>
					</div>
					<Button type="primary m-3" onClick={() => {
						   navigate('/add-patient-details')
					}}>
                      Add patient
					</Button>
					{window.location.pathname !== '/list-patients' && 
					<Button type="primary" onClick={(e) => {
						e.preventDefault()
						setShowModal(true)
						setPatientId(null)
					}
					}>
				     Appointment
				</Button>}
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

		
		</>
	);
};

export default Menu;
