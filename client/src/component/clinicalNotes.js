import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { useNavigate , useParams } from 'react-router-dom';
import {
    detailsVacApp,
    updateVacApp,
  } from "../actions/vaccineAppointmentActions";
  import { useDispatch, useSelector } from "react-redux";
import { listSetting } from "../actions/settingAction";

const ClinicalNotes = () => {
  const [notes, setNotes] = useState([]);  // Store clinical notes
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [complaint, setComplaint] = useState('');
  const [duration, setDuration] = useState('');
  const [clinicalList, setClinicalList] = useState()

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
  const {
    loading,
    error,
    appointment: { appointment, pastAppointments } = {},
  } = vaccineAppList || {};

  const userSetting = useSelector((state) => state.listSetting);
  const {settings} = userSetting
  console.log("Clinical List", clinicalList)

  useEffect(()=>{
    if (settings?.data.clinicalNotes) {
			setClinicalList(settings.data.clinicalNotes);
		}
  },[settings])

  useEffect(() => {
    if (userInfo) {
      dispatch(detailsVacApp(id));
      dispatch(listSetting())
    } else {
      navigate("/signin");
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    // Load the initial clinical notes (Replace with actual API call)
    if(appointment){
        console.log(appointment)
    setNotes(appointment?.psychodiagnostic ? [...appointment?.psychodiagnostic?.chiefComplaints] : []);
    }
  }, [appointment]);

  const handleAdd = (e) => {
    // Add the new note (Replace with API call)
    const newNote = { complaint, duration };


e.preventDefault();

// Ensure chiefComplaints array is always defined
const updatedChiefComplaints = [
  ...(appointment?.psychodiagnostic?.chiefComplaints || []), 
  newNote
];

const updatedAppointment = {
  ...appointment,
  psychodiagnostic: {
    ...appointment?.psychodiagnostic,
    chiefComplaints: updatedChiefComplaints
  }
};

// Dispatch action with updated structure
dispatch(
  updateVacApp({
    _id: appointment._id,
    psychodiagnostic: updatedAppointment.psychodiagnostic
  })
);
   dispatch(detailsVacApp(id))
    clearForm();
    setShowModal(false);
    dispatch(detailsVacApp(id));
  };

  const handleEdit = (note) => {
    // Open modal with pre-filled data
    setCurrentNote(note);
    setComplaint(note.complaint);
    setDuration(note.duration);
    setShowModal(true);
  };

  const handleUpdate = () => {
    // Update the note (Replace with API call)
    const updatedNotes = notes.map(note =>
      note === currentNote ? { ...note, complaint, duration } : note
    );
    setNotes(updatedNotes);
    const updatedAppointment = {
        ...appointment,
        psychodiagnostic: {
          ...appointment?.psychodiagnostic,
          chiefComplaints: updatedNotes
        }
      };

      dispatch(
        updateVacApp({
          _id: appointment?._id,
          psychodiagnostic: updatedAppointment.psychodiagnostic
        })
      );
      dispatch(detailsVacApp(id))
    clearForm();
    setShowModal(false);
  };

  const handleDelete = (noteToDelete) => {
    // Delete the note (Replace with API call)
    const updatedNotes = notes.filter(note => note !== noteToDelete);
    const updatedAppointment = {
        ...appointment,
        psychodiagnostic: {
          ...appointment?.psychodiagnostic,
          chiefComplaints: updatedNotes
        }
      };
      
      dispatch(
        updateVacApp({
          _id: appointment._id,
          psychodiagnostic: updatedAppointment.psychodiagnostic
        })
      );
      dispatch(detailsVacApp(id))
  };

  const clearForm = () => {
    setComplaint('');
    setDuration('');
    setCurrentNote(null);
  };

  return (
    <div className="container mt-5">
      <h2 className='mb-5'>Clinical Notes (Chief Complaints)</h2>

      {/* Table to display notes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Complaint</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={index}>
              <td>{note.complaint}</td>
              <td>{note.duration}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(note)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(note)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Button to open the modal for adding new complaint */}
      <Button variant="primary" onClick={() => setShowModal(true)}>Add New Complaint</Button>

      {/* Modal for Add/Edit Complaint */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentNote ? 'Edit Complaint' : 'Add Complaint'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formComplaint">
              <Form.Label>Complaint</Form.Label>
             <div>
                <Form.Select aria-label="Default select example" onChange={(e) => setComplaint(e.target.value)}>
                  <option selected disabled >Select Complaint</option>
                  {clinicalList && clinicalList.map(({title}, index)=>{
                    return <option value={title} key={index}>{title}</option>
                    })}
                </Form.Select>
              </div>
            </Form.Group>
            <Form.Group controlId="formDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter duration"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={currentNote ? handleUpdate : handleAdd}
          >
            {currentNote ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClinicalNotes;
