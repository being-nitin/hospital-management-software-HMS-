import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
	// Data for cards
	const totals = {
		appointment: 100,
		patients: 350,
		doctors: 100,
		expenses: "$50,000",
	};

	// Pie chart data for User Types
	const userTypeData = {
		labels: ["Appointment", "Doctor", "Patient"],
		datasets: [
			{
				data: [100, 100, 350],
				backgroundColor: ["#007bff", "#ffc107", "#28a745"],
			},
		],
	};

	// Bar chart data for Expenses
	const expenseData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May"],
		datasets: [
			{
				label: "Expenses ($)",
				data: [8000, 7000, 6500, 7200, 7500],
				backgroundColor: "#dc3545",
			},
		],
	};

	return (
		<Layout title="Dashboard">
			<Container className="my-4">
				{/* Top Summary Cards */}
				<Row className="g-4">
					{[
						{
							title: "Total Patients",
							value: totals.patients,
							color: "success",
							navigateTo: "/list-patients",
						},
						{
							title: "Total Doctors",
							value: totals.doctors,
							color: "warning",
							navigateTo: "/profile",
						},
						{
							title: "Total Appointments",
							value: totals.appointment,
							color: "primary",
							navigateTo: "/list-app-vaccine",
						},
						{
							title: "Total Expenses",
							value: totals.expenses,
							color: "danger",
							navigateTo: "/list-expenses",
						},
					].map((item, index) => (
						<Col key={index} md={3}>
							<Link
								to={item.navigateTo}
								style={{
									textDecoration: "none",
								}}>
								<Card
									className={`bg-${item.color} text-white shadow-sm`}
									style={{ fontSize: "0.85rem" }}>
									<Card.Body className="p-3">
										<Card.Title
											style={{
												fontSize: "1rem",
												fontWeight: "500",
											}}>
											{item.title}
										</Card.Title>
										<h4
											style={{
												fontSize: "1.5rem",
												fontWeight: "bold",
											}}>
											{item.value}
										</h4>
									</Card.Body>
								</Card>
							</Link>
						</Col>
					))}
				</Row>

				{/* Graph Section */}
				<Row className="mt-4">
					<Col md={6}>
						<Card className="shadow-sm">
							<Card.Body className="p-3">
								<Card.Title
									style={{
										fontSize: "1rem",
										fontWeight: "500",
									}}>
									User Type Distribution
								</Card.Title>
								<Pie
									data={userTypeData}
									options={{
										plugins: {
											legend: {
												labels: {
													font: {
														size: 12,
													},
												},
											},
										},
									}}
								/>
							</Card.Body>
						</Card>
					</Col>
					<Col md={6}>
						<Card className="shadow-sm">
							<Card.Body className="p-3">
								<Card.Title
									style={{
										fontSize: "1rem",
										fontWeight: "500",
									}}>
									Expenses Over Time
								</Card.Title>
								<Bar
									data={expenseData}
									options={{
										responsive: true,
										plugins: {
											legend: {
												labels: {
													font: {
														size: 12,
													},
												},
											},
										},
										scales: {
											x: {
												ticks: {
													font: {
														size: 12,
													},
												},
											},
											y: {
												ticks: {
													font: {
														size: 12,
													},
												},
											},
										},
									}}
								/>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default AdminDashboard;
