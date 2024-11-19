import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsVacApp } from "../actions/vaccineAppointmentActions";

const ViewPDReport = () => {
  const [patientData, setPatientData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
  const { loading, error, appointment : {appointment} = {} } = vaccineAppList || {};
  const dispatch = useDispatch();


  console.log(appointment)
  useEffect(() => {
    if (userInfo) {
      dispatch(detailsVacApp(id));
    } else {
      navigate("/signin");
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    setPatientData(appointment?.psychodiagnostic);
  }, [appointment]);

  const handlePrint = () => {
    window.print();
  };

  if (!patientData) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handlePrint}>
          Print Report
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-4">Patient Information</h4>

          {/* Basic Information */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Name:</strong> {patientData.name}
            </div>
            <div className="col-md-6 mb-3">
              <strong>Age:</strong> {patientData.age}
            </div>
            <div className="col-md-6 mb-3">
              <strong>Mother Tongue:</strong> {patientData.motherTongue}
            </div>
            <div className="col-md-6 mb-3">
              <strong>Date:</strong> {patientData.date}
            </div>
            <div className="col-md-12 mb-3">
              <strong>Address:</strong> {patientData.address}
            </div>
            <div className="col-md-6 mb-3">
              <strong>Referred By Dr.:</strong> {patientData.refByDr}
            </div>
            <div className="col-md-12 mb-3">
              <strong>Reason for Referral:</strong> {patientData.reasonForReferral}
            </div>
          </div>

          <hr />

          {/* Chief Complaints */}
          <h5>Chief Complaints</h5>
          <ul>
            {patientData.chiefComplaints.map((complaint, index) => (
              <React.Fragment key={index}>
                <li>
                  <strong>Complaint:</strong> {complaint.complaint || 'N/A'} <br />
                  <strong>Duration:</strong> {complaint.duration}
                </li>
                <hr />
              </React.Fragment>
            ))}
          </ul>

          <hr />

          {/* Medical Details */}
          <h5>Medical Details</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Precipitation:</strong> {patientData.precipitation}
            </div>
            <div className="col-md-6 mb-3">
              <strong>Onset:</strong> {patientData.onset}
            </div>
            <div className="col-md-6 mb-3">
              <strong>Course:</strong> {patientData.course}
            </div>
            <div className="col-md-6 mb-3">
              <strong>Progression:</strong> {patientData.progression}
            </div>
          </div>

          <hr />

          {/* Background Information */}
          <h5>Background Information</h5>
          {/* Personal History */}
          <h6>Personal History</h6>
          <ul>
            {Object.entries(patientData.backgroundInfo.personalHistory).map(([key, value], index) => (
              <li key={index}>
                <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value || 'N/A'}
              </li>
            ))}
          </ul>

          {/* Premorbid Personality */}
          <h6>Premorbid Personality</h6>
          {Object.entries(patientData.backgroundInfo.premorbidPersonality).map(([category, questions], index) => (
            <div key={index}>
              <h6>{category.replace(/([A-Z])/g, ' $1').toUpperCase()}</h6>
              <ul>
                {questions.map((q, idx) => (
                  <li key={idx}>
                    <strong>{q.question}:</strong> {q.answer || 'N/A'}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <hr />

          {/* Behavioral Information */}
          <h5>Behavioral Information</h5>
          {/* General Appearance and Behavior */}
          <h6>General Appearance and Behavior</h6>
          <div className="row">
            {Object.entries(patientData.behaviouralInfo.generalAppearanceAndBehaviour).map(([key, value], index) => (
              <div key={index} className="col-md-6 mb-3">
                <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value || 'N/A'}
              </div>
            ))}
          </div>

          {/* Orientation */}
          <h6>Orientation</h6>
          <div className="row">
            {Object.entries(patientData.behaviouralInfo.orientation).map(([key, value], index) => (
              <div key={index} className="col-md-6 mb-3">
                <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value || 'N/A'}
              </div>
            ))}
          </div>

          {/* Other Behavioral Information */}
          <h6>Motor Behaviour</h6>
          <p><strong>Psychomotor Activity:</strong> {patientData.behaviouralInfo.motorBehaviour.psychomotorActivity || 'N/A'}</p>
          <p><strong>Disturbances:</strong> {patientData.behaviouralInfo.motorBehaviour.disturbances.join(", ") || 'N/A'}</p>

          <h6>Level of Consciousness</h6>
          <p><strong>Mediate:</strong> {patientData.behaviouralInfo.levelOfConsciousness.mediate || 'N/A'}</p>

          <h6>Speech</h6>
          <div className="row">
            {Object.entries(patientData.behaviouralInfo.speech).map(([key, value], index) => (
              <div key={index} className="col-md-6 mb-3">
                <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value || 'N/A'}
              </div>
            ))}
          </div>

          <h6>Memory</h6>
          <div className="row">
            {Object.entries(patientData.behaviouralInfo.memory).map(([key, value], index) => (
              <div key={index} className="col-md-6 mb-3">
                <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value || 'N/A'}
              </div>
            ))}
          </div>

          {/* Thought Section */}
          <h6>Thought</h6>
          {Object.entries(patientData.behaviouralInfo.thought).map(([category, options], index) => (
            <div key={index}>
              <strong>{category.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong>
              <ul>
                {options.length ? options.map((option, idx) => <li key={idx}>{option}</li>) : 'N/A'}
              </ul>
            </div>
          ))}

          <hr />

          {/* Additional Information */}
          <h5>Additional Information</h5>
          <p>{patientData.additionalInfo1}</p>
          <p>{patientData.additionalInfo2}</p>

          <h5>Impressions and Suggestions</h5>
          <p>{patientData.impression}</p>
          <p>{patientData.suggestions}</p>

        </div>
      </div>
    </div>
  );
};

export default ViewPDReport;
