import React, { useRef, useEffect, useState, useCallback } from "react";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import PrescriptionForm from "../component/prescriptionForm"; // Importing the PrescriptionForm component
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate, } from "react-router-dom";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import VitalSignsForm from "./vitalSigns";
import { listMedicines} from "../actions/medicineActions";
import dayjs from "dayjs";
import InvoiceModal from "./modal/invoiceLayout";
import {  useUpdateAppointment } from "./api/app";
import { useCreatePrescription, useDeletePrescription, useUpdatePrescription } from "./api/prescription";
import ClinicalNotesModal from "./modal/clinicalNotesModal";

const AppointmentDetail = ({lastElement, app}) => {
	const [prescriptionForm, setPrescriptionForm] = useState(false);
	const [selectedPrescription, setSelectedPrescription] = useState(null); // For editing
	const [, setVitalSignsForm] = useState(false);
	const [PsychologicalForm, setPsychologicalForm] = useState(false);
	const [, setSelectedVitalSign] = useState(null);
	const [, setMedicalHistory] = useState([]);
	const [prescription , setPrescriptions] = useState([])
	const [showBilling , setShowBilling] = useState(false) 
	const  createPrescription = useCreatePrescription();
	const updatePrescription  = useUpdatePrescription();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [notes, setNotes] = useState("") 
	const appdetails = useSelector((state) => state.vaccineAppDetails)
	const [isEditing, setIsEditing] = useState(false);
	const [showClinicalModal, setShowClinicalModal] = useState(false);



	const { appointment : {appointment} = [] } = appdetails
	const deletePrescription = useDeletePrescription()

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

    	
	const medicineList = useSelector((state) => state.medicineList);
	const { medicines } = medicineList;


	const updateAppData = useUpdateAppointment()

	useEffect(() => {
		if (userInfo) {
			dispatch(listMedicines());
			setPrescriptions(app?.prescription ? app.prescription : [])
		} else {
			navigate("/signin");
		}
	}, [userInfo, app]);

	const prescriptionData = () =>{
		setPrescriptions(appointment.prescription)
	}
	// Handle form submission for creating or updating a prescription
	const handleFormSubmit = (newPrescriptions , existingPrescriptions) => {
		setPrescriptionForm(false);
	    
		setSelectedPrescription(null); 
		 if (existingPrescriptions) {
			  newPrescriptions.map((medicine) => {
			  return updatePrescription.mutate({pres : medicine})
			  })
			} else {
				
			  createPrescription.mutate({appId: app._id, prescriptions : newPrescriptions})
			}
	}

	

	const handleVitalSignsSubmit = (vitalSigns) => {
		updateAppData.mutate({ _id: app._id, vitalSigns });
		setVitalSignsForm(false); // Hide the form after submission
		alert("vital sign is changed")
	};

	// Handle editing a prescription
	const handleEditPrescription = () => {
		setSelectedPrescription([...prescription]);
		setPrescriptionForm(true); // Show form for editing
	};

	const handleCancel = () => {
		setPrescriptionForm(false); // Hide the form when canceled
		setSelectedPrescription(null);
	};

	const handleEditVitalSigns = () => {
		setSelectedVitalSign(app?.vitalSigns);
		setVitalSignsForm(true);
	};

	// Handle deleting a prescription
	const handleDeletePrescription = (prescriptionId) => {
		console.log("delete")
		deletePrescription.mutate({idx : app._id, presId : prescriptionId}); // Dispatch delete action
		
	};

	const handleAddNote = () => {
		updateAppData.mutate({_id : app._id , notes})
		alert("note is created")
	}

	const handleVitalCancel = () => {

		setVitalSignsForm(false);
		setSelectedVitalSign(null);
	};

	const closeAppointment = () => {
		updateAppData.mutate({ _id: app._id, status: "closed" });
		dispatch({ type: "UPDATE_APPOINTMENT_VACCINE_RESET" });
		
	};

	const handleSave = () => {
	  setIsEditing(false);
	};

	useEffect(() => {

		setMedicalHistory(
			app?.patient?.medicalhistory
				? [...app?.patient?.medicalhistory]
				: []
		);
		setNotes(app?.notes)
	}, []);


	const fieldNames = [
		"Anxious Mood",
		"Tension",
		"Fears",
		"Insomnia",
		"Intellectual",
		"Depressed Mood",
		"Somatic (Muscular)",
		"Somatic (Sensory)",
		"Cardiovascular Symptoms",
		"Respiratory Systems",
		"Gastrointestinal Symptoms",
		"Gastrourinatory Symptoms",
		"Autonomic Symptoms",
		"Behaviour At Interview",
	];

	const menu = (
		<Menu>
		
			<Menu.Item key="2">
				<Link
					onClick={(e) => {
						e.preventDefault();
						setShowClinicalModal(true)
					}}>
					Clinal Notes
				</Link>
			</Menu.Item>
		
			<Menu.Item
				key="4"
				onClick={() => {
					navigate(
						`/PsychologicalForm/${app?._id}`
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
					Close app
				</Menu.Item>
			</Menu.SubMenu>
		</Menu>
	);

	// menu for view button
	const viewMenu = (
		<Menu>
			<Menu.Item key="1">
				<Link to={`/PsychologicalForm/${app?._id}`}>
					Psychodiagnostic Report
				</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to={`/HamiltonForm/${app?._id}`}>
					Hamilton Anxiety Rating Scale (HAM-A)
				</Link>
			</Menu.Item>
			<Menu.Item key="3">
				<Link to={`/hamd/${app?._id}`}>
					Hamilton Depession Rating Scale (HAM-D)
				</Link>
			</Menu.Item>
			<Menu.Item key="4">
				<Link to={`/cdrs/${app?._id}`}>
					Children's Depression Rating Scale (CDRS)
				</Link>
			</Menu.Item>
			<Menu.Item key="5">
				<Link to={`/YMRS/${app?._id}`}>
					Young Mania Rating Scale(YMRS)
				</Link>
			</Menu.Item>
			<Menu.Item key="6">
				<Link to={`/ybocs/${app?._id}`}>
					Yale-Brown Obsessive Compulsive Scale(YBOCS)
				</Link>
			</Menu.Item>
			<Menu.Item key="7">
				<Link to={`/panss/${app?._id}`}>
					Positive and Negative Syndrome Scale(PANSS)
				</Link>
			</Menu.Item>
		</Menu>
	);
	const getQuantity = (dosageStr, durationStr) =>{
		const dosage = dosageStr.split('-').reduce((sum, part) => sum + (part.includes('½') ? parseFloat(part.replace('½', '.5')) : parseFloat(part)), 0);
		  
		const match = durationStr.match(/(\d+)\s*(weeks|months|days)/);
		
		if (!match) return 0; // If no match, return 0
	  
		const [_, num, unit] = match; // Destructure match array safely
		const duration = unit === "weeks" ? num * 7 : unit === "months" ? num * 30 : parseInt(num);
		
		return dosage * duration;
	  }
	  
	return (
	<>
	<InvoiceModal show={showBilling} onClose={() => setShowBilling(false)} appId={app._id} expense={app?.billing}/>
	{showClinicalModal && <ClinicalNotesModal show={showClinicalModal} handleClose={() => setShowClinicalModal(false)} appId ={app._id} />}
				{/* app and Patient Info Section */}
				<div  style={{ width : '100%'}} ref={lastElement}>
						<div className="card-header bg-success text-white d-flex justify-content-between">
							<h6>
										<strong>
										{dayjs(app?.date).format("DD MMMM , YYYY (dddd)")}
                                           </strong>
									</h6>
							{app?.status !== "closed" && (
								<>
									<Dropdown
										overlay={menu}
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
													`/PsychologicalForm/${app?._id}`
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
														`/HamiltonForm/${app._id}`
													);
												}
												if (
													e.target.value === "HAM-D"
												) {
													navigate(
														`/hamd/${app._id}`
													);
												}
												if (e.target.value === "CDRS") {
													navigate(
														`/cdrs/${app._id}`
													);
												}
												if (e.target.value === "YMRS") {
													navigate(
														`/YMRS/${app._id}`
													);
												}
												if (
													e.target.value === "YBOCS"
												) {
													navigate(
														`/ybocs/${app._id}`
													);
												}
												if (
													e.target.value === "PANSS"
												) {
													navigate(
														`/panss/${app._id}`
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
										<strong>app Date:</strong>{" "}
										{dayjs(
											app?.date?.toLocaleString()
										).format("YYYY-MM-DD")}
									</h6>
									<h6>
										<strong>app Time:</strong>{" "}
										{app?.time}
									</h6>
									<h6>
										<strong>Doctor:</strong> Dr.{" "}
										{app?.doctor?.name}
									</h6>
									<h6>
									    <strong>Patient:</strong> {" "}
									    {app?.patient?.firstName}-{app.patient.patientNumber}
									</h6>

									{/* Vital Signs Section */}
									<div className="mb-4">
										<div>
											<strong>Vital Signs</strong>
										</div>
										<div>
											
								<VitalSignsForm
									onSubmit={handleVitalSignsSubmit}
									existingVitals={app?.vitalSigns}
									handleCancel={handleVitalCancel}
									appId={app?._id}
									status={app?.status}
								/>
							
										</div>
									</div>

									{/* Prescriptions Section */}
									<h6 className="mt-3">
										<strong>Medicines: <button  style={{ padding : '5px' , border : 'none'}} onClick={() => setPrescriptionForm(true)}><i className="fa fa-plus"/></button></strong>&nbsp;
										{ prescription && prescription.length !== 0 &&<PencilSquare
																		size={
																			24
																		}
																		className="me-2"
																		style={{
																			cursor: "pointer",
																			color: "blue",
																		}}
																		onClick={() =>
																			handleEditPrescription()
																		} 
																	/>}
									</h6>
									<table className="table table-bordered">
										<thead>
											<tr>
												<th>Drug</th>
												<th>Dosage</th>
												<th>Duration</th>
												<th>Instructions</th>
												<th>Quantity</th>
												{app?.status !==
													"closed" && (
													<th>Actions</th>
												)}
											</tr>
										</thead>
										<tbody>
											{prescription &&
												prescription.map(
													(pres, idx) => (
														<tr key={idx}>
															<td>
																{
																	pres?.drug
																}
															</td>
															<td>
																{
																	pres?.dosage
																}
															</td>
															<td>
																{pres?.durationNumber +
																	pres?.durationUnit}
															</td>
															<td>
																{
																	pres?.instruction
																}
															</td>
															<td>{getQuantity(	
																	pres?.dosage,
															
																pres?.durationNumber +
																	pres?.durationUnit)}</td>
															{app?.status !==
																"closed" && (
																<td>
																	
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
																				pres._id
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
									appId={app?._id}
									patient={app?.patient._id}
									doctor={app?.doctor._id}
									medicines={medicines}
								
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
          {app.billing && app.billing.treatment && app.billing.treatment.length !== 0 && app.billing.treatment.map((treatment, index) => (
            <tr key={treatment.id}>
              <td>{index + 1}</td>
              <td>{treatment.name}</td>
              <td>₹{treatment.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
	  <h5>Additional Notes</h5>
	  <div>
      {isEditing ? (
        <>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes here..."
            style={{ width: "100%", height: "100px" }}
          />
          <br />
		  <div style={{ display : 'flex' , justifyContent : 'left' , alignItems : 'center' , gap : '10px' }}>
          <button onClick={() => handleAddNote()} style={{ padding: "5px", cursor: "pointer", marginTop: "10px" , borderRadius : '5px'}}>
            Save
          </button>
		  <button onClick={() =>{ setIsEditing(false) 
			setNotes(app?.notes)}} style={{ padding: "5px", cursor: "pointer", marginTop: "10px" ,  borderRadius : '5px'}}>
            Cancel
		  </button>
		  </div>
        </>
      ) : (

        <div style={{ display :  'flex' , justifyContent : 'left' , alignItems : 'center' , alignContent : 'baseline' , gap : '10px' }}>
          <p style={{ marginTop : '10px'}}>{notes}</p><button onClick={() => {
		    
			setIsEditing(true)
		  }} style={{ padding: "5px", cursor: "pointer",  border : 'none' , backgroundColor : 'transparent' }}><i className="fa fa-edit"></i></button>
        </div>
      )}
    </div>
    </div>
                               <div className="print-button d-flex justify-content-end mt-3">
								<Button variant="primary" onClick={() =>  navigate(`/print-prescription/${app?._id}`)}>
                                  view
                                </Button>
								</div>
								{/* Print Button */}
							</div>	
						</div>
					</div>
		</>
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

export default AppointmentDetail;
