import React, { useRef, useEffect, useState } from "react";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import PrescriptionForm from "../component/prescriptionForm"; // Importing the PrescriptionForm component
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {
	listVacApp,
	deleteVacApp,
	detailsVacApp,
	updateVacApp,
} from "../actions/vaccineAppointmentActions";
import { DatePicker } from "antd";
import moment from 'moment';
import { deletePrescription } from "../actions/prescriptionActions";
import { useNavigate, useParams } from "react-router-dom";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import VitalSignsForm from "./vitalSigns";
import MedicalHistoryForm from "./medicalHistoryForm";
import { listMedicines } from "../actions/medicineActions";
import { listPatients } from "../actions/patientActions";
import dayjs from "dayjs";
import InvoiceModal from "./modal/invoiceLayout";
import Layout from "../core/Layout";
import ClinicalNotesModal from "./modal/clinicalNotesModal";
import AppointmentDetail from "./appointmentDetail";

const { RangePicker } = DatePicker; 

const PatAppDetail = () => {
	const [prescriptionForm, setPrescriptionForm] = useState(false);
	const [selectedPrescription, setSelectedPrescription] = useState(null); // For editing
	const [vitalSignsForm, setVitalSignsForm] = useState(false);
	const [PsychologicalForm, setPsychologicalForm] = useState(false);
	const [selectedVitalSign, setSelectedVitalSign] = useState(null);
	const [page, setPage] = useState(1);
	const [showClinicalModal , setShowClinicalModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false);
	
	const [currentAppointment , setCurrentAppointment] = useState([])
	const [allAppointments , setAllAppointments] = useState([])
	const [medicalHistory, setMedicalHistory] = useState([]);
	const [showBilling , setShowBilling] = useState(false)
	const [total , setTotal] = useState(0) 
	const [notes, setNotes] = useState("") 
	const [show, setShow] = useState(false);
	const [filters, setFilters] = useState({
		status: null,
		date: null,
	});
	const [selectedAppointment, setSelectedAppointment] = useState(null)
  	const [selectedPatient , setSelectedPatients] = useState(null)
	const [content, setContent] = useState("Today");
	const [startDate, setStartDate] = useState("")
	const [endDate , setEndDate] = useState("")
	const [pagination, setPagination] = useState({
		currentPage: 1,
		pageSize: 2,
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const { id } = useParams();

	const vaccineAppList = useSelector((state) => state.vaccineAppList);
	
	const {
		loading,
		error,
		appointments: {
			appointment=[],
			currentPage,
			totalPages,
			todayAppointment,
			totalAppointments
		} = {},
	} = vaccineAppList;

	const medicineList = useSelector((state) => state.medicineList);
	const { medicines } = medicineList;

	useEffect(() => {
		if (userInfo) {
			dispatch(listVacApp(pagination.currentPage,
				pagination.pageSize,
			    null,
				startDate,
				endDate,
			  selectedPatient ? selectedPatient._id :  null))
             
			
			dispatch(listMedicines());
		} else {
			navigate("/signin");
		}
	}, [dispatch, userInfo]);

	const fetchData = () => {
		        setCurrentAppointment([])
				dispatch(listVacApp(pagination.currentPage,
					pagination.pageSize,
					null,
					startDate,
					endDate,
				));
	}

	// Handle form submission for creating or updating a prescription
	const handleFormSubmit = () => {
		setPrescriptionForm(false);
		dispatch(listVacApp(pagination.currentPage,
			pagination.pageSize,
			null,
		null));
		setSelectedPrescription(null); // Reset after edit
	};

	const handleDateChange = (dates) => {
		if (dates) {
			setFilters({ ...filters, date: dates });
			setStartDate(dates[0].format('YYYY-MM-DD'))
			setEndDate(dates[1].format('YYYY-MM-DD'))
			setCurrentAppointment([])
			setAllAppointments([])
			dispatch(
				listVacApp(1, 2,null,dates[0].format('YYYY-MM-DD'),
				dates[1].format('YYYY-MM-DD'))
			);
		} else {
			console.log(dates)
			setFilters({ ...filters, date: null });
			setPagination({...pagination , currentPage : 1})
			setStartDate(null)
			setEndDate(null)
			setAllAppointments([])
			fetchData()
		}
	};

	  
	const handleVitalSignsSubmit = (vitalSigns, appId) => {
		dispatch(updateVacApp({ _id: appId, vitalSigns }));
		dispatch(listVacApp(pagination.currentPage,
			pagination.pageSize,
			null,
			startDate,
			endDate));
		setVitalSignsForm(false); // Hide the form after submission
		alert("vital sign submitted")
	};

	// Handle editing a prescription
	const handleEditPrescription = (idx) => {
		const prescriptionToEdit = appointment?.prescription[idx];
		setSelectedPrescription(prescriptionToEdit);
		setPrescriptionForm(true); // Show form for editing
	};

	const handleCancel = () => {
		setPrescriptionForm(false); 
		setSelectedPrescription(null);
	};

	// Handle deleting a prescription
	const handleDeletePrescription = (prescriptionId) => {
		dispatch(deletePrescription(appointment._id, prescriptionId)); 
		dispatch(listVacApp(pagination.currentPage,
			pagination.pageSize , null ,startDate,
			endDate));
	};

	const handleAddNote = (appointmentId, noteContent) => {
		dispatch(
		  updateVacApp({ _id: appointmentId, notes: noteContent }) 
		);
		dispatch(
		  listVacApp(pagination.currentPage, pagination.pageSize, null,			startDate,
			endDate )
		); // Refresh the list to show updated notes
	  };

	  const patientList = useSelector((state) => state.patientList);
	  const {
		  patients = {},
	  } = patientList;
  
	
  
	  useEffect(() => {
		  if (userInfo) {
			  dispatch(listPatients({}));
		  } else {
			  navigate("/signin");
		  }
	  }, [userInfo, page]);

	  
	const handleVitalCancel = () => {
		setVitalSignsForm(false);
		setSelectedVitalSign(null);
	};

	const closeAppointment = () => {
		dispatch(updateVacApp({ _id: appointment._id, status: "closed" }));
		dispatch({ type: "UPDATE_APPOINTMENT_VACCINE_RESET" });
		dispatch(listVacApp(pagination.currentPage,
			pagination.pageSize, null , startDate,
			endDate));
	};

	useEffect(() =>{
       setAllAppointments([...allAppointments , ...currentAppointment])
	   
	},[currentAppointment])

	useEffect(() =>{
		if(appointment.length !== 0 ){
		setCurrentAppointment([...appointment])

		setTotal(totalPages)
		}
	}, [appointment])


		const renderAppointments = () => {
                return <div style={{ overflow : 'scroll' , scrollbarWidth :'thin'}}>

				{todayAppointment && todayAppointment.map((app, index) => 
				 (
                    <div key={index} className="list-group-item" style={{ cursor : 'pointer'}} onClick={() => setSelectedPatients(app.patient)}>
                         <i className="fas fa-user-md m-1 "></i>{app.patient.firstName}-{app.patient.patientNumber}
                    </div>
                ))}
				</div>

		};
	
		const renderPatients = () => {
                return <div style={{ overflow : 'scroll' , height : '100%',  scrollbarWidth :'thin'}}>

				{patients && patients.patient && patients.patient.map((pat, index) => (
                    <div key={index} className="list-group-item" style={{ cursor : 'pointer'}} onClick={() => setSelectedPatients(pat)}>
                         <i className="fas fa-user-md m-1"></i>{pat.firstName}-{pat.patientNumber}
                    </div>))}
					</div>
		};
	
		useEffect(() => {
			if (selectedPatient) {	
				setAllAppointments([])
				dispatch(
					listVacApp(
						pagination.currentPage,
						pagination.pageSize,
						null,
						startDate,
						endDate,
						selectedPatient._id, // Filter by selected patient ID
					)
				);

				
			} else {
				fetchData();
			}
		}, [selectedPatient]);
	
	useEffect(() => {
	
			dispatch(listVacApp(pagination.currentPage,
				pagination.pageSize,
			    null,
				startDate,
				endDate));
			
	}, []);

	return (
	<Layout>
       	<InvoiceModal show={showBilling} onClose={() => setShowBilling(false)} appId = {selectedAppointment}/>
       
			<div style={{ position : 'relative'}}>
			
			<div style = {{ display : 'flex' , justifyContent : 'center' , alignContent: 'flex-start', paddingLeft : '200px'}}>
		
					{/* Treatment and Prescription History */}
		
					<div className=" mb-4 ">
					<div className="filter-container">
            <RangePicker
                onChange={(dates) => handleDateChange(dates)}
                style={{ marginBottom: "20px" }}
            />
        </div>
		{selectedPatient && <h2 style = {{margin : "20px"}}> {selectedPatient.firstName.toUpperCase() + " " + selectedPatient.lastName.toUpperCase() + "-" + selectedPatient.patientNumber}</h2>}
					<InfiniteScroll      
					dataLength={allAppointments.length}
      next={() =>{
        dispatch(listVacApp(pagination.currentPage,
			pagination.pageSize, null ,startDate,
			endDate, selectedPatient ?  selectedPatient._id :  null))
		
		setPagination({...pagination , currentPage : pagination.currentPage + 1})			
	  }} 
      hasMore={total + 1 !== pagination.currentPage  } // Replace witho a condition based on your data source
      loader={<p>Loading...</p>}
      endMessage={<p>No more data to load.</p>}>
					{allAppointments &&
						allAppointments.length !== 0 &&
						allAppointments.map((appointment, index) => (<div key = {appointment._id}><AppointmentDetail app={appointment} /></div>
						)
						)}
						</InfiniteScroll>	
				</div>
			

				{ selectedPatient && <MedicalHistoryForm
					
					id={selectedPatient._id}
				    
					
				/>}
				</div>
			</div>

			<div style = {{ position : 'fixed', top : 0 , bottom : 0 , left : 60, width : '200px' , background : '#ddd'}}>
                 <div className="d-flex p-2 " style={{ justifyContent : 'center' , alignItems : 'center', gap : '5px', marginTop : '100px'}}>
            
                <button className="btn btn-secondary w-100" onClick={() => setContent("Today")}>
                    Today
                </button>
                <button className="btn btn-secondary w-100" onClick={() => setContent("All")}>
                     All
                </button>
             </div>
            <div className="flex-grow-1 p-3" >
                {content === 'Today' ? renderAppointments() : renderPatients()}
            </div>
       
			</div>
		</Layout>
	);
};

const styles = {
	dropdown: {
		marginTop: "20px",
		backgroundColor: "#007bff",
		display: "inline",
		color: "white",
		border: "none",
		padding: "10px 20px", // Padding to mimic button
		borderRadius: "5px", // Rounded corners like a button
		cursor: "pointer",
		fontSize: "16px", // Font size
		outline: "none", // Remove focus outline
		appearance: "none", // Remove default dropdown arrow styling
		textAlign: "center", // Center align text
		width: "auto", // Adjust width to content
	},
	container: {
		padding: "20px",
		fontFamily: "Arial, sans-serif",
		textAlign: "center",
	},
	header: {
		marginBottom: "20px",
		fontSize: "24px",
		fontWeight: "bold",
	},
	buttonContainer: {
		marginBottom: "20px",
	},
	button: {
		backgroundColor: "#007BFF",
		color: "#FFFFFF",
		border: "none",
		padding: "10px 20px",
		margin: "0 10px",
		borderRadius: "5px",
		cursor: "pointer",
		fontSize: "16px",
		transition: "background-color 0.3s",
	},
	buttonHover: {
		backgroundColor: "#0056b3",
	},
	modalOverlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 100,
	},
	modal: {
		backgroundColor: "#fff",
		padding: "20px",
		borderRadius: "8px",
		width: "80%", // Increased width for a larger modal
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
		position: "relative",
	},
	closeButton: {
		position: "absolute",
		top: "10px",
		right: "10px",
		fontSize: "20px",
		border: "none",
		background: "transparent",
		cursor: "pointer",
	},
	form: {
		display: "grid",
		gridTemplateColumns: "repeat(4, 1fr)", // Four columns per row
		gap: "15px",
		alignItems: "flex-start",
		width: "100%",
	},
	formHeader: {
		gridColumn: "1 / -1", // Make header span all columns
		marginBottom: "10px",
		fontSize: "20px",
		fontWeight: "bold",
	},
	formHeaders: {
		gridColumn: "1 / -1", // Make header span all columns
		marginBottom: "10px",
		fontSize: "20px",
		fontWeight: "bold",
		display: "flex",
		justifyContent: "space-between",
	},
	label: {
		fontSize: "16px",
		color: "#333",
		display: "flex",
		flexDirection: "column",
	},
	input: {
		width: "100%",
		padding: "10px",
		marginTop: "5px",
		borderRadius: "5px",
		border: "1px solid #ccc",
		fontSize: "16px",
	},
	inputGroup: {
		display: "flex",
		alignItems: "center",
		marginRight: "10px",
		gap: "8px",
	},
	submitButton: {
		gridColumn: "1 / -1", // Make submit button span all columns
		backgroundColor: "#28a745",
		color: "#FFFFFF",
		border: "none",
		padding: "10px 15px",
		borderRadius: "5px",
		cursor: "pointer",
		fontSize: "16px",
		transition: "background-color 0.3s",
	},
};

export default PatAppDetail;
