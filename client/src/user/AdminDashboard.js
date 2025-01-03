import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import Layout from "../core/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../actions/dashboardDataAction";
import moment from "moment";

const AdminDashboard = () => {
	const [dashboardData, setDashboardData] = useState({});
	const [last7DaysData, setLast7DaysData] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const dashboardAPIData = useSelector((state) => state.dashboardData);
	const calculateExpenses = dashboardData?.expenses?.reduce(
		(acc, { grandTotal }) => acc + grandTotal,
		0
	);

	// Data for cards
	const totals = {
		appointments: dashboardData.appointments?.length,
		patients: dashboardData.patients?.length,
		doctors: dashboardData.doctors?.length,
		expenses: `₹${calculateExpenses?.toFixed(2)}`,
	};

	// Pie chart data for User Types
	const userTypeData = {
		labels: ["Appointment", "Doctor", "Patient"],
		datasets: [
			{
				data: [
					dashboardData.appointments?.length,
					dashboardData.doctors?.length,
					dashboardData.patients?.length,
				],
				backgroundColor: ["#007bff", "#ffc107", "#28a745"],
			},
		],
	};

	// Bar chart data for Expenses

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (dashboardAPIData.success === true) {
			setDashboardData(dashboardAPIData?.dashboardData);

			// Calculate last 7 days data
			const today = new Date();
			const last7Days = [...Array(7)].map((_, i) => {
				const date = new Date(today);
				date.setDate(today.getDate() - i);
				return date.toISOString().split("T")[0];
			});

			const expensesByDate = last7Days.map((date) => {
				const total = dashboardAPIData.dashboardData.expenses
					?.filter((expense) => moment(expense.createdAt).format('YYYY-MM-DD') === date)
					.reduce((acc, { grandTotal }) => acc + grandTotal, 0);

				return { date, total: total || 0 };
			});

			setLast7DaysData(expensesByDate.reverse());
		}
	}, [dashboardAPIData]);

	// Bar chart data for Expenses Over Last 7 Days
	const expenseData = {
		labels: last7DaysData.map((data) => data.date),
		datasets: [
			{
				label: "Expenses (₹)",
				data: last7DaysData.map((data) => data.total),
				backgroundColor: "#dc3545",
			},
		],
	};
	useEffect(() => {
		if (userInfo) {
			dispatch(getDashboardData());
		} else {
			navigate("/signin");
		}
	}, [dispatch, userInfo, navigate]);

	

	

	console.log("dashboardData", dashboardData);
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
							value: totals.appointments,
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
