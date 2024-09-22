import React, { useRef , useEffect} from 'react';
import { Dropdown, Menu, Button } from 'antd';
import Layout from '../core/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { listVacApp, deleteVacApp , detailsVacApp} from '../actions/vaccineAppointmentActions'
import { Link, useNavigate, useParams } from 'react-router-dom';
// Sample Data (replace with dynamic data as needed)
const patient = {
  name: 'Riti Rai',
  age: 14,
  bloodGroup: 'B+',
  email: 'riti.rai@example.com',
  medicalHistory: ['Hypertension', 'Diabetes', 'Asthma'],
  appointmentHistory: [
    {
      date: 'Jan 11, 2024',
      doctor: 'Dr. Shreyansh Dwivedi',
      prescriptions: [
        { drug: 'Tablet Serlift (50 Mg)', dosage: '1-0-0', duration: '10 days', instructions: 'After Food' },
        { drug: 'Tablet Tofisys (50 Mg)', dosage: '1-1-1', duration: '10 days', instructions: 'After Food' }
      ],
      procedures: [
        { procedure: 'Consultation And Treatment', cost: 500.00, discount: 0, total: 500.00 }
      ]
    },
    {
      date: 'Dec 28, 2023',
      doctor: 'Dr. Shreyansh Dwivedi',
      prescriptions: [
        { drug: 'Tablet XYZ', dosage: '2-0-2', duration: '7 days', instructions: 'Before Food' },
        { drug: 'Tablet ABC', dosage: '1-0-1', duration: '5 days', instructions: 'After Food' }
      ],
      procedures: [
        { procedure: 'Follow-up Consultation', cost: 300.00, discount: 0, total: 300.00 }
      ]
    }
  ]
};

// Dropdown menu for adding records
// const menu = (
//   <Menu>
//     <Menu.Item key="1">
//       <Link href="#">Test</Link>
//     </Menu.Item>
//     <Menu.Item key="2">
//       <Link href="#">Treatment</Link>
//     </Menu.Item>
//     <Menu.Item key="3">
//       <Link href={`/add-prescription/${app._id}`}>Prescription</Link>
//     </Menu.Item>
//   </Menu>
// );

const AppointmentDetail = () => {
  // Refs for each appointment section
  const { id } = useParams()
  const appointmentRefs = useRef([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Function to handle printing for a specific prescription history
  const handlePrint = (index) => {
    const content = appointmentRefs.current[index];
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Print Prescription</title>');
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; } table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; text-align: left; border: 1px solid #ddd; } h6 { margin-bottom: 10px; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(content.innerHTML); // Write only the prescription section
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const vaccineAppList = useSelector((state) => state.vaccineAppDetails)
    const { loading, error, appointment } = vaccineAppList

    useEffect(() => {
      if (userInfo) {
          dispatch(detailsVacApp(id))
      } else {
          navigate('/signin')
      }
  }, [ dispatch ,userInfo])
  
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
              <p><strong>Patient Name:</strong> {appointment?.patient?.firstName + " " + appointment?.patient?.lastName}</p>
              <p><strong>Patient ID</strong> {appointment?.patient?.patientNumber}</p> 
              <p><strong>Symptoms</strong> {appointment?.patient?.symptoms}</p>
            </div>
          </div>

          {/* Treatment and Prescription History */}
          <div className="card mb-4">
            <div className="card-header bg-success text-white d-flex justify-content-between">
              <h5>Treatment and Prescription History</h5>

              {/* Add Record Button with AntD Dropdown */}
              <Dropdown overlay={
                   (
                    <Menu>
                      <Menu.Item key="1">
                        <Link href="#">Test</Link>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <Link href="#">Treatment</Link>
                      </Menu.Item>
                      <Menu.Item key="3">
                        <Link to={`/add-prescription/${appointment._id}`}>Prescription</Link>
                      </Menu.Item>
                    </Menu>
                  )               
              } placement="bottomRight" arrow>
                <Button type="default">Add Record</Button>
              </Dropdown>
            </div>

            <div className="card-body">
              {patient.appointmentHistory.map((appointment, index) => (
                <div key={index} ref={(el) => (appointmentRefs.current[index] = el)} className="mb-4 p-3 border rounded">
                  <h6><strong>Appointment Date:</strong> {appointment.date}</h6>
                  <h6><strong>Doctor:</strong> {appointment.doctor}</h6>

                  {/* Completed Procedures */}
                  <h6 className="mt-3"><strong>Procedures:</strong></h6>
                  <table className="table table-bordered mb-3">
                    <thead>
                      <tr>
                        <th>Procedure</th>
                        <th>Cost</th>
                        <th>Discount</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointment.procedures.map((procedure, idx) => (
                        <tr key={idx}>
                          <td>{procedure.procedure}</td>
                          <td>{procedure.cost.toFixed(2)}</td>
                          <td>{procedure.discount.toFixed(2)}%</td>
                          <td>{procedure.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Prescription Details */}
                  <h6 className="mt-3"><strong>Prescriptions:</strong></h6>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Drug</th>
                        <th>Dosage & Frequency</th>
                        <th>Duration</th>
                        <th>Instructions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointment.prescriptions.map((prescription, idx) => (
                        <tr key={idx}>
                          <td>{prescription.drug}</td>
                          <td>{prescription.dosage}</td>
                          <td>{prescription.duration}</td>
                          <td>{prescription.instructions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Print Button */}
                  <div className="d-flex justify-content-end mt-3">
                    <Button type="primary" onClick={() => handlePrint(index)}>
                      Print Prescription
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medical History Section */}
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h5>Medical History</h5>
            </div>
            <div className="card-body">
              <p><strong>Personal Medical History</strong></p>
              <ul className="list-group">
                {patient.medicalHistory.length > 0 ? (
                  patient.medicalHistory.map((condition, index) => (
                    <li key={index} className="list-group-item">{condition}</li>
                  ))
                ) : (
                  <li className="list-group-item">No Personal Medical History</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;
