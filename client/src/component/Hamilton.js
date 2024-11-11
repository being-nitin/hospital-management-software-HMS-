import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dropdown, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  detailsVacApp,
  updateVacApp,
} from "../actions/vaccineAppointmentActions";
import { useDispatch, useSelector } from "react-redux";

const Hamilton = () => {
  
  const [form2Data, setForm2Data] = useState({
    fields: Array(14).fill(null), // initialize empty values for 14 fields
  });
  
  const [existingData , setExistingData] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } =useParams()
  const fieldNames = [
    "Anxious Mood",
    "Tension",
    "Fears",
    "Insomnia",
    "Intellectual",
    "Depressed Mood",
    "Somatic (Muscular)",
    "Somatic (Sensory)",
    "Cardiovascular Symptoms",
    "Respiratory Systems",
    "Gastrointestinal Symptoms",
    "Gastrourinatory Symptoms",
    "Autonomic Symptoms",
    "Behaviour At Interview",
  ];

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

  const handleForm2Submit = (e) => {
    e.preventDefault();
    console.log(form2Data)
    const submittedData = fieldNames.reduce((result, fieldName, index) => {
        result[fieldName] = form2Data.fields[index];
        return result;
      }, {})
    dispatch(
      updateVacApp({ _id: appointment._id, hamA : submittedData})
    );
    dispatch(detailsVacApp(id));
  };

  const handleRadioChange = (index, value) => {
    setForm2Data((prevData) => {
      const updatedFields = [...prevData.fields];
      updatedFields[index] = value;
      return { ...prevData, fields: updatedFields };
    });
  };

  useEffect(() => {
    setExistingData(
      appointment?.hamA ? appointment?.hamA : null
    );
  }, [appointment]);

  useEffect(() => {
    if (existingData) {
      console.log(form2Data)
      console.log(Object.values(existingData))
      setForm2Data({ fields : Object.values(existingData) } );
    }
  }, [existingData]);

  return (
    <>
     <button style={styles.viewButton} onClick={()=> navigate(`/viewHamiltomForm/${appointment._id}`)} >View </button>

      <form onSubmit={handleForm2Submit} style={styles.form}>
        <h3 style={styles.formHeader}>Hamilton Anxiety Rating Scale (HAM-A)</h3>
        <p style={styles.formDescription}>
          Below is a list of phrases that describe certain feelings that people
          have. Rate the patient by selecting the answer that best describes the
          extent to which they experience these conditions. Choose one of the
          five responses for each of the fourteen questions.
        </p>
        <div style={styles.legend}>
          <p>0 = Not present</p>
          <p>1 = Mild</p>
          <p>2 = Moderate</p>
          <p>3 = Severe</p>
          <p>4 = Very severe</p>
        </div>
        <div style={styles.fieldsContainer}>
          {fieldNames.map((fieldName, index) => (
            <div key={index} style={styles.fieldWrapper}>
              <label style={styles.label}>{fieldName}:</label>
              <div style={styles.radioGroup}>
                {[0, 1, 2, 3, 4].map((option) => (
                  <label key={option} style={styles.radioOption}>
                    <input
                      type="radio"
                      name={`field-${index}`}
                      value={option}
                      checked={form2Data.fields[index] === option}
                      onChange={() => handleRadioChange(index, option)}
                      style={styles.radioInput}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
    </>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f7f7f7",
  },
  formHeader: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  formDescription: {
    fontSize: "16px",
    textAlign: "center",
    color: "#666",
    marginBottom: "20px",
  },
  legend: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
  fieldsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  fieldWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  },
  radioGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 0",
  },
  radioOption: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  radioInput: {
    accentColor: "#007BFF",
  },
  submitButton: {
    alignSelf: "center",
    padding: "12px 24px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s",
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
};
export default Hamilton;
