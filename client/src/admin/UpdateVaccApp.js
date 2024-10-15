import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UPDATE_APPOINTMENT_VACCINE_RESET } from "../constants/vaccineAppointmentConstants";
import moment from "moment";
import {
  listVacDaysEnums,
  listVacTakenEnums,
  updateVacApp,
  detailsVacApp,
} from "../actions/vaccineAppointmentActions";
import { listUsers } from "../actions/userActions";
import { listVacCat } from "../actions/vaccineCatActions";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateVaccApp = () => {
  const { id } = useParams();

  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const vaccineCatList = useSelector((state) => state.vaccineCatList);
  const { vaccines } = vaccineCatList;

  console.log(vaccines);

  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  console.log(users);

  const medicineType = useSelector((state) => state.medicineType);
  const { types } = medicineType;
  console.log(types);

  const vaccineAppUpdate = useSelector((state) => state.vaccineAppUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = vaccineAppUpdate;

  const vaccineAppTaken = useSelector((state) => state.vaccineAppTaken);
  const { takes } = vaccineAppTaken;

  const vaccineAppDays = useSelector((state) => state.vaccineAppDays);
  const { days } = vaccineAppDays;

  const vaccineAppDetails = useSelector((state) => state.vaccineAppDetails);
  const {
    loading,
    error,
    appointment: { appointment },
  } = vaccineAppDetails;

  console.log(appointment);
  useEffect(() => {
    if (successUpdate) {
      navigate("/list-app-vaccine");
    } else {
      if (appointment?._id !== id) {
        dispatch(listUsers());
        dispatch(listVacTakenEnums());
        dispatch(listVacDaysEnums());
        dispatch(listVacCat());
        dispatch(detailsVacApp(id));
      } else {
        setPatient(appointment.patient);
        setDoctor(appointment.doctor);
        setDate(moment(appointment.date).format("YYYY-MM-DD"));
        setTime(appointment.time);
        setStatus(appointment.status);
        setRemarks(appointment.remarks);
      }
    }
  }, [dispatch, id, successUpdate]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoadingData = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  const showLoading = () =>
    loadingUpdate && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
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
  const textAreaStyle = {
    ...inputStyles,
    resize: "vertical",
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateVacApp({ _id: id, date, time, status, remarks }));
  };

  const UpdateAppointmentForm = () => (
    <div className="form-group col-md-12">
      <form onSubmit={submitHandler} style={formContainerStyles}>
        <div className="form-row" style={formRowStyles}>
          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="inputAddress">
              Time
            </label>
            <TimePicker
              onChange={setTime}
              value={time}
              className="class1 class2"
              style={inputStyles}
            />
          </div>

          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="inputAddress">
              Date
            </label>
            <DatePicker
              value={date}
              onChange={(date) => setDate(moment(date).format("YYYY-MM-DD"))}
              className="form-control"
              style={inputStyles}
            />
          </div>
        </div>

        <div className="form-row" style={formRowStyles}>
          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="exampleFormControlSelect1">
              Status
            </label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="form-control"
              id="exampleFormControlSelect1"
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
            <label style={labelStyles} htmlFor="exampleFormControlTextarea1">
              Remarks
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="write description"
              rows="3"
              style={textAreaStyle}
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
    <Layout title="Category treatment Form">
      <>
        <h2 className="mb-4">Update Appointment</h2>
        {errorUpdate && (
          <div className="alert alert-danger" role="alert">
            {errorUpdate}
          </div>
        )}
        {showError()}
        {showLoadingData()}
        {showLoading()}
        {UpdateAppointmentForm()}
      </>
    </Layout>
  );
};

export default UpdateVaccApp;
