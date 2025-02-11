import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
    listVacTakenEnums,
    createVacApp,
} from "../../actions/vaccineAppointmentActions";
import { listUsers } from "../../actions/userActions";
import { listPatients, patientsDetails } from "../../actions/patientActions"; 
import { useNavigate } from "react-router-dom";
import moment from "moment";

const AddAppVaccineModal = ({ show, onClose, patientId , selectedDate}) => {
    const [doctor, setDoctor] = useState("");
    const [date, setDate] = useState(null);
    const [time, setTime] = useState("10:00");
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("fever");
    const [selectedPatient, setSelectedPatient] = useState("")
    const [showModal, setShowModal] = useState(show)
    
    const [durationUnit, setDurationUnit] = useState("5 min"); 
    const [query, setQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [showList, setShowList] = useState(false);
    
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
    const { loading, success , error} = vaccineAppCreate;

    const patientList = useSelector((state) => state.patientList )
    const { patients } = patientList

  
    const handleInputChange = (e) => {
      const input = e.target.value;
      setQuery(input);

      dispatch(listPatients({ firstName : input}))
  
      setShowList(input.length > 0);
    };

    useEffect(()=>{
        setFilteredResults(patients);
    },[patients])
  
    const handleItemClick = (item) => {
      setQuery(item.firstName); 
      setShowList(false); 
      setSelectedPatient(item._id)
    };

    useEffect(() => {
        if (userInfo) {
            dispatch(listUsers());
            if(!patientId) {
                dispatch(listPatients())
            }
            
            dispatch(listVacTakenEnums());
            if(patientId){
            dispatch(patientsDetails(patientId));
            }
        }
    }, [dispatch, userInfo]);

    useEffect(()=> {
      setDate(selectedDate)
    },[])

   
    const submitHandler = (e) => {
        e.preventDefault();
        
            const patient = patientId ? patientId : selectedPatient;
            const duration = `${durationUnit}`; // Combine value and unit
            dispatch(
                createVacApp({
                    patient,
                    doctor,
                    date,
                    time,
                    status,
                    remarks,
                    duration, // Include duration
                })
            );
    }; 



    useEffect(() => {
        if (success) {
          dispatch({ type: "CREATE_APPOINTMENT_VACCINE_RESET" }); 
          alert("appointment created successfully ")
          onClose();
        }
    
        if (error) {
            alert(error)
            dispatch({ type: "CREATE_APPOINTMENT_VACCINE_RESET" });
        }
       
      }, [success, error]);

    
    return (
        <>
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Appointment</h5>
                                <p
                                    style={{ cursor : 'pointer'}}
                                    onClick={onClose}
                                ><i class="fa fa-window-close"></i></p>
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
                                    { patientId  &&
                                    <div className="mb-3">
                                        <label className="form-label" style={{ fontWeight :700}}>Patient</label>
                                        <span>{`  ${patient?.firstName}-${patient?.patientNumber}`}</span>
                                    </div>}
                                    <div style={{ display : 'flex ' , justifyContent : 'space-between' , alignItems : "center"}}>
                                    {!patientId && (
                                    <div className="">
                                    <label className="form-label" style={{ fontWeight :700}}>Patient</label>
                                    <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '10px',
        }}
      />
      {showList && (
        <ul
          style={{
            listStyleType: 'none',
            padding: '0',
            margin: '0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            maxHeight: '150px',
            overflowY: 'auto',
            backgroundColor: '#fff',
          }}
        >
          {filteredResults && filteredResults.patient.length > 0 ? (
            filteredResults.patient.map((item) => (
              <li
                key={item._id}
                onClick={() => handleItemClick(item)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = '#f0f0f0')
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = '#fff')
                }
              >
                {item.firstName}
              </li>
            ))
          ) : (
            <li style={{ padding: '10px', color: '#999' }}>
              No matching results
            </li>
          )}
        </ul>
      )}

    </div>
)}
  <button className="btn-primary" style = {{ borderRadius : '25px', marginTop :"15px" }} onClick={()=> navigate('/add-patient-details')}>
                                        +
                                    </button>
                                    <div className="">
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

                                  
                                    </div>
                                    <div style={{ display : 'flex ' , justifyContent : 'space-between' , alignItems : "center"}}>
                                    <div className="" style = {{ display : 'flex' , justifyContent : 'space-around' , alignItems: 'center', gap : '5px'}}>
                                        <label className="form-label" style={{ fontWeight :700}}>Time</label>
                                        <input
                                         type="time"
                                         value={time}
                                         onChange={(e) => setTime(e.target.value)}
                                         className="form-control"
                                       />
                                    </div>
                                    <div className="">
                                        <label className="form-label m-3" style={{ fontWeight :700}}>Date</label>
                                        <input type="date"
            
              onChange={(e) => setDate(e.target.value)}
              
              placeholderText="Select to date"
              required
            />
                                    </div>
                                    </div>
                                    {/* <div className="mb-3">
                                        <label className="form-label m-3" style={{ fontWeight :700}}>Status</label>
                                        <select
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="form-control"
                                        >
                                            <option>Select Status</option>
                                               {takes && 
                                                takes.map((status, i) =>  status !== 'closed' ? (
                                                    <option key={i} value={status}>
                                                        {status}
                                                    </option> 
                                                ) : <></>)}
                                        </select>
                                    </div> */}
                                    <div className="mb-3">
                                        <label className="form-label" style={{ fontWeight: 700 }}>Duration</label>
                                        <div className="d-flex gap-2">
                                        <select
  value={durationUnit}
  onChange={(e) => setDurationUnit(e.target.value)}
  className="form-control"
  style={{ maxWidth: "150px" }}
>
  <option value="5 min">5 min</option>
  <option value="10 min">10 min</option>
  <option value="15 min">15 min</option>
  <option value="30 min">30 min</option>
  <option value="45 min">45 min</option>
  <option value="1 hr">1 hr</option>
  <option value="1 hr 30 min">1 hr 30 min</option>
  <option value="1 hr 45 min">1 hr 45 min</option>
  <option value="2 hr">2 hr</option>
  <option value="2 hr 30 min">2 hr 30 min</option>
  <option value="2 hr 45 min">2 hr 45 min</option>
  <option value="3 hr">3 hr</option>
  <option value="3 hr 30 min">3 hr 30 min</option>
  <option value="3 hr 45 min">3 hr 45 min</option>
  <option value="4 hr">4 hr</option>
  <option value="4 hr 30 min">4 hr 30 min</option>
  <option value="4 hr 45 min">4 hr 45 min</option>
</select>

                                        </div>
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
