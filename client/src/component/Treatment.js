import React, { useState } from "react";

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
	addTreatmentSection: {
		display: "flex",
		gap: "10px",
		marginBottom: "20px",
	},
	input: {
		flex: 1,
		padding: "8px",
		border: "1px solid #ccc",
		borderRadius: "4px",
	},
	button: {
		padding: "8px 12px",
		backgroundColor: "#007BFF",
		color: "white",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
	},
	buttonSecondary: {
		backgroundColor: "#6c757d",
	},
	buttonDanger: {
		backgroundColor: "#dc3545",
	},
	list: {
		listStyleType: "none",
		padding: 0,
	},
	listItem: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "8px",
		borderBottom: "1px solid #ccc",
	},
	editingInput: {
		flex: 1,
		padding: "8px",
		marginRight: "10px",
		border: "1px solid #ccc",
		borderRadius: "4px",
	},
};

const list = ["got to gym"];
const TreatmentList = () => {
	const [treatments, setTreatments] = useState(list);
	const [newTreatment, setNewTreatment] = useState("");
	const [editingIndex, setEditingIndex] = useState(null);
	const [editingTreatment, setEditingTreatment] = useState("");

	const addTreatment = () => {
		if (newTreatment.trim()) {
			setTreatments([...treatments, newTreatment.trim()]);
			setNewTreatment("");
		}
	};

	const deleteTreatment = (index) => {
		setTreatments(treatments.filter((item, i) => i !== index));
	};

	const startEditing = (index) => {
		setEditingIndex(index);
		setEditingTreatment(treatments[index]);
	};

	const saveEditing = () => {
		if (editingTreatment.trim()) {
			setTreatments(
				treatments.map((treatment, i) =>
					i === editingIndex ? editingTreatment.trim() : treatment
				)
			);
			setEditingIndex(null);
			setEditingTreatment("");
		} else {
			alert("Write Something");
		}
	};

	return (
		<div style={styles.container}>
			<h3 style={styles.heading}>Treatment List</h3>
			<div style={styles.addTreatmentSection}>
				<input
					style={styles.input}
					type="text"
					placeholder="Add a new treatment"
					value={newTreatment}
					onChange={(e) => setNewTreatment(e.target.value)}
				/>
				<button style={styles.button} onClick={addTreatment}>
					Add
				</button>
			</div>

			{treatments.length === 0 ? (
				"Add a treatment"
			) : (
				<ul style={styles.list}>
					{treatments.map((treatment, index) => (
						<li key={index} style={styles.listItem}>
							{editingIndex === index ? (
								<>
									<input
										style={styles.editingInput}
										type="text"
										value={editingTreatment}
										onChange={(e) =>
											setEditingTreatment(e.target.value)
										}
									/>
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
										onClick={() => setEditingIndex(null)}>
										Cancel
									</button>
								</>
							) : (
								<>
									{treatment}
									<button
										style={styles.button}
										onClick={() => startEditing(index)}>
										Edit
									</button>
									<button
										style={{
											...styles.button,
											...styles.buttonDanger,
										}}
										onClick={() => deleteTreatment(index)}>
										Delete
									</button>
								</>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TreatmentList;
