import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsVacApp } from "../actions/vaccineAppointmentActions";
import PrintDetails from './PrintDetails';
import PrintLayout from '../core/printLayout';
// import { psychodiagnostic } from '../utils/printformat';
import PatientDetails from './patientHistory';
import moment from 'moment';
import Layout from '../core/Layout';

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

  

  let psychodiagnostic = () => {

  return `
  <div style= "padding : 16px;">
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
<h4 style = "page-break-before: always; margin-top : 400px;">Premorbid Personality</h4>
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

<h4>Motor Behaviour</h4>
<div>
  <p > ${patientData && patientData.behaviouralInfo && patientData.behaviouralInfo?.motorBehaviour && patientData.behaviouralInfo?.motorBehaviour?.psychomotorActivity || 'NAD'} ,${patientData.behaviouralInfo && patientData.behaviouralInfo.motorBehaviour.disturbances.join(", ") || 'NAD'}</p>
</div>

<h4>Speech</h4>
<div>
  ${patientData && patientData.behaviouralInfo && Object.entries(patientData.behaviouralInfo.speech).map(([key, value], index) => `
    <span >
      ${value},
    </span>
  `).join('')}
</div>

<h4 style = "page-break-before: always;margin-top : 400px;">Memory</h4>
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
    <div style="margin-bottom: 10px; font-size: 14px;">
      ${category.replace(/([A-Z])/g, ' $1').toUpperCase()}
        ${options.length ? options.map(option => `
          <span>${option},</span>
        `).join('') : 'NAD'}
      
    </div>
  `).join('')}` :""}
   ${selectedOptions.includes("cognitive thinking") ? `
    <h4 >Level of Consciousness</h4>
<div>
  <p >${patientData && patientData.behaviouralInfo && patientData.behaviouralInfo.levelOfConsciousness.mediate}</p>
</div>
<h4  >Orientation</h4>
<div>
  ${patientData && patientData.behaviouralInfo && Object.entries(patientData.behaviouralInfo.orientation).map(([key, value], index) => `
    <div style="display: inline-block; width: 48%; margin-bottom: 15px;">
      ${value || 'NAD'},
    </div>
  `).join('')}
</div>
     <h5> Attention and concentration : <span style="font-weight:300;">${patientData.behaviouralInfo.levelOfConsciousness?.attention && patientData.behaviouralInfo.levelOfConsciousness?.attention} </span></h6>
          
          <h5>Memory</h5>
          <p>
            ${patientData.behaviouralInfo.memory &&
              Object.values(patientData.behaviouralInfo.memory).join(", ") || "NAD"}
          </p>

          <h5>Intelligences</h5>
          ${patientData.behaviouralInfo.intelligences &&
              Object.values(patientData.behaviouralInfo.intelligences).join(", ") || "NAD"}
          <h5>Judgement</h5>
          ${patientData.behaviouralInfo.judgement &&
              Object.values(patientData.behaviouralInfo.judgement).join(", ") || "NAD"}

              ` : ''}
    <p style="font-weight : 700;">Interpretations</p>
     <div style ="margin-bottom : 5px;"> Based on the history observation scale, patient was found to have : ${patientData.interpretations}</div>
<div>
   <b>Sugession:</b> <p>${patientData && patientData.suggestions && patientData.suggestions.map((suggestion, index)=> `${index +1} ${suggestion}</br><br/>`)}</p>
</div>
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
    <Layout>
    <div className="container mt-4">
      { !patientData ? <><p>Please fill the psychodiagnostic form</p><button onClick={() => navigate(-1)}>Back</button></> : <>
     <PrintLayout html ={psychodiagnostic} category={'forms'}></PrintLayout>
     <div style={{ display : "flex" , justifyContent : "space-between" , alignContent : "flex-start"}} >
     <div className="card">
  <div className="card-body">
    <h4 className="card-title mb-4">Patient Information</h4>

    <div className="patient-info-section" style={{ borderRadius: "8px", margin: "20px" }}>
      {appointment && appointment.patient && (
        <div className="patient-basic-info d-flex justify-content-between align-items-center">
          <div>
            <p>
              <strong>Name:</strong>{" "}
              <span>
                {`${appointment.patient.firstName.toUpperCase()} ${appointment.patient.lastName.toUpperCase()}`}
              </span>
            </p>
            <p>
              <strong>Age:</strong> <span>{calculateAge(appointment.patient.birthDate)}</span>
            </p>
          </div>
          <div>
            <p><strong>Date:</strong> {moment(Date.now()).format("DD-MM-YYYY")}</p>
          </div>
        </div>
      )}

      {/* Patient Details */}
      <div className="row" style ={{ marginBottom : '10px'}}>
  <div className="col-lg-4 col-md-6"><strong>Referred By Dr.:</strong> {patientData.refByDr}</div>
  <div className="col-lg-4 col-md-6"><strong>Reason for Referral:</strong> {patientData.reasonForReferral}</div>
  
  <div className="col-lg-4 col-md-6"><strong>Marital Status:</strong> {patientData.maritalStatus}</div>
  <div className="col-lg-4 col-md-6"><strong>Education:</strong> {patientData.Education}</div>
  <div className="col-lg-4 col-md-6"><strong>Address:</strong> {patientData.address}</div>
</div>

      {/* Chief Complaints */}
      <h5>Chief Complaints</h5>
      <table className="chief-complaints-table table table-bordered">
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
      <h5>Medical Details</h5>
      <p>
        {patientData.precipitation || "NAD"} Precipitation,{" "}
        {patientData.onset || "NAD"} Onset, {patientData.course || "NAD"} Course,
        {patientData.progression || "NAD"} Progression
      </p>

      {/* Background Information */}
      {selectedOptions.includes("personal history") && (
        <>
          <h4>Background Information</h4>
          <h5>Personal History</h5>
          <div>
            {patientData.backgroundInfo && patientData.backgroundInfo.personalHistory &&
              Object.entries(patientData.backgroundInfo.personalHistory).map(([key, value], index) => (
                <span key={index} className="d-block mb-2">{value}</span>
              ))}
          </div>
        </>
      )}

      {selectedOptions.includes("premorbid personality") && (
        <>
          <h5>Premorbid Personality</h5>
          <div>
            {patientData.backgroundInfo && patientData.backgroundInfo.premorbidPersonality &&
              Object.entries(patientData.backgroundInfo.premorbidPersonality).map(([category, questions], index) => (
                <div key={index} className="mb-3">
                  <p className="fw-bold mb-1">{category.replace(/([A-Z])/g, " $1").toUpperCase()}</p>
                  {questions.map((q, idx) => (
                    <span key={idx} className="d-block">{q.answer}</span>
                  ))}
                </div>
              ))}
          </div>
        </>
      )}

      {selectedOptions.includes("behavioural info") && (
        <>
          <h5>Behavioral Information</h5>
          <h6>General Appearance and Behavior</h6>
          <p>
            {patientData.behaviouralInfo && patientData.behaviouralInfo.generalAppearanceAndBehaviour &&
              Object.values(patientData.behaviouralInfo.generalAppearanceAndBehaviour).join(", ") || "NAD"}
          </p>

          <h6>Motor Behaviour</h6>
          <p>
            {patientData.behaviouralInfo && patientData.behaviouralInfo.motorBehaviour?.psychomotorActivity || "NAD"},{" "}
            {patientData.behaviouralInfo && patientData.behaviouralInfo.motorBehaviour?.disturbances.join(", ") || "NAD"}
          </p>

    

          <h6>Speech</h6>
          <p>
            {patientData.behaviouralInfo && patientData.behaviouralInfo.speech &&
              Object.values(patientData.behaviouralInfo.speech).join(", ") || "NAD"}
          </p>


          <h6>Thought</h6>
          <p>
            {patientData.behaviouralInfo && patientData.behaviouralInfo.thought &&
              Object.entries(patientData.behaviouralInfo.thought).map(([category, options]) => (
                <span key={category}>{category}: {options.join(", ") || "NAD"} </span>
              ))}
          </p>
        </>
      )}

      {selectedOptions.includes("cognitive thinking") && (
        <>
        <h4>cognitive thinking</h4>

        <h5>Level of Consciousness</h5>
        <p>{patientData.behaviouralInfo && patientData.behaviouralInfo.levelOfConsciousness?.mediate || "NAD"}</p>
        <h5>Orientation</h5>
          <p>
            {patientData.behaviouralInfo && patientData.behaviouralInfo.orientation &&
              Object.values(patientData.behaviouralInfo.orientation).join(", ") || "NAD"}
          </p>
          <h6> Attention and concentration : {patientData && patientData.behaviouralInfo & patientData.behaviouralInfo?.levelOfConsciousness && patientData.behaviouralInfo.levelOfConsciousness?.attention && patientData.behaviouralInfo.levelOfConsciousness?.attention} </h6>
          
          <h5>Memory</h5>
          <p>
            {patientData.behaviouralInfo && patientData.behaviouralInfo.memory &&
              Object.values(patientData.behaviouralInfo.memory).join(", ") || "NAD"}
          </p>

          <h5>Intelligences</h5>
          { patientData.behaviouralInfo && patientData.behaviouralInfo.intelligences &&
              Object.values(patientData.behaviouralInfo.intelligences).join(", ") || "NAD"}
          <h5>Judgement</h5>
          {patientData.behaviouralInfo && patientData.behaviouralInfo.judgement &&
              Object.values(patientData.behaviouralInfo.judgement).join(", ") || "NAD"}
          </>
          
      )}

      

      <h5>Interpretations</h5>
      <p>Based on the history observation scale, patient was found to have : {patientData.interpretations || "N/A"}</p>

      <h5>Suggestions</h5>
      <ul>
        {patientData.suggestions &&
          patientData.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
      </ul>
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
        </>
}
        </div>
</Layout>
  );
};

export default ViewPDReport;
