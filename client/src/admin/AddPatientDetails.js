import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listUsers } from "../actions/userActions";
import {
  listGenderEnums,
  listStatusEnums,
  createPatient,
  listTypeEnums,
} from "../actions/patientActions";
import axios from "axios";
import { PATIENT_CREATE_RESET } from "../constants/patientDetailsConstants";
import { useNavigate } from "react-router-dom";
import AddAppVaccineModal from "../component/modal/addAppointment";

const AddPatientDetails = ({ history: history1 }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patientNumber, setPatientNumber] = useState(2222556);
  const [regDate, setRegDate] = useState(new Date());
  const [address, setAddress] = useState("Nairobi");
  const [phoneNo, setPhoneNo] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const [residence, setResidence] = useState("Kilimani");
  // const [email, setEmail] = useState('steph@gmail.com')
  const [guardian, setGuardian] = useState("smart");
  const [relation, setRelation] = useState("cousin");
  const [gender, setGender] = useState("Male");
  const [symptoms, setSymptoms] = useState("");
  const [doctor, setDoctor] = useState("");
  const [showModal , setShowModal] = useState(false)
  const [selectedId , setSelectedId] = useState('')

  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientGender = useSelector((state) => state.patientGender);
  const { genders } = patientGender;

  const patientStatus = useSelector((state) => state.patientStatus);
  const { status } = patientStatus;

  const patientTypes = useSelector((state) => state.patientTypes);
  const { types } = patientTypes;

  const patientCreate = useSelector((state) => state.patientCreate);
  const { error, loading, success, patient } = patientCreate;

  useEffect(() => {
    if (userInfo) {
      dispatch(listUsers());
      dispatch(listTypeEnums());
      dispatch(listStatusEnums());
      dispatch(listGenderEnums());

      if (success) {
        dispatch({ type: PATIENT_CREATE_RESET });
        navigate("/list-patients");
      }
    } else {
      navigate("/signin");
    }
  }, [dispatch, userInfo, success]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const formContainerStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "900px",
    marginTop : "50px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    height: "100vh",
    fontFamily: "Roboto sans-serif",
  };

  const formRowStyles = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "25px",
    fontFamily: "Roboto sans-serif",
  };

  const formGroupStyles = {
    width: "48%",
    marginBottom: "15px",
    fontFamily: "Roboto sans-serif",
  };

  const labelStyles = {
    fontWeight: "600",
    marginBottom: "12px",
    display: "block",
    color: "#333",
    fontSize: "14px",
  };

  const inputStyles = {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#fff",
    transition: "border-color 0.2s ease-in-out",
    fontFamily: "Roboto sans-serif",
  };

  const buttonStyles = {
    width: "100%",
    maxWidth: "200px",
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    padding: "12px 25px",
    fontSize: "1rem",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
    marginY: "20px",
  };
  //const selectStyles = {
  const selectStyles = {
    ...inputStyles,
    padding: "5px",
    fontSize: "1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createPatient({
        doctor,
        firstName,
        lastName,
        patientNumber,
        regDate,
        address,
        phoneNo,
        birthDate,
        residence,
        guardian,
        relation,
        gender,
        symptoms,
      })
    );
    
    
  };


  useEffect(()=>{
    if(success){
      setSelectedId(patient._id)
      setShowModal(true)
      }
  },[patient])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        ` http://localhost:8000/upload`,
        formData,
        config
      );

      setImage(data);
      console.log(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const patientDetailsForm = () => (
    <div style={formContainerStyles}>
      <form onSubmit={submitHandler}>
        <div className="form-row" style={formRowStyles}>
          <div className="form-group" style={formGroupStyles}>
            <label style={labelStyles}>Doctor</label>
            <select
              onChange={(e) => setDoctor(e.target.value)}
              className="form-control"
              style={selectStyles}
            >
              <option>Select Doctor</option>
              {users &&
                users
                  .filter((filtered) => filtered.role === 1)
                  .map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  ))}
            </select>
          </div>

          <div className="form-group" style={formGroupStyles}>
            <label style={labelStyles}>First Name</label>
            <input
              className="form-control py-4"
              type="text"
              style={inputStyles}
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group" style={formGroupStyles}>
            <label style={labelStyles}>Last Name</label>
            <input
              className="form-control py-4"
              type="text"
              style={inputStyles}
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div style={formGroupStyles}>
            <label style={labelStyles}>Patient Number</label>
            <input
              className="form-control py-4"
              type="text"
              style={inputStyles}
              placeholder="Patient Number"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
            />
          </div>

          <div className="form-group" style={formGroupStyles}>
            <label style={labelStyles}>Registration Date</label>
            <DatePicker
              selected={regDate}
              onChange={(date) => setRegDate(date)}
              className="form-control"
              style={inputStyles}
            />
          </div>

          <div style={formGroupStyles}>
            <label style={labelStyles}>Address</label>
            <textarea
              className="form-control"
              style={inputStyles}
              placeholder="Write address"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group" style={formGroupStyles}>
            <label style={labelStyles}>Phone No</label>
            <input
              type="text"
              style={inputStyles}
              placeholder="Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>

          <div className="form-group" style={formGroupStyles}>
            <label style={labelStyles}>Date of Birth</label>
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              className="form-control"
              style={inputStyles}
            />
          </div>

          <div className="form-group" style={formGroupStyles}>
            <label style={labelStyles}>Guardian</label>
            <input
              type="text"
              style={inputStyles}
              placeholder="Guardian"
              value={guardian}
              onChange={(e) => setGuardian(e.target.value)}
            />
          </div>

          <div className="form-group" style={formGroupStyles}>
            <label style={labelStyles}>Relation</label>
            <input
              type="text"
              style={inputStyles}
              placeholder="Relation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            />
          </div>

          <div className="form-group" style={formGroupStyles}>
            <label style={labelStyles}>Gender</label>
            <select
              onChange={(e) => setGender(e.target.value)}
              className="form-control"
              style={selectStyles}
            >
              {genders &&
                genders.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <button type="submit" style={buttonStyles}>
          Save
        </button>
      </form>
    </div>
  );

  return (
    <Layout title="">
      <>
        <h2 style={{ marginBottom: "100px", fontFamily: "Roboto sans-serif" }}>
          Add Patient Details
        </h2>
        {showError()}
        {showLoading()}
        {patientDetailsForm()}
        { showModal &&  (
		<AddAppVaccineModal
                show={showModal}
                onClose={() => setShowModal(false)}
                patientId={selectedId}
            />)}
      </>
    </Layout>
  );
};

export default AddPatientDetails;
