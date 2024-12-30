import React, { useRef, useEffect, useState } from "react";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import PrescriptionForm from "../component/prescriptionForm"; // Importing the PrescriptionForm component
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { updatePatients } from "../actions/patientActions";
import {
	listVacApp,
	deleteVacApp,
	detailsVacApp,
	updateVacApp,
} from "../actions/vaccineAppointmentActions";
import { deletePrescription } from "../actions/prescriptionActions";
import { useNavigate, useParams } from "react-router-dom";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import VitalSignsForm from "./vitalSigns";
import MedicalHistoryForm from "./medicalHistoryForm";
import { listMedicines, deleteMedicine } from "../actions/medicineActions";
import dayjs from "dayjs";
import header from "../assets/header.PNG";
import PrintLayout from "../core/printLayout";
import { prescription } from "../utils/printformat";

const AppointmentDetail = () => {
	const [prescriptionForm, setPrescriptionForm] = useState(false);
	const [selectedPrescription, setSelectedPrescription] = useState(null); // For editing
	const [vitalSignsForm, setVitalSignsForm] = useState(false);
	const [PsychologicalForm, setPsychologicalForm] = useState(false);
	const [selectedVitalSign, setSelectedVitalSign] = useState(null);
	const [medicalHistory, setMedicalHistory] = useState([]);
	const [formType, setFormType] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const { id } = useParams();
	const appointmentRefs = useRef([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [form1Data, setForm1Data] = useState({
		name: "",
		age: "",
		gender: "",
		motherTongue: "",
		date: "",
		address: "",
		informant: "",
		refByDr: "",
		reasonForReferral: "",
		chiefComplaints: "",
		precipitation: "",
		onset: "",
		course: "",
		progression: "",
		background: "",
		behavioralObservations: "",
		toolsUsed: "",
		interpretation: "",
		impression: "",
		suggestion: "",
	});

	const dosageValue = ["½", "1"];
	const instruction = ["before food", "after food"];

	const [form2Data, setForm2Data] = useState({
		age: "",
		experience: "",
		fields: Array(14).fill(null), // initialize empty values for 14 fields
	});

	const handleFormTypeChange = (type) => {
		setFormType(type);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setFormType(null);
	};

	const handleForm1Change = (e) => {
		const { name, value } = e.target;
		setForm1Data((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleForm1Submit = (e) => {
		e.preventDefault();
		const submittedData = {
			age: form2Data.age,
			experience: form2Data.experience,
			selectedFields: fieldNames.reduce((result, fieldName, index) => {
				result[fieldName] = form2Data.fields[index];
				return result;
			}, {}),
		};
		dispatch(
			updateVacApp({
				_id: appointment._id,
				pschological: { ...form1Data, hamA: submittedData },
			})
		);
		dispatch(detailsVacApp(id));
		closeModal(); // Close modal after submit
	};

	const handleRadioChange = (index, value) => {
		setForm2Data((prevData) => {
			const updatedFields = [...prevData.fields];
			updatedFields[index] = value;
			return { ...prevData, fields: updatedFields };
		});
	};

	const handleForm2Submit = (e) => {
		e.preventDefault();
		const submittedData = {
			age: form2Data.age,
			experience: form2Data.experience,
			selectedFields: fieldNames.reduce((result, fieldName, index) => {
				result[fieldName] = form2Data.fields[index];
				return result;
			}, {}),
		};

		dispatch(
			updateVacApp({
				_id: appointment._id,
				pschological: {
					...appointment.pschological,
					hamA: submittedData,
				},
			})
		);
		dispatch(detailsVacApp(id));
		closeModal(); // Close modal after submit
	};

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
	const {
		loading,
		error,
		appointment: { appointment, pastAppointments } = {},
	} = vaccineAppList || {};

	const medicineList = useSelector((state) => state.medicineList);
	const { medicines } = medicineList;

	useEffect(() => {
		if (userInfo) {
			dispatch(detailsVacApp(id));
			dispatch(listMedicines());
		} else {
			navigate("/signin");
		}
	}, [dispatch, userInfo]);

	// Handle form submission for creating or updating a prescription
	const handleFormSubmit = (values) => {
		setPrescriptionForm(false);
		dispatch(detailsVacApp(id));
		setSelectedPrescription(null); // Reset after edit
	};

	const handleVitalSignsSubmit = (vitalSigns) => {
		dispatch(updateVacApp({ _id: appointment._id, vitalSigns }));
		dispatch(detailsVacApp(id));
		setVitalSignsForm(false); // Hide the form after submission
	};

	// Handle editing a prescription
	const handleEditPrescription = (idx) => {
		const prescriptionToEdit = appointment?.prescription[idx];
		setSelectedPrescription(prescriptionToEdit);
		setPrescriptionForm(true); // Show form for editing
	};

	const handleCancel = () => {
		setPrescriptionForm(false); // Hide the form when canceled
		setSelectedPrescription(null);
	};

	const handleEditVitalSigns = () => {
		setSelectedVitalSign(appointment?.vitalSigns);
		setVitalSignsForm(true);
	};

	// Handle deleting a prescription
	const handleDeletePrescription = (prescriptionId) => {
		dispatch(deletePrescription(appointment._id, prescriptionId)); // Dispatch delete action
		dispatch(detailsVacApp(id));
	};

	// Handle printing the prescription
	const appointmentRef = useRef();

	const handlePrint = () => {
		const printContent = appointmentRef.current;
		const printWindow = window.open("", "width=800,height=600");
		printWindow.document.write(
			"<html><head><title>Appointment Details</title>"
		);
		printWindow.document.write(
			"<style>body{font-family: Arial, sans-serif; margin: 20px;} table{width: 100%; border-collapse: collapse;} th, td{padding: 8px; text-align: left; border: 1px solid #ddd;} th{background-color: #f2f2f2;} header : { position : fixed; top: 0 ;}} .actions{display: flex; gap: 10px;}</style></head><body>"
		);
		printWindow.document.write(`<img src=${header}>`);
		printWindow.document.write(printContent.innerHTML); // Copy the content to the print window
		printWindow.document.write(`</body></html>`);
		printWindow.document.close();
		printWindow.focus();
		printWindow.print(); // Trigger the print dialog
		printWindow.close();
	};

	const handleVitalCancel = () => {
		setVitalSignsForm(false);
		setSelectedVitalSign(null);
	};

	const closeAppointment = () => {
		dispatch(updateVacApp({ _id: appointment._id, status: "closed" }));
		dispatch({ type: "UPDATE_APPOINTMENT_VACCINE_RESET" });
		dispatch(detailsVacApp(id));
	};

	useEffect(() => {
		dispatch(detailsVacApp(id));

		setMedicalHistory(
			appointment?.patient?.medicalhistory
				? [...appointment?.patient?.medicalhistory]
				: []
		);
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
						navigate(`/clinicalNotes/${appointment._id}`);
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
					setPsychologicalForm(!PsychologicalForm);
					setVitalSignsForm(false);
					setPrescriptionForm(false);
				}}>
				Psychological Form
			</Menu.Item>
			<Menu.Item key="5" onClick={() => navigate(`/billing/${id}`)}>
				Billing
			</Menu.Item>
			<Menu.SubMenu key="6" title="More">
				<Menu.Item key="6-1" onClick={closeAppointment}>
					Close Appointment
				</Menu.Item>
			</Menu.SubMenu>
		</Menu>
	);

	// menu for view button
	const viewMenu = (
		<Menu>
			<Menu.Item key="1">
				<Link to={`/PsychologicalForm/${appointment?._id}`}>
					Psychodiagnostic Report
				</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to={`/HamiltonForm/${appointment?._id}`}>
					Hamilton Anxiety Rating Scale (HAM-A)
				</Link>
			</Menu.Item>
			<Menu.Item key="3">
				<Link to={`/hamd/${appointment?._id}`}>
					Hamilton Depession Rating Scale (HAM-D)
				</Link>
			</Menu.Item>
			<Menu.Item key="4">
				<Link to={`/cdrs/${appointment?._id}`}>
					Children's Depression Rating Scale (CDRS)
				</Link>
			</Menu.Item>
			<Menu.Item key="5">
				<Link to={`/YMRS/${appointment?._id}`}>
					Young Mania Rating Scale(YMRS)
				</Link>
			</Menu.Item>
			<Menu.Item key="6">
				<Link to={`/ybocs/${appointment?._id}`}>
					Yale-Brown Obsessive Compulsive Scale(YBOCS)
				</Link>
			</Menu.Item>
			<Menu.Item key="7">
				<Link to={`/panss/${appointment?._id}`}>
					Positive and Negative Syndrome Scale(PANSS)
				</Link>
			</Menu.Item>
		</Menu>
	);

	return (
		<div className="container mt-4">
			<Button
				className="my-4"
				type="primary"
				onClick={() => navigate("/list-app-vaccine")}>
				Back
			</Button>
			<div className="row">
				{/* Appointment and Patient Info Section */}
				<div className="col-lg-8">
					<div className="card mb-4">
						<div className="card-header bg-primary text-white">
							<h5>Patient Details</h5>
						</div>
						
						<div className="card-body">
							<p>
								<strong>Patient Name:</strong>{" "}
								{appointment?.patient?.firstName +
									" " +
									appointment?.patient?.lastName}
							</p>
							<p>
								<strong>Patient ID</strong>{" "}
								{appointment?.patient?.patientNumber}
							</p>
							
						</div>
					</div>

					{/* Treatment and Prescription History */}
					<div className="card mb-4">
						<div className="card-header bg-success text-white d-flex justify-content-between">
							<h5>Treatment and Prescription History</h5>
							{appointment?.status !== "closed" && (
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

							{vitalSignsForm && (
								<VitalSignsForm
									onSubmit={handleVitalSignsSubmit}
									existingVitals={selectedVitalSign}
									handleCancel={handleVitalCancel}
									appId={appointment._id}
								/>
							)}
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
										<strong>Doctor:</strong> Dr.{" "}
										{appointment?.doctor?.name}
									</h6>

									{/* Vital Signs Section */}
									<div className="mb-4">
										<div>
											<strong>Vital Signs</strong>
										</div>
										<div>
											<table className="table table-bordered">
												<thead>
													<tr>
														<th>Weight (kg)</th>
														<th>B.P. (mmHg)</th>
														<th>
															Pulse
															(Heartbeats/min)
														</th>
														<th>
															Temperature (°C)
														</th>
														<th>
															Resp. Rate
															(breaths/min)
														</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															{appointment
																?.vitalSigns
																?.weight ||
																"N/A"}
														</td>
														<td>
															{appointment
																?.vitalSigns
																?.bp || "N/A"}
														</td>
														<td>
															{appointment
																?.vitalSigns
																?.pulse ||
																"N/A"}
														</td>
														<td>
															{appointment
																?.vitalSigns
																?.temperature ||
																"N/A"}
														</td>
														<td>
															{appointment
																?.vitalSigns
																?.respRate ||
																"N/A"}
														</td>
													</tr>
												</tbody>
											</table>
											{appointment?.status !==
												"closed" && (
												<div>
													<PencilSquare
														size={24}
														className="me-2"
														style={{
															cursor: "pointer",
															color: "blue",
														}}
														onClick={() =>
															handleEditVitalSigns()
														} // Trigger edit form
													/>
												</div>
											)}
										</div>
									</div>

									{/* Prescriptions Section */}
									<h6 className="mt-3">
										<strong>Prescriptions:</strong>
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
																		} // Trigger edit form
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
								{/* <PrintLayout html={prescription}></PrintLayout> */}
								
                               <div className="print-button d-flex justify-content-end mt-3">
								<Button variant="primary" onClick={() =>  navigate(`/print-prescription/${appointment?._id}`)}>
                                  view
                                </Button>
								</div>
								{/* Print Button */}
							</div>
						</div>
					</div>

					{pastAppointments &&
						pastAppointments.length !== 0 &&
						pastAppointments.map((appointment, index) => (
							<div
								key={index}
								ref={(el) => (appointmentRefs.current[0] = el)}
								className="mb-4 p-3 border rounded">
								<div
									style={{
										textAlign: "end",
									}}>
									<Dropdown
										overlay={viewMenu}
										placement="bottomRight"
										arrow>
										<Button type="primary">Form Details</Button>
									</Dropdown>
								</div>
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
									<strong>Doctor:</strong> Dr.
									{appointment?.doctor?.name}
								</h6>

								{/* Vital Signs Section */}
								<div className="mb-4">
									<div>
										<strong>Vital Signs</strong>
									</div>
									<div>
										<table className="table table-bordered">
											<thead>
												<tr>
													<th>Weight (kg)</th>
													<th>B.P. (mmHg)</th>
													<th>
														Pulse (Heartbeats/min)
													</th>
													<th>Temperature (°C)</th>
													<th>
														Resp. Rate (breaths/min)
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														{appointment?.vitalSigns
															?.weight || "N/A"}
													</td>
													<td>
														{appointment?.vitalSigns
															?.bp || "N/A"}
													</td>
													<td>
														{appointment?.vitalSigns
															?.pulse || "N/A"}
													</td>
													<td>
														{appointment?.vitalSigns
															?.temperature ||
															"N/A"}
													</td>
													<td>
														{appointment?.vitalSigns
															?.respRate || "N/A"}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								{/* Prescriptions Section as Table */}
								<h6 className="mt-3">
									<strong>Prescriptions:</strong>
								</h6>
								<table className="table table-bordered">
									<thead>
										<tr>
											<th>Drug</th>
											<th>Dosage </th>
											<th>Duration</th>
											<th>Instructions</th>
										</tr>
									</thead>
									<tbody>
										{appointment?.prescription &&
											appointment?.prescription.map(
												(prescription, idx) => (
													<tr key={idx}>
														<td>
															{prescription?.drug}
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
													</tr>
												)
											)}
									</tbody>
								</table>

								<div className="print-button d-flex justify-content-end mt-3">
								<Button variant="primary" onClick={() =>  navigate(`/print-prescription/${appointment?._id}`)}>
                                  view
                                </Button>
								</div>
								<hr />
							</div>
						))}
				</div>

				<MedicalHistoryForm
					medicalHistory={medicalHistory}
					id={appointment?.patient?._id}
					detailsVacApp={detailsVacApp}
					appointment={appointment}
					setMedicalHistory={setMedicalHistory}
				/>
			</div>
		</div>
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
