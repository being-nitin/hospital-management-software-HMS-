import React, { useRef , useState , useEffect} from "react";
import { Button } from "react-bootstrap";
import "./printStyle.css";
import Header from "../assets/header.PNG";
import Footer from "../assets/footer.PNG";
import Logo from "../assets/logo.PNG"


const PrintLayout = ({ children }) => {
  const printRef = useRef(null);


  const printAction = () => {
  
    const printContent = printRef.current;
    const printWindow = window.open("", "_blank");

    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              position : relative;
            }
            .print-container {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
      
            
            }
            .header, .footer {
              width: 100%;
              text-align: center;
      
            }
            .content {
              flex: 1;
              padding: 20px;
              margin: 0 auto;
              width: 90%;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
              text-align: center;
            }
            .footer {
              position: absolute;
              bottom: 0;
              width: 100%;
            }

            .flex {
             display : flex;
             width: 100%;
             justif-content : space-between;
             alignItems : center;
             gap : 90px;
            }

            .backgroundLogo {
                position : absolute;
               margin-left: auto;

left: 0;
bottom : 30;
text-align: left;
z-index: 0;
width : 16rem;
            }
            
            @media print {
             body {
            background-image: url(${Logo}); /* Inline base64 image for print */
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover; /* Ensure the image scales properly */
          }
              .print-button {
                display: none;
              }
             
              .footer {
                position: fixed;
                bottom: 0;
              }
               
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <img src="${Header}" alt="Header" class="header" />
            <div class="prescription">
            <div class="flex">
            <div class="app">
  <h3>Appointment Details</h3>
  <p><strong>Date:</strong> 2024-10-31</p>
  <p><strong>Doctor:</strong> Dr. John Doe</p>
  <p><strong>Appointment ID:</strong> 789456</p>
  </div>
 <div class="pat">
  <h3>Patient Details</h3>
  <p><strong>Patient Name:</strong> Jasmine Roberts32</p>
  <p><strong>Patient ID:</strong> 122333</p>
  <p><strong>Symptoms:</strong> Fever, Chest Pain</p>
 </div>
 </div>
  <h3>Treatment and Prescription History</h3>
  <table>
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
        <td>12</td>
        <td>22</td>
        <td>33</td>
        <td>32</td>
        <td>22</td>
      </tr>
    </tbody>
  </table>

  <h4>Prescriptions:</h4>
  <table>
    <thead>
      <tr>
        <th>Drug</th>
        <th>Dosage</th>
        <th>Duration</th>
        <th>Instructions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Paracip</td>
        <td>1-0-1</td>
        <td>12 days</td>
        <td>After food</td>
      </tr>
      <tr>
        <td>Panadol</td>
        <td>0-½-½</td>
        <td>1 day</td>
        <td>Before food</td>
      </tr>
    </tbody>
  </table>

  <h4>Additional Notes:</h4>
  <p>
    The patient is advised to rest for 5 days and report back for a follow-up
    checkup.
  </p>
  
</div>
 <img src=${Logo} class="backgroundLogo"></img>
            <div class="content">${printContent.innerHTML}</div>
            <img src="${Footer}" alt="Footer" class="footer" />
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();

    };
  };

  
  
  return (
    <div ref={printRef} >
  
      <div className="print-button d-flex justify-content-end mt-3">
        <Button variant="primary" onClick={printAction}>
          Print
        </Button>
      </div>
    </div>
  );
};

export default PrintLayout;
