import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table, Row, Col } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { detailsVacApp, updateVacApp } from "../../actions/vaccineAppointmentActions";
import { listSetting } from "../../actions/settingAction";

const ClinicalNotesModal = ({ id, show, handleClose }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [complaint, setComplaint] = useState("");
  const [duration, setDuration] = useState("");
  const [clinicalList, setClinicalList] = useState([]);

  const dispatch = useDispatch();
  const { appointment } = useSelector((state) => state.vaccineAppDetails) || {};
  const { settings } = useSelector((state) => state.listSetting);

  useEffect(() => {
    dispatch(listSetting());
    if (id) dispatch(detailsVacApp(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (settings?.data?.clinicalNotes) {
      setClinicalList(settings.data.clinicalNotes);
    }
  }, [settings]);

  useEffect(() => {
    if (appointment) {
      setNotes(appointment?.psychodiagnostic?.chiefComplaints || []);
    }
  }, [appointment]);

  const handleAdd = (e) => {
    e.preventDefault();
    const newNote = { complaint, duration };
    const updatedNotes = [...notes, newNote];
    updateAppointment(updatedNotes);
    clearForm();
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setComplaint(note.complaint);
    setDuration(note.duration);
  };

  const handleUpdate = () => {
    const updatedNotes = notes.map((note) =>
      note === currentNote ? { ...note, complaint, duration } : note
    );
    updateAppointment(updatedNotes);
    clearForm();
  };

  const handleDelete = (noteToDelete) => {
    const updatedNotes = notes.filter((note) => note !== noteToDelete);
    updateAppointment(updatedNotes);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedNotes = [...notes];
    const [movedNote] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, movedNote);
    updateAppointment(reorderedNotes);
  };

  const updateAppointment = (updatedNotes) => {
    dispatch(
      updateVacApp({
        _id: appointment?._id,
        psychodiagnostic: { ...appointment?.psychodiagnostic, chiefComplaints: updatedNotes },
      })
    ).then(() => {
      dispatch(detailsVacApp(id)).then(() => {
        setNotes(updatedNotes); // Ensure UI updates
      });
    });
  };

  const clearForm = () => {
    setComplaint("");
    setDuration("");
    setCurrentNote(null);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Clinical Notes (Chief Complaints)</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Drag and Drop Table */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="notes">
            {(provided) => (
              <Table striped bordered hover {...provided.droppableProps} ref={provided.innerRef}>
                <thead>
                  <tr>
                    <th>Complaint</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((note, index) => (
                    <Draggable key={index} draggableId={`note-${index}`} index={index}>
                      {(provided) => (
                        <tr {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                          <td>{note.complaint}</td>
                          <td>{note.duration}</td>
                          <td>
                            <Button variant="warning" className="me-2" onClick={() => handleEdit(note)}>
                              Edit
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(note)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </Table>
            )}
          </Droppable>
        </DragDropContext>

        {/* Inline Bootstrap Form */}
        <Form onSubmit={currentNote ? handleUpdate : handleAdd} className="d-flex align-items-center mt-3">
          <Form.Select
            className="me-2"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          >
            <option value="" disabled>Select Complaint</option>
            {clinicalList.map(({ title }, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </Form.Select>

          <Form.Control
            type="number"
            className="me-2"
            value={duration.split(" ")[0] || ""}
            onChange={(e) => setDuration(`${e.target.value} ${duration.split(" ")[1] || "weeks"}`)}
            placeholder="Duration"
            style={{ width: "80px" }}
          />

          <Form.Select
            className="me-2"
            value={duration.split(" ")[1] || "weeks"}
            onChange={(e) => setDuration(`${duration.split(" ")[0] || "1"} ${e.target.value}`)}
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </Form.Select>

          <Button variant="primary" type="submit">
            {currentNote ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClinicalNotesModal;
