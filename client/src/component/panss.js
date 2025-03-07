import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	updateVacApp,
	detailsVacApp,
} from "../actions/vaccineAppointmentActions";

const PANSSForm = () => {
	const [formData, setFormData] = useState({});
	const categories = [
		{
			title: "Positive Scale",
			questions: [
				{
					id: "P1",
					label: "Delusions",
					description:
						"Beliefs which are unfounded, unrealistic, and idiosyncratic.",
				},
				{
					id: "P2",
					label: "Conceptual Disorganization",
					description: "Disorganized process of thinking.",
				},
				{
					id: "P3",
					label: "Hallucinatory Behavior",
					description:
						"Perceptions not generated by external stimuli.",
				},
				{
					id: "P4",
					label: "Excitement",
					description: "Hyperactivity or excessive mood lability.",
				},
				{
					id: "P5",
					label: "Grandiosity",
					description:
						"Exaggerated self-opinion or delusions of superiority.",
				},
				{
					id: "P6",
					label: "Suspiciousness/Persecution",
					description: "Exaggerated ideas of persecution.",
				},
				{
					id: "P7",
					label: "Hostility",
					description:
						"Verbal and nonverbal expressions of anger and resentment.",
				},
			],
		},
		{
			title: "Negative Scale",
			questions: [
				{
					id: "N1",
					label: "Blunted Affect",
					description: "Reduction in emotional responsiveness.",
				},
				{
					id: "N2",
					label: "Emotional Withdrawal",
					description: "Lack of affective commitment to events.",
				},
				{
					id: "N3",
					label: "Poor Rapport",
					description: "Lack of interpersonal empathy and openness.",
				},
				{
					id: "N4",
					label: "Passive/Apathetic Social Withdrawal",
					description: "Reduced interpersonal involvement.",
				},
				{
					id: "N5",
					label: "Difficulty in Abstract Thinking",
					description: "Impairment in abstract-symbolic thinking.",
				},
				{
					id: "N6",
					label: "Lack of Spontaneity and Flow of Conversation",
					description: "Reduction in communication flow.",
				},
				{
					id: "N7",
					label: "Stereotyped Thinking",
					description:
						"Repetition and rigidity in thought processes.",
				},
			],
		},
		{
			title: "General Psychopathology Scale",
			questions: [
				{
					id: "G1",
					label: "Somatic Concern",
					description:
						"Physical complaints or beliefs about bodily illness.",
				},
				{
					id: "G2",
					label: "Anxiety",
					description:
						"Feelings of nervousness, worry, or restlessness.",
				},
				{
					id: "G3",
					label: "Guilt Feelings",
					description: "Sense of remorse or self-blame.",
				},
				{
					id: "G4",
					label: "Tension",
					description:
						"Overt physical manifestations of fear or anxiety.",
				},
				{
					id: "G5",
					label: "Mannerisms and Posturing",
					description: "Unnatural movements or posture.",
				},
				{
					id: "G6",
					label: "Depression",
					description: "Feelings of sadness or hopelessness.",
				},
				{
					id: "G7",
					label: "Motor Retardation",
					description: "Reduction in motor activity.",
				},
				{
					id: "G8",
					label: "Uncooperativeness",
					description: "Active refusal to comply with social norms.",
				},
				{
					id: "G9",
					label: "Unusual Thought Content",
					description: "Strange or bizarre ideas.",
				},
				{
					id: "G10",
					label: "Disorientation",
					description:
						"Lack of awareness of one’s relationship to the environment.",
				},
				{
					id: "G11",
					label: "Poor Attention",
					description: "Failure in focused alertness.",
				},
				{
					id: "G12",
					label: "Lack of Judgment and Insight",
					description:
						"Impaired awareness of one’s psychiatric condition.",
				},
				{
					id: "G13",
					label: "Disturbance of Volition",
					description: "Impaired initiation and control of actions.",
				},
				{
					id: "G14",
					label: "Poor Impulse Control",
					description:
						"Disordered regulation and control of actions.",
				},
				{
					id: "G15",
					label: "Preoccupation",
					description:
						"Absorption with internal thoughts and feelings.",
				},
				{
					id: "G16",
					label: "Active Social Avoidance",
					description: "Diminished social involvement.",
				},
			],
		},
	];

	const scoreDescriptions = [
		{ score: 1, description: "Absent" },
		{ score: 2, description: "Minimal" },
		{ score: 3, description: "Mild" },
		{ score: 4, description: "Moderate" },
		{ score: 5, description: "Moderate Severe" },
		{ score: 6, description: "Severe" },
		{ score: 7, description: "Extreme" },
	];

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const [existingData, setExistingData] = useState(null);

	const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
	const { appointment: { appointment, pastAppointments } = {} } =
		vaccineAppList || {};

	useEffect(() => {
		dispatch(detailsVacApp(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (appointment && appointment.panss) {
			setExistingData(appointment?.panss?.info);
		}
	}, [appointment]);

	const handleChange = (id, value) => {
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	useEffect(() => {
		if (existingData) {
			setFormData(existingData);
		}
	}, [existingData]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			updateVacApp({
				_id: appointment._id,
				panss: {
					info: formData,
					score: Object.values(formData).reduce(
						(acc, value) => acc + Number(value),
						0
					),
				},
			})
		);
		dispatch(detailsVacApp(id));
		alert("You have successfully submitted the form.");
		// navigate(`/PsychologicalForm/${id}`)
		window.close()
	};

	return (
		<div className="container mt-5">
			<h1 className="mb-4 text-center text-dark fw-bold">
				Positive and Negative Syndrome Scale (PANSS)
			</h1>
			<p className="text-center text-muted mb-5">
				Please complete the form by selecting a score for each question.
				Use the descriptions to guide your choices.
			</p>
			<form
				onSubmit={handleSubmit}
				className="panss-form shadow-sm p-4 rounded bg-light">
				{categories.map((category) => (
					<div key={category.title} className="mb-5">
						<h2 className="text-primary border-bottom pb-2">
							{category.title}
						</h2>
						{category.questions.map((q) => (
							<div
								key={q.id}
								className="question mb-4 p-3 rounded border">
								<h5 className="text-secondary fw-semibold">
									{q.id} {q.label}
								</h5>
								<p className="text-muted">{q.description}</p>
								<div className="d-flex flex-wrap align-items-center gap-3">
									{scoreDescriptions.map((score) => (
										<label
											key={score.score}
											className="form-check-label d-flex align-items-center ml-3 mr-3 gap-2 px-2 py-1  shadow-sm"
											style={{ cursor: "pointer" }}>
											<input
												type="radio"
												name={q.id}
												value={score.score}
												checked={
													Number(formData[q.id]) ===
													Number(score.score)
												}
												onChange={(e) =>
													handleChange(
														q.id,
														e.target.value
													)
												}
												className="form-check-input"
												
											/>
											<span>
												{score.score} -{" "}
												<span className="text-muted">
													{score.description}
												</span>
											</span>
										</label>
									))}
								</div>
							</div>
						))}
					</div>
				))}
				<div className="text-center mt-4">
					<button
						type="submit"
						className="btn btn-primary btn-lg px-5">
						Submit Form
					</button>
				</div>
			</form>
		</div>
	);
};

export default PANSSForm;
