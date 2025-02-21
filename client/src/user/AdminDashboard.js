import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import Layout from "../core/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../actions/dashboardDataAction";
import { ListGroup } from "react-bootstrap";

import moment from "moment";
import Loader from "../core/Loader";

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
		appointments: dashboardData.totalappointment,
		patients: dashboardData.patients?.length,
		doctors: dashboardData.doctors?.length,
		staff : dashboardData?.staff?.length,
		expenses: `₹${calculateExpenses?.toFixed(2)}`,
	};

	// Pie chart data for User Types
	const userTypeData = {
		labels: ["Staff", "Doctor", "Patient"],
		datasets: [
			{
				data: [
					dashboardData.staff?.length,
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
			<>
			{dashboardAPIData.loading ? 
			<Loader/>:
				
			<div>
    {/* Top Summary Cards & Recent Appointments */}
    <Row className="g-0 align-items-stretch mt-2">
        <Col md={6} lg={3} style={{ alignContent : 'center'}}>
		<div style={{ display : 'flex' , flexDirection : 'column'}}>
            <Card className="bg-success text-white shadow-sm h-100 " style={{ cursor : 'pointer'}}>
                <Card.Body onClick={() => navigate('/list-patients')}>
                    <Card.Title>Total Patients</Card.Title>
                    <h4>{totals.patients}</h4>
                </Card.Body>
            </Card>
       
            <Card className="bg-warning text-white shadow-sm h-100" >
                <Card.Body>
                    <Card.Title>Total Staff</Card.Title>
                    <h4>{totals.staff}</h4>
                </Card.Body>
            </Card>
			</div>
        </Col>
		<Col md={6} lg={3} style={{ alignContent : 'center'}}>
		<div style={{ display : 'flex' , flexDirection : 'column'}}>
            <Card className=" text-white shadow-sm h-100" style={{ backgroundColor : 'blue' , cursor : 'pointer'}}>
                <Card.Body onClick={() =>  navigate('/patient-app-details')} >
                    <Card.Title>Total Appointment</Card.Title>
                    <h4>{totals.appointments}</h4>
                </Card.Body>
            </Card>
       
            <Card className="text-white shadow-sm h-100" style={{ backgroundColor : 'red' , cursor : 'pointer'}}>
                <Card.Body onClick={() =>  navigate('/list-expenses')}>
                    <Card.Title>Total Expenses</Card.Title>
                    <h4>{totals.expenses}</h4>
                </Card.Body>
            </Card>
			</div>
        </Col>
        
		<Col md={6}>
		<Card className="shadow-sm h-100 border-0">
            <Card.Body>
                <Card.Title className="fw-bold text-secondary mb-3">
                    Recent Appointments
                </Card.Title>
                <ListGroup variant="flush" style={{ width : '100%' }}>
					
                    {dashboardData && dashboardData.appointments && dashboardData.appointments.length !== 0 ? 
					dashboardData?.appointments?.map((appointment, index) => {
                        return (
                            <ListGroup.Item
                                key={index}
                                className="d-flex align-items-center justify-content-between px-3 py-2"
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                                    borderRadius: "8px",
                                    fontSize: "0.9rem",
                                    cursor : 'pointer'
                                }}
                                onClick={() =>{
                                    if (appointment.patient) {
                                        localStorage.setItem("selectedPatient", JSON.stringify(appointment.patient));
                                      }

                                      navigate('/patient-app-details')
                                }}
                            >
                                {/* Left Side: Date Box */}
                                <div
                                    className="text-center px-3 py-2 rounded"
                                    style={{
                                        backgroundColor: "#f0f0f0",
                                        minWidth: "50px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <div className="fw-bold" style={{ fontSize: "1.2rem" }}>
                                        {new Date(appointment.date).getDate()}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                                        {new Date(appointment.date).toLocaleString("default", { month: "short" })}
                                    </div>
                                </div>

                                {/* Right Side: Appointment Info */}
                                <div className="flex-grow-1 ms-3">
                                    <div className="fw-bold text-dark m-2">{appointment?.patient.firstName + "-" + appointment.patient.patientNumber}</div>
                                    <div className="text-muted m-2">{appointment.time}</div>
                                </div>

                                {/* Icon */}
                                <i className="fa fa-calendar-alt text-primary"></i>
                            </ListGroup.Item>
                        )
					})
                    : <p>No appointments</p>}
                </ListGroup>
            </Card.Body>
        </Card>
		</Col>
    </Row>

    {/* Pie Chart & Expenses */}
    <Row className="g-0 align-items-stretch " style={{ marginBlock : '2rem'}}>
        <Col md={6}>
            <Card className="shadow-sm h-100">
                <Card.Body>
                    <Card.Title>User Type Distribution</Card.Title>
                    <Pie data={userTypeData} />
                </Card.Body>
            </Card>
        </Col>

        <Col md={6}>
            <Card className="shadow-sm h-100">
                <Card.Body>
                    <Card.Title>Expenses Over Time</Card.Title>
                    <Bar data={expenseData} />
                </Card.Body>
            </Card>
        </Col>
    </Row>
</div>
			}
			</>
		</Layout>
	);
};

export default AdminDashboard;
