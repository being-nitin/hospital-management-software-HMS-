import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dropdown, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
	detailsVacApp,
	updateVacApp,
} from "../actions/vaccineAppointmentActions";
import { useDispatch, useSelector } from "react-redux";

const Hamilton = () => {
	const [form2Data, setForm2Data] = useState({
		fields: Array(14).fill(null), // initialize empty values for 14 fields
	});

	const [existingData, setExistingData] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const fieldNames = [
		{
			name: "Anxious Mood",
			description:
				"Worries, anticipation of the worst, fearful anticipation, irritability.",
		},
		{
			name: "Tension",
			description:
				"Feelings of tension, fatigability, startled response, moved to tears easily, trembling, feelings of restlessness, inability to relax.",
		},
		{
			name: "Fears",
			description:
				"Of dark, of strangers, of being left alone, of animals, of traffic, of crowds.",
		},
		{
			name: "Insomnia",
			description:
				"Difficulty in falling asleep, broken sleep, unsatisfying sleep and fatigue on waking, dreams, nightmares, night terrors.",
		},
		{
			name: "Intellectual",
			description: "Difficulty in concentration, poor memory.",
		},
		{
			name: "Depressed Mood",
			description:
				"Loss of interest, lack of pleasure in hobbies, depression, early waking, diurnal swing.",
		},
		{
			name: "Somatic (Muscular)",
			description:
				"Pains and aches, twitching, stiffness, myoclonic jerks, grinding of teeth, unsteady voice, increased muscular tone.",
		},
		{
			name: "Somatic (Sensory)",
			description:
				"Tinnitus, blurring of vision, hot and cold flushes, feelings of weakness, pricking sensation.",
		},
		{
			name: "Cardiovascular Symptoms",
			description:
				"Tachycardia, palpitations, pain in chest, throbbing of vessels, fainting feelings, missing beat.",
		},
		{
			name: "Respiratory Symptoms",
			description:
				"Pressure or constriction in chest, choking feelings, sighing, dyspnea.",
		},
		{
			name: "Gastrointestinal Symptoms",
			description:
				"Difficulty in swallowing, wind, abdominal pain, burning sensations, abdominal fullness, nausea, vomiting, borborygm, looseness of bowels, loss of weight, constipation.",
		},
		{
			name: "Genitourinary Symptoms",
			description:
				"Frequency of micturition, urgency of micturition, amenorrhea, menorrhagia, development of frigidity, premature ejaculation, loss of libido, impotence.",
		},
		{
			name: "Autonomic Symptoms",
			description:
				"Dry mouth, flushing, pallor, tendency to sweat, giddiness, tension headache, raising of hair.",
		},
		{
			name: "Behavior At Interview",
			description:
				"Fidgeting, restlessness or pacing, tremor of hands, furrowed brow, strained face, sighing or rapid respiration, facial pallor, swallowing, etc.",
		},
	];

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
	const {
		loading,
		error,
		appointment: { appointment, pastAppointments } = {},
	} = vaccineAppList || {};

	useEffect(() => {
		if (userInfo) {
			dispatch(detailsVacApp(id));
		} else {
			navigate("/signin");
		}
	}, [dispatch, userInfo]);

	const handleForm2Submit = (e) => {
		e.preventDefault();
		
		const submittedData = fieldNames.reduce((result, fieldName, index) => {
			result[fieldName.name] = form2Data.fields[index];
			return result;
		}, {});
		dispatch(
			updateVacApp({
				_id: appointment._id,
				hamA: {
					info: submittedData,
					score: Object.values(submittedData).reduce(
						(acc, value) => acc + value,
						0
					),
				},
			})
		);
		dispatch(detailsVacApp(id));
		navigate(`/PsychologicalForm/${id}`)
	};

	const handleFormSubmit = () => {
		window.alert("You have successfully submitted the form.");
	};

	const handleRadioChange = (index, value) => {
		setForm2Data((prevData) => {
			const updatedFields = [...prevData.fields];
			updatedFields[index] = value;
			return { ...prevData, fields: updatedFields };
		});
	};

	useEffect(() => {
		setExistingData(appointment?.hamA ? appointment?.hamA?.info : null);
	}, [appointment]);

	useEffect(() => {
		if (existingData) {
			
			setForm2Data({ fields: Object.values(existingData) });
		}
	}, [existingData]);

	return (
		<>
			<button
				style={styles.viewButton}
				onClick={() =>
					navigate(`/viewHamiltomForm/${appointment._id}`)
				}>
				View{" "}
			</button>

			<form onSubmit={handleForm2Submit} style={styles.form}>
				<h3 style={styles.formHeader}>
					Hamilton Anxiety Rating Scale (HAM-A)
				</h3>
				<p style={styles.formDescription}>
					Below is a list of phrases that describe certain feelings
					that people have. Rate the patient by selecting the answer
					that best describes the extent to which they experience
					these conditions. Choose one of the five responses for each
					of the fourteen questions.
				</p>
				<div style={styles.legend}>
					<p>0 = Not present</p>
					<p>1 = Mild</p>
					<p>2 = Moderate</p>
					<p>3 = Severe</p>
					<p>4 = Very severe</p>
				</div>
				<div style={styles.fieldsContainer}>
					{fieldNames.map((fieldName, index) => (
						<div key={index} style={styles.fieldWrapper}>
							<label style={styles.label}>
								{fieldName.name}:
							</label>
							<p style={styles.description}>
								{fieldName.description}
							</p>
							<div style={styles.radioGroup}>
								{[0, 1, 2, 3, 4].map((option) => (
									<label
										key={option}
										style={styles.radioOption}>
										<input
											type="radio"
											name={`field-${index}`}
											value={option}
											checked={
												form2Data.fields[index] ===
												option
											}
											onChange={() =>
												handleRadioChange(index, option)
											}
											style={styles.radioInput}
										/>
										{option}
									</label>
								))}
							</div>
						</div>
					))}
				</div>
				<button
					type="submit"
					style={styles.submitButton}
					onClick={handleFormSubmit}>
					Submit
				</button>
			</form>
		</>
	);
};

const styles = {
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "20px",
		maxWidth: "900px",
		margin: "0 auto",
		padding: "30px",
		borderRadius: "10px",
		boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
		backgroundColor: "#f7f7f7",
	},
	formHeader: {
		fontSize: "24px",
		fontWeight: "bold",
		textAlign: "center",
		color: "#333",
	},
	formDescription: {
		fontSize: "16px",
		textAlign: "center",
		color: "#666",
		marginBottom: "20px",
	},
	legend: {
		display: "flex",
		justifyContent: "space-between",
		fontSize: "14px",
		color: "#555",
		marginBottom: "10px",
		borderBottom: "1px solid #ddd",
		paddingBottom: "10px",
	},
	fieldsContainer: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gap: "20px",
	},
	fieldWrapper: {
		display: "flex",
		flexDirection: "column",
		padding: "10px",
		backgroundColor: "#ffffff",
		borderRadius: "8px",
		boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
	},
	label: {
		fontSize: "16px",
		fontWeight: "600",
		color: "#333",
		marginBottom: "10px",
	},
	radioGroup: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "5px 0",
	},
	radioOption: {
		display: "flex",
		alignItems: "center",
		gap: "5px",
	},
	radioInput: {
		accentColor: "#007BFF",
	},
	submitButton: {
		alignSelf: "center",
		padding: "12px 24px",
		backgroundColor: "#28a745",
		color: "#fff",
		border: "none",
		borderRadius: "5px",
		fontSize: "16px",
		fontWeight: "600",
		cursor: "pointer",
		transition: "background-color 0.3s",
	},
	viewButton: {
		padding: "10px 20px",
		backgroundColor: "#28a745",
		margin: "20px",
		color: "#FFFFFF",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
	},
};
export default Hamilton;
