import { useState } from "react";
import SympotomsData from "./YBOCSSymptomsData.json";

const SympotomChecklist = ({ obsessionArray, heading }) => {
	const [checkboxstate, setCheckboxstate] = useState(
		obsessionArray.reduce((acc, current) => {
			acc[current] = { current: false, past: false };
			return acc;
		}, {})
	);

	const handleOnChange = (obsession, type) => {
		setCheckboxstate((prevState) => ({
			...prevState,
			[obsession]: {
				...prevState[obsession],
				[type]: !prevState[obsession][type],
			},
		}));
	};

	console.log(checkboxstate);
	return (
		<div style={styles.container}>
			<h1 style={styles.heading}>{heading} CHECKLIST</h1>
			<table style={styles.table}>
				<thead>
					<tr>
						<td
							style={{
								padding: "10px",
								textAlign: "left",
							}}>
							Current
						</td>
						<td
							style={{
								padding: "10px",
								textAlign: "left",
							}}>
							Past
						</td>
						<td style={{ padding: "10px" }}>{heading}</td>
					</tr>
				</thead>
				<tbody>
					{obsessionArray.map((obsession, index) => (
						<tr key={index} style={styles.tableRow}>
							<td style={{ textAlign: "left", padding: "10px" }}>
								<input
									type="checkbox"
									checked={checkboxstate[obsession].current}
									onChange={() =>
										handleOnChange(obsession, "current")
									}
								/>
							</td>
							<td style={{ textAlign: "left", padding: "10px" }}>
								<input
									type="checkbox"
									checked={checkboxstate[obsession].past}
									onChange={() =>
										handleOnChange(obsession, "past")
									}
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

const YBOCSSymptomsChecklist = () => {
	return (
		<>
			<h1 style={{ textAlign: "center" }}>Y-BOCS Symptom Checklist</h1>
			{Object.keys(SympotomsData).map((item) => (
				<SympotomChecklist
					key={item}
					obsessionArray={SympotomsData[item]}
					heading={item}
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
