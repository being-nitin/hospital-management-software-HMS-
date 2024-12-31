import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
    listVacDaysEnums,
    listVacTakenEnums,
    createVacApp,
} from "../../actions/vaccineAppointmentActions";
import { listUsers } from "../../actions/userActions";
import { CREATE_APPOINTMENT_VACCINE_RESET } from "../../constants/vaccineAppointmentConstants";
import { patientsDetails } from "../../actions/patientActions";
import { useNavigate } from "react-router-dom";

const AddAppVaccineModal = ({ show, onClose, patientId }) => {
    const [doctor, setDoctor] = useState("");
    const [vaccine, setVaccine] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("10:00");
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("fever");

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const patientDetails = useSelector((state) => state.patientDetails);
    const { patient } = patientDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userList = useSelector((state) => state.userList);
    const { users } = userList;

    const vaccineAppTaken = useSelector((state) => state.vaccineAppTaken);
    const { takes } = vaccineAppTaken;

    const vaccineAppCreate = useSelector((state) => state.vaccineAppCreate);
    const { loading, success } = vaccineAppCreate;

    useEffect(() => {
        if (userInfo) {
            dispatch(listUsers());
            dispatch(listVacTakenEnums());
            dispatch(listVacDaysEnums());
            dispatch(patientsDetails(patientId));
            if (success) {
                dispatch({ type: CREATE_APPOINTMENT_VACCINE_RESET });
                onClose(); // Close modal on success
            }
        }
    }, [dispatch, userInfo, success, patientId, onClose]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createVacApp({ patient, doctor, date, time, status, remarks }));
        navigate('/list-app-vaccine')
    };

    return (
        <>
            {show && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Vaccine Appointment</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={onClose}
                                ></button>
                            </div>
                            <div className="modal-body">
                               
                                {loading && (
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                )}
                                <form onSubmit={submitHandler}>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ fontWeight :700}}>Patient</label>
                                        <span>{`  ${patient?.firstName}-${patient?.patientNumber}`}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ fontWeight :700}}>Doctor</label>
                                        <select
                                            onChange={(e) => setDoctor(e.target.value)}
                                            className="form-control"
                                        >
                                            <option>Select Doctor</option>
                                            {users &&
                                                users
                                                    .filter((user) => user.role === 1)
                                                    .map((c) => (
                                                        <option key={c._id} value={c._id}>
                                                            {c.name}
                                                        </option>
                                                    ))}
                                        </select>
                                    </div>
                                    <div className="mb-3" style = {{ display : 'flex' , justifyContent : 'space-around' , alignItems: 'center', gap : '5px'}}>
                                        <label className="form-label" style={{ fontWeight :700}}>Time</label>
                                        <input
    type="time"
    value={time}
    onChange={(e) => setTime(e.target.value)}
    className="form-control"
  />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ fontWeight :700}}>Date</label>
                                        <DatePicker 
                                            selected={date}
                                            onChange={(date) => setDate(date)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ fontWeight :700}}>Status</label>
                                        <select
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="form-control"
                                        >
                                            <option>Select Status</option>
                                            {takes &&
                                                takes.map((status, i) => (
                                                    <option key={i} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ fontWeight :700}}>Remarks</label>
                                        <select
                                            className="form-control"
                                            onChange={(e) => setRemarks(e.target.value)}
                                        >
                                            <option value="fever">Suffering from Fever</option>
                                            <option value="flu">Suffering from Flu</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddAppVaccineModal;
