		import { useState , useEffect } from "react";
		import SympotomsData from "./YBOCSSymptomsData.json";
		import { useDispatch, useSelector } from "react-redux";
		import { updateVacApp, detailsVacApp } from "../actions/vaccineAppointmentActions";


		const SymptomChecklist = ({ obsessionArray, heading, appointment }) => {
			const dispatch = useDispatch();
			
			const [checkboxstate, setCheckboxstate] = useState(
				() =>
					appointment?.ybocs?.[heading] ||
					obsessionArray.reduce((acc, current) => {
						acc[current] = { current: false, past: false };
						return acc;
					}, {})
			);

			useEffect(() => {
				if (appointment?.ybocs?.[heading]) {
					setCheckboxstate(appointment.ybocs?.[heading]);
				}
			}, [appointment]);

			// Handle checkbox state change and update Redux
			const handleOnChange = (obsession, type) => {
				const updatedState = {
					...checkboxstate,
					[obsession]: {
						...checkboxstate[obsession],
						[type]: !checkboxstate[obsession]?.[type],
					},
				};
				setCheckboxstate(updatedState);
				
				dispatch(
					updateVacApp({
						_id: appointment?._id,
						ybocs: {
							...appointment?.ybocs,
							[heading]: updatedState
						},
					})
				);
				dispatch(detailsVacApp(appointment?._id)); 
			};

			return (
				<div style={styles.container}>
					<h1 style={styles.heading}>{heading} CHECKLIST</h1>
					<table style={styles.table}>
						<thead>
							<tr>
								<td style={{ padding: "10px", textAlign: "left" }}>Current</td>
								<td style={{ padding: "10px", textAlign: "left" }}>Past</td>
								<td style={{ padding: "10px" }}>{heading}</td>
							</tr>
						</thead>
						<tbody>
							{obsessionArray.map((obsession, index) => (
								<tr key={index} style={styles.tableRow}>
									<td style={{ textAlign: "left", padding: "10px" }}>
										<input
											type="checkbox"
											checked={checkboxstate[obsession]?.current || false}
											onChange={() => handleOnChange(obsession, "current")}
										/>
									</td>
									<td style={{ textAlign: "left", padding: "10px" }}>
										<input
											type="checkbox"
											checked={checkboxstate[obsession]?.past || false}
											onChange={() => handleOnChange(obsession, "past")}
										/>
									</td>
									<td style={{ padding: "10px" }}>{obsession}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			);
		};


		const YBOCSSymptomsChecklist = ({ appointment }) => {
			return (
				<>
					<h1 style={{ textAlign: "center" }}>Y-BOCS Symptom Checklist</h1>
					{Object.keys(SympotomsData).map((item) => (
						<SymptomChecklist
							key={item}
							obsessionArray={SympotomsData[item]}
							heading={item}
							appointment={appointment} // Pass the appointment data
						/>
					))}
				</>
			);
		};

		const styles = {
			container: {
				margin: "20px 20px",
				padding: "10px",
				display: "flex",
				flexDirection: "column",
			},
			heading: {
				textAlign: "center",
				fontSize: "2rem",
			},
			table: {
				border: "1px solid #000",
				textAlign: "left",
				borderCollapse: "collapse",
				margin: "0px auto",
				padding: "10px 5px",
				borderRadius: "4px",
				width: "80%",
			},
		};

		export default YBOCSSymptomsChecklist;
