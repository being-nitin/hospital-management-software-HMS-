import React, { useState } from "react";

const SOMATIC_OBSESSIONS = [
	"Concern with illness or disease*",
	"Excessive concern with body part or aspect ofAppearance (eg., dysmorphophobia)*",
	"Other",
];

const SomaticObsessionChecklist = () => {
	const [checkboxstate, setCheckboxstate] = useState(
		SOMATIC_OBSESSIONS.reduce((acc, current) => {
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
					{SOMATIC_OBSESSIONS.map((obsession, index) => (
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

export default SomaticObsessionChecklist;
