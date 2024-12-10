import React, { useState , useEffect} from "react";
import YMRS_DATA from "./YMRS_DATA.json";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateVacApp, detailsVacApp } from "../actions/vaccineAppointmentActions";
//YMRS From
const YMRSform = () => {
	const [form2Data, setForm2Data] = useState({
		fields: Array(11).fill(null),
	});

console.log(form2Data)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
  
	const [existingData, setExistingData] = useState(null);
  
	const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
	const { appointment: { appointment, pastAppointments } = {} } = vaccineAppList || {};
  
	useEffect(() => {
	  dispatch(detailsVacApp(id));
	}, [dispatch, id]);
  
	useEffect(() => {
	  if (appointment && appointment.ymrs) {
		setExistingData({ fields : Object.values(appointment?.ymrs?.info) });
	  }
	}, [appointment]);
  
	useEffect(() => {
	  if (existingData) {
		setForm2Data(existingData);
	  }
	}, [existingData]);

	const fieldNames = Object.values(YMRS_DATA).map((item) => {
		return item.fieldName;
	});

	const handleRadioChange = (index, value) => {
		setForm2Data((prevData) => {
			const updatedFields = [...prevData.fields];
			updatedFields[index] = value;
			return { ...prevData, fields: updatedFields };
		});
	};
	
	const handeFormSubmit = (e) => {
		e.preventDefault();
		
		console.log(fieldNames)
		const submittedData = fieldNames.reduce((result, currField, index) => {
			
			result[currField] = form2Data.fields[index];
			return result;
		}, {});
		console.log(submittedData);

		dispatch(updateVacApp({ _id: appointment._id, ymrs: {info : submittedData, score : Object.values(submittedData).reduce((acc, value) => acc + value, 0)} }));
		dispatch(detailsVacApp(id));
	};
	return (
		<>
			<form style={styles.form} onSubmit={handeFormSubmit}>
				<h3 style={styles.formHeader}>
					Young Mania Rating Scale (YMRS)
				</h3>
				<p style={styles.formDescription}>
					The Young Mania Rating Scale (YMRS) is one of the most
					frequently utilized rating scales to assess manic symptoms.
					The scale has 11 items and is based on the patient’s
					subjective report of his or her clinical condition over the
					previous 48 hours
				</p>
				<div style={styles.legend}>
					<p>0 = Not present</p>
					<p>1 = Mild</p>
					<p>2 = Moderate</p>
					<p>3 = Severe</p>
					<p>4 = Very severe</p>
				</div>
				<div style={styles.fieldsContainer}>
					{Object.values(YMRS_DATA).map((YMRS_OBJ, index) => (
						<div key={index} style={styles.fieldWrapper}>
							<label style={styles.label}>
								{YMRS_OBJ.fieldName}:
							</label>
							<div style={styles.radioGroup}>
								{YMRS_OBJ.options.map((option) => (
									<label
										key={option.label}
										style={styles.radioOption}>
										<input
											type="radio"
											name={`field-${index}`}
											value={option.value}
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
export default YMRSform;
