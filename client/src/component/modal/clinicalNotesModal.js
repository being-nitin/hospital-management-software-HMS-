import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ClinicalNotesModal = ({ showModal, handleClose, clinicalList }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [complaint, setComplaint] = useState("");
  const [duration, setDuration] = useState("1 weeks");

  const handleSubmit = () => {
    if (complaint) {
      const newNote = { complaint, duration };
      setNotes([...notes, newNote]);
      clearForm();
      handleClose();
    }
  };

  const handleCancel = () => {
    clearForm();
    handleClose();
  };

  const clearForm = () => {
    setComplaint("");
    setDuration("1 weeks");
    setCurrentNote(null);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedNotes = Array.from(notes);
    const [movedNote] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, movedNote);
    setNotes(reorderedNotes);
  };

  return (
    <Modal show={showModal} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{currentNote ? "Edit Complaint" : "Add Complaint"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formComplaint">
            <Form.Label>Complaint</Form.Label>
            <div>
              <select
                className="form-select form-control"
                size="lg"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
              >
                <option disabled value="">
                  Select Complaint
                </option>
                {clinicalList &&
                  clinicalList.map(({ title }, index) => (
                    <option value={title} key={index}>
                      {title}
                    </option>
                  ))}
              </select>
            </div>
          </Form.Group>
          <Form.Group controlId="formDuration">
            <Form.Label>Duration</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="number"
                value={duration.split(" ")[0] || ""}
                onChange={(e) =>
                  setDuration(`${e.target.value} ${duration.split(" ")[1] || "weeks"}`)
                }
                placeholder="Enter number"
                className="me-2"
              />
              <Form.Select
                value={duration.split(" ")[1] || "weeks"}
                onChange={(e) =>
                  setDuration(`${duration.split(" ")[0] || "1"} ${e.target.value}`)
                }
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </Form.Select>
            </div>
          </Form.Group>
        </Form>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="notes">
            {(provided) => (
              <Table
                striped
                bordered
                hover
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <thead>
                  <tr>
                    <th>Complaint</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((note, index) => (
                    <Draggable key={index} draggableId={`note-${index}`} index={index}>
                      {(provided) => (
                        <tr
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <td>{note.complaint}</td>
                          <td>{note.duration}</td>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {currentNote ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClinicalNotesModal;
