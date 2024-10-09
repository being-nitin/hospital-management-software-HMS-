import React, { useRef, useEffect, useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import PrescriptionForm from "../component/prescriptionForm"; // Importing the PrescriptionForm component
import { useDispatch, useSelector } from "react-redux";
import {updatePatients } from '../actions/patientActions'
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
import {UPDATE_APPOINTMENT_VACCINE_RESET} from "../constants/vaccineAppointmentConstants";
import MedicalHistoryForm from "./medicalHistoryForm";
import { listMedicines, deleteMedicine } from '../actions/medicineActions'

const AppointmentDetail = () => {
  const [prescriptionForm, setPrescriptionForm] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null); // For editing
  const [vitalSignsForm, setVitalSignsForm] = useState(false);
  const [selectedVitalSign, setSelectedVitalSign] = useState(null);
  const [medicalHistory , setMedicalHistory] = useState([])
  const { id } = useParams();
  const appointmentRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
  const { loading, error, appointment : { appointment ,pastAppointments} } = vaccineAppList;

  const medicineList = useSelector((state) => state.medicineList)
  const { medicines } = medicineList

  useEffect(() => {
    if (userInfo) {
      dispatch(detailsVacApp(id));
      dispatch(listMedicines())          
    } else {
      navigate("/signin");
    }
  }, [dispatch, userInfo]);

  // Handle form submission for creating or updating a prescription
  const handleFormSubmit = (values) => {
    setPrescriptionForm(false);
    dispatch(detailsVacApp(id))
    setSelectedPrescription(null); // Reset after edit
  };

  const handleVitalSignsSubmit = (vitalSigns) => {
    dispatch(updateVacApp({ _id: appointment._id, vitalSigns }));

    setVitalSignsForm(false); // Hide the form after submission
    dispatch({ type: UPDATE_APPOINTMENT_VACCINE_RESET })
  };

  // Handle editing a prescription
  const handleEditPrescription = (idx) => {
    const prescriptionToEdit = appointment?.prescription[idx];
    setSelectedPrescription(prescriptionToEdit);
    setPrescriptionForm(true); // Show form for editing
  };

  const handleCancel = () => {
    setPrescriptionForm(false) // Hide the form when canceled
    setSelectedPrescription(null)
  };

  const handleEditVitalSigns = () =>{
    setSelectedVitalSign(appointment?.vitalSigns)
    setVitalSignsForm(true)
  }

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

  const handleVitalCancel = () =>{
      setVitalSignsForm(false)
      setSelectedVitalSign(null)
  }

  useEffect(()=>{
     detailsVacApp(id)
     setMedicalHistory(appointment?.patient?.medicalhistory)
  },[appointment])

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setVitalSignsForm(true)}>
        <Link href="#">Vital Signs</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href="#">Clinal Notes</Link>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setPrescriptionForm(true)}>
        Prescription
      </Menu.Item>
      <Menu.Item key="4">Psychological Form</Menu.Item>
      <Menu.Item key="5">Billing</Menu.Item>
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
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Button type="default">Add Record</Button>
              </Dropdown>
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
                  medicines ={medicines}
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
              <div
                ref={(el) => (appointmentRefs.current[0] = el)}
                className="mb-4 p-3 border rounded"
              >
                <h6>
                  <strong>Appointment Date:</strong> {appointment?.date?.toLocaleString()}
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
                    <table  className="table table-bordered">
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
                    <div>
                            <PencilSquare
                              size={24}
                              className="me-2"
                              style={{ cursor: "pointer", color: "blue" }}
                              onClick={() => handleEditVitalSigns()} // Trigger edit form
                            />
                          </div>
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
                      <th>Actions</th>
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

          { pastAppointments && pastAppointments.map((appointment , index) =>(
                      <div
                      key ={index}
                      ref={(el) => (appointmentRefs.current[0] = el)}
                      className="mb-4 p-3 border rounded"
                    >
                      <h6>
                        <strong>Appointment Date:</strong> {appointment?.date.toLocaleString()}
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
                          <table  className="table table-bordered">
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

       
        <MedicalHistoryForm medicalHistory={medicalHistory} id = {appointment?.patient?._id} detailsVacApp={detailsVacApp} appointment={appointment} setMedicalHistory={setMedicalHistory} />
      </div>


    </div>
  );
};

export default AppointmentDetail;
