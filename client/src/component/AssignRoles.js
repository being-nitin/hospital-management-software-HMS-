import React, { useState } from "react";
import Layout from "../core/Layout";

const styles = {
	container: {
		padding: "20px",
		fontFamily: "Arial, sans-serif",
		maxWidth: "800px",
		margin: "30px auto",
		backgroundColor: "#f9f9f9",
		border: "1px solid #ccc",
		borderRadius: "8px",
	},
	heading: {
		textAlign: "center",
		color: "#333",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		marginBottom: "20px",
	},
	input: {
		padding: "8px",
		border: "1px solid #ccc",
		borderRadius: "4px",
		fontSize: "16px",
	},
	select: {
		padding: "8px",
		border: "1px solid #ccc",
		borderRadius: "4px",
		fontSize: "16px",
	},
	button: {
		padding: "8px 12px",
		backgroundColor: "#007BFF",
		color: "white",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
		fontSize: "16px",
	},
	list: {
		listStyleType: "none",
		padding: 0,
	},
	listItem: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottom: "1px solid #ccc",
		padding: "10px 0",
	},
	itemDetails: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
	},
	itemTitle: {
		fontWeight: "bold",
		color: "#333",
	},
	buttonDanger: {
		backgroundColor: "#dc3545",
		color: "white",
		padding: "5px 10px",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
		fontSize: "14px",
	},
};

const AssignRoles = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		role: "Admin",
	});
	const [rolesList, setRolesList] = useState([]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleAddRole = () => {
		const { email, password, role } = formData;

		if (!email.trim() || !password.trim() || !role) {
			alert("All fields are required!");
			return;
		}

		// Add role to the list
		setRolesList([...rolesList, { email, role }]);
		// Clear form
		setFormData({ email: "", password: "", role: "Admin" });
	};

	const handleDelete = (index) => {
		setRolesList(rolesList.filter((_, i) => i !== index));
	};

	return (
		<Layout title={"Assign Roles"}>
			<div style={styles.container}>
				<h3 style={styles.heading}>Assign Roles</h3>

				{/* Input Form */}
				<div style={styles.form}>
					<input
						style={styles.input}
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleInputChange}
					/>
					<input
						style={styles.input}
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleInputChange}
					/>
					<select
						style={styles.select}
						name="role"
						value={formData.role}
						onChange={handleInputChange}>
						<option value="Admin">Admin</option>
						<option value="Doctor">Doctor</option>
						<option value="Staff">Staff</option>
					</select>
					<button style={styles.button} onClick={handleAddRole}>
						Assign Role
					</button>
				</div>

				{/* Assigned Roles List */}
				{rolesList.length === 0 ? (
					<p>No roles assigned yet.</p>
				) : (
					<ul style={styles.list}>
						{rolesList.map((item, index) => (
							<li key={index} style={styles.listItem}>
								<div style={styles.itemDetails}>
									<span style={styles.itemTitle}>
										Email: {item.email}
									</span>
									<span>Role: {item.role}</span>
								</div>
								<button
									style={styles.buttonDanger}
									onClick={() => handleDelete(index)}>
									Delete
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</Layout>
	);
};

export default AssignRoles;
