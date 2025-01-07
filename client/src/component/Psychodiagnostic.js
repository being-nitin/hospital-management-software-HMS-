import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dropdown, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  detailsVacApp,
  updateVacApp,
} from "../actions/vaccineAppointmentActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const suggestionsList = [
  "Psychoeducation",
  "CBT",
  "DBT",
  "MET IRPT",
  "BI CBT",
  "ERP",
  "RMT RPPT",
  "Social Skill Training",
  "Family Therapy",
  "IPSRP",
  "Pharmacotherapy Relaxation",
  "Mindfulness",
  "Pharmacotherapy"
];




const Psychodiagnostic = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    motherTongue: "",
    date: "",
    address: "",
    refByDr: "",
    reasonForReferral: "",
    chiefComplaints: [],
    precipitation: "",
    onset: "",
    course: "",
    progression: "",
    backgroundInfo:  {
      personalHistory: {
        birth: "Nil Contribution",
        developmentalHistory: "Nil Contribution",
        childhoodHistory: "Nil Contribution",
        educationalHistory: "Nil Contribution",
        occupationalHistory: "Nil Contribution",
        sexualHistory: "Nil Contribution",
        menstrualHistory: "Nil Contribution",
        maritalHistory: "Nil Contribution",
      },
      premorbidPersonality: {
        self: [
          { question: "How does the patient describe himself or herself?", answer: "Nil Contribution" },
          { question: "What are their strengths and ability to plan ahead?", answer: "Nil Contribution" },
          { question: "What is their resilience in the face of adversity?", answer: "Nil Contribution" },
          { question: "What are their hopes and ambitions?", answer: "Nil Contribution" }
        ],
        relations: [
          { question: "Does he/she prefer company or solitude?", answer: "Nil Contribution" },
          { question: "Is he/she shy or makes friends easily?", answer: "Nil Contribution" },
          { question: "Are the relationships close or lasting?", answer: "Nil Contribution" },
          { question: "How does he/she handle others' mistakes?", answer: "Nil Contribution" }
        ],
        workAndLeisure: [
          { question: "Relation with workmates or superiors, hobbies, or interests?", answer: "Nil Contribution" },
          { question: "What is their mood like?", answer: "Nil Contribution" },
          { question: "How changeable is it?", answer: "Nil Contribution" },
          { question: "Can he/she express feelings of love, anger, frustration, or sadness?", answer: "Nil Contribution" }
        ],
        character: [
          { question: "Is he/she reserved, timid, self-conscious, resentful, or jealous?", answer: "Nil Contribution" },
          { question: "Is he/she irritable, selfish, or self-centered?", answer: "Nil Contribution" }
        ],
        attitudesAndStandards: [
          { question: "Attitudes to health and illness as well as religious and moral standards.", answer: "Nil Contribution" }
        ],
        habits: [
          { question: "Use of tobacco, alcohol, or drugs?", answer: "Nil Contribution" },
          { question: "Comment on food and sleep patterns.", answer: "Nil Contribution" }
        ]
      }
    },
    behaviouralInfo: {
      generalAppearanceAndBehaviour: {
        "Physical Appearance": "",
        "Estimate Of Age": "",
        "Body Built": "",
        "Touch With Surroundings": "",
        "Eye Contact": "",
        "Dress": "",
        "Facial Expression": "",
        "Posture": "",
        "Attitude Towards Examiner": "",
      },
      orientation : {
        time: "",
        place: "",
        person: "",
        senseOfPassageOfTime: "",
      },
      motorBehaviour: {
        psychomotorActivity: "", // To store a single selected option
        disturbances: [], // To store multiple selected options
      },
      levelOfConsciousness: {
        mediate: "", // Stores the selected option
      },
      speech: {
        intensity: "",
        reactionTime: "",
        speed: "",
        ease: "",
        relevance: "",
        coherant: "",
        goalDirected: "",
        deviation: "",
      },
      memory: {
        immediate: "",
        recent: "",
        remote: "",
      },
      intelligences: {
        fundOfInformation: "",
        calculations: "",
        abstractReasoning: "",
      },
      judgement: {
        social: "",
        personal: "",
        test: "",
      },
      thought: {
        stream: [],  
        form: [],  
        possession: [], 
        content: [],  
      },
      
    },
    mood : "",
    additionalInfo1: "",
    additionalInfo2: "",
    toolsUsed: "",
    interpretations: "",
    impression: "",
    suggestions: [],
  });
  const [existingData, setExistingData] = useState(null);
  const [toolsOptions, setToolOptions] = useState([])
  
  
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  // Handle input change for text and number fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle dropdown change for onset, course, and progression
  const handleDropdownChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Handle adding chief complaints with duration
  const addChiefComplaint = () => {
    setFormData((prevData) => ({
      ...prevData,
      chiefComplaints: [
        ...prevData.chiefComplaints,
        { complaint: "", duration: "week" }, // Default duration
      ],
    }));
  };

  const handleThoughtChange = (key, option, checked) => {
    setFormData((prevData) => {
      const updatedThought = { ...prevData.behaviouralInfo.thought };
      if (checked) {
        updatedThought[key] = [...updatedThought[key], option]; // Add selected option
      } else {
        updatedThought[key] = updatedThought[key].filter((item) => item !== option); // Remove unselected option
      }
  
      return {
        ...prevData,
        behaviouralInfo: {
          ...prevData.behaviouralInfo,
          thought: updatedThought,
        },
      };
    });
  };
  

  const handleSugestion = (event) => {
    const { name, value, type, checked } = event.target;
  
    setFormData((prevFormData) => {
      // Handle checkbox for arrays like chiefComplaints or disturbances
      if (type === "checkbox") {
        if (checked) {
          // Add the suggestion to the array if checked
          return {
            ...prevFormData,
            [name]: [...prevFormData[name], value],
          };
        } else {

          return {
            ...prevFormData,
            [name]: prevFormData[name].filter((item) => item !== value),
          };
        }
      }

      return {
        ...prevFormData,
        [name]: value, // Update text input value
      };
    });
  }
  const moveComplaint = (fromIndex, toIndex) => {
    const updatedComplaints = [...formData.chiefComplaints];
    const [movedComplaint] = updatedComplaints.splice(fromIndex, 1);
    updatedComplaints.splice(toIndex, 0, movedComplaint);
    setFormData({ ...formData, chiefComplaints: updatedComplaints });
  };



  const handleBehaviouralDropdown = (category, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      behaviouralInfo: {
        ...prevState.behaviouralInfo,
        [category]: {
          ...prevState.behaviouralInfo[category],
          [field]: value,
        },
      },
    }));
  };
  // Handle change for each chief complaint and duration
  const handleChiefComplaintChange = (index, field, value) => {
    const updatedComplaints = formData.chiefComplaints.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prevData) => ({
      ...prevData,
      chiefComplaints: updatedComplaints,
    }));
  };
  

  const handleBehaviouralObservation = (
    category,
    subCategory,
    subSubCategory
  ) => {
    setFormData((prevData) => {
      const updatedBehaviourInformation = [...prevData.behaviouralInfo];
      updatedBehaviourInformation.push({
        category,
        subCategory,
        subSubCategory,
      });
      return {
        ...prevData,
        behaviouralInfo: updatedBehaviourInformation,
      };
    });
  };

  const handleAdditionalInfoChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      additionalInfo1: e.target.value,
    }));
  };
  const handleAdditionalInfoChange2 = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      additionalInfo2: e.target.value,
    }));
  };

  const handleDisturbancesChange = (value) => {
    setFormData((prevData) => {
      const isAlreadySelected = prevData.behaviouralInfo.motorBehaviour.disturbances.includes(value);
      const updatedDisturbances = isAlreadySelected
        ? prevData.behaviouralInfo.motorBehaviour.disturbances.filter((item) => item !== value)
        : [...prevData.behaviouralInfo.motorBehaviour.disturbances, value];
  
      return {
        ...prevData,
        behaviouralInfo: {
          ...prevData.behaviouralInfo,
          motorBehaviour: {
            ...prevData.behaviouralInfo.motorBehaviour,
            disturbances: updatedDisturbances,
          },
        },
      };
    });
  };

  

  const handlePsychomotorActivityChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      behaviouralInfo: {
        ...prevData.behaviouralInfo,
        motorBehaviour: {
          ...prevData.behaviouralInfo.motorBehaviour,
          psychomotorActivity: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateVacApp({ _id: appointment?._id, psychodiagnostic: formData })
    );
    dispatch(detailsVacApp(id));
    alert("form is submittted")
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
  const {
    loading,
    error,
    appointment: { appointment, pastAppointments } = {},
  } = vaccineAppList || {};

  useEffect(() => {
    if (userInfo) {
      dispatch(detailsVacApp(id));
    } else {
      navigate("/signin");
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    setExistingData(
      appointment?.psychodiagnostic ? appointment?.psychodiagnostic : null
    );
    setToolOptions([{tool: "HAM-A" , score : appointment?.hamA ? appointment.hamA.score : null},
      {tool : "HAM-D", score : appointment?.hamD ? appointment.hamD.score : null},
      {tool : "YMRS", score : appointment?.ymrs ? appointment.ymrs.score : null},
      {tool : "CDRS", score : appointment?.cdrs ? appointment.cdrs.score : null},
      {tool : "PANSS", score : appointment?.panss ? appointment.panss .score : null}]);

  }, [appointment]);

  useEffect(() => {
    if (existingData) {
      setFormData({ ...formData , ...existingData });
    }
  }, [existingData]);

  const deleteChiefComplaint = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      chiefComplaints: prevData.chiefComplaints.filter((_, i) => i !== index),
    }));
  };

  const handleBackgroundInfoChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      backgroundInfo: {
        ...prevData.backgroundInfo,
        [section]: {
          ...prevData.backgroundInfo[section],
          [field]: value,
        }
      }
    }));
  };


  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.index === source.index) return;

    const updatedComplaints = [...formData.chiefComplaints];
    const [movedComplaint] = updatedComplaints.splice(source.index, 1);
    updatedComplaints.splice(destination.index, 0, movedComplaint);

    setFormData({ ...formData, chiefComplaints: updatedComplaints });
  };
  
  const handleBehavouralInfoChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      behaviouralInfo: {
        ...prevData.behaviouralInfo,
        [section]: {
          ...prevData.behaviouralInfo[section],
          [field]: value,
        }
      }
    }));
  };

  const handlePremorbidChange = (section, index, value) => {
    setFormData((prevData) => {
      const updatedSelf = [...prevData.backgroundInfo.premorbidPersonality[section]];
      updatedSelf[index].answer = value;
      return {
        ...prevData,
        backgroundInfo: {
          ...prevData.backgroundInfo,
          premorbidPersonality: {
            ...prevData.backgroundInfo.premorbidPersonality,
            [section]: updatedSelf
          }
        }
      };
    });
  };

  const calculateAge = (date) => {
    
      const birthMoment = moment(date);
      const today = moment();
  
      return today.diff(birthMoment, 'years'); // Calculate the difference in years
    };

  return (
    <>
    <div style={{ position : 'fixed' , top : 0 , backgroundColor : 'white' , width : '100%' , display : 'flex' , justifyContent : 'space-between' , alignItems :'center' }}>
    <button style={styles.viewButton} onClick={()=> navigate(`/psychodiagnosticreport/${appointment?._id}`)} >View </button>
   </div>
                  
   
    <form style={styles.form} onSubmit={handleSubmit} >
      <h3 style={styles.formHeader}>Psychodiagnostic Report</h3>
      { appointment && appointment.patient && (
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
        </div>)}
       <label style={styles.labels}>
          Mother Tongue:
          <input
            type="text"
            name="motherTongue"
            value={formData.motherTongue}
            onChange={handleChange}
            style={styles.input}
          />
        </label>

        

      

        <label style={styles.labels}>
          Refer By Doctor:
          <input
            type="text"
            name="refByDr"
            value={formData.refByDr}
            onChange={handleChange}
            style={styles.input}
          />
        </label>

        <label style={styles.labels}>
          Reason For Referral:
          <input
            type="text"
            name="reasonForReferral"
            value={formData.reasonForReferral}
            onChange={handleChange}
            style={styles.input}
          />
        </label>

        <div>
      <h4>Chief Complaints</h4>
      <DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="complaints">
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        style={styles.droppableArea}
      >
        {formData.chiefComplaints.map((complaint, index) => {
          // Split the duration into value and unit
          const [value, unit] = complaint.duration
            ? complaint.duration.split(" ")
            : ["", "days"];

          return (
            <Draggable
              key={index}
              draggableId={`complaint-${index}`}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...styles.chiefComplaintGroup,
                    ...provided.draggableProps.style,
                  }}
                >
                  <input
                    type="text"
                    value={complaint.complaint}
                    onChange={(e) =>
                      handleChiefComplaintChange(index, "complaint", e.target.value)
                    }
                    placeholder="Chief Complaint"
                    style={styles.input}
                  />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleChiefComplaintChange(
                          index,
                          "duration",
                          `${e.target.value} ${unit}`
                        )
                      }
                      placeholder="Number"
                      style={styles.inputNumber}
                    />
                    <select
                      value={unit}
                      onChange={(e) =>
                        handleChiefComplaintChange(
                          index,
                          "duration",
                          `${value} ${e.target.value}`
                        )
                      }
                      style={styles.select}
                    >
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteChiefComplaint(index)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              )}
            </Draggable>
          );
        })}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>

      <button
        type="button"
        onClick={addChiefComplaint}
        style={styles.addButton}
      >
        Add Complaint
      </button>
    </div>

        <label style={styles.labels}>
          Precipitation:
          <input
            type="text"
            name="precipitation"
            value={formData.precipitation}
            onChange={handleChange}
            style={styles.input}
          />
        </label>

        <label style={styles.labels}>
          Onset:
          <select
            name="onset"
            value={formData.onset}
            onChange={(e) => handleDropdownChange("onset", e.target.value)}
            style={styles.select}
          >
            <option value="">Select Onset</option>
            <option value="acute">Acute</option>
            <option value="subacute">Subacute</option>
            <option value="abrupt">Abrupt</option>
            <option value="insidious">Insidious</option>
          </select>
        </label>

        <label style={styles.labels}>
          Course:
          <select
            name="course"
            value={formData.course}
            onChange={(e) => handleDropdownChange("course", e.target.value)}
            style={styles.select}
          >
            <option value="">Select Course</option>
            <option value="continuous">Continuous</option>
            <option value="fluctuating">Fluctuating</option>
            <option value="episodic">Episodic</option>
          </select>
        </label>

        <label style={styles.labels}>
          Progression:
          <select
            name="progression"
            value={formData.progression}
            onChange={(e) =>
              handleDropdownChange("progression", e.target.value)
            }
            style={styles.select}
          >
            <option value="">Select Progression</option>
            <option value="deteriorating">Deteriorating</option>
            <option value="constant">Constant</option>
            <option value="improving">Improving</option>
          </select>
        </label>

        <h4>Personal History</h4>
      {Object.keys(formData.backgroundInfo.personalHistory).map((key) => (
        <label key={key} style={styles.labels}>
          {key.replace(/([A-Z])/g, ' $1').toUpperCase()}:
          <input
            type="text"
            name={key}
            value={formData.backgroundInfo.personalHistory[key]}
            onChange={(e) =>
              handleBackgroundInfoChange('personalHistory', key, e.target.value)
            }
            style={styles.input}
          />
        </label>
      ))}

      {/* Premorbid Personality Inputs */}
      <h4>Premorbid Personality</h4>
      {Object.keys(formData.backgroundInfo.premorbidPersonality).map((section) => (
        <div key={section}>
          <h5>{section.replace(/([A-Z])/g, ' $1').toUpperCase()}</h5>
          {formData.backgroundInfo.premorbidPersonality[section].map((item, index) => (
            <div key={index} style={styles.premorbidSection}>
              <label style={styles.labels}>{item.question}</label>
              <input
                type="text"
                value={item.answer}
                onChange={(e) =>
                  handlePremorbidChange(section, index, e.target.value)
                }
                style={styles.input}
              />
            </div>
          ))}
        </div>
      ))}


 <fieldset style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
  <legend>Behavioural Info</legend>
        <div className="mb-4">General Appearance and Behaviour</div>
        {Object.entries({
  "Physical Appearance" :
  [
    "Patient is Kempt",
    "Patient is Overly Made-Up",
    "Patient is Unkempt and Untidy",
    "Patient appears Sickly",
    "Patient is Perplexed"
  ],
  "Estimate Of Age": ["Patent seems Appropriate of age", "Patient Seems Younger", "Patient Seems Older"],
  "Body Built": [
    "Lean  Built",
    "Average  Built",
    "Muscular  Built ",
    "Obese Built"
  ],
  "Touch With Surroundings": ["Touch With Surroundings", "Not Touch With Surroundings"],
  "Eye Contact": ["Eye Contact is Maintained", "Eye Contact is Partial", "Eye Contact is Shifting Gaze", "Eye Contact is Absent"],
  "Dress": ["Dress is Appropriate", "Dress is Inappropriate"],
  "Facial Expression": ["Facial Expression Appropriate", "Facial Expression shows Anger", "Facial Expression shows Disgust", "Facial Expression shows Frown"],
  "Posture":[
    "Normal Posture",
    "Relaxed Posture",
    "Stiff Posture",
    "Slouched Posture",
    "Upright Posture",
    "Odd Posture",
    "Stooped Posture",
    "Tense Posture",
      "Mannerism ",
    "flexibility"
  ],
  "Attitude Towards Examiner": [
    "Patient is Cooperative",
    "Patient is Defensive",
    "Patient is Exhibitionistic",
    "Patient is Seductive",
    "Patient is Hostile",
    "Patient is Playful",
    "Patient is Evasive",
    "Patient is Guarded",
    "Patient is Ingratiating",
    "Patient is Uncooperative",
    "Patient is Suspicious",

  ]
},
        ).map(([field, options]) => (
          <div key={field} style={{ marginBottom: "1rem" }}>
            <label>
              {field}
              <select
                value={formData.behaviouralInfo.generalAppearanceAndBehaviour[field]}
                onChange={(e) =>
                  handleBehaviouralDropdown("generalAppearanceAndBehaviour", field, e.target.value)
                }
                style={{ marginLeft: "1rem" }}
              >
                <option value="">Select...</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
       <div className="my-4">Orientation</div>
{Object.entries({
     time: ["oriented towards time", "partially oriented toward time", "disoriented towards time"],
     place: ["oriented towards place", "partially oriented toward place", "disoriented towards place"],
     person: ["oriented towards person", "partially oriented toward person", "disoriented towards person"],
     senseOfPassageOfTime: ["oriented has sense of passage of time", "partially oriented has sense of passage of time", "disoriented has sense of passage of time"],     
    }).map(([field, fieldOptions]) => (
          <div key={field} style={{ marginBottom: "1rem" }}>
            <label>
              {field.replace(/([A-Z])/g, " $1")} {/* Adds spaces before capital letters */}
              <select
                value={formData.behaviouralInfo.orientation[field]}
                onChange={(e) =>
                  handleBehaviouralDropdown("orientation", field, e.target.value)
                }
                style={{ marginLeft: "1rem" }}
                required
              >
                <option value="">Select...</option>
                {fieldOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
         </div>
))}

<div style={styles.categorySection}>
  <h5>Psychomotor Activity</h5>
  {["Normal Psychomotor Activity", "Agitated Psychomotor Activity", "Retarded Psychomotor Activity", "Increased Psychomotor Activity", "Decrease Psychomotor Activity"].map((option, index) => (
    <div key={index} style={styles.radioContainer}>
      <input
        type="radio"
        id={`psychomotor-${option}`}
        name="psychomotorActivity"
        value={option}
        checked={formData.behaviouralInfo.motorBehaviour.psychomotorActivity === option}
        onChange={(e) => handlePsychomotorActivityChange(e.target.value)}
        style={styles.radio}
      />
      <label htmlFor={`psychomotor-${option}`} style={styles.labels}>{option}</label>
    </div>
  ))}
</div>

{/* Disturbances */}
<div style={styles.categorySection}>
  <h5>Disturbances</h5>
  {[
    "Tics Disturbances",
    "Mannerisms Disturbances",
    "Stereotypes Disturbances",
    "Restlessness Disturbances",
    "Twitches Disturbances",
    "Echopraxia Disturbances",
    "Wavy Flexibility Disturbances",
    "Silly Smiling Disturbances",
    "Preseveration Disturbances",
    "Stupor Disturbances",
    "grimaces Disturbances"
  ].map((option, index) => (
    <div key={index} style={styles.checkboxContainer}>
      <input
        type="checkbox"
        id={`disturbance-${option}`}
        value={option}
        checked={formData.behaviouralInfo.motorBehaviour.disturbances.includes(option)}
        onChange={(e) => handleDisturbancesChange(e.target.value)}
        style={styles.checkbox}
      />
      <label htmlFor={`disturbance-${option}`} style={styles.labels}>{option}</label>
    </div>
  ))}
</div>

<h4>Level of Consciousness</h4>
<div style={styles.categorySection}>
  <h5>Mediate</h5>
  <select
    value={formData.behaviouralInfo.levelOfConsciousness.mediate}
    onChange={(e) => handleBehavouralInfoChange("levelOfConsciousness", "mediate", e.target.value)}
    style={styles.dropdown}
  >
    <option value="">Select...</option>
    {[
      "Alert Mediate",
      "Lethargic/Somnolent Mediate",
      "Obtundation Mediate",
      "Stupor/Semi Coma Mediate",
      "Coma Mediate",
    ].map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
</div>

{/* Speech Section */}
<h4>Speech</h4>
{[
  {
    label: "Intensity",
    options: ["Audible speech intensity", "Loud speech intensity", "Soft speech intensity" , "InAudible speech intensity"],
    key: "intensity",
  },
  {
    label: "Reaction Time",
    options: ["Normal Reaction Time", "Shortened Reaction Time", "Delayed Reaction Time"],
    key: "reactionTime",
  },
  { 
    label: "Speed",
    options: ["Normal speed", "Very Slow speed", "Rapid speed", "Pressure Of Speech speed"],
    key: "speed",
  },
  {
    label: "Ease",
    options: [
      "Spontaneous",
      "Hesitant",
      "Mute",
      "Slurring",
      "Sluttering",
      "Whispering",
      "Muttering",
      "Speaks Only When Questioned",
    ],
    key: "ease",
  },
  {
    label: "Relevance",
    options: ["Relevant", "Irrelevant"],
    key: "relevance",
  },
  {
    label: "Coherant",
    options: ["Coherant", "Incoherant"],
    key: "coherant",
  },
  {
    label: "Goal Directed",
    options: ["Goal-Directed", "Circumstantial", "Tangential"],
    key: "goalDirected",
  },
  {
    label: "Deviation",
    options: [
      "Rhyming",
      "Talking Past The Point",
      "Clang Associations",
      "Stereotype",
      "Preseveration",
      "NAD"
    ],
    key: "deviation",
  },
].map((item, index) => (
  <div key={index} style={styles.dropdownContainer}>
    <label style={styles.labels}>{item.label}</label>
    <select
      value={formData.behaviouralInfo.speech[item.key]}
      onChange={(e) => handleBehaviouralDropdown("speech" ,item.key, e.target.value)}
      style={styles.dropdown}
    >
      <option value="">Select...</option>
      {item.options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
))}

<h4>Memory</h4>
{[
  {
    label: "Immediate",
    options: ["Impaired Immediate Memory", "Partial Immediate Memory", "Intact Immediate Memory"],
    key: "immediate",
  },
  {
    label: "Recent",
    options: ["Impaired Recent Memory", "Partial Recent Memory", "Intact Recent Memory"],
    key: "recent",
  },
  {
    label: "Remote",
    options: ["Impaired Remote Memory", "Partial Remote Memory", "Intact Remote Memory"],
    key: "remote",
  },
].map((item, index) => (
  <div key={index} style={styles.dropdownContainer}>
    <label style={styles.labels}>{item.label}</label>
    <select
      value={formData.behaviouralInfo.memory[item.key]}
      onChange={(e) => handleBehaviouralDropdown("memory" ,item.key, e.target.value)}
      style={styles.dropdown}
    >
      <option value="">Select...</option>
      {item.options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
))}
{/* Intelligences Section */}
<h4>Intelligences</h4>
{[
  {
    label: "Fund Of Information",
    options: ["Above Average", "Average", "Below Average"],
    key: "fundOfInformation",
  },
  {
    label: "Calculations",
    options: ["appropriate", "impaired"],
    key: "calculations",
  },
  {
    label: "Abstract Reasoning",
    options: ["impaired" , "intact"],
    key: "abstractReasoning",
  },
].map((item, index) => (
  <div key={index} style={styles.dropdownContainer}>
    <label style={styles.labels}>{item.label}</label>
    <select
      value={formData.behaviouralInfo.intelligences[item.key]}
      onChange={(e) => handleBehaviouralDropdown("intelligences" ,item.key, e.target.value)}
      style={styles.dropdown}
    >
      <option value="">Select...</option>
      {item.options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
))}

<label style={styles.label}>
    Mood:
    <select
      name="mood"
      style={styles.dropdown}
      value={formData.mood || ""}
      onChange={handleChange}
    >
      <option value="">Select a mood</option>
      {[
  "Anxious",
  "Depressed",
  "Dysthymic",
  "Sad",
  "Dysphoric",
  "Euthymic",
  "Irritable",
  "Cheerful",
  "Euphoric",
  "Elated",
  "Nil Contributor"
].map((mood, index) => (
        <option key={index} value={mood}>
          {mood}
        </option>
      ))}
    </select>
  </label>

{/* Judgement Section */}
<h4>Judgement</h4>
{[
  {
    label: "Social",
    key: "social",
  },
  {
    label: "Personal",
    key: "personal",
  },
  {
    label: "Test",
    key: "test",
  },
].map((item, index) => (
  <div key={index} style={styles.dropdownContainer}>
    <label style={styles.labels}>{item.label}</label>
    <select
      value={formData.behaviouralInfo.judgement[item.key]}
      onChange={(e) => handleBehaviouralDropdown("judgement" ,item.key, e.target.value)}
      style={styles.dropdown}
    >
      <option value="">Select...</option>
      <option value="Impaired">Impaired</option>
      <option value="Intact">Intact</option>
    </select>
  </div>
))}

{/* Thought Section */}
<h4>Thought</h4>
{[
  {
    label: "Stream",
    options: ["Flight Of Ideas", "Prolixity", "Retardation", "Preseveration" , "Nil Contributor"],
    key: "stream",
  },
  {
    label: "Form",
    options: [
      "Loosening Of Associations",
      "Illogical Thinking",
      "Derailment",
      "Desultory",
      "Drivelling",
      "Neologism",
      "Word-Salad",
      "Overinclusion",
      "Condensation",
      "Circumstantiality",
      "Tangentiality",
      "Poverty Of Thought",
      "Nil Contributor"
    ],
    key: "form",
  },
  {
    label: "Possession",
    options: [
      "Obsession",
      "Thought Broadcasting",
      "Thought Insertion",
      "Thought Withdrawal",
      "Nil Contributor"
    ],
    key: "possession",
  },
  {
    label: "Content",
    options: [
      "Preoccupations ",
      "Phobias/Obsessions",
      "Depressive Thoughts",
      "Delusions",
      "Perceptual Disturbances (Illusions, Hallucination)",
      "Nil Contributor"
    ],
    key: "content",
  },
].map((item, index) => (
  <div key={index} style={styles.dropdownContainer}>
    <label style={styles.labels}>{item.label}</label>
    {item.options.map((option, idx) => (
      <div key={idx} style={styles.checkboxContainer}>
        <input
          type="checkbox"
          value={option}
          checked={formData.behaviouralInfo.thought[item.key].includes(option)}
          onChange={(e) => handleThoughtChange(item.key, option, e.target.checked)}
          style={styles.checkbox}
        />
        <label>{option}</label>
      </div>
    ))}

  </div>
))}



      </fieldset>
  

        <label style={styles.label}>
          Tools Used: {" "}
          <select
											style={styles.dropdown} // Replace with appropriate styles
											onChange={(e) => {
												if (
													e.target.value === "HAM-A"
												) {
													navigate(
														`/HamiltonForm/${appointment._id}`
													);
												}
												if (
													e.target.value === "HAM-D"
												) {
													navigate(
														`/hamd/${appointment._id}`
													);
												}
												if (e.target.value === "CDRS") {
													navigate(
														`/cdrs/${appointment._id}`
													);
												}
												if (e.target.value === "YMRS") {
													navigate(
														`/YMRS/${appointment._id}`
													);
												}
												if (
													e.target.value === "YBOCS"
												) {
													navigate(
														`/ybocs/${appointment._id}`
													);
												}
												if (
													e.target.value === "PANSS"
												) {
													navigate(
														`/panss/${appointment._id}`
													);
												}
											}}>
											<option value="" disabled selected>
												Select Form
											</option>
											<option value="HAM-A">
												Hamilton Anxiety Rating Scale
												(HAM-A)
											</option>
											<option value="HAM-D">
												Hamilton Depession Rating Scale
												(HAM-D)
											</option>
											<option value="CDRS">
												Children's Depression Rating
												Scale (CDRS)
											</option>
											<option value="YBOCS">
												YALE-BROWN OBSESSIVE COMPULSIVE
												SCALE(YBOCS)
											</option>
											<option value="YMRS">
												Young Mania Rating Scale(YMRS)
											</option>
											<option value="PANSS">
												POSITIVE AND NEGATIVE SYNDROME
												SCALE(PANSS)
											</option>
										</select>
            {toolsOptions.map((tool, index) => (
              <div key={index} value={tool}>
                {tool.tool}  Score : { tool.score}
              </div>
            ))}
        
        </label>

        <label style={styles.label}>
          Interpretations: 

          <p>Based on the history observation scale, patient was found to have :</p>
          <textarea
            name="interpretations"
            style={styles.textarea}
            rows="5"
            value={`${formData.interpretations}`}
            onChange={handleChange}
          ></textarea>
        </label>

       

        <label style={styles.label}>
  Suggestions:
  <div style={styles.checkboxContainer}>
    {suggestionsList.map((suggestion, index) => (
      <div key={index} style={styles.checkboxWrapper}>
        <input
          type="checkbox"
          name="suggestions"
          value={suggestion}
          checked={formData.suggestions.  includes(suggestion)}
          onChange={handleSugestion}
        />
        <label style={{ marginLeft : "10px"}}> {index}. {suggestion}</label>
      </div>
    ))}
  </div>
</label>

        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
    </>
  );
};

const styles = {
  form: {
    display: "grid",
    gap: "20px", // Increased gap for better spacing
    maxWidth: "1000px",
    margin: "100px auto",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
  },
  optionContainer: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    fontSize: "12px",
    color: "#333",
    paddingLeft: "5px",
  },
  dropdown: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  subOptionContainer: {
    paddingLeft: "20px", // Indent sub-options
    marginBottom: "10px",
  },
  subLabel: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#555",
    paddingLeft: "10px",
  },
  formHeader: {
    fontSize: "22px", // Slightly larger font size
    fontWeight: "bold",
    marginBottom: "15px",
    textAlign: "center",
  },
  label: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "5px",
    color: "#333",
  },
  labels: {
    fontSize: "17px",
    fontWeight: "600",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "vertical",
  },
  dropdownContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingLeft: "10px", // Indent for subcategories
  },
  subDropdownContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    paddingLeft: "20px", // Further indent for sub-subcategories
  },
  dropdownLabel: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#444",
  },
  dropdown: {
    marginTop: "5px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "15px",
    cursor: "pointer",
    backgroundColor: "#fff",
  },
  addButton: {
    padding: "8px 16px",
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  viewButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    margin: "20px",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 12px",
    backgroundColor: "#dc3545", // Red color for delete button
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",

  },
};
export default Psychodiagnostic;
