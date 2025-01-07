import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
	detailsVacApp,
	updateVacApp,
} from "../actions/vaccineAppointmentActions";
import { useDispatch, useSelector } from "react-redux";
import { listSetting } from "../actions/settingAction";

const ClinicalNotes = () => {
	const [notes, setNotes] = useState([]); // Store clinical notes
	const [showModal, setShowModal] = useState(false);
	const [currentNote, setCurrentNote] = useState(null);
	const [complaint, setComplaint] = useState("");
	const [duration, setDuration] = useState("");
	const [clinicalList, setClinicalList] = useState();

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
	const { settings } = userSetting;

	useEffect(() => {
		if (settings?.data.clinicalNotes) {
			setClinicalList(settings.data.clinicalNotes);
		}
	}, [settings]);

	useEffect(() => {
		if (userInfo) {
			dispatch(detailsVacApp(id));
			dispatch(listSetting());
		} else {
			navigate("/signin");
		}
	}, [dispatch, userInfo]);

	useEffect(() => {
		if (appointment) {
			setNotes(
				appointment?.psychodiagnostic?.chiefComplaints
					? [...appointment.psychodiagnostic.chiefComplaints]
					: []
			);
		}
	}, [appointment]);

	const handleAdd = (e) => {
		e.preventDefault();
		const newNote = { complaint, duration };
		const updatedChiefComplaints = [
			...(appointment?.psychodiagnostic?.chiefComplaints || []),
			newNote,
		];
		const updatedAppointment = {
			...appointment,
			psychodiagnostic: {
				...appointment?.psychodiagnostic,
				chiefComplaints: updatedChiefComplaints,
			},
		};

		dispatch(
			updateVacApp({
				_id: appointment._id,
				psychodiagnostic: updatedAppointment.psychodiagnostic,
			})
		);
		dispatch(detailsVacApp(id));
		clearForm();
		setShowModal(false);
	};

	const handleEdit = (note) => {
		setCurrentNote(note);
		setComplaint(note.complaint);
		setDuration(note.duration);
		setShowModal(true);
	};

	const handleUpdate = () => {
		const updatedNotes = notes.map((note) =>
			note === currentNote ? { ...note, complaint, duration } : note
		);
		setNotes(updatedNotes);

		const updatedAppointment = {
			...appointment,
			psychodiagnostic: {
				...appointment?.psychodiagnostic,
				chiefComplaints: updatedNotes,
			},
		};

		dispatch(
			updateVacApp({
				_id: appointment?._id,
				psychodiagnostic: updatedAppointment.psychodiagnostic,
			})
		);
		dispatch(detailsVacApp(id));
		clearForm();
		setShowModal(false);
	};

	const handleDelete = (noteToDelete) => {
		const updatedNotes = notes.filter((note) => note !== noteToDelete);
		const updatedAppointment = {
			...appointment,
			psychodiagnostic: {
				...appointment?.psychodiagnostic,
				chiefComplaints: updatedNotes,
			},
		};

		dispatch(
			updateVacApp({
				_id: appointment._id,
				psychodiagnostic: updatedAppointment.psychodiagnostic,
			})
		);
		dispatch(detailsVacApp(id));
	};

	const handleDragEnd = (result) => {
		if (!result.destination) return;

		const reorderedNotes = Array.from(notes);
		const [movedNote] = reorderedNotes.splice(result.source.index, 1);
		reorderedNotes.splice(result.destination.index, 0, movedNote);

		setNotes(reorderedNotes);

		const updatedAppointment = {
			...appointment,
			psychodiagnostic: {
				...appointment?.psychodiagnostic,
				chiefComplaints: reorderedNotes,
			},
		};

		dispatch(
			updateVacApp({
				_id: appointment?._id,
				psychodiagnostic: updatedAppointment.psychodiagnostic,
			})
		);
	};

	const clearForm = () => {
		setComplaint("");
		setDuration("");
		setCurrentNote(null);
	};

	return (
		<div className="container mt-5">
			<h2 className="mb-5">Clinical Notes (Chief Complaints)</h2>

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
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{notes.map((note, index) => (
									<Draggable
										key={index}
										draggableId={`note-${index}`}
										index={index}
									>
										{(provided) => (
											<tr
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												ref={provided.innerRef}
											>
												<td>{note.complaint}</td>
												<td>{note.duration}</td>
												<td>
													<Button
														variant="warning"
														onClick={() =>
															handleEdit(note)
														}
													>
														Edit
													</Button>{" "}
													<Button
														variant="danger"
														onClick={() =>
															handleDelete(note)
														}
													>
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

			<Button variant="primary" onClick={() => setShowModal(true)}>
				Add New Complaint
			</Button>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						{currentNote ? "Edit Complaint" : "Add Complaint"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formComplaint">
							<Form.Label>Complaint</Form.Label>
							<div>
								<select
									className="form-select form-control"
									size="lg"
									onChange={(e) =>
										setComplaint(e.target.value)
									}
								>
									<option selected disabled>
										Select Complaint
									</option>
									{clinicalList &&
										clinicalList.map(({ title }, index) => (
											<option
												value={title}
												key={index}
											>
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
            value={duration.split(' ')[0] || ""}
            onChange={(e) =>
                setDuration(`${e.target.value} ${duration.split(' ')[1] || 'weeks'}`)
            }
            placeholder="Enter number"
            className="me-2"
        />
        <Form.Select
            value={duration.split(' ')[1] || "weeks"}
            onChange={(e) =>
                setDuration(`${duration.split(' ')[0] || '1'} ${e.target.value}`)
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
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowModal(false)}
					>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={currentNote ? handleUpdate : handleAdd}
					>
						{currentNote ? "Update" : "Add"}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ClinicalNotes;
