import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsVacApp } from "../actions/vaccineAppointmentActions";
import PrintDetails from './PrintDetails';
import PrintLayout from '../core/printLayout';
// import { psychodiagnostic } from '../utils/printformat';
import PatientDetails from './patientHistory';
import moment from 'moment';

const ViewPDReport = () => {
  const [patientData, setPatientData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
  const { loading, error, appointment : {appointment} = {} } = vaccineAppList || {};
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

  let psychodiagnostic = () => {

  return `
  <div   border-radius: 8px; margin: 20px;">
   <div>
        <div >
        ${appointment && appointment.patient && `
        <p>Name: <span>${appointment.patient.firstName.toUpperCase() + " " + appointment.patient.lastName.toUpperCase()}</span></p>
      
          <p > Age: <span>${calculateAge(appointment.patient.birthDate)}</span></p>
          </div>
          <div>
          <p >
          Date: ${ moment(Date.now()).format('DD-MM-YYYY')}
        </p>
        <p >
          Address: ${appointment.patient.address}
        </p>
        </div>
        </div>`}
  <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
  
  <div style="flex: 1 1 calc(33.33% - 1rem);">
    <strong>Referred By Dr.:</strong> ${patientData.refByDr}
  </div>
  <div style="flex: 1 1 calc(33.33% - 1rem);">
    <strong>Reason for Referral:</strong> ${patientData.reasonForReferral}
  </div>

  <!-- Full-Width Row -->
  <div style="flex: 1 1 100%;">
    <strong>Address:</strong> ${patientData.address}
  </div>
</div>

<h5>Chief Complaints</h5>
<table class="chief-complaints-table">
  <thead>
    <tr>
      <th>Complaint</th>
      <th>Duration</th>
    </tr>
  </thead>
  <tbody>
    ${patientData.chiefComplaints
      .map(
        (complaint) => `
      <tr>
        <td>${complaint.complaint || ""}</td>
        <td>${complaint.duration || ""}</td>
      </tr>
    `
      )
      .join("")}
  </tbody>
</table>
<h5 style="margin-bottom: 10px;">Medical Details</h5>

  <div>
     ${patientData.precipitation || "NAD"} Precipitation, ${patientData.onset || "NAD"} Onset, ${patientData.course || "NAD"} Course , ${patientData.progression || "NAD"} Progression
  </div>

<h4 style="margin-bottom: 10px;">Background Information</h4>
<!-- Personal History -->
<h4>Personal History</h4>
<div>
  ${Object.entries(patientData.backgroundInfo.personalHistory).map(([key, value], index) => `
   
     <span style = "margin-bottom : 5px;"> ${value} </span>
  
  `).join(',')}
</div>
<h4 style = "page-break-before: always;">Premorbid Personality</h4>
<div>
  ${Object.entries(patientData.backgroundInfo.premorbidPersonality).map(([category, questions], index) => `
    <div>
      <p style="margin-bottom: 5px; font-weight: bold;">${category.replace(/([A-Z])/g, ' $1').toUpperCase()}</p>
      ${questions.map((q, idx) => `
        <span style="margin-bottom: 5px;"> ${q.answer }</span>
      `).join(',')}
    </div>
  `).join('')}
</div>
<h4 >Behavioral Information</h4>
<!-- General Appearance and Behavior -->
<h4>General Appearance and Behavior</h4>
<div>
  ${Object.entries(patientData.behaviouralInfo.generalAppearanceAndBehaviour).map(([key, value], index) => `
    <div style="display: inline-block">
      ${value || 'NAD'} ,
    </div>
  `).join('')}
</div>
<h4  >Orientation</h4>
<div>
  ${Object.entries(patientData.behaviouralInfo.orientation).map(([key, value], index) => `
    <div style="display: inline-block; width: 48%; margin-bottom: 15px;">
      ${value || 'NAD'},
    </div>
  `).join('')}
</div>
<h4>Motor Behaviour</h4>
<div>
  <p > ${patientData.behaviouralInfo.motorBehaviour.psychomotorActivity || 'NAD'} ,${patientData.behaviouralInfo.motorBehaviour.disturbances.join(", ") || 'NAD'}</p>
</div>

<h4 >Level of Consciousness</h4>
<div>
  <p >${patientData.behaviouralInfo.levelOfConsciousness.mediate}</p>
</div>

<h4>Speech</h4>
<div>
  ${Object.entries(patientData.behaviouralInfo.speech).map(([key, value], index) => `
    <span >
      ${value},
    </span>
  `).join('')}
</div>

<h4 style = "page-break-before: always;">Memory</h4>
<div>
  ${Object.entries(patientData.behaviouralInfo.memory).map(([key, value], index) => `
    <span style="margin-right: 10px;">
     ${value},
    </span>
  `).join('')}
</div>

<h4  >Thought</h4>
<div>
  ${Object.entries(patientData.behaviouralInfo.thought).map(([category, options], index) => `
    <div style="margin-bottom: 10px;">
      ${category.replace(/([A-Z])/g, ' $1').toUpperCase()}
        ${options.length ? options.map(option => `
          <span>${option},</span>
        `).join('') : 'NAD'}
      
    </div>
  `).join('')}

<div>
   Sugession: <p>${patientData.suggestions.join(',')}</p>
</div>
</div>
  `
  }

    const calculateAge = (date) => {
      
        const birthMoment = moment  (date);
        const today = moment();
    
        return today.diff(birthMoment, 'years'); // Calculate the difference in years
      };

  return (
    <div className="container mt-4">
     <PrintLayout html ={psychodiagnostic} category={'forms'}></PrintLayout>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-4">Patient Information</h4>

          {/* Basic Information */}
         { appointment && appointment.patient && 
         (
          <div style={{ display : 'flex' , justifyContent: 'space-between' , alignItems: 'center'}}>
        <p>
        <p>Name: <span>{appointment.patient.firstName.toUpperCase() + " " + appointment.patient.lastName.toUpperCase()}</span></p>
      
          <p> Age: <span>{calculateAge(appointment.patient.birthDate)}</span></p>
          </p>
          <p>
          <p>
          Date: { moment(Date.now()).format('DD-MM-YYYY')}
        </p>
        <p>
          Address: {appointment.patient.address}
        </p>
        </p>
        </div>)
           }
            <div className="col-md-6 mb-3">
              <strong>Mother Tongue:</strong> {patientData.motherTongue}
            </div>
           
            <div className="col-md-6 mb-3">
              <strong>Referred By Dr.:</strong> {patientData.refByDr}
            </div>
            <div className="col-md-12 mb-3">
              <strong>Reason for Referral:</strong> {patientData.reasonForReferral}
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

          <h5>Impressions and Suggestions</h5>
          <p>{patientData.impression}</p>
          <p>{patientData.suggestions}</p>

        </div>
      </div>
    </div>
  );
};

export default ViewPDReport;
