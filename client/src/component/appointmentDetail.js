import React, { useRef, useEffect, useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import PrescriptionForm from "../component/prescriptionForm"; // Importing the PrescriptionForm component
import { useDispatch, useSelector } from "react-redux";
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
        pschological: { ...appointment.pschological, hamA: submittedData },
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
  const handlePrint = (index) => {
    const content = appointmentRefs.current[index];
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Print Prescription</title>");
    printWindow.document.write(
      "<style>body { font-family: Arial, sans-serif; } table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }</style>"
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(content.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
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
      <Menu.Item key="1" onClick={() => setVitalSignsForm(true)}>
        <Link href="#">Vital Signs</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link
          onClick={(e) => {
            e.preventDefault();
            navigate(`/clinicalNotes/${appointment._id}`);
          }}
        >
          Clinal Notes
        </Link>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setPrescriptionForm(true)}>
        Prescription
      </Menu.Item>
      <Menu.Item
        key="4"
        onClick={() => setPsychologicalForm(!PsychologicalForm)}
      >
        Psychological Form
      </Menu.Item>
      <Menu.Item key="5">Billing</Menu.Item>
      <Menu.SubMenu key="6" title="More">
        <Menu.Item key="6-1" onClick={closeAppointment}>
          Close Appointment
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <div className="container mt-4">
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
              <p>
                <strong>Symptoms</strong> {appointment?.patient?.symptoms}
              </p>
            </div>
          </div>

          {/* Treatment and Prescription History */}
          <div className="card mb-4">
            <div className="card-header bg-success text-white d-flex justify-content-between">
              <h5>Treatment and Prescription History</h5>
              {appointment?.status !== "closed" && (
                <>
                  <Dropdown overlay={menu} placement="bottomRight" arrow>
                    <Button type="default">Add Record</Button>
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
                  appId={appointment._id}
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
                  <h2 style={styles.header}>Psychological Form Options</h2>
                  <div style={styles.buttonContainer}>
                    <button
                      style={styles.button}
                      onClick={() =>
                        navigate(`/PsychologicalForm/${appointment?._id}`)
                      }
                    >
                      Psychodiagnostic Report
                    </button>
                    <button
                      style={styles.button}
                      onClick={() =>
                        navigate(`/HamiltonForm/${appointment?._id}`)
                      }
                    >
                      Hamilton Anxiety Rating Scale (HAM-A)
                    </button>
                  </div>
                </div>
              )}
              <div
                ref={(el) => (appointmentRefs.current[0] = el)}
                className="mb-4 p-3 border rounded"
              >
                <h6>
                  <strong>Appointment Date:</strong>{" "}
                  {appointment?.date?.toLocaleString()}
                </h6>
                <h6>
                  <strong>Appointment Time:</strong> {appointment?.time}
                </h6>
                <h6>
                  <strong>Doctor:</strong> Dr.{appointment?.doctor?.name}
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
                          <th>Pulse (Heartbeats/min)</th>
                          <th>Temperature (°C)</th>
                          <th>Resp. Rate (breaths/min)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{appointment?.vitalSigns?.weight || "N/A"}</td>
                          <td>{appointment?.vitalSigns?.bp || "N/A"}</td>
                          <td>{appointment?.vitalSigns?.pulse || "N/A"}</td>
                          <td>
                            {appointment?.vitalSigns?.temperature || "N/A"}
                          </td>
                          <td>{appointment?.vitalSigns?.respRate || "N/A"}</td>
                        </tr>
                      </tbody>
                    </table>
                    {appointment?.status !== "closed" && (
                      <div>
                        <PencilSquare
                          size={24}
                          className="me-2"
                          style={{ cursor: "pointer", color: "blue" }}
                          onClick={() => handleEditVitalSigns()} // Trigger edit form
                        />
                      </div>
                    )}
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
                      <th>Dosage</th>
                      <th>Duration</th>
                      <th>Instructions</th>
                      {appointment?.status !== "closed" && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {appointment?.prescription &&
                      appointment?.prescription.map((prescription, idx) => (
                        <tr key={idx}>
                          <td>{prescription?.drug}</td>
                          <td>{prescription?.dosage}</td>
                          <td>
                            {prescription?.durationNumber +
                              prescription?.durationUnit}
                          </td>
                          <td>{prescription?.instruction}</td>
                          {appointment?.status !== "closed" && (
                            <td>
                              <PencilSquare
                                size={24}
                                className="me-2"
                                style={{ cursor: "pointer", color: "blue" }}
                                onClick={() => handleEditPrescription(idx)} // Trigger edit form
                              />
                              <Trash
                                size={24}
                                style={{ cursor: "pointer", color: "red" }}
                                onClick={() =>
                                  handleDeletePrescription(prescription._id)
                                } // Delete prescription
                              />
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>

                {/* Print Button */}
                <div className="d-flex justify-content-end mt-3">
                  <Button type="primary" onClick={() => handlePrint(0)}>
                    Print Prescription
                  </Button>
                </div>

                <hr />
              </div>
            </div>
          </div>

          {pastAppointments &&
            pastAppointments.map((appointment, index) => (
              <div
                key={index}
                ref={(el) => (appointmentRefs.current[0] = el)}
                className="mb-4 p-3 border rounded"
              >
                <h6>
                  <strong>Appointment Date:</strong>{" "}
                  {appointment?.date.toLocaleString()}
                </h6>
                <h6>
                  <strong>Appointment Time:</strong> {appointment?.time}
                </h6>
                <h6>
                  <strong>Doctor:</strong> Dr.{appointment?.doctor?.name}
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
                          <th>Pulse (Heartbeats/min)</th>
                          <th>Temperature (°C)</th>
                          <th>Resp. Rate (breaths/min)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{appointment?.vitalSigns?.weight || "N/A"}</td>
                          <td>{appointment?.vitalSigns?.bp || "N/A"}</td>
                          <td>{appointment?.vitalSigns?.pulse || "N/A"}</td>
                          <td>
                            {appointment?.vitalSigns?.temperature || "N/A"}
                          </td>
                          <td>{appointment?.vitalSigns?.respRate || "N/A"}</td>
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
                      <th>Dosage</th>
                      <th>Duration</th>
                      <th>Instructions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointment?.prescription &&
                      appointment?.prescription.map((prescription, idx) => (
                        <tr key={idx}>
                          <td>{prescription?.drug}</td>
                          <td>{prescription?.dosage}</td>
                          <td>
                            {prescription?.durationNumber +
                              prescription?.durationUnit}
                          </td>
                          <td>{prescription?.instruction}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {/* Print Button */}
                <div className="d-flex justify-content-end mt-3">
                  <Button type="primary" onClick={() => handlePrint(0)}>
                    Print Prescription
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
    backgroundColor: "#0056d2",
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
    backgroundColor: "#218838",
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
