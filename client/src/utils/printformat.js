export const prescription = () =>{
    return ` <div class="prescription" style="background-color: #e0f7fa;  border-radius: 8px; margin: 20px;">
    <div class="flex" style="display: flex; justify-content: space-between;">
        <div class="app" style="border-radius: 8px; width: 45%;">
                              
            <p style="color: grey; font-size: 14px;"><span style="color: #0288d1;">Date:</span> 2024-10-31</p>
            <p style="color: grey; font-size: 14px;"><span style="color: #0288d1;">Doctor:</span> Dr. John Doe</p>
            <p style="color: grey; font-size: 14px;"><span style="color: #0288d1;">Appointment ID:</span> 789456</p>
        </div>
        <div class="pat" style=" border-radius: 8px; width: 45%;">
            <p style="color: grey; font-size: 14px;"><span style="color: #0288d1;">Patient Name:</span> Jasmine Roberts32</p>
            <p style="color: grey; font-size: 14px;"><span style="color: #0288d1;">Patient ID:</span> 122333</p>
            <p style="color: grey; font-size: 14px;"><span style="color: #0288d1;">Symptoms:</span> Fever, Chest Pain</p>
        </div>
    </div>
</div>
 <h3 style="color: #424242; font-size: 22px; font-weight: bold; margin-bottom: 10px;">Vital Signs</h3>
<table style="width: 100%; border-collapse: collapse; background-color: #f9f9f9; color: #616161; margin-bottom: 20px;">
  <thead>
    <tr>
      <th style="border: 1px solid #ddd; background-color: #e0e0e0;">Weight (kg)</th>
      <th style="border: 1px solid #ddd; background-color: #e0e0e0;">B.P. (mmHg)</th>
      <th style="border: 1px solid #ddd; background-color: #e0e0e0;">Pulse (Heartbeats/min)</th>
      <th style="border: 1px solid #ddd; background-color: #e0e0e0;">Temperature (°C)</th>
      <th style="border: 1px solid #ddd; background-color: #e0e0e0;">Resp. Rate (breaths/min)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #fafafa;">
      <td style="border: 1px solid #ddd;">12</td>
      <td style="border: 1px solid #ddd;">22</td>
      <td style="border: 1px solid #ddd;">33</td>
      <td style="border: 1px solid #ddd;">32</td>
      <td style="border: 1px solid #ddd;">22</td>
    </tr>
  </tbody>
</table>

<h4 style="color: #424242; font-size: 20px; font-weight: bold; margin-bottom: 10px;">Prescriptions:</h4>
<table style="width: 100%; border-collapse: collapse; background-color: #f9f9f9; color: #616161; margin-bottom: 20px;">
  <thead>
    <tr>
         <th style="border: 1px solid #ddd; background-color: #e0e0e0;">S.No</th>
      <th style="border: 1px solid #ddd; background-color: #e0e0e0;">Drug</th>
      <th style="border: 1px solid #ddd; background-color: #e0e0e0;">Dosage</th>
      <th style="border: 1px solid #ddd; background-color: #e0e0e0;">Duration</th>
      <th style="border: 1px solid #ddd; background-color: #e0e0e0;">Instructions</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #fafafa;">
      <td style="border: 1px solid #ddd;">1</td>
      <td style="border: 1px solid #ddd;">Paracip</td>
      <td style="border: 1px solid #ddd;">1-0-1</td>
      <td style="border: 1px solid #ddd;">12 days</td>
      <td style="border: 1px solid #ddd;">After food</td>
    </tr>
    <tr style="background-color: #fafafa;">
    <td style="border: 1px solid #ddd;">2</td>
      <td style="border: 1px solid #ddd;">Panadol</td>
      <td style="border: 1px solid #ddd;">0-½-½</td>
      <td style="border: 1px solid #ddd;">1 day</td>
      <td style="border: 1px solid #ddd;">Before food</td>
    </tr>
  </tbody>
</table>

<h4 style="color: #424242; font-size: 20px; font-weight: bold; margin-bottom: 10px;">Additional Notes:</h4>
<p style="color: #616161; font-size: 14px; line-height: 1.6;">
  The patient is advised to rest for 5 days and report back for a follow-up checkup.
</p>
`
}

export const psychodiagnostic = () => {
    return `
       <div class="container">
    <!-- Patient Information -->
   <div>
  <div style="background-color: #e7f1ff; border-radius: 8px; padding: 20px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
  <div style="display: flex; flex-wrap: wrap; gap: 20px; color: #333; ">
    <div style="flex: 1;">
      <p style="display:block;">Name: Jasmine Roberts</p> 

      <p>Age:  32</p>
    </div>
    <div style="flex: 1;">
      <p style="display:block;">Mother Tongue: English</p> 
   
      <p>Date: 2024-12-01</p> 
    </div>
   
  </div>
  <div style="color: #333;">
      <p>Address: 123 Main Street, Springfield </p>

      <p>Referred By Dr.: Dr. John Doe</p> 
  
      <p>Reason for Referral: Behavioral changes and anxiety</p> 
    </div>
</div>

        <!-- Chief Complaints -->
     <h5 class="section-title" style="color: #003366; margin-bottom: 20px; font-size : 20px;">Chief Complaints</h5>
<table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd; ">
  <thead>
    <tr style="background-color: #b3e6ff; color: #003366;">
      <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Complaint</th>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Duration</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px;">Frequent headaches</td>
      <td style="border: 1px solid #ddd; padding: 10px;">3 months</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px;">Sleeplessness</td>
      <td style="border: 1px solid #ddd; padding: 10px;">2 weeks</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px;">Anxiety during social interactions</td>
      <td style="border: 1px solid #ddd; padding: 10px;">6 months</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px;">Loss of appetite</td>
      <td style="border: 1px solid #ddd; padding: 10px;">1 month</td>
    </tr>
  </tbody>
</table>

        <hr>

        <!-- Medical Details -->
     <h5 class="section-title" style="color: #003366; margin-bottom: 20px;font-size : 20px;">Medical Details</h5>
<div style=" border: 1px solid #b3e6ff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);margin-bottom : 50px;">
  <div class="row">
    <div class="col-md-6 mb-3" style="margin-bottom: 15px;">
      <strong style="color: #003366;">Precipitation:</strong> Stress at work and home
    </div>
    <div class="col-md-6 mb-3" style="margin-bottom: 15px;">
      <strong style="color: #003366;">Onset:</strong> Gradual
    </div>
    <div class="col-md-6 mb-3" style="margin-bottom: 15px;">
      <strong style="color: #003366;">Course:</strong> Intermittent episodes of symptoms
    </div>
    <div class="col-md-6 mb-3" style="margin-bottom: 15px;">
      <strong style="color: #003366;">Progression:</strong> Worsening over time
    </div>
  </div>
</div>

        <hr>

        <!-- Background Information -->
        <h5 class="section-title" style="color: #003366; margin-bottom: 20px;font-size: 1.5rem;">Background Information</h5>
       <h6 style="color: #003366; margin-bottom: 10px;font-size:20px;">Personal History</h6>
<table style="width: 100%; border-collapse: collapse;  border: 1px solid #b3e6ff;">
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Education</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Bachelor's Degree</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Occupation</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Software Engineer</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Habits</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Smoking (occasional), skipping meals</td>
    </tr>
  </tbody>
</table>

<h6 style="color: #003366; margin-top: 20px; margin-bottom: 5px;font-size:20px;">Premorbid Personality</h6>
<table style="width: 100%; border-collapse: collapse;  border: 1px solid #b3e6ff;">
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Social Interaction</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Introverted</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Coping Mechanisms</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Isolation, avoidance of social events</td>
    </tr>
  </tbody>
</table>

<hr style="margin-top: 20px; border: 0; border-top: 1px solid #b3e6ff;">


        <hr>

        <!-- Behavioral Information -->
      <h5 class="section-title" style="color: #003366; margin-bottom: 20px;font-size:1.5rem;">Behavioral Information</h5>

<h6 style="color: #003366;font-size:20px;">General Appearance and Behavior</h6>
<table style="width: 100%; border-collapse: collapse;  border: 1px solid #b3e6ff;">
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Grooming</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Adequate</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Eye Contact</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Limited</td>
    </tr>
  </tbody>
</table>

<h6 style="color: #003366; margin-top: 20px;font-size:20px;;">Orientation</h6>
<table style="width: 100%; border-collapse: collapse;  border: 1px solid #b3e6ff;">
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Time</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Oriented</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Place</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Oriented</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Person</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Oriented</td>
    </tr>
  </tbody>
</table>

<h6 style="color: #003366; margin-top: 20px;font-size:20px;; ">Motor Behaviour</h6>
<table style="width: 100%; border-collapse: collapse;  border: 1px solid #b3e6ff;margin-bottom : 50px;">
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Psychomotor Activity</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Restlessness noted</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Disturbances</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Mild hand tremors during stressful discussions</td>
    </tr>
  </tbody>
</table>

<h6 style="color: #003366; font-size:20px;">Speech</h6>
<table style="width: 100%; border-collapse: collapse;  border: 1px solid #b3e6ff; ">
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Rate</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Slightly rapid</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Volume</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Low</td>
    </tr>
  </tbody>
</table>

<h6 style="color: #003366; margin-top: 20px;font-size:20px;">Memory</h6>
<table style="width: 100%; border-collapse: collapse;  border: 1px solid #b3e6ff;">
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Short-term</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Intact</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Long-term</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Slight gaps reported in recalling recent events</td>
    </tr>
  </tbody>
</table>

<h6 style="color: #003366; margin-top: 20px;font-size:20px;">Thought</h6>
<table style="width: 100%; border-collapse: collapse;  border: 1px solid #b3e6ff;">
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Form</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Logical but slightly tangential</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Content</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Preoccupation with health concerns and work-related stress</td>
    </tr>
  </tbody>
</table>

<hr style="margin-top: 20px; border: 0; border-top: 1px solid #b3e6ff;">


  <!-- Tools Used -->
 <div class="section" style="margin-bottom: 30px;">
  <!-- Tools Used & Interpretation -->
  <h5 class="section-title" style="color: #003366; margin-bottom: 15px;">Tools Used & Interpretation</h5>
  <table style="width: 100%; border-collapse: collapse;  border: 1px solid #b3e6ff;">
    <tbody>
      <tr>
        <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Tools Used</td>
        <td style="border: 1px solid #ddd; padding: 10px;">HAM-A, HDRS</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Interpretation</td>
        <td style="border: 1px solid #ddd; padding: 10px;">
          On HAM-A, the score was found to be <strong>28</strong>. <br>
          On HDRS, the score was found to be <strong>27</strong>.
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="section" style="margin-bottom: 30px;">
  <!-- Impression -->
  <h5 class="section-title" style="color: #003366; margin-bottom: 15px;">Impression</h5>
  <table style="width: 100%; border-collapse: collapse;  border: 1px solid #b3e6ff;">
    <tbody>
      <tr>
        <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Observation</td>
        <td style="border: 1px solid #ddd; padding: 10px;">
          Based on history, behavioral observations, and test findings, the index patient seems to have:
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Nicotine dependence syndrome</li>
            <li>Moderate anxiety</li>
            <li>Moderate depressive disorder</li>
            <li>Psychosomatic disorder</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="section">
  <!-- Suggestions -->
  <h5 class="section-title" style="color: #003366; margin-bottom: 15px;">Suggestions</h5>
  <table style="width: 100%; border-collapse: collapse;  border: 1px solid #b3e6ff;">
    <tbody>
      <tr>
        <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #003366;">Recommendations</td>
        <td style="border: 1px solid #ddd; padding: 10px;">
          <ol style="margin: 10px 0; padding-left: 20px;">
            <li>Psychoeducation</li>
            <li>Relaxation Training</li>
            <li>M.E.T & CBT</li>
            <li>Pharmacotherapy</li>
          </ol>
        </td>
      </tr>
    </tbody>
  </table>
</div>

    `
}