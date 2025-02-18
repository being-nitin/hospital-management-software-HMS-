import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { listSetting, updateSetting } from "../actions/settingAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
		padding: "5px 12px",
		margin: "0px 8px",
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

const TreatmentList = () => {
	const [treatments, setTreatments] = useState([]);
	const [newTreatment, setNewTreatment] = useState({ name: "", price: "" });
	const [editingIndex, setEditingIndex] = useState(null);
	const [editingTreatment, setEditingTreatment] = useState({
		name: "",
		price: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const addTreatment = () => {
		if (newTreatment.name.trim() && newTreatment.price.trim()) {
			setTreatments([...treatments, { ...newTreatment }]);
			setNewTreatment({ name: "", price: "" });
		} else {
			alert("Please fill in both name and price");
		}
	};

	const deleteTreatment = (index) => {
		setTreatments(treatments.filter((_, i) => i !== index));
	};

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userSetting = useSelector((state) => state.listSetting);
	const { settings } = userSetting;

	useEffect(() => {
		dispatch(updateSetting(null ,{ treatment: treatments }));
	}, [treatments]);

	useEffect(() => {
		if (userInfo) {
			dispatch(listSetting());
		} else {
			navigate("/signin");
		}
	}, [dispatch, userInfo, navigate]);

	const startEditing = (index) => {
		setEditingIndex(index);
		setEditingTreatment(treatments[index]);
	};

	const saveEditing = () => {
		if (editingTreatment.name.trim() && editingTreatment.price.trim()) {
			setTreatments(
				treatments.map((treatment, i) =>
					i === editingIndex ? { ...editingTreatment } : treatment
				)
			);
			setEditingIndex(null);
			setEditingTreatment({ name: "", price: "" });
		} else {
			alert("Please provide both name and price");
		}
	};

	useEffect(() => {
		if (settings?.data.treatment) {
			setTreatments(settings.data.treatment);
		}
	}, [settings]);

	return (
		<Layout title={"Treatment List"}>
			<div style={styles.container}>
				<h3 style={styles.heading}>Treatment List</h3>
				<div style={styles.addTreatmentSection}>
					<input
						style={styles.input}
						type="text"
						placeholder="Treatment name"
						value={newTreatment.name}
						onChange={(e) =>
							setNewTreatment({
								...newTreatment,
								name: e.target.value,
							})
						}
					/>
					<input
						style={styles.input}
						type="text"
						placeholder="Price"
						value={newTreatment.price}
						onChange={(e) =>
							setNewTreatment({
								...newTreatment,
								price: e.target.value,
							})
						}
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
											placeholder="Name"
											value={editingTreatment.name}
											onChange={(e) =>
												setEditingTreatment({
													...editingTreatment,
													name: e.target.value,
												})
											}
										/>
										<input
											style={styles.editingInput}
											type="text"
											placeholder="Price"
											value={editingTreatment.price}
											onChange={(e) =>
												setEditingTreatment({
													...editingTreatment,
													price: e.target.value,
												})
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
											onClick={() =>
												setEditingIndex(null)
											}>
											Cancel
										</button>
									</>
								) : (
									<>
										<span>
											<strong>{treatment.name}</strong> -{" "}
											₹{treatment.price}
										</span>
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
													deleteTreatment(index)
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

export default TreatmentList;
