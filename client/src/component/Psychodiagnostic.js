import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dropdown, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  detailsVacApp,
  updateVacApp,
} from "../actions/vaccineAppointmentActions";
import { useDispatch, useSelector } from "react-redux";

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
    backgroundInfo: {
      personalHistory: {
        birth: "",
        developmentalHistory: "",
        childhoodHistory: "",
        educationalHistory: "",
        occupationalHistory: "",
        sexualHistory: "",
        menstrualHistory: "",
        maritalHistory: "",
      },
      premorbidPersonality: {
        self: [
          {
            question: "How does the patient describe himself or herself?",
            answer: "",
          },
          {
            question: "What are their strengths and ability to plan ahead?",
            answer: "",
          },
          {
            question: "What is their resilience in the face of adversity?",
            answer: "",
          },
          { question: "What are their hopes and ambitions?", answer: "" },
        ],
        relations: [
          { question: "Does he/she prefer company or solitude?", answer: "" },
          { question: "Is he/she shy or makes friends easily?", answer: "" },
          { question: "Are the relationships close or lasting?", answer: "" },
          { question: "How does he/she handle others' mistakes?", answer: "" },
        ],
        workAndLeisure: [
          {
            question:
              "Relation with workmates or superiors, hobbies, or interests?",
            answer: "",
          },
          { question: "What is their mood like?", answer: "" },
          { question: "How changeable is it?", answer: "" },
          {
            question:
              "Can he/she express feelings of love, anger, frustration, or sadness?",
            answer: "",
          },
        ],
        character: [
          {
            question:
              "Is he/she reserved, timid, self-conscious, resentful, or jealous?",
            answer: "",
          },
          {
            question: "Is he/she irritable, selfish, or self-centered?",
            answer: "",
          },
        ],
        attitudesAndStandards: [
          {
            question:
              "Attitudes to health and illness as well as religious and moral standards.",
            answer: "",
          },
        ],
        habits: [
          { question: "Use of tobacco, alcohol, or drugs?", answer: "" },
          { question: "Comment on food and sleep patterns.", answer: "" },
        ],
      },
    },
    behaviouralInfo: {
      generalAppearanceAndBehaviour: {
        "Physical Appearance": "",
        "Estimate Of Age": "",
        "Body Built": "",
        "Touch With Surroundings": "",
        "Eye Contact": "",
        Dress: "",
        "Facial Expression": "",
        Posture: "",
        "Attitude Towards Examiner": "",
      },
      orientation: {
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
    additionalInfo1: "",
    additionalInfo2: "",
    toolsUsed: "",
    interpretations: "",
    impression: "",
    suggestions: "",
  });
  const [existingData, setExistingData] = useState(null);

  const toolsOptions = ["Tool A", "Tool B", "Tool C"];

  const [customEntry, setCustomEntry] = useState("");
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
        updatedThought[key] = updatedThought[key].filter(
          (item) => item !== option
        ); // Remove unselected option
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

  const handleInputChange = (section, questionKey, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: prevData[section].map((item) =>
        questionKey in item ? { [questionKey]: value } : item
      ),
    }));
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
      const isAlreadySelected =
        prevData.behaviouralInfo.motorBehaviour.disturbances.includes(value);
      const updatedDisturbances = isAlreadySelected
        ? prevData.behaviouralInfo.motorBehaviour.disturbances.filter(
            (item) => item !== value
          )
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
      updateVacApp({ _id: appointment._id, psychodiagnostic: formData })
    );
    dispatch(detailsVacApp(id));
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
  }, [appointment]);

  useEffect(() => {
    if (existingData) {
      setFormData({ ...formData, ...existingData });
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
        },
      },
    }));
  };

  const handleBehavouralInfoChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      behaviouralInfo: {
        ...prevData.behaviouralInfo,
        [section]: {
          ...prevData.behaviouralInfo[section],
          [field]: value,
        },
      },
    }));
  };

  const handlePremorbidChange = (section, index, value) => {
    setFormData((prevData) => {
      const updatedSelf = [
        ...prevData.backgroundInfo.premorbidPersonality[section],
      ];
      updatedSelf[index].answer = value;
      return {
        ...prevData,
        backgroundInfo: {
          ...prevData.backgroundInfo,
          premorbidPersonality: {
            ...prevData.backgroundInfo.premorbidPersonality,
            [section]: updatedSelf,
          },
        },
      };
    });
  };

  return (
    <>
      <button
        style={styles.viewButton}
        onClick={() => navigate(`/psychodiagnosticreport/${appointment._id}`)}
      >
        View{" "}
      </button>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h3 style={styles.formHeader}>Psychodiagnostic Report</h3>

        <label style={styles.labels}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
        </label>

        <label style={styles.labels}>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={styles.input}
          />
        </label>

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
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
          />
        </label>

        <label style={styles.labels}>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
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

        <h4>Chief Complaints</h4>
        {formData.chiefComplaints.map((complaint, index) => (
          <div key={index} style={styles.chiefComplaintGroup}>
            <input
              type="text"
              value={complaint.complaint}
              onChange={(e) =>
                handleChiefComplaintChange(index, "complaint", e.target.value)
              }
              placeholder="Chief Complaint"
              style={styles.input}
            />
            <select
              value={complaint.duration}
              onChange={(e) =>
                handleChiefComplaintChange(index, "duration", e.target.value)
              }
              style={styles.select}
            >
              <option value="day">Days</option>
              <option value="week">Weeks</option>
              <option value="month">Months</option>
              <option value="year">Years</option>
            </select>
            <button
              type="button"
              onClick={() => deleteChiefComplaint(index)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addChiefComplaint}
          style={styles.addButton}
        >
          Add Complaint
        </button>

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
            {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
            <input
              type="text"
              name={key}
              value={formData.backgroundInfo.personalHistory[key]}
              onChange={(e) =>
                handleBackgroundInfoChange(
                  "personalHistory",
                  key,
                  e.target.value
                )
              }
              style={styles.input}
            />
          </label>
        ))}

        {/* Premorbid Personality Inputs */}
        <h4>Premorbid Personality</h4>
        {Object.keys(formData.backgroundInfo.premorbidPersonality).map(
          (section) => (
            <div key={section}>
              <h5>{section.replace(/([A-Z])/g, " $1").toUpperCase()}</h5>
              {formData.backgroundInfo.premorbidPersonality[section].map(
                (item, index) => (
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
                )
              )}
            </div>
          )
        )}

        <fieldset
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            margin: "1rem 0",
          }}
        >
          <legend>Behavioural Info</legend>
          <div className="mb-4">General Appearance and Behaviour</div>
          {Object.entries({
            "Physical Appearance": [
              "Kempt",
              "Overly Made Up",
              "Unkempt And Untidy",
              "Sickly",
              "Perplexed",
            ],
            "Estimate Of Age": ["Appropriate", "Seems Younger", "Seems Older"],
            "Body Built": ["Lean", "Average", "Muscular", "Obese"],
            "Touch With Surroundings": ["Present", "Partial", "Absent"],
            "Eye Contact": ["Maintained", "Partial", "Shifting Gaze", "Absent"],
            Dress: ["Appropriate", "Shabby", "Inappropriate"],
            "Facial Expression": ["Anger", "Disgust", "Frown"],
            Posture: [
              "Normal",
              "Relaxed",
              "Stiff",
              "Slouched",
              "Upright",
              "Odd",
              "Stooped",
              "Tense",
            ],
            "Attitude Towards Examiner": [
              "Cooperative",
              "Attentive",
              "Frank",
              "Defensive",
              "Exhibitionistic",
              "Seductive",
              "Hostile",
              "Playful",
              "Evasive",
              "Guarded",
              "Ingratiating",
              "Uncooperative",
              "Suspicious",
            ],
          }).map(([field, options]) => (
            <div key={field} style={{ marginBottom: "1rem" }}>
              <label>
                {field}
                <select
                  value={
                    formData.behaviouralInfo.generalAppearanceAndBehaviour[
                      field
                    ]
                  }
                  onChange={(e) =>
                    handleBehaviouralDropdown(
                      "generalAppearanceAndBehaviour",
                      field,
                      e.target.value
                    )
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
            time: ["Impaired", "Partial", "Intact"],
            place: ["Impaired", "Partial", "Intact"],
            person: ["Impaired", "Partial", "Intact"],
            senseOfPassageOfTime: ["Impaired", "Partial", "Intact"],
          }).map(([field, fieldOptions]) => (
            <div key={field} style={{ marginBottom: "1rem" }}>
              <label>
                {field.replace(/([A-Z])/g, " $1")}{" "}
                {/* Adds spaces before capital letters */}
                <select
                  value={formData.behaviouralInfo.orientation[field]}
                  onChange={(e) =>
                    handleBehaviouralDropdown(
                      "orientation",
                      field,
                      e.target.value
                    )
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
            {["Normal", "Agitated", "Retarded"].map((option, index) => (
              <div key={index} style={styles.radioContainer}>
                <input
                  type="radio"
                  id={`psychomotor-${option}`}
                  name="psychomotorActivity"
                  value={option}
                  checked={
                    formData.behaviouralInfo.motorBehaviour
                      .psychomotorActivity === option
                  }
                  onChange={(e) =>
                    handlePsychomotorActivityChange(e.target.value)
                  }
                  style={styles.radio}
                />
                <label htmlFor={`psychomotor-${option}`} style={styles.labels}>
                  {option}
                </label>
              </div>
            ))}
          </div>

          {/* Disturbances */}
          <div style={styles.categorySection}>
            <h5>Disturbances</h5>
            {[
              "Tics",
              "Mannerisms",
              "Stereotypes",
              "Restlessness",
              "Twitches",
              "Echopraxia",
              "Wavy",
              "Flexibility",
              "Silly Smiling",
              "Preseveration",
              "Stupor",
            ].map((option, index) => (
              <div key={index} style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id={`disturbance-${option}`}
                  value={option}
                  checked={formData.behaviouralInfo.motorBehaviour.disturbances.includes(
                    option
                  )}
                  onChange={(e) => handleDisturbancesChange(e.target.value)}
                  style={styles.checkbox}
                />
                <label htmlFor={`disturbance-${option}`} style={styles.labels}>
                  {option}
                </label>
              </div>
            ))}
          </div>

          <h4>Level of Consciousness</h4>
          <div style={styles.categorySection}>
            <h5>Mediate</h5>
            <select
              value={formData.behaviouralInfo.levelOfConsciousness.mediate}
              onChange={(e) =>
                handleBehavouralInfoChange(
                  "levelOfConsciousness",
                  "mediate",
                  e.target.value
                )
              }
              style={styles.dropdown}
            >
              <option value="">Select...</option>
              {[
                "Alert",
                "Lethargic/Somnolent",
                "Obtundation",
                "Stupor/Semi Coma",
                "Coma",
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
              options: ["Audible", "Loud", "Soft"],
              key: "intensity",
            },
            {
              label: "Reaction Time",
              options: ["Normal", "Shortened", "Delayed"],
              key: "reactionTime",
            },
            {
              label: "Speed",
              options: ["Normal", "Very Slow", "Rapid", "Pressure Of Speech"],
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
              ],
              key: "deviation",
            },
          ].map((item, index) => (
            <div key={index} style={styles.dropdownContainer}>
              <label style={styles.labels}>{item.label}</label>
              <select
                value={formData.behaviouralInfo.speech[item.key]}
                onChange={(e) =>
                  handleBehaviouralDropdown("speech", item.key, e.target.value)
                }
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
              options: ["Impaired", "Partial", "Intact"],
              key: "immediate",
            },
            {
              label: "Recent",
              options: ["Impaired", "Partial", "Intact"],
              key: "recent",
            },
            {
              label: "Remote",
              options: ["Impaired", "Partial", "Intact"],
              key: "remote",
            },
          ].map((item, index) => (
            <div key={index} style={styles.dropdownContainer}>
              <label style={styles.labels}>{item.label}</label>
              <select
                value={formData.behaviouralInfo.memory[item.key]}
                onChange={(e) =>
                  handleBehaviouralDropdown("memory", item.key, e.target.value)
                }
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
              options: ["Simple Verbal", "Complex Verbal", "Money Problems"],
              key: "calculations",
            },
            {
              label: "Abstract Reasoning",
              options: ["Proverbs", "Similarities", "Differences"],
              key: "abstractReasoning",
            },
          ].map((item, index) => (
            <div key={index} style={styles.dropdownContainer}>
              <label style={styles.labels}>{item.label}</label>
              <select
                value={formData.behaviouralInfo.intelligences[item.key]}
                onChange={(e) =>
                  handleBehaviouralDropdown(
                    "intelligences",
                    item.key,
                    e.target.value
                  )
                }
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
                onChange={(e) =>
                  handleBehaviouralDropdown(
                    "judgement",
                    item.key,
                    e.target.value
                  )
                }
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
              options: [
                "Flight Of Ideas",
                "Prolixity",
                "Retardation",
                "Preseveration",
              ],
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
              ],
              key: "possession",
            },
            {
              label: "Content",
              options: [
                "Preoccupations (Religious, Somatic, Philosophical, Sexual)",
                "Phobias/Obsessions",
                "Depressive Thoughts",
                "Delusions",
                "Perceptual Disturbances (Illusions, Hallucination)",
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
                    checked={formData.behaviouralInfo.thought[
                      item.key
                    ].includes(option)}
                    onChange={(e) =>
                      handleThoughtChange(item.key, option, e.target.checked)
                    }
                    style={styles.checkbox}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ))}
        </fieldset>
        {/* <label style={styles.labels}>
          Behavioral Information:
          <div>
            {behavioralOptions.map((option, index) => (
              <div key={index} style={styles.optionContainer}>
                <label style={styles.label}>{option.label}</label>
                <select
                  style={styles.dropdown}
                  onChange={(e) =>
                    handleBehaviouralObservation(
                      option.label,
                      e.target.value,
                      null
                    )
                  }
                >
                  <option value="">Select Subcategory</option>
                  {option.subCategories.map((sub, subIndex) => (
                    <option key={subIndex} value={sub.label}>
                      {sub.label}
                    </option>
                  ))}
                </select>

                {option.subCategories.map((sub, subIndex) => (
                  <div key={subIndex} style={styles.subOptionContainer}>
                    {formData.behaviouralInfo.some(
                      (item) =>
                        item.category === option.label &&
                        item.subCategory === sub.label
                    ) && (
                      <>
                        <label style={styles.subLabel}>{sub.label}</label>
                        <select
                          style={styles.dropdown}
                          onChange={(e) =>
                            handleBehaviouralObservation(
                              option.label,
                              sub.label,
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select Sub-Subcategory</option>
                          {sub.subSubCategories.map((subSub, subSubIndex) => (
                            <option key={subSubIndex} value={subSub}>
                              {subSub}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
            <label style={styles.labels}>Additional Information:</label>
            <textarea
              style={styles.textarea}
              placeholder="Enter any other relevant information here..."
              value={formData.additionalInfo2}
              onChange={handleAdditionalInfoChange2}
            ></textarea>
          </div>
        </label> */}

        <label style={styles.label}>
          Tools Used:
          <select
            name="toolsUsed"
            style={styles.dropdown}
            value={formData.toolsUsed}
            onChange={handleChange}
          >
            <option value="">Select a tool</option>
            {toolsOptions.map((tool, index) => (
              <option key={index} value={tool}>
                {tool}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Interpretations:
          <textarea
            name="interpretations"
            style={styles.textarea}
            rows="5"
            value={formData.interpretations}
            onChange={handleChange}
          ></textarea>
        </label>

        <label style={styles.label}>
          Impression:
          <textarea
            name="impression"
            style={styles.textarea}
            rows="5"
            value={formData.impression}
            onChange={handleChange}
          ></textarea>
        </label>

        <label style={styles.label}>
          Suggestions:
          <textarea
            name="suggestions"
            style={styles.textarea}
            rows="5"
            value={formData.suggestions}
            onChange={handleChange}
          ></textarea>
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
    margin: "0 auto",
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
    backgroundColor: "#0056d2",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#218838",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  viewButton: {
    padding: "10px 20px",
    backgroundColor: "#218838",
    margin: "20px",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 12px",
    backgroundColor: "#c82333", // Red color for delete button
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "10px",
  },
};
export default Psychodiagnostic;
