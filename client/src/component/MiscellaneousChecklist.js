import React, { useState } from "react";

const MISCELLANEOUS_OBSESSIONS = [
	"Need to know or remember",
	"Fear of saying certain things",
	"Fear of not saying just the right thing",
	"Fear of losing things",
	"Intrusive (nonviolent) images",
	"Intrusive nonsense sounds, words, or music",
	"Bothered by certain sounds/noises*",
	"Lucky/unlucky numbers",
	"Colors with special significance",
	"3 superstitious fears",
	"others",
];

const MiscellaneousObsessionChecklist = () => {
	const [checkboxstate, setCheckboxstate] = useState(
		MISCELLANEOUS_OBSESSIONS.reduce((acc, current) => {
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
			<h1 style={styles.heading}>MISCELLANEOUS OBSESSION CHECKLIST</h1>
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
							Miscellaneous Obsession
						</td>
					</tr>
				</thead>
				<tbody>
					{MISCELLANEOUS_OBSESSIONS.map((obsession, index) => (
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

export default MiscellaneousObsessionChecklist;
