import React, { useState } from "react";

const CONTAMINATION_OBSESSIONS = [
	"Concerns or disgust w with bodily waste or secretions (e.g., urine, feces, saliva Concern with dirt or germs",
	"Excessive concern with environmental contaminants (e.g. asbestos, radiation toxic waste)",
	"Excessive concern with household items (e.g., cleansers solvents)",
	"Excessive concern with animals (e.g., insects)",
	"Bothered by sticky substances or residues",
	"Concerned will get ill because of contaminant",
	"Concerned will get others ill by spreading contaminant (Aggressive)",
	"No concern with consequences of contamination other than how it might feel",
];

const ContaminationObsessionChecklist = () => {
	const [checkboxstate, setCheckboxstate] = useState(
		CONTAMINATION_OBSESSIONS.reduce((acc, current) => {
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
			<h1 style={styles.heading}>CONTAMINATION OBSESSION CHECKLIST</h1>
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
						<td style={{ padding: "10px" }}>
							Contamination Obsession
						</td>
					</tr>
				</thead>
				<tbody>
					{CONTAMINATION_OBSESSIONS.map((obsession, index) => (
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

const styles = {
	container: {
		margin: "20px 20px",
		padding: "10px",
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
	},
};

export default ContaminationObsessionChecklist;
