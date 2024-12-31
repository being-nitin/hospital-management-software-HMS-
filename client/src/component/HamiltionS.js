import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	updateVacApp,
	detailsVacApp,
} from "../actions/vaccineAppointmentActions";

// Hamilton Depression Scale JSON Data
const hamDData = {
	1: {
		fieldName: "Depressed Mood",
		options: [
			{ value: 0, label: "Absent" },
			{ value: 1, label: "Indicated only on questioning" },
			{ value: 2, label: "Spontaneously reported verbally" },
			{
				value: 3,
				label: "Non-verbal communication (facial expression, posture, etc.)",
			},
			{
				value: 4,
				label: "Virtually only these feelings in communication",
			},
		],
	},
	2: {
		fieldName: "Feelings of Guilt",
		options: [
			{ value: 0, label: "Absent" },
			{ value: 1, label: "Self reproach, feels let down" },
			{ value: 2, label: "Ideas of guilt or rumination" },
			{ value: 3, label: "Illness as a punishment, guilt delusions" },
			{
				value: 4,
				label: "Accusatory voices, threatening visual hallucinations",
			},
		],
	},
	3: {
		fieldName: "Suicide",
		options: [
			{ value: 0, label: "Absent" },
			{ value: 1, label: "Feels life is not worth living" },
			{ value: 2, label: "Wishes to be dead or thoughts of death" },
			{ value: 3, label: "Ideas or gestures of suicide" },
			{ value: 4, label: "Attempts at suicide" },
		],
	},
	4: {
		fieldName: "Insomnia: Early in the Night",
		options: [
			{ value: 0, label: "No difficulty falling asleep" },
			{ value: 1, label: "Occasional difficulty falling asleep" },
			{ value: 2, label: "Nightly difficulty falling asleep" },
		],
	},
	5: {
		fieldName: "Insomnia: Middle of the Night",
		options: [
			{ value: 0, label: "No difficulty" },
			{ value: 1, label: "Restlessness or disturbance" },
			{ value: 2, label: "Waking during the night" },
		],
	},
	6: {
		fieldName: "Insomnia: Early Hours of the Morning",
		options: [
			{ value: 0, label: "No difficulty" },
			{
				value: 1,
				label: "Wakes in early morning but goes back to sleep",
			},
			{
				value: 2,
				label: "Unable to fall asleep again after getting out of bed",
			},
		],
	},
	7: {
		fieldName: "Work and Activities",
		options: [
			{ value: 0, label: "No difficulty" },
			{
				value: 1,
				label: "Feelings of incapacity, fatigue, or weakness related to work or hobbies",
			},
			{
				value: 2,
				label: "Loss of interest in activities, hobbies, or work",
			},
			{
				value: 3,
				label: "Decreased time spent in activities or decreased productivity",
			},
			{ value: 4, label: "Stopped working due to illness" },
		],
	},
	8: {
		fieldName: "Retardation",
		options: [
			{ value: 0, label: "Normal speech and thought" },
			{ value: 1, label: "Slight retardation during interview" },
			{ value: 2, label: "Obvious retardation during interview" },
			{ value: 3, label: "Interview difficult" },
			{ value: 4, label: "Complete stupor" },
		],
	},
	9: {
		fieldName: "Agitation",
		options: [
			{ value: 0, label: "None" },
			{ value: 1, label: "Fidgetiness" },
			{ value: 2, label: "Playing with hands, hair, etc." },
			{ value: 3, label: "Moving about, can’t sit still" },
			{ value: 4, label: "Hand wringing, nail biting, hair-pulling" },
		],
	},
	10: {
		fieldName: "Anxiety Psychic",
		options: [
			{ value: 0, label: "No difficulty" },
			{ value: 1, label: "Subjective tension and irritability" },
			{ value: 2, label: "Worrying about minor matters" },
			{
				value: 3,
				label: "Apprehensive attitude apparent in face or speech",
			},
			{ value: 4, label: "Fears expressed without questioning" },
		],
	},
	11: {
		fieldName: "Anxiety Somatic",
		options: [
			{ value: 0, label: "Absent" },
			{ value: 1, label: "Mild" },
			{ value: 2, label: "Moderate" },
			{ value: 3, label: "Severe" },
			{ value: 4, label: "Incapacitating" },
		],
	},
	12: {
		fieldName: "Somatic Symptoms Gastro-intestinal",
		options: [
			{ value: 0, label: "None" },
			{
				value: 1,
				label: "Loss of appetite, eating without encouragement",
			},
			{
				value: 2,
				label: "Difficulty eating without urging, requires medication",
			},
		],
	},
	13: {
		fieldName: "General Somatic Symptoms",
		options: [
			{ value: 0, label: "None" },
			{ value: 1, label: "Heaviness in limbs, back, or head, fatigue" },
			{ value: 2, label: "Clear-cut symptom" },
		],
	},
	14: {
		fieldName: "Genital Symptoms",
		options: [
			{ value: 0, label: "Absent" },
			{ value: 1, label: "Mild" },
			{ value: 2, label: "Severe" },
		],
	},
	15: {
		fieldName: "Hypochondriasis",
		options: [
			{ value: 0, label: "Not present" },
			{ value: 1, label: "Self-absorption (bodily)" },
			{ value: 2, label: "Preoccupation with health" },
			{ value: 3, label: "Frequent complaints, requests for help" },
			{ value: 4, label: "Hypochondriacal delusions" },
		],
	},
	16: {
		fieldName: "Loss of Weight",
		options: [
			{ value: 0, label: "No weight loss" },
			{ value: 1, label: "Probable weight loss associated with illness" },
			{ value: 2, label: "Definite weight loss" },
			{ value: 3, label: "Not assessed" },
		],
	},
	17: {
		fieldName: "Insight",
		options: [
			{ value: 0, label: "Acknowledges being depressed and ill" },
			{
				value: 1,
				label: "Acknowledges illness but attributes cause to external factors",
			},
			{ value: 2, label: "Denies being ill" },
		],
	},
};
const HamiltonDepressionForm = () => {
	const [formData, setFormData] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const [existingData, setExistingData] = useState(null);

	const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
	const { appointment: { appointment, pastAppointments } = {} } =
		vaccineAppList || {};

	console.log(vaccineAppList);
	useEffect(() => {
		dispatch(detailsVacApp(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (appointment && appointment.hamD) {
			setExistingData(appointment?.hamD?.info);
		}
	}, [appointment]);

	useEffect(() => {
		if (existingData) {
			setFormData(existingData);
		}
	}, [existingData]);

	const handleRadioChange = (field, value) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};
	console.log(formData);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			updateVacApp({
				_id: appointment._id,
				hamD: {
					info: formData,
					score: Object.values(formData).reduce(
						(acc, value) => acc + value,
						0
					),
				},
			})
		);
		dispatch(detailsVacApp(id));
	};
	const handleFormSubmit = () => {
		window.alert("You have successfully submitted the form.");
	};

	return (
		<div className="hamd-form-container">
			<form className="hamd-form" onSubmit={handleSubmit}>
				<h2 className="form-title">
					Hamilton Depression Rating Scale (HAM-D)
				</h2>
				{Object.keys(hamDData).map((key) => {
					const field = hamDData[key];
					return (
						<div key={key} className="form-group">
							<label className="field-label">
								{field.fieldName}
							</label>
							<div className="radio-options">
								{field.options.map((option, i) => (
									<label
										key={option.value}
										className="radio-label">
										<input
											type="radio"
											name={field.fieldName}
											value={option.value}
											checked={
												formData[field.fieldName] ===
												option.value
											}
											onChange={() =>
												handleRadioChange(
													field.fieldName,
													option.value
												)
											}
											className="radio-input"
										/>
										{i} {option.label}
									</label>
								))}
							</div>
						</div>
					);
				})}
				<button
					type="submit"
					className="submit-btn"
					onClick={handleFormSubmit}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default HamiltonDepressionForm;

// CSS for styling
const styles = `
    .hamd-form-container {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .form-title {
      text-align: center;
      font-size: 24px;
      color: #333;
      margin-bottom: 20px;
      font-family: 'Arial', sans-serif;
    }
  
    .hamd-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    .field-label {
      font-weight: bold;
      color: #555;
    }
  
    .radio-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  
    .radio-label {
      display: flex;
      align-items: center;
    }
  
    .radio-input {
      margin-right: 10px;
    }
  
    .submit-btn {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;
      align-self: center;
    }
  
    .submit-btn:hover {
      background-color: #0056b3;
    }
  `;

// Injecting the styles dynamically
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
