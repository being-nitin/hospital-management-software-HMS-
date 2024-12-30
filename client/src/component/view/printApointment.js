import React, {useEffect, useState} from 'react'
import PrintLayout from "../../core/printLayout";
import { useParams, useNavigate } from 'react-router-dom';
import {
	detailsVacApp,
	
} from "../../actions/vaccineAppointmentActions";
import { useDispatch , useSelector } from 'react-redux';
import dayjs from 'dayjs';
const options = [
  { id: 1, label: 'Clinical Notes' },
  { id: 2, label: 'Prescription' },
  { id: 3, label: 'Vital Signs' },
  { id: 4, label: 'Additional Notes' },
];

const PrintAppointments = () => {

  const [clinicalNotes , setClinicalNotes] = useState([])
  const [selectedOptions, setSelectedOptions] = useState(options.map((option) => option.label));


  const { id } = useParams();
  const dispatch = useDispatch();
	const navigate = useNavigate();

 

  const handleCheckboxChange = (label) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(label)
        ? prevSelected.filter((option) => option !== label)
        : [...prevSelected, label]
    );
  };
  const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
	const {
		loading,
		error,
		appointment: { appointment } = {},
	} = vaccineAppList || {};

  useEffect(() => {
		if (userInfo) {
			dispatch(detailsVacApp(id));
	     	
		} else {
			navigate("/signin");
		}
	}, [dispatch, userInfo]);
  
  useEffect(()=>{
    if(appointment &&  appointment.psychodiagnostic){
       setClinicalNotes( [...appointment.psychodiagnostic.chiefComplaints] )
    }
  },[appointment])
  const prescription = () =>{
    return ` <div style="margin: 20px; background-color: #e0f7fa; border-radius: 8px;">
  <div style="display: flex; justify-content: space-between;">
    <div style="border-radius: 8px; width: 45%;">
      <p style="color: grey; font-size: 14px;">
        <span style="color: #0288d1;">Date:</span> ${appointment.date}
      </p>
      <p style="color: grey; font-size: 14px;">
        <span style="color: #0288d1;">Doctor:</span> ${appointment.doctor.name}
      </p>
     
    </div>
    <div style="border-radius: 8px; width: 45%;">
      <p style="color: grey; font-size: 14px;">
        <span style="color: #0288d1;">Patient Name:</span> ${appointment.patient.firstName} ${appointment.patient.lastName}
      </p>
      <p style="color: grey; font-size: 14px;">
        <span style="color: #0288d1;">Patient ID:</span> ${appointment.patient.patientNumber}
      </p>
     
    </div>
  </div>
 ${selectedOptions.includes('Vital Signs') ? `
  <div>
  <h3 style="color: #424242; font-size: 22px; font-weight: bold; margin-bottom: 10px;">Vital Signs</h3>
  <table style="width: 100%; border-collapse: collapse; background-color: #f9f9f9; color: #616161; margin-bottom: 20px;">
    <thead>
      <tr>
        <th style="border: 1px solid #ddd; ">Weight (kg)</th>
        <th style="border: 1px solid #ddd; ">B.P. (mmHg)</th>
        <th style="border: 1px solid #ddd; ">Pulse (Heartbeats/min)</th>
        <th style="border: 1px solid #ddd; ">Temperature (°C)</th>
        <th style="border: 1px solid #ddd; ">Resp. Rate (breaths/min)</th>
      </tr>
    </thead>
    <tbody>
    ${appointment && appointment.vitalSigns && (`
      <tr style="background-color: #fafafa;">
        <td style="border: 1px solid #ddd;">${appointment.vitalSigns.weight}</td>
        <td style="border: 1px solid #ddd;">${appointment.vitalSigns.bp}</td>
        <td style="border: 1px solid #ddd;">${appointment.vitalSigns.pulse}</td>
        <td style="border: 1px solid #ddd;">${appointment.vitalSigns.temperature}</td>
        <td style="border: 1px solid #ddd;">${appointment.vitalSigns.respRate}</td>
      </tr>
      `) }
 
    </tbody>
  </table>
  </div>`
 : ''}

    ${selectedOptions.includes('Clinical Notes') ? `
  <h4 style="color: #424242; font-size: 20px; font-weight: bold; margin-bottom: 10px;">Clinical Notes:</h4>
  <ul style="color: #616161; font-size: 14px; line-height: 1.6; list-style-type: disc; padding-left: 20px;">
    ${clinicalNotes && clinicalNotes.map(note => `
      <li>
        <strong>Complaint:</strong> ${note.complaint} <br />
        <strong>Duration:</strong> ${note.duration}
      </li>
    `).join('')}
  </ul>` : ''}
 ${selectedOptions.includes('Prescription') ? `
  <div>
  <h4 style="color: #424242; font-size: 20px; font-weight: bold; margin-bottom: 10px;">Prescriptions:</h4>
  <table style="width: 100%; border-collapse: collapse; color: #616161; margin-bottom: 20px;">
    <thead>
      <tr>
        <th style="border: 1px solid #ddd; ">S.No</th>
        <th style="border: 1px solid #ddd; ">Drug</th>
        <th style="border: 1px solid #ddd; ">Dosage</th>
        <th style="border: 1px solid #ddd; ">Duration</th>
        <th style="border: 1px solid #ddd; ">Instructions</th>
      </tr>
    </thead>
    <tbody>
      ${appointment && appointment.prescription && appointment.prescription.map((pres, index) => `
        <tr key=${index} style="background-color: #fafafa;">
          <td style="border: 1px solid #ddd;">${index + 1}</td>
          <td style="border: 1px solid #ddd;">${pres.drug}</td>
          <td style="border: 1px solid #ddd;">${pres.dosage}</td>
          <td style="border: 1px solid #ddd;">${pres.durationNumber + " " + pres.durationUnit}</td>
          <td style="border: 1px solid #ddd;">${pres.instruction  }</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  </div>
  `: ' ' }


   ${selectedOptions.includes('Additional Notes') ? `
  <h4 style="color: #424242; font-size: 20px; font-weight: bold; margin-bottom: 10px;">Additional Notes:</h4>
  <p style="color: #616161; font-size: 14px; line-height: 1.6;">
    The patient is advised to rest for 5 days and report back for a follow-up checkup.
  </p>` : ''}
</div>

`
}
  return (
    <main style = {{ display : 'flex' , justifyContent : 'space-around' , alignContent : 'center'}}>
    <div>
    <div style={{ backgroundColor : 'white' , position : 'absolute' , width : '100%' , top : 0 , right : '10'}} >
    <PrintLayout html={prescription} category={'prescription'}></PrintLayout>
    </div>
    <div style={{ margin: '70px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ borderRadius: '8px', width: '45%' }}>
          <p style={{ color: 'grey', fontSize: '14px' }}>
            <span style={{ color: '#0288d1' }}>Date:</span>     {dayjs(
                                  appointment?.date?.toLocaleString()
                                ).format("YYYY-MM-DD")}
          </p>
          <p style={{ color: 'grey', fontSize: '14px' }}>
            <span style={{ color: '#0288d1' }}>Doctor:</span> 	{appointment?.doctor?.name}
          </p>
        </div>
        <div style={{ borderRadius: '8px', width: '45%' }}>
          <p style={{ color: 'grey', fontSize: '14px' }}>
            <span style={{ color: '#0288d1' }}>Patient Name:</span> {appointment?.patient?.firstName +
									" " +
									appointment?.patient?.lastName}
          </p>
          <p style={{ color: 'grey', fontSize: '14px' }}>
            <span style={{ color: '#0288d1' }}>Patient ID:</span> 	{appointment?.patient?.patientNumber}
          </p>
   
        </div>
      </div>

      <h3 style={{ color: '#424242', fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Vital Signs</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse',  color: '#616161', marginBottom: '40px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', backgroundColor: '#e0e0e0' }}>Weight (kg)</th>
            <th style={{ border: '1px solid #ddd', backgroundColor: '#e0e0e0' }}>B.P. (mmHg)</th>
            <th style={{ border: '1px solid #ddd', backgroundColor: '#e0e0e0' }}>Pulse (Heartbeats/min)</th>
            <th style={{ border: '1px solid #ddd', backgroundColor: '#e0e0e0' }}>Temperature (°C)</th>
            <th style={{ border: '1px solid #ddd', backgroundColor: '#e0e0e0' }}>Resp. Rate (breaths/min)</th>
          </tr>
        </thead>
        <tbody>
         
         {appointment && appointment.vitalSigns &&
            <tr style={{ backgroundColor: '#fafafa' }}>
              <td style={{ border: '1px solid #ddd' }}>{appointment.vitalSigns.weight}</td>
              <td style={{ border: '1px solid #ddd' }}>{appointment.vitalSigns.bp}</td>
              <td style={{ border: '1px solid #ddd' }}>{appointment.vitalSigns.pulse}</td>
              <td style={{ border: '1px solid #ddd' }}>{appointment.vitalSigns.temperature}</td>
              <td style={{ border: '1px solid #ddd' }}>{appointment.vitalSigns.respRate}</td>
            </tr>
}
       
        </tbody>
      </table>

      <h4 style={{ color: '#424242', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Prescriptions:</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#f9f9f9', color: '#616161', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', backgroundColor: '#e0e0e0' }}>S.No</th>
            <th style={{ border: '1px solid #ddd', backgroundColor: '#e0e0e0' }}>Drug</th>
            <th style={{ border: '1px solid #ddd', backgroundColor: '#e0e0e0' }}>Dosage</th>
            <th style={{ border: '1px solid #ddd', backgroundColor: '#e0e0e0' }}>Duration</th>
            <th style={{ border: '1px solid #ddd', backgroundColor: '#e0e0e0' }}>Instructions</th>
          </tr>
        </thead>
        <tbody>
          {appointment && appointment.prescription && appointment.prescription.map((pres, index) => (
            <tr key={index} style={{ backgroundColor: '#fafafa' }}>
              <td style={{ border: '1px solid #ddd' }}>{index}</td>
              <td style={{ border: '1px solid #ddd' }}>{pres.drug}</td>
              <td style={{ border: '1px solid #ddd' }}>{pres.dosage}</td>
              <td style={{ border: '1px solid #ddd' }}>{pres.durationNumber + " " + pres.durationUnit}</td>
              <td style={{ border: '1px solid #ddd' }}>{pres.instruction}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 style={{ color: '#424242', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Clinical Notes:</h4>
      <ul style={{ color: '#616161', fontSize: '14px', lineHeight: '1.6', listStyleType: 'disc', paddingLeft: '20px' }}>
        {clinicalNotes.map((note, index) => (
          <li key={index}>
            <strong>Complaint:</strong> {note.complaint} <br />
            <strong>Duration:</strong> {note.duration}
          </li>
        ))}
      </ul>
      <h4 style={{ color: '#424242', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Additional Notes:</h4>
      <p style={{ color: '#616161', fontSize: '14px', lineHeight: '1.6' }}>
        The patient is advised to rest for 5 days and report back for a follow-up checkup.
      </p>
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
    </main>
  )
}

export default PrintAppointments