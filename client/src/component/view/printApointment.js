import React, {useEffect, useState} from 'react'
import PrintLayout from "../../core/printLayout";
import { useParams, useNavigate } from 'react-router-dom';
import {
	detailsVacApp,
	
} from "../../actions/vaccineAppointmentActions";
import moment from 'moment';
import { useDispatch , useSelector } from 'react-redux';
import dayjs from 'dayjs';
const options = [
  { id: 1, label: 'Clinical Notes' },
  { id: 2, label: 'Prescription' },
  { id: 3, label: 'Vital Signs' },
  { id: 4, label: 'Additional Notes' },
  {id : 5 , label : 'billing'}
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
    <span style="color: #0288d1;">Patient Name:</span> ${appointment?.patient?.firstName + " " + appointment?.patient?.lastName}
  </p>
  <p style="color: grey; font-size: 14px;">
    <span style="color: #0288d1;">Mobile No :</span> ${appointment?.patient?.phoneNo}
  </p>
  <p style="color: grey; font-size: 14px;">
    <span style="color: #0288d1;">Address :</span> ${appointment?.patient?.address.toUpperCase()}
  </p>
</div>
<div style="border-radius: 8px; width: 45%;">
  <p style="color: grey; font-size: 14px;">
    <span style="color: #0288d1;">Age/Gender : </span>${getAge(appointment.patient.birthDate) + " / " + appointment.patient.gender}
  </p>
  <p style="color: grey; font-size: 14px;">
    <span style="color: #0288d1;">Patient ID:</span> ${appointment?.patient?.patientNumber}
  </p>
  <p style="color: grey; font-size: 14px;">
    <span style="color: #0288d1;">Date and Time:</span> ${dayjs(appointment?.date?.toLocaleString()).format("DD-MM-YYYY") + "/" + appointment.time}
  </p>
</div>
  </div>
    <p style="color: grey; font-size: 14px;">
    <span style="color: #0288d1;">By:</span>Dr. ${appointment.doctor.name}
  </p>
  <hr/>
 ${selectedOptions.includes('Vital Signs') && `
  <div style = "margin-top : 10px;">
  <h3 style="color: #424242; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Vital Signs</h3>
  <table style="width: 100%; border-collapse: collapse; background-color: #f9f9f9; color: #616161; margin-bottom: 20px;max-width: 900px;">
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
    ${ appointment && appointment.vitalSigns ? (`
      <tr style="background-color: #fafafa;">
        <td style="border: 1px solid #ddd;">${appointment.vitalSigns.weight}</td>
        <td style="border: 1px solid #ddd;">${appointment.vitalSigns.bp}</td>
        <td style="border: 1px solid #ddd;">${appointment.vitalSigns.pulse}</td>
        <td style="border: 1px solid #ddd;">${appointment.vitalSigns.temperature}</td>
        <td style="border: 1px solid #ddd;">${appointment.vitalSigns.respRate}</td>
      </tr>
      `) : ''}
 
    </tbody>
  </table>
  </div>`
}

 ${selectedOptions.includes('Clinical Notes') ? ` 
  <div style= "margin-bottom: 10px;"> 
  <h4 style="font-size: 18px;  ">Clinical Notes:</h4>  

      ${clinicalNotes && clinicalNotes.map((note, index) => 
            `<span key ={index}>
            ${note.complaint.toUpperCase() +" - " + note.duration} ${index !== (clinicalNotes.length -1 ) ? `, ` : ""}
      </span>`
        )} 
</div>
  ` : ''}
 ${selectedOptions.includes('Prescription') ? `
  <div>
  <h4 style="color: #424242; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Prescriptions:</h4>
  <table style="width: 100%; border-collapse: collapse; color: #616161; margin-bottom: 20px; max-width : 900px;">
    <thead>
      <tr>
        <th style="border: 1px solid #ddd; ">S.No</th>
        <th style="border: 1px solid #ddd; ">Drug</th>
        <th style="border: 1px solid #ddd; ">Dosage</th>
        <th style="border: 1px solid #ddd; ">Duration</th>
        <th style="border: 1px solid #ddd; ">Instructions</th>
        <th style="border: 1px solid #ddd; ">Quantity</th>
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
            <td style="border: 1px solid #ddd;">${getQuantity(pres.dosage , pres.durationNumber + " " + pres.durationUnit)  }</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  </div>
  `: ' ' }

 

   ${selectedOptions.includes('Additional Notes') ? `
  <h4 style="color: #424242; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Additional Notes:</h4>
  <p style="color: #616161; font-size: 14px; line-height: 1.6;">
    ${appointment && (appointment.notes !== undefined ? appointment.notes :  '')}
  </p>` : ''}
</div>

 ${selectedOptions.includes('billing') ?`
  <div style = "padding : 24px; page-break-before: always; margin-top : 400px; max-width: 900px;">
       <div style="border-bottom: 1px solid #ccc; padding-bottom: 16px;">
  <h5>Appointment with ${appointment?.doctor.name}</h5>
  <p>${moment(appointment?.created_at).format("Do MMMM, hh:mm A")}</p>
</div>

<div style="margin-top: 24px; ">
  <h4>Invoice</h4>
  <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
    <thead>
      <tr style="background-color: #f9f9f9;">
        <th style="border: 1px solid #ddd; padding: 8px;">Treatment</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Unit</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Cost (₹)</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Discount (%)</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Tax (%)</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Total (₹)</th>
      </tr>
    </thead>
    <tbody>
      ${appointment && appointment?.billing?.treatment
        ?.map(
          (item) => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.unit}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.cost}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.discount}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.tax}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            item.unit * item.cost
          }</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
</div>

<div style="margin-top: 24px; border-top: 1px solid #ccc; padding-top: 16px;">
  <h4>Summary</h4>
  <div style="display: flex; justify-content: space-between;">
    <div>
      <p>Total Cost: ₹${appointment && appointment?.billing?.totalCost}</p>
      <p>Total Discount: ₹${appointment && appointment?.billing?.totalDiscount}</p>
    </div>
    <div>
      <p>Total Tax: ₹${appointment && appointment?.billing?.totalTax}</p>
      <p>Grand Total: ₹${appointment && appointment?.billing?.grandTotal}</p>
    </div>
  </div>
</div>

<div style="margin-top: 24px; border-top: 1px solid #ccc; padding-top: 16px;">
  <h4>Payment</h4>
  <p>Payment Method: ${appointment && appointment?.billing?.paymentMethod}</p>
  <p>Status: ${appointment && appointment?.billing?.paid}</p>
</div>
</div>` : '' }
`
}
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

const getQuantity = (dosageStr, durationStr) =>{
  const dosage = dosageStr.split('-').reduce((sum, part) => sum + (part.includes('½') ? parseFloat(part.replace('½', '.5')) : parseFloat(part)), 0); 
  const match = durationStr.match(/(\d+)\s*(weeks|months|days)/);
  
  if (!match) return 0; // If no match, return 0

  const [_, num, unit] = match; // Destructure match array safely
  const duration = unit === "weeks" ? num * 7 : unit === "months" ? num * 30 : parseInt(num);
  
  return dosage * duration;
}
  return (
    <main style = {{ display : 'flex' , justifyContent : 'space-around' , alignContent : 'center'}}>
    <div>
    <div style={{ backgroundColor : 'white' , position : 'absolute' , width : '100%' , top : 0 , right : '10'}} >
    <PrintLayout html={prescription} category={'prescription'}></PrintLayout>
    </div>
    {appointment && <div style={{ marginTop: '70px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ borderRadius: '8px', width: '45%' }}>
          <p style={{ color: 'grey', fontSize: '14px' }}>
            <span style={{ color: '#0288d1' }}>Patient Name:</span> {appointment?.patient?.firstName +
									" " +
									appointment?.patient?.lastName}
          </p>
          <p style={{ color: 'grey', fontSize: '14px' }}>
            <span style={{ color: '#0288d1' }}>Mobile No :</span> {appointment?.patient?.phoneNo}
          </p>
          <p style={{ color: 'grey', fontSize: '14px' }}>
            <span style={{ color: '#0288d1' }}>Address :</span> {appointment?.patient?.address.toUpperCase()}
          </p>
        </div>
        <div style={{ borderRadius: '8px', width: '45%' }}>
        <p style={{ color: 'grey', fontSize: '14px' }}>
            <span style={{ color: '#0288d1' }}>Age/Gender : </span>{getAge(appointment.patient.birthDate) + " / " +appointment.patient.gender}
          </p>
          <p style={{ color: 'grey', fontSize: '14px' }}>
            <span style={{ color: '#0288d1' }}>Patient ID:</span> 	{appointment?.patient?.patientNumber}
          </p>
          <p style={{ color: 'grey', fontSize: '14px' }}>
            <span style={{ color: '#0288d1' }}>Date and Time:</span>     {dayjs(
                                  appointment?.date?.toLocaleString()
                                ).format("DD-MM-YYYY") + "/" + appointment.time}
          </p>
        
        </div>
       
      </div>
  
      <p style={{ color: 'grey', fontSize: '14px' }}>
            <span style={{ color: '#0288d1' }}>By:</span> 	Dr.{appointment?.doctor?.name}
          </p>
        <hr/>
        {selectedOptions.includes("Vital Signs") && (
  <div>
    <h3
      style={{
        color: "#424242",
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "10px",
      }}
    >
      Vital Signs
    </h3>
    <table
      style={{
        width: "100%",
   
        color: "#616161",
        marginBottom: "20px",
        maxWidth: "800px",
      }}
    >
      <thead>
        <tr>
          <th style={{ border: "1px solid #ddd" ,  padding:'5px',}}>Weight (kg)</th>
          <th style={{ border: "1px solid #ddd" ,  padding:'5px',}}>B.P. (mmHg)</th>
          <th style={{ border: "1px solid #ddd" ,  padding:'5px',}}>Pulse (Heartbeats/min)</th>
          <th style={{ border: "1px solid #ddd" ,  padding:'5px',}}>Temperature (°C)</th>
          <th style={{ border: "1px solid #ddd" ,  padding:'5px',}}>Resp. Rate (breaths/min)</th>
        </tr>
      </thead>
      <tbody>
        {appointment?.vitalSigns && (
          <tr style={{ backgroundColor: "#fafafa" }}>
            <td style={{ border: "1px solid #ddd" }}>
              {appointment.vitalSigns.weight}
            </td>
            <td style={{ border: "1px solid #ddd" }}>
              {appointment.vitalSigns.bp}
            </td>
            <td style={{ border: "1px solid #ddd" }}>
              {appointment.vitalSigns.pulse}
            </td>
            <td style={{ border: "1px solid #ddd" }}>
              {appointment.vitalSigns.temperature}
            </td>
            <td style={{ border: "1px solid #ddd" }}>
              {appointment.vitalSigns.respRate}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)}
<div style ={{marginBottom: '20px' }}>
   <h4 style={{ color: '#424242', fontSize: '20px', fontWeight: 'bold'   }}>Clinical Notes:</h4>
     
        {clinicalNotes.map((note, index) => (
            <span key ={index}>
            {note.complaint.toUpperCase() +" - " + note.duration} {index !== (clinicalNotes.length -1 ) && ", "}
      </span>
        ))}
</div>

      <h4 style={{ color: '#424242', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Prescriptions:</h4>
      <table style={{ width: '100%',  color: '#616161', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={ {border: '1px solid #ddd', padding : '5px'  }}>S.No</th>
            <th style={{ border: '1px solid #ddd', padding : '5px' }}>Drug</th>
            <th style={{ border: '1px solid #ddd', padding : '5px'  }}>Dosage</th>
            <th style={{ border: '1px solid #ddd', padding : '5px'  }}>Duration</th>
            <th style={{ border: '1px solid #ddd', padding : '5px'  }}>Instructions</th>
            <th style={{ border: '1px solid #ddd', padding : '5px'  }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {appointment && appointment.prescription && appointment.prescription.map((pres, index) => (
            <tr key={index} >
              <td style={{ border: '1px solid #ddd', padding : '5px' }}>{index}</td>
              <td style={{ border: '1px solid #ddd', padding : '5px' }}>{pres.drug}</td>
              <td style={{ border: '1px solid #ddd', padding : '5px' }}>{pres.dosage}</td>
              <td style={{ border: '1px solid #ddd', padding : '5px' }}>{pres.durationNumber + " " + pres.durationUnit}</td>
              <td style={{ border: '1px solid #ddd', padding : '5px' }}>{pres.instruction}</td>
              <td style={{ border: '1px solid #ddd', padding : '5px' }}>{getQuantity(pres.dosage , pres.durationNumber + " " + pres.durationUnit)}</td>
            </tr>
          ))}
        </tbody>
      </table>
   

      
    <div
      style={{
        marginTop: "16px",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        width: "100%",
        maxWidth: "800px",
      }}
    >
 

   </div>
      <h4 style={{ color: '#424242', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Additional Notes:</h4>
      <p style={{ color: '#616161', fontSize: '14px', lineHeight: '1.6' }}>
        {appointment && appointment.notes}
      </p>
    </div>}
    {selectedOptions.includes('billing') && (
  <div style={{ padding: '24px', pageBreakBefore: 'always' }}>
    <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '16px' }}>
      <h5>Appointment with {appointment?.doctor.name}</h5>
      <p>{moment(appointment?.date).format('Do MMMM, hh:mm A')}</p>
    </div>

    <div style={{ marginTop: '24px' }}>
      <h4>Invoice</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead>
          <tr style={{ backgroundColor: '#f9f9f9' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Treatment</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Unit</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cost (₹)</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Discount (%)</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tax (%)</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {appointment && appointment?.billing && appointment?.billing?.treatment.map((item) => (
            <tr key={item.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.unit}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.cost}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.discount}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.tax}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {item.unit * item.cost}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={{ marginTop: '24px', borderTop: '1px solid #ccc', paddingTop: '16px' }}>
      <h4>Summary</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p>Total Cost: ₹{appointment && appointment?.billing?.totalCost}</p>
          <p>Total Discount: ₹{appointment && appointment?.billing?.totalDiscount}</p>
        </div>
        <div>
          <p>Total Tax: ₹{appointment && appointment?.billing?.totalTax}</p>
          <p>Grand Total: ₹{appointment && appointment?.billing?.grandTotal}</p>
        </div>
      </div>
    </div>

    <div style={{ marginTop: '24px', borderTop: '1px solid #ccc', paddingTop: '16px' }}>
      <h4>Payment</h4>
      <p>Payment Method: {appointment && appointment?.billing?.paymentMethod}</p>
      <p>Status: {appointment && appointment?.billing?.paid}</p>
    </div>
  </div>
)}
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