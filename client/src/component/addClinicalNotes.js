import React, { useState } from "react";
import Layout from "../core/Layout";

const styles = {
	container: {
		padding: "20px",
		fontFamily: "Arial, sans-serif",
		maxWidth: "800px",
		margin: "30px auto",
		backgroundColor: "#f9f9f9",
		border: "1px solid #ccc",
		borderRadius: "8px",
	},
	heading: {
		textAlign: "center",
		color: "#333",
	},
	addNoteSection: {
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		marginBottom: "20px",
	},
	input: {
		padding: "8px",
		border: "1px solid #ccc",
		borderRadius: "4px",
		fontSize: "16px",
	},
	textarea: {
		padding: "8px",
		border: "1px solid #ccc",
		borderRadius: "4px",
		fontSize: "16px",
		height: "100px",
		resize: "none",
	},
	button: {
		padding: "8px 12px",
		backgroundColor: "#007BFF",
		color: "white",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
		fontSize: "16px",
		alignSelf: "start",
	},
	buttonDanger: {
		backgroundColor: "#dc3545",
	},
	list: {
		listStyleType: "none",
		padding: 0,
	},
	listItem: {
		borderBottom: "1px solid #ccc",
		padding: "10px 0",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	noteDetails: {
		display: "flex",
		flexDirection: "column",
	},
	noteTitle: {
		fontWeight: "bold",
		marginBottom: "5px",
	},
    editingInput: {
		width: "100%",
		padding: "8px",
		marginBottom: "10px",
		border: "1px solid #ccc",
		borderRadius: "4px",
	},
};

const AddClinicalNotes = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState({ title: "", description: "" });
	const [editingIndex, setEditingIndex] = useState(null);
	const [editingNote, setEditingNote] = useState({ title: "", description: "" });

	const addNote = () => {
		if (newNote.title.trim() ) {
			setNotes([...notes, { ...newNote }]);
			setNewNote({ title: "", description: "" });
		} else {
			alert("Title is required");
		}
	};

	const deleteNote = (index) => {
		setNotes(notes.filter((_, i) => i !== index));
	};

	const startEditing = (index) => {
		setEditingIndex(index);
		setEditingNote(notes[index]);
	};

	const saveEditing = () => {
		if (editingNote.title.trim()) {
			const updatedNotes = notes.map((note, index) =>
				index === editingIndex ? editingNote : note
			);
			setNotes(updatedNotes);
			setEditingIndex(null);
			setEditingNote({ title: "", description: "" });
		} else {
			alert("Title is required");
		}
	};

	return (
		<Layout title={"Clinical Notes"}>
			<div style={styles.container}>
				<h3 style={styles.heading}>Clinical Notes</h3>

				{/* Add New Note Section */}
				<div style={styles.addNoteSection}>
					<input
						style={styles.input}
						type="text"
						placeholder="Title"
						value={newNote.title}
						onChange={(e) =>
							setNewNote({ ...newNote, title: e.target.value })
						}
					/>
					<textarea
						style={styles.textarea}
						placeholder="Description"
						value={newNote.description}
						onChange={(e) =>
							setNewNote({
								...newNote,
								description: e.target.value,
							})
						}
					/>
					<button style={styles.button} onClick={addNote}>
						Add Note
					</button>
				</div>

				{/* Notes List */}
				{notes.length === 0 ? (
					<p>No clinical notes added yet.</p>
				) : (
					<ul style={styles.list}>
						{notes.map((note, index) => (
							<li key={index} style={styles.listItem}>
								{editingIndex === index ? (
									<div style={{ flex: 1 }}>
										<input
											style={styles.editingInput}
											type="text"
											value={editingNote.title}
											placeholder="Title"
											onChange={(e) =>
												setEditingNote({
													...editingNote,
													title: e.target.value,
												})
											}
										/>
										<textarea
											style={styles.editingInput}
											value={editingNote.description}
											placeholder="Description"
											onChange={(e) =>
												setEditingNote({
													...editingNote,
													description: e.target.value,
												})
											}
										/>
										<div>
											<button
												style={styles.button}
												onClick={saveEditing}>
												Save
											</button>
											<button
												style={{
													...styles.button,
													...styles.buttonSecondary,
												}}
												onClick={() =>
													setEditingIndex(null)
												}>
												Cancel
											</button>
										</div>
									</div>
								) : (
									<>
										<div style={styles.noteDetails}>
											<div style={styles.noteTitle}>
												{note.title}
											</div>
											<div>{note.description}</div>
										</div>
										<div>
											<button
												style={styles.button}
												onClick={() =>
													startEditing(index)
												}>
												Edit
											</button>
											<button
												style={{
													...styles.button,
													...styles.buttonDanger,
												}}
												onClick={() =>
													deleteNote(index)
												}>
												Delete
											</button>
										</div>
									</>
								)}
							</li>
						))}
					</ul>
				)}
			</div>
		</Layout>
	
	);
};

export default AddClinicalNotes;
