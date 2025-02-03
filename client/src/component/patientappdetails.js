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

const { RangePicker } = DatePicker; 

const PatAppDetail = () => {
	const [prescriptionForm, setPrescriptionForm] = useState(false);
	const [selectedPrescription, setSelectedPrescription] = useState(null); // For editing
	const [vitalSignsForm, setVitalSignsForm] = useState(false);
	const [PsychologicalForm, setPsychologicalForm] = useState(false);
	const [selectedVitalSign, setSelectedVitalSign] = useState(null);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [currentAppointment , setCurrentAppointment] = useState([])
	const [allAppointments , setAllAppointments] = useState([])
	const [medicalHistory, setMedicalHistory] = useState([]);
	const [showBilling , setShowBilling] = useState(false)
	const [total , setTotal] = useState(0) 
	const [notes, setNotes] = useState("") 
	const [filters, setFilters] = useState({
		status: null,
		date: null,
	});
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

				{appointment && appointment.map((app, index) => 
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



	const menu = (appId) => (
		<Menu>
			<Menu.Item
				key="1"
				onClick={() => {
					setVitalSignsForm(true);
					setPrescriptionForm(false);
					setPsychologicalForm(false);
				}}>
				<Link href="#">Vital Signs</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link
					onClick={(e) => {
						e.preventDefault();
						navigate(`/clinicalNotes/${appId}`);
					}}>
					Clinal Notes
				</Link>
			</Menu.Item>
			<Menu.Item
				key="3"
				onClick={() => {
					setPrescriptionForm(true);
					setVitalSignsForm(false);
					setPsychologicalForm(false);
				}}>
				Prescription
			</Menu.Item>
			<Menu.Item
				key="4"
				onClick={() => {
					navigate(
						`/PsychologicalForm/${appId}`
					)
					setVitalSignsForm(false);
					setPrescriptionForm(false);
				}}>
				Psychological Form
			</Menu.Item>
			<Menu.Item key="5" onClick={() =>{  
			setShowBilling(true)}}>
				Billing
			</Menu.Item>
			<Menu.SubMenu key="6" title="More">
				<Menu.Item key="6-1" onClick={closeAppointment}>
					Close Appointment
				</Menu.Item>
			</Menu.SubMenu>
		</Menu>
	);

	// // menu for view button
	const viewMenu =(appId) => (
		<Menu>
			<Menu.Item key="1">
				<Link to={`/PsychologicalForm/${appId}`}>
					Psychodiagnostic Report
				</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to={`/HamiltonForm/${appId}`}>
					Hamilton Anxiety Rating Scale (HAM-A)
				</Link>
			</Menu.Item>
			<Menu.Item key="3">
				<Link to={`/hamd/${appId}`}>
					Hamilton Depession Rating Scale (HAM-D)
				</Link>
			</Menu.Item>
			<Menu.Item key="4">
				<Link to={`/cdrs/${appId}`}>
					Children's Depression Rating Scale (CDRS)
				</Link>
			</Menu.Item>
			<Menu.Item key="5">
				<Link to={`/YMRS/${appId}`}>
					Young Mania Rating Scale(YMRS)
				</Link>
			</Menu.Item>
			<Menu.Item key="6">
				<Link to={`/ybocs/${appId}`}>
					Yale-Brown Obsessive Compulsive Scale(YBOCS)
				</Link>
			</Menu.Item>
			<Menu.Item key="7">
				<Link to={`/panss/${appId}`}>
					Positive and Negative Syndrome Scale(PANSS)
				</Link>
			</Menu.Item>
		</Menu>
	);

    
	return (
	<Layout>
       	<InvoiceModal show={showBilling} onClose={() => setShowBilling(false)} />
       
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
						allAppointments.map((appointment, index) => (
					       <div className="card mb-5">
							<div className="card-header bg-success text-white d-flex justify-content-between">
							<h5>{moment(appointment?.date).format('Do MMMM YYYY, dddd ')}</h5>
							{appointment?.status !== "closed" && (
								<>
									<Dropdown
										overlay={menu(appointment._id)}
										placement="bottomRight"
										arrow>
										<Button type="default" style={{ backgroundColor : 'white' , color : 'black'}}>
											Add Record
										</Button>
									</Dropdown>
								</>
							)}
						</div>

					
	 
						<div className="card-body">
				
							{PsychologicalForm && (
								<div style={styles.container}>
									<h2 style={styles.header}>
										Psychological Form Options
									</h2>
									<div style={styles.buttonContainer}>
										<button
											style={styles.button}
											onClick={() =>
												navigate(
													`/PsychologicalForm/${appointment?._id}`
												)
											}>
											Psychodiagnostic Report
										</button>
										<select
											style={styles.dropdown} // Replace with appropriate styles
											onChange={(e) => {
												if (
													e.target.value === "HAM-A"
												) {
													navigate(
														`/HamiltonForm/${appointment._id}`
													);
												}
												if (
													e.target.value === "HAM-D"
												) {
													navigate(
														`/hamd/${appointment._id}`
													);
												}
												if (e.target.value === "CDRS") {
													navigate(
														`/cdrs/${appointment._id}`
													);
												}
												if (e.target.value === "YMRS") {
													navigate(
														`/YMRS/${appointment._id}`
													);
												}
												if (
													e.target.value === "YBOCS"
												) {
													navigate(
														`/ybocs/${appointment._id}`
													);
												}
												if (
													e.target.value === "PANSS"
												) {
													navigate(
														`/panss/${appointment._id}`
													);
												}
											}}>
											<option value="" disabled selected>
												Select Form
											</option>
											<option value="HAM-A">
												Hamilton Anxiety Rating Scale
												(HAM-A)
											</option>
											<option value="HAM-D">
												Hamilton Depession Rating Scale
												(HAM-D)
											</option>
											<option value="CDRS">
												Children's Depression Rating
												Scale (CDRS)
											</option>
											<option value="YBOCS">
												YALE-BROWN OBSESSIVE COMPULSIVE
												SCALE(YBOCS)
											</option>
											<option value="YMRS">
												Young Mania Rating Scale(YMRS)
											</option>
											<option value="PANSS">
												POSITIVE AND NEGATIVE SYNDROME
												SCALE(PANSS)
											</option>
										</select>
									</div>
								</div>
							)}
							<div>
								<div
									// ref={appointmentRef}
									className="mb-4 p-3 border rounded">
									<h6>
										<strong>Appointment Date:</strong>{" "}
										{dayjs(
											appointment?.date?.toLocaleString()
										).format("YYYY-MM-DD")}
									</h6>
									<h6>
										<strong>Appointment Time:</strong>{" "}
										{appointment?.time}
									</h6>
									<h6>
										<strong>Patient:</strong>{" "}
										{appointment?.patient.firstName}
									</h6>
									<h6>
										<strong>Doctor:</strong> Dr.{" "}
										{appointment?.doctor?.name}
									</h6>

									{/* Vital Signs Section */}
									<div className="mb-4">
										<div>
											<strong>Vital Signs</strong>
										</div>
										<div>
											
								<VitalSignsForm
									onSubmit={handleVitalSignsSubmit}
									existingVitals={appointment?.vitalSigns}
									handleCancel={handleVitalCancel}
									appId={appointment?._id}
									status={appointment?.status}
									
								/>
							
										</div>
									</div>

									{/* Prescriptions Section */}
									<h6 className="mt-3">
										<strong>Medicines: <button  style={{ padding : '5px' , border : 'none'}} onClick={() => setPrescriptionForm(true)}><i className="fa fa-plus"/></button></strong>
									</h6>
									<table className="table table-bordered">
										<thead>
											<tr>
												<th>Drug</th>
												<th>Dosage</th>
												<th>Duration</th>
												<th>Instructions</th>
												{appointment?.status !==
													"closed" && (
													<th>Actions</th>
												)}
											</tr>
										</thead>
										<tbody>
											{appointment?.prescription &&
												appointment?.prescription.map(
													(prescription, idx) => (
														<tr key={idx}>
															<td>
																{
																	prescription?.drug
																}
															</td>
															<td>
																{
																	prescription?.dosage
																}
															</td>
															<td>
																{prescription?.durationNumber +
																	prescription?.durationUnit}
															</td>
															<td>
																{
																	prescription?.instruction
																}
															</td>
															{appointment?.status !==
																"closed" && (
																<td>
																	<PencilSquare
																		size={
																			24
																		}
																		className="me-2"
																		style={{
																			cursor: "pointer",
																			color: "blue",
																		}}
																		onClick={() =>
																			handleEditPrescription(
																				idx
																			)
																		} 
																	/>
																	<Trash
																		size={
																			24
																		}
																		style={{
													 						cursor: "pointer",
																			color: "red",
																		}}
																		onClick={() =>
																			handleDeletePrescription(
																				prescription._id
																			)
																		} // Delete prescription
																	/>
																</td>
															)} 
														</tr>
													)
												)}
										</tbody>
									</table>
								</div>

								{prescriptionForm && (
								<PrescriptionForm
									onSubmit={handleFormSubmit}
									existingPrescriptions={selectedPrescription} // Pass the selected prescription for editing
									onCancel={handleCancel}
									appId={appointment?._id}
									patient={appointment?.patient._id}
									doctor={appointment?.doctor._id}
									medicines={medicines}
									detailsVacApp={detailsVacApp}
								/>
							)}
								{/* <PrintLayout html={prescription}></PrintLayout> */}
								<div className="mt-4">
      <h5 className="mb-4">Billing details</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
			<th></th>
            <th>Treatment Name</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {appointment?.billing && appointment?.billing.treatment && appointment?.billing.treatment.length !== 0 && appointment.billing.treatment.map((treatment, index) => (
            <tr key={treatment.id}>
              <td>{index + 1}</td>
              <td>{treatment.name}</td>
              <td>₹{treatment.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
	  <div>
      <h5>Additional Notes</h5>
      <textarea
        value={appointment.notes || ""}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
        style={{ width: "100%", height: "100px" }}
      />
      <br />
      <button
        onClick={() => handleAddNote(appointment._id, notes)}
        style={{ padding: "5px", cursor: "pointer", marginTop: "10px" }}
      >
        Update Note
      </button>
    </div>
    </div>

	
                               <div className="print-button d-flex justify-content-end mt-3">
								<Button variant="primary" onClick={() =>  navigate(`/print-prescription/${appointment?._id}`)}>
                                  view
                                </Button>
								</div>
								{/* Print Button */}
							</div>	
						</div>
					     </div>
					
					      
						))}
						</InfiniteScroll>	
				</div>
			

				{ selectedPatient && <MedicalHistoryForm
					medicalHistory={medicalHistory}
					id={selectedPatient._id}
					detailsVacApp={detailsVacApp}
					appointment={appointment}
					setMedicalHistory={setMedicalHistory}
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
