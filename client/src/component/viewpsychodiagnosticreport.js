import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsVacApp } from "../actions/vaccineAppointmentActions";
import PrintDetails from './PrintDetails';
import PrintLayout from '../core/printLayout';
// import { psychodiagnostic } from '../utils/printformat';
import PatientDetails from './patientHistory';
import moment from 'moment';

const options = [
  { id: 1, label: 'personal history' },
  { id: 2, label: 'premorbid personality' },
  { id: 3, label: 'behavioural info' },
  { id: 4, label: 'cognitive thinking' },
];

const ViewPDReport = () => {
  const [patientData, setPatientData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
  const { loading, error, appointment : {appointment} = {} } = vaccineAppList || {};
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState(options.map((option) => option.label));

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
  <div className="border-radius: 8px; margin: 20px;">
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
${selectedOptions.includes('personal history') ? `
<h4>Personal History</h4>
<div>
  ${patientData && patientData.backgroundInfo && Object.entries(patientData.backgroundInfo.personalHistory).map(([key, value], index) => `
   
     <span style = "margin-bottom : 5px;"> ${value} </span>
  
  `).join(',')}
</div>`: ''}
${selectedOptions.includes('premorbid personality') ?`
<h4 style = "page-break-before: always;">Premorbid Personality</h4>
<div>
  ${patientData && patientData.backgroundInfo && Object.entries(patientData.backgroundInfo.premorbidPersonality).map(([category, questions], index) => `
    <div>
      <p style="margin-bottom: 5px; font-weight: bold;">${category.replace(/([A-Z])/g, ' $1').toUpperCase()}</p>
      ${questions.map((q, idx) => `
        <span style="margin-bottom: 5px;"> ${q.answer }</span>
      `).join(',')}
    </div>
  `).join('')}
</div>`: ''}
${selectedOptions.includes('behavioural info') ?`
<h4 >Behavioral Information</h4>
<h4>General Appearance and Behavior</h4>
<div>
  ${patientData && patientData.behaviouralInfo && Object.entries(patientData.behaviouralInfo.generalAppearanceAndBehaviour).map(([key, value], index) => `
    <div style="display: inline-block">
      ${value || 'NAD'} ,
    </div>
  `).join('')}
</div>
<h4  >Orientation</h4>
<div>
  ${patientData && patientData.behaviouralInfo && Object.entries(patientData.behaviouralInfo.orientation).map(([key, value], index) => `
    <div style="display: inline-block; width: 48%; margin-bottom: 15px;">
      ${value || 'NAD'},
    </div>
  `).join('')}
</div>
<h4>Motor Behaviour</h4>
<div>
  <p > ${patientData && patientData.behaviouralInfo && patientData.behaviouralInfo?.motorBehaviour && patientData.behaviouralInfo?.motorBehaviour?.psychomotorActivity || 'NAD'} ,${patientData.behaviouralInfo && patientData.behaviouralInfo.motorBehaviour.disturbances.join(", ") || 'NAD'}</p>
</div>

<h4 >Level of Consciousness</h4>
<div>
  <p >${patientData && patientData.behaviouralInfo && patientData.behaviouralInfo.levelOfConsciousness.mediate}</p>
</div>

<h4>Speech</h4>
<div>
  ${patientData && patientData.behaviouralInfo && Object.entries(patientData.behaviouralInfo.speech).map(([key, value], index) => `
    <span >
      ${value},
    </span>
  `).join('')}
</div>

<h4 style = "page-break-before: always;">Memory</h4>
<div>
  ${patientData && patientData.behaviouralInfo && Object.entries(patientData.behaviouralInfo.memory).map(([key, value], index) => `
    <span style="margin-right: 10px;">
     ${value},
    </span>
  `).join('')}
</div>

<h4  >Thought</h4>
<div>
  ${patientData && patientData.behaviouralInfo && Object.entries(patientData.behaviouralInfo.thought).map(([category, options], index) => `
    <div style="margin-bottom: 10px;">
      ${category.replace(/([A-Z])/g, ' $1').toUpperCase()}
        ${options.length ? options.map(option => `
          <span>${option},</span>
        `).join('') : 'NAD'}
      
    </div>
  `).join('')}` :""}
    <p style="font-weight : 700;">Interpretations</p>
     <div style ="margin-bottom : 5px;"> Based on the history observation scale, patient was found to have : ${patientData.interpretations}</div>
<div>
   <b>Sugession:</b> <p>${patientData && patientData.suggestions && patientData.suggestions.map((suggestion, index)=> `${index +1} ${suggestion}</br><br/>`)}</p>
</div>
</div>
  `
  }

  const handleCheckboxChange = (label) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(label)
        ? prevSelected.filter((option) => option !== label)
        : [...prevSelected, label]
    );
  };

    const calculateAge = (date) => {
      
        const birthMoment = moment  (date);
        const today = moment();
    
        return today.diff(birthMoment, 'years'); // Calculate the difference in years
      };

  return (
    <div className="container mt-4">
     <PrintLayout html ={psychodiagnostic} category={'forms'}></PrintLayout>
     <div style={{ display : "flex" , justifyContent : "space-between" , alignContent : "flex-start"}} >
      <div className="card">
        <div className="card-body" >
          <h4 className="card-title mb-4">Patient Information</h4>

          <div style={{ borderRadius: "8px", margin: "20px" }}>
        {appointment && appointment.patient && (
        <div style={{ display : 'flex' , justifyContent: "space-between" , alignItems : "center"}}>
          <div>
            <p>
              Name:{" "}
              <span>
                {`${appointment.patient.firstName.toUpperCase()} ${appointment.patient.lastName.toUpperCase()}`}
              </span>
            </p>
            <p>
              Age: <span>{calculateAge(appointment.patient.birthDate)}</span>
            </p>
          </div>
          <div>
            <p>Date: {moment(Date.now()).format("DD-MM-YYYY")}</p>
            <p>Address: {appointment.patient.address}</p>
          </div>
        </div>
      )}

      {/* Patient Details */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <div >
          <strong>Referred By Dr.:</strong> {patientData.refByDr}
        </div>
        <div >
          <strong>Reason for Referral:</strong> {patientData.reasonForReferral}
        </div>
        <div style={{ flex: "1 1 100%" }}>
          <strong>Address:</strong> {patientData.address}
        </div>
        <div style={{ flex: "1 1 100%" }}>
          <strong>Marital Status:</strong> {patientData.maritalStatus}
        </div>
        <div style={{ flex: "1 1 100%" }}>
          <strong>Education:</strong> {patientData.Education}
        </div>
      </div>

      {/* Chief Complaints */}
      <h5>Chief Complaints</h5>
      <table className="chief-complaints-table">
        <thead>
          <tr>
            <th>Complaint</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {patientData.chiefComplaints.map((complaint, index) => (
            <tr key={index}>
              <td>{complaint.complaint || ""}</td>
              <td>{complaint.duration || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Medical Details */}
      <h5 style={{ marginBottom: "10px" }}>Medical Details</h5>
      <div>
        {patientData.precipitation || "NAD"} Precipitation,{" "}
        {patientData.onset || "NAD"} Onset, {patientData.course || "NAD"} Course,
        {patientData.progression || "NAD"} Progression
      </div>

      {/* Background Information */}
      {selectedOptions.includes('personal history') && (<>
      <h4 style={{ marginBottom: "10px" }}>Background Information</h4>
      <h4>Personal History</h4>
      <div>
        {patientData.backgroundInfo.personalHistory &&
          Object.entries(patientData.backgroundInfo.personalHistory).map(
            ([key, value], index) => (
              <span key={index} style={{ marginBottom: "5px" }}>
                {value}
              </span>
            )
          )}
      </div>
      </>)}

      {selectedOptions.includes('premorbid personality') && (<>
      <h4>Premorbid Personality</h4>
      <div>
        {patientData.backgroundInfo.premorbidPersonality &&
          Object.entries(patientData.backgroundInfo.premorbidPersonality).map(
            ([category, questions], index) => (
              <div key={index}>
                <p
                  style={{
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {category.replace(/([A-Z])/g, " $1").toUpperCase()}
                </p>
                {questions.map((q, idx) => (
                  <span key={idx} style={{ marginBottom: "5px" }}>
                    {q.answer}
                  </span>
                ))}
              </div>
            )
          )}
      </div>
    </>)}
    
      
        {selectedOptions.includes('behavioural info') && (
          <>
      <h4>Behavioral Information</h4>
      <h4>General Appearance and Behavior</h4>
      <div>
        {patientData.behaviouralInfo.generalAppearanceAndBehaviour &&
          Object.entries(
            patientData.behaviouralInfo.generalAppearanceAndBehaviour
          ).map(([key, value], index) => (
            <div key={index} style={{ display: "inline-block" }}>
              {value || "NAD"},
            </div>
          ))}
      </div>

      <h4>Orientation</h4>
      <div>
        {patientData.behaviouralInfo.orientation &&
          Object.entries(patientData.behaviouralInfo.orientation).map(
            ([key, value], index) => (
              <div
                key={index}
                style={{
                  display: "inline-block",
                  width: "48%",
                  marginBottom: "15px",
                }}
              >
                {value || "NAD"},
              </div>
            )
          )}
      </div>

      <h4>Motor Behaviour</h4>
      <div>
        <p>
          {patientData.behaviouralInfo.motorBehaviour?.psychomotorActivity ||
            "NAD"}
          ,{" "}
          {patientData.behaviouralInfo.motorBehaviour?.disturbances.join(", ") ||
            "NAD"}
        </p>
      </div>

      <h4>Level of Consciousness</h4>
      <div>
        <p>
          {patientData.behaviouralInfo.levelOfConsciousness?.mediate || "NAD"}
        </p>
      </div>

      <h4>Speech</h4>
      <div>
        {patientData.behaviouralInfo.speech &&
          Object.entries(patientData.behaviouralInfo.speech).map(
            ([key, value], index) => (
              <span key={index}>
                {value},
              </span>
            )
          )}
      </div>

      <h4 style={{ pageBreakBefore: "always" }}>Memory</h4>
      <div>
        {patientData.behaviouralInfo.memory &&
          Object.entries(patientData.behaviouralInfo.memory).map(
            ([key, value], index) => (
              <span key={index} style={{ marginRight: "10px" }}>
                {value},
              </span>
            )
          )}
      </div>

      <h4>Thought</h4>
      <div>
        {patientData.behaviouralInfo.thought &&
          Object.entries(patientData.behaviouralInfo.thought).map(
            ([category, options], index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                {category.replace(/([A-Z])/g, " $1").toUpperCase()} : 
                {options.length
                  ? options.map((option, i) => (
                      <span key={i}>{option},</span>
                    ))
                  : "NAD"}
              </div>
            )
          )} 
          </div>
          
          </>)}
        <p style={{ fontWeight: "700" }}>Interpretations</p>
        <div style={{ marginBottom: "5px" }}>
          Based on the history observation scale, patient was found to have:{" "}
          {patientData.interpretations}
        </div>
        
          <b>Suggestions:</b>
          {patientData.suggestions &&
            patientData.suggestions.map((suggestion, index) => (
              <p key={index}>
                {index + 1}. {suggestion}
              </p>
            ))}
            </div>
        </div>
      </div>
    
        
        
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3 style={{ color: '#0288d1' }}>Select Sections:</h3>
      {options.map((option) => (
        <div key={option.id} style={{ marginBottom: '10px' }}>
          <input
            type="checkbox"
            id={`checkbox-${option.id}`}
            value={option.label}
            checked={selectedOptions.includes(option.label)}
            onChange={() => handleCheckboxChange(option.label)}
          />
          <label
            htmlFor={`checkbox-${option.id}`}
            style={{ marginLeft: '8px', color: '#424242', fontSize: '14px' }}
          >
            {option.label}
          </label>
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        <h4 style={{ color: '#424242' }}>Selected Options:</h4>
        {selectedOptions.length > 0 ? (
          <ul style={{ color: '#616161', fontSize: '14px' }}>
            {selectedOptions.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#616161', fontSize: '14px' }}>No options selected.</p>
        )}
      </div>
    </div>
        </div>
        </div>

  );
};

export default ViewPDReport;
