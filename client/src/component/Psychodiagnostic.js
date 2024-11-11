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
    backgroundInfo: [],
    behavioralInfo: [],
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

  const backgroundOptions = [
    {
      label: "Personal History",
      subCategories: [
        {
          label: "Birth",
          subSubCategories: ["Prenatal", "Postnatal", "Neonatal"],
        },
        {
          label: "Developmental",
          subSubCategories: [
            "Motor",
            "Speech",
            "Social Development",
            "Cognitive",
            "Adaptive",
          ],
        },
        {
          label: "Childhood",
          subSubCategories: [
            "Peer Relation",
            "Schooling",
            "Play Habits",
            "Habits",
            "Interpersonal",
            "Family Environment",
            "Behavioural Issues",
          ],
        },
        {
          label: "Educational History",
          subSubCategories: [
            "Medium",
            "Performance",
            "Regularity",
            "Rule Breaking",
            "Extra Curricullur",
            "Dropout",
            "Stream Change",
          ],
        },
        {
          label: "Occupational History",
          subSubCategories: [
            "Start",
            "Interest",
            "Workplace Environment",
            "Relations",
            "Chnages in job",
            "Promotion",
            "Incentives",
          ],
        },
        {
          label: "Sexual History",
          subSubCategories: [
            "Puberty",
            "Sex Education",
            "First Experience",
            "Activity",
            "Pornography",
          ],
        },
        {
          label: "Menstrual History",
          subSubCategories: [
            "Regular",
            "Irregular",
            "Menopuase",
            "Medications Pain",
          ],
        },
        {
          label: "Marital History",
          subSubCategories: [
            "Consent",
            "Extramarital affair",
            "No of marriages",
            "miscarriage",
            "unwanted pregnancy",
            "Violence",
            "Harrasment",
            "Emotional/Physical Intimacy",
          ],
        },
      ],
    },
    {
      label: "Premorbid Personality",
      subCategories: [
        {
          label: "Attitude Towards Self",
          subSubCategories: [
            "Punctuality",
            "Self Hygiene",
            "Goal Directed Behaviour",
          ],
        },
        {
          label: "Interpersonal Relationships",
          subSubCategories: ["Within Family", "Outside Family"],
        },
        {
          label: "Liesure Activities, Hobbies",
          subSubCategories: ["Entertainment"],
        },
        {
          label: "Religious Beliefs, Value Systems",
          subSubCategories: ["Flexible", "Rigid"],
        },
        {
          label: "Intellectual Abilities",
          subSubCategories: ["", ""],
        },
        {
          label: "Predominant Mood",
          subSubCategories: ["", ""],
        },
        {
          label: "Attitude Towards Work And Responsibility",
          subSubCategories: ["", ""],
        },
        {
          label: "Fantasy Life",
          subSubCategories: ["", ""],
        },
      ],
    },
    {
      label: "Work Experience",
      subCategories: [
        { label: "Previous Employment", subSubCategories: ["Company", "Role"] },
        {
          label: "Current Position",
          subSubCategories: ["Responsibilities", "Achievements"],
        },
      ],
    },
  ];

  const behavioralOptions = [
    {
      label: "General Appearance And Behaviour",
      subCategories: [
        {
          label: "Physical Appearance",
          subSubCategories: [
            "Kempt",
            "Overly Made Up",
            "Unkempt And Untidy",
            "Sickly",
            "Perplexed",
          ],
        },
        {
          label: "Estimate Of Age",
          subSubCategories: ["Appropriate", "Seems Younger", "Seems Older"],
        },
        {
          label: "Body Built",
          subSubCategories: ["Lean", "Average", "Muscular", "Obese"],
        },
        {
          label: "Estimate Of Age",
          subSubCategories: ["Appropriate", "Seems Younger", "Seems Older"],
        },
        {
          label: "Touch With Surroundings",
          subSubCategories: ["Present", "Partial", "Absent"],
        },
        {
          label: "Eye Contact",
          subSubCategories: [
            "Maintained",
            "Partial",
            "Shifting Gaze",
            "Absent",
          ],
        },
        {
          label: "Dress",
          subSubCategories: ["Appropriate", "Shabby", "Inappropriate"],
        },
        {
          label: "Facial Expression",
          subSubCategories: ["Anger", "Disgust", "Frown"],
        },
        {
          label: "Posture",
          subSubCategories: [
            "Normal",
            "Relaxed",
            "Stiff",
            "Slouched",
            "Upright",
            "Odd",
            "Stooped",
            "Tense",
          ],
        },
        {
          label: "Attitude Towards Examiner",
          subSubCategories: [
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
        },
      ],
    },
    {
      label: "Orientation",
      subCategories: [
        { label: "Time", subSubCategories: ["Impaired", "Partial", "Intact"] },
        {
          label: "Place",
          subSubCategories: ["Impaired", "Partial", "Intact"],
        },
        {
          label: "Person",
          subSubCategories: ["Impaired", "Partial", "Intact"],
        },
        {
          label: "Sense Of Passage Of Time",
          subSubCategories: ["Impaired", "Partial", "Intact"],
        },
      ],
    },
    {
      label: "Motor Behaviour",
      subCategories: [
        {
          label: "Psychomotor Activity",
          subSubCategories: ["Normal", "Agitated", "Retarded"],
        },
        {
          label: "Disturbances",
          subSubCategories: [
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
          ],
        },
      ],
    },
    {
      label: "Mood (Subjective)",
      subCategories: [
        {
          label: "",
          subSubCategories: ["Verbatism"],
        },
      ],
    },
    {
      label: "Mood (Objective)",
      subCategories: [
        {
          label: "Quality",
          subSubCategories: [
            "Normal For Situation",
            "Sadness",
            "Apathy And Lack Of Concern",
            "Constancy vs Fluctuation",
            "Inappropriate Mood",
          ],
        },
        {
          label: "Range Of Expression",
          subSubCategories: ["Normal", "Restricted", "Broad"],
        },
        {
          label: "Intensity",
          subSubCategories: [
            "Normal",
            "Blunted",
            "Flat",
            "Frightened",
            "Dramatic",
          ],
        },
        {
          label: "Appropriateness",
          subSubCategories: ["Congruent", "Incongruent"],
        },
        {
          label: "Reactivity",
          subSubCategories: ["Absent", "Preserved", "Hyperreactive"],
        },
      ],
    },
    {
      label: "Level Of Consciousness",
      subCategories: [
        {
          label: "Mediate",
          subSubCategories: [
            "Alert",
            "Lethargic/Somnolent",
            "Obtundation",
            "Stupor/Semi Coma",
            "Coma",
          ],
        },
      ],
    },
    {
      label: "Attention And Concentration",
      subCategories: [
        {
          label: "Digit Span Test (DF & DB)",
          subSubCategories: [
            "Easily Aroused And Sustained",
            "Difficult To Arouse And Sustain",
            "Easy To Arouse But Not Sustained",
            "Difficult To Arouse But Sustained",
          ],
        },
        {
          label: "Serial Subtraction",
          subSubCategories: [
            "Easily Aroused And Sustained",
            "Difficult To Arouse And Sustain",
            "Easy To Arouse But Not Sustained",
            "Difficult To Arouse But Sustained",
          ],
        },
        {
          label: "Backwards From Friday",
          subSubCategories: [
            "Easily Aroused And Sustained",
            "Difficult To Arouse And Sustain",
            "Easy To Arouse But Not Sustained",
            "Difficult To Arouse But Sustained",
          ],
        },
        {
          label: "Months Backwards",
          subSubCategories: [
            "Easily Aroused And Sustained",
            "Difficult To Arouse And Sustain",
            "Easy To Arouse But Not Sustained",
            "Difficult To Arouse But Sustained",
          ],
        },
      ],
    },
    {
      label: "Speech",
      subCategories: [
        {
          label: "Intensity",
          subSubCategories: ["Audible", "Loud", "Soft"],
        },
        {
          label: "Reaction Time",
          subSubCategories: ["Normal", "Shortened", "Delayed"],
        },
        {
          label: "Speed",
          subSubCategories: [
            "Normal",
            "Very Slow",
            "Rapid",
            "Pressure Of Speech",
          ],
        },
        {
          label: "Ease",
          subSubCategories: [
            "Spontaneous",
            "Hesitant",
            "Mute",
            "Slurring",
            "Sluttering",
            "Whispering",
            "Muttering",
            "Speaks Only When Questioned",
          ],
        },
        {
          label: "Relevance",
          subSubCategories: ["Relevant", "Irrelevant"],
        },
        {
          label: "Coherant",
          subSubCategories: ["Coherant", "Incoherant"],
        },
        {
          label: "Goal Directed",
          subSubCategories: ["Goal-Directed", "Circumstantial", "Tangential"],
        },
        {
          label: "Deviation",
          subSubCategories: [
            "Rhyming",
            "Talking Past The Point",
            "Clang Associations",
            "Stereotype",
            "Preseveration",
          ],
        },
      ],
    },
    {
      label: "Memory",
      subCategories: [
        {
          label: "Immediate",
          subSubCategories: ["Impaired", "Partial", "Intact"],
        },
        {
          label: "Recent",
          subSubCategories: ["Impaired", "Partial", "Intact"],
        },
        {
          label: "Remote",
          subSubCategories: ["Impaired", "Partial", "Intact"],
        },
      ],
    },
    {
      label: "Thaught",
      subCategories: [
        {
          label: "Stream",
          subSubCategories: [
            "Flight Of Ideas",
            "Prolixity",
            "Retardation",
            "Preseverati",
          ],
        },
        {
          label: "Form",
          subSubCategories: [
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
            "Poverty Of Thaught",
          ],
        },
        {
          label: "Possesion",
          subSubCategories: [
            "Obsession",
            "Thought Broadcasting",
            "Thought Insertion",
            "Thought Withdrawal ",
          ],
        },
        {
          label: "Content",
          subSubCategories: [
            "Preoccupations ( Religious, Somatic, Philosophical, Sexual",
            "Phobias/Obsessions",
            "Depressive Thoughts",
            "Delusions",
            "Perceptual Disturbances (Illusions, Hallucination)",
          ],
        },
      ],
    },
    {
      label: "Intelligences",
      subCategories: [
        {
          label: "Fund Of Information",
          subSubCategories: ["Above Average", "Average", "Below Average"],
        },
        {
          label: "Calculations",
          subSubCategories: [
            "Simple99999verbal",
            "Complex Verbal",
            "Money Problems",
          ],
        },
        {
          label: "Abstract Reasoning",
          subSubCategories: ["Proverbs", "Similarities", "Differences"],
        },
      ],
    },
    {
      label: "Judgement",
      subCategories: [
        { label: "Social", subSubCategories: ["", "", ""] },
        {
          label: "Personal",
          subSubCategories: ["", "", ""],
        },
        {
          label: "Test",
          subSubCategories: [
            "Money",
            "House On Fire",
            "Child Drowning",
            "Bribe",
          ],
        },
      ],
    },
    {
      label: "Insight",
      subCategories: [
        { label: "GradeI", subSubCategories: ["Complete Denial"] },
        {
          label: "GradeII",
          subSubCategories: ["Acceptance of Symptoms", "Denial Of Illness"],
        },
        {
          label: "GradeIII",
          subSubCategories: [
            "Attributions to external factors or unknown organic causes",
          ],
        },
        {
          label: "GradeIV",
          subSubCategories: ["Unknown Problem In Body"],
        },
        {
          label: "GradeV",
          subSubCategories: ["Not Applying Knowledge To Future Experiences"],
        },
        {
          label: "GradeVI",
          subSubCategories: ["True Emotional Insight"],
        },
      ],
    },
  ];

  const handleBackgroundSelection = (category, subCategory, subSubCategory) => {
    setFormData((prevData) => {
      const updatedBackground = [...prevData.backgroundInfo];
      updatedBackground.push({
        category,
        subCategory,
        subSubCategory,
      });
      return {
        ...prevData,
        backgroundInfo: updatedBackground,
      };
    });
  };

  const handleBehaviouralObservation = (
    category,
    subCategory,
    subSubCategory
  ) => {
    setFormData((prevData) => {
      const updatedBehaviourInformation = [...prevData.behavioralInfo];
      updatedBehaviourInformation.push({
        category,
        subCategory,
        subSubCategory,
      });
      return {
        ...prevData,
        behavioralInfo: updatedBehaviourInformation,
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
      setFormData({ ...formData , ...existingData });
    }
  }, [existingData]);

  const deleteChiefComplaint = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      chiefComplaints: prevData.chiefComplaints.filter((_, i) => i !== index),
    }));
  };

  console.log(formData)
  return (
    <>
    <button style={styles.viewButton} onClick={()=> navigate(`/psychodiagnosticreport/${appointment._id}`)} >View </button>
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

        <label style={styles.labels}>
          Background Information:
          <div>
            {backgroundOptions.map((option, index) => (
              <div key={index}>
                <label>{option.label}</label>
                <select
                  style={styles.dropdown}
                  onChange={(e) =>
                    handleBackgroundSelection(
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
                  <div key={subIndex}>
                    {formData?.backgroundInfo.some(
                      (item) =>
                        item.category === option.label &&
                        item.subCategory === sub.label
                    ) && (
                      <select
                        style={styles.dropdown}
                        onChange={(e) =>
                          handleBackgroundSelection(
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
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Custom Textarea for manual input */}
            <label style={styles.labels}>Additional Information:</label>
            <textarea
              style={styles.textarea}
              placeholder="Enter any other relevant information here..."
              value={formData.additionalInfo1}
              onChange={handleAdditionalInfoChange}
            ></textarea>
          </div>
        </label>

        <label style={styles.labels}>
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
                    {formData.behavioralInfo.some(
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
        </label>

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
    marginTop: "10px",
    marginLeft: "10px",
  },
};
export default Psychodiagnostic;
