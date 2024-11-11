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
  const {
    loading,
    error,
    appointment: { appointment, pastAppointments } = {},
  } = vaccineAppList || {};
  const dispatch = useDispatch();

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
          <ul className="list-unstyled">
            {patientData.backgroundInfo.map((info, index) => (
              <li key={index}>
                - {info.category} - {info.subCategory} {info.subSubCategory && `- ${info.subSubCategory}`}
              </li>
            ))}
          </ul>

          <hr />

          {/* Behavioral Information */}
          <h5>Behavioral Information</h5>
          <ul className="list-unstyled">
            {patientData.behavioralInfo.map((info, index) => (
              <li key={index}>
                - {info.category} - {info.subCategory} {info.subSubCategory && `- ${info.subSubCategory}`}
              </li>
            ))}
          </ul>

          <hr />

          {/* Additional Information */}
          <h5>Additional Information</h5>
          <p>{patientData.additionalInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPDReport;
