import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { detailsVacApp, updateVacApp } from "../../actions/vaccineAppointmentActions";
import { listSetting } from "../../actions/settingAction";

const ClinicalNotesModal = ({ show, handleClose, appId }) => {
    const [notes, setNotes] = useState([]);
    const [clinicalList, setClinicalList] = useState([]);
    const [editedNotes, setEditedNotes] = useState([]);

    const dispatch = useDispatch();
    const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
    const { 
      loading,
      error,
      appointment: { appointment } = {}, } = vaccineAppList || {};
    const userSetting = useSelector((state) => state.listSetting);
    const { settings } = userSetting;

    useEffect(() => {
        if (settings?.data.clinicalNotes) {
            setClinicalList(settings.data.clinicalNotes);
        }
    }, [settings]);

    useEffect(() => {
        if (appId) {
            dispatch(detailsVacApp(appId));
            dispatch(listSetting());
        }
    }, []);

    
        useEffect(() => {
          if (appointment) {
            setNotes(
              appointment?.psychodiagnostic?.chiefComplaints
                ? [...appointment.psychodiagnostic.chiefComplaints]
                : []
            );

            setEditedNotes([...notes])
          }
        
        }, [appointment, dispatch , appId]);


    

    const handleNoteChange = (index, field, value) => {
        const updatedNotes = editedNotes.map((note, i) => 
            i === index ? { ...note, [field]: value } : note
        );
        setEditedNotes(updatedNotes);
    };

    const handleAdd = () => {
        setEditedNotes([...editedNotes, { complaint: "", duration: "" }]);
    };

    const handleDelete = (index) => {
        setEditedNotes(editedNotes.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        const updatedAppointment = {
            ...appointment,
            psychodiagnostic: {
                ...appointment?.psychodiagnostic,
                chiefComplaints: editedNotes,
            },
        };
        dispatch(updateVacApp({ _id: appId, psychodiagnostic: updatedAppointment.psychodiagnostic }));
        setNotes(editedNotes);
        alert("chief complaint changed")
        handleClose();
        dispatch(detailsVacApp(appId));
    };

    useEffect(() =>{
      detailsVacApp(appId)
    },[])
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Clinical Notes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {editedNotes.map((note, index) => (
                    <Form key={index} className="mb-3">
                        <Form.Group controlId={`formComplaint-${index}`}>
                            <Form.Label>Complaint</Form.Label>
                            <Form.Select
                                size="lg"
                                value={note.complaint}
                                onChange={(e) => handleNoteChange(index, "complaint", e.target.value)}
                            >
                                <option>Select Complaint</option>
                                {clinicalList.map(({ title }, i) => (
                                    <option value={title} key={i} >{title}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId={`formDuration-${index}`}>
                            <Form.Label>Duration</Form.Label>
                            <div className="d-flex">
                                <Form.Control
                                    type="number"
                                    value={note.duration.split(' ')[0] || ""}
                                    onChange={(e) => handleNoteChange(index, "duration", `${e.target.value} ${note.duration.split(' ')[1] || 'weeks'}`)}
                                    placeholder="Enter number"
                                    className="me-2"
                                />
                                <Form.Select
                                    value={note.duration.split(' ')[1] || "weeks"}
                                    onChange={(e) => handleNoteChange(index, "duration", `${note.duration.split(' ')[0] || '1'} ${e.target.value}`)}
                                >
                                    <option value="days">Days</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                    <option value="years">Years</option>
                                </Form.Select>
                            </div>
                        </Form.Group>
                        <Button variant="danger" onClick={() => handleDelete(index)} className="mt-2">Delete</Button>
                    </Form>
                ))}
                <Button variant="secondary" onClick={handleAdd}>Add Note</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ClinicalNotesModal;
