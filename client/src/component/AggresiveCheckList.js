import React, { useState } from "react";

const AGGRESSIVE_OBSESSIONS = [
	"Fear might harm self",
	"Fear might harm others",
	"Violent or horrific images",
	"Fear of blurting out obscenities or insults",
	"Fear of doing something else embarrassing",
	"Fear will act on unwanted impulses (e.g., to stab friend)",
	"Fear will steal things",
	"Fear will harm others because not careful enough (e.g., hit/run motor vehicle accident)",
	"Fear will be responsible for something else terrible happening (e.g., fire, burglary, Other)",
];

const AggressiveObsessionCheckList = () => {
	const [checkboxstate, setCheckboxstate] = useState(
		AGGRESSIVE_OBSESSIONS.reduce((acc, current) => {
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
			<h1 style={styles.heading}>AGGRESSIVE OBSESSION CHECKLIST</h1>
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
							Aggressive Obsession
						</td>
					</tr>
				</thead>
				<tbody>
					{AGGRESSIVE_OBSESSIONS.map((obsession, index) => (
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

export default AggressiveObsessionCheckList;
