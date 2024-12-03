import React, { useState } from "react";
import YBOCS_DATA from "./YBOCS_DATA.json";

const YBOCS = () => {
	const [form2Data, setForm2Data] = useState({
		fields: Array(10).fill(null),
	});
	const [totalScore, setTotalScore] = useState(0);

	const handleRadioChange = (index, value) => {
		setForm2Data((prevData) => {
			const updatedFields = [...prevData.fields];
			updatedFields[index] = value;
			return { ...prevData, fields: updatedFields };
		});
	};

	const fieldNames = YBOCS_DATA["Obsessive thoughts"]
		.concat(YBOCS_DATA["Compulsive Behaviors"])
		.map(({ fieldName }) => fieldName);

	const handeFormSubmit = (e) => {
		e.preventDefault();
		console.log(form2Data);
		const submittedData = fieldNames.reduce((result, currField, index) => {
			result[currField] = form2Data.fields[index];
			return result;
		}, {});
		console.log(submittedData);

		const calculateScore = Object.values(submittedData).reduce(
			(acc, currValue) => {
				return acc + currValue;
			},
			0
		);
		setTotalScore(calculateScore);
		console.log("Total Score", calculateScore);
	};

	return (
		<>
			<form style={styles.form} onSubmit={handeFormSubmit}>
				<h3 style={styles.formHeader}>
					YALE-BROWN OBSESSIVE COMPULSIVE SCALE (Y-BOCS)
				</h3>
				<p style={styles.formDescription}>
					Obsessions are unwanted ideas, images or impulses that
					intrude on thinking against your wishes and efforts to
					resist them. They usually involve themes of harm, risk and
					danger. Common obsessions are excessive fears of
					contamination; recurring doubts about danger, extreme
					concern with order, symmetry, or exactness; fear of losing
					important things.
				</p>

				<h5>Questions 1-5: Evaluating Obsessive Thinking Patterns</h5>
				<h5>Questions 6-10: Assessing Compulsive Thinking Behaviors</h5>

				<div styles={styles.fieldsContainer}>
					{YBOCS_DATA["Obsessive thoughts"]
						.concat(YBOCS_DATA["Compulsive Behaviors"])
						.map(({ fieldName, options }, index) => (
							<div key={fieldName} style={styles.fieldWrapper}>
								<label style={styles.label}>{fieldName}:</label>
								<div style={styles.radioGroup}>
									{options.map((option) => (
										<label
											key={option.label}
											style={styles.radioOption}>
											<input
												type="radio"
												name={`field-${index}`}
												value={option.label}
												checked={
													form2Data.fields[index] ===
													option.value
												}
												onChange={() =>
													handleRadioChange(
														index,
														option.value
													)
												}
												style={styles.radioInput}
											/>
											{option.value} : {option.label}
										</label>
									))}
								</div>
							</div>
						))}
				</div>
				<button type="submit" style={styles.submitButton}>
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
		margin: "10px 0px",
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
		flexDirection: "column",
		// justifyContent: "space-between",
		// alignItems: "center",
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
export default YBOCS;
