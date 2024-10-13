import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  listVacDaysEnums,
  listVacTakenEnums,
  createVacApp,
} from "../actions/vaccineAppointmentActions";
import { listUsers } from "../actions/userActions";
import { listVacCat } from "../actions/vaccineCatActions";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { CREATE_APPOINTMENT_VACCINE_RESET } from "../constants/vaccineAppointmentConstants";
import { useNavigate } from "react-router-dom";
import { listPatients } from "../actions/patientActions";

const AddAppVaccine = () => {
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [vaccine, setVaccine] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  const [status, setStatus] = useState("");
  const [day, setDay] = useState("");
  const [room, setRoom] = useState("105");
  const [remarks, setRemarks] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const patientList = useSelector((state) => state.patientList);
  const { patients } = patientList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const vaccineCatList = useSelector((state) => state.vaccineCatList);
  const { vaccines } = vaccineCatList;

  console.log(vaccines);

  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  console.log(users);

  const medicineType = useSelector((state) => state.medicineType);
  const { types } = medicineType;
  console.log(types);

  const vaccineAppCreate = useSelector((state) => state.vaccineAppCreate);
  const { error, loading, success } = vaccineAppCreate;

  const vaccineAppTaken = useSelector((state) => state.vaccineAppTaken);
  const { takes } = vaccineAppTaken;

  const vaccineAppDays = useSelector((state) => state.vaccineAppDays);
  const { days } = vaccineAppDays;

  useEffect(() => {
    if (userInfo) {
      dispatch(listUsers());
      dispatch(listVacTakenEnums());
      dispatch(listVacDaysEnums());
      dispatch(listVacCat());
      dispatch(listPatients());
      if (success) {
        dispatch({ type: CREATE_APPOINTMENT_VACCINE_RESET });
        navigate("/list-app-vaccine");
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
    dispatch(createVacApp({ patient, doctor, date, time, status, remarks }));
  };
  const formContainerStyles = {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  };

  const formRowStyles = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  };

  const formGroupStyles = {
    flex: 1,
    marginBottom: "15px", // Space between form groups
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
  };
  const selectStyles = {
    ...inputStyles,
    padding: "5px",
    fontSize: "1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const buttonStyles = {
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    padding: "12px 25px",
    fontSize: "1rem",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
    marginTop: "15px",
  };

  buttonStyles[":hover"] = {
    backgroundColor: "#0056b3",
  };

  console.log({ patient, doctor, date, time, status, day, remarks });

  const AddAppointmentForm = () => (
    <div className="form-group col-md-12">
      <form onSubmit={submitHandler} style={formContainerStyles}>
        <div className="form-row" style={formRowStyles}>
          <div className="form-group col-md-4">
            <label style={labelStyles}>Patient</label>
            <select
              onChange={(e) => setPatient(e.target.value)}
              className="form-control"
              style={selectStyles}
            >
              <option>Select Patient</option>
              {patients &&
                patients.map((c, i) => (
                  <option key={i} value={c._id}>
                    {`${c.firstName}-${c.patientNumber}`}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group col-md-4">
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
        </div>

        <div className="form-row" style={formRowStyles}>
          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="timeIn">
              Time In
            </label>
            <TimePicker
              onChange={setTime}
              value={time}
              className="class1 class2"
              style={inputStyles}
            />
          </div>
          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="date">
              Date
            </label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="form-control"
              style={inputStyles}
            />
          </div>
        </div>

        <div className="form-row" style={formRowStyles}>
          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="status">
              Status
            </label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="form-control"
              style={selectStyles}
            >
              <option>Select Status</option>
              {takes &&
                takes.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="form-row" style={formRowStyles}>
          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="remarks">
              Remarks
            </label>
            <textarea
              className="form-control"
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="write description"
              rows="3"
              style={inputStyles}
            />
          </div>
        </div>

        <button type="submit" style={buttonStyles}>
          Save
        </button>
      </form>
    </div>
  );

  return (
    <Layout title="Add Appointment">
      <>
        {showError()}
        {showLoading()}
        {AddAppointmentForm()}
      </>
    </Layout>
  );
};

export default AddAppVaccine;
