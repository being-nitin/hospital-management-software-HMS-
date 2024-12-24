import React, { Fragment, useEffect, useState } from "react";
import { Button, DatePicker, Pagination, Select } from "antd";
import Layout from "../core/Layout";
import { listExpenses, deleteExpenses } from "../actions/expensesActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { listDoctors } from "../actions/doctorActions"; // Import doctor list action
import { listUsers, deleteUser } from "../actions/userActions";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ListExpenses = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [filters, setFilters] = useState({
		startDate: null,
		endDate: null,
		doctor: "",
	});
	const [pagination, setPagination] = useState({
		currentPage: 1,
		pageSize: 10,
	});

	const expenseList = useSelector((state) => state.expenseList);
	const {
		loading,
		error,
		expenses: { expense, totalExpenses } = {},
	} = expenseList;

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const expensesDelete = useSelector((state) => state.expensesDelete);
	const { success: successDelete } = expensesDelete;

	useEffect(() => {
		if (userInfo) {
			dispatch(listUsers());
			const { startDate, endDate, doctor } = filters;
			const formattedStartDate = startDate
				? moment(startDate).format("YYYY-MM-DD")
				: null;
			const formattedEndDate = endDate
				? moment(endDate).format("YYYY-MM-DD")
				: null;
			dispatch(
				listExpenses(
					pagination.currentPage,
					pagination.pageSize,
					doctor,
					formattedStartDate,
					formattedEndDate
				)
			);
		} else {
			navigate("/signin");
		}
	}, [dispatch, successDelete, userInfo, filters, pagination]);

	useEffect(() => {
		if (userInfo) {
			dispatch(listDoctors()); // Fetch list of doctors when the component mounts
		}
	}, [dispatch, userInfo]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteExpenses(id));
		}
	};

	const handleDateChange = (dates) => {
		console.log(dates)
		if (dates) {
			setFilters((prev) => ({
				...prev,
				startDate: dates[0].format('YYYY-MM-DD'),
				endDate: dates[1].format('YYYY-MMM-DD'),
			}));
			console.log(filters.startDate)
		} else {
			setFilters((prev) => ({ ...prev, startDate: null, endDate: null }));
		}
	};

	const handleDoctorChange = (value) => {
		setFilters((prev) => ({ ...prev, doctor: value }));
	};

	const applyFilters = () => {
		const { startDate, endDate, doctor } = filters;
		const formattedStartDate = startDate
			? moment(startDate).format("YYYY-MM-DD")
			: null;
		const formattedEndDate = endDate
			? moment(endDate).format("YYYY-MM-DD")
			: null;
		dispatch(
			listExpenses(
				1,
				pagination.pageSize,
				doctor,
				formattedStartDate,
				formattedEndDate
			)
		);
		setPagination({ currentPage: 1, pageSize: pagination.pageSize });
	};

	const handlePaginationChange = (page, pageSize) => {
		setPagination({ currentPage: page, pageSize });
		const { startDate, endDate, doctor } = filters;
		const formattedStartDate = startDate
			? moment(startDate).format("YYYY-MM-DD")
			: null;
		const formattedEndDate = endDate
			? moment(endDate).format("YYYY-MM-DD")
			: null;
		dispatch(
			listExpenses(
				page,
				pageSize,
				doctor,
				formattedStartDate,
				formattedEndDate
			)
		);
	};

	// Prepare chart data for last 7 days
	const chartData = {
		labels: [],
		datasets: [
			{
				label: "Daily Earnings (Last 7 Days)",
				data: [],
				backgroundColor: "rgba(54, 162, 235, 0.6)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 1,
			},
		],
	};

	if (expense && expense.length > 0) {
		const today = moment().startOf("day");
		const last7Days = Array.from({ length: 7 }, (_, i) =>
			today.clone().subtract(i, "days").format("YYYY-MM-DD")
		);

		const earningsByDay = last7Days.reduce((acc, date) => {
			acc[date] = 0; // Initialize daily totals
			return acc;
		}, {});

		expense.forEach((exp) => {
			const expenseDate = moment(exp.createdAt).format("YYYY-MM-DD");
			if (earningsByDay[expenseDate] !== undefined) {
				earningsByDay[expenseDate] += exp.grandTotal; // Sum grandTotal
			}
		});

		chartData.labels = last7Days
			.reverse()
			.map((date) => moment(date).format("MMM DD"));
		chartData.datasets[0].data = Object.values(earningsByDay).reverse();
	}

	return (
		<Layout title="Report" className="container-fluid">
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h2 className="mb-0">Expenses</h2>
				<div
					className="d-flex"
					style={{
						gap: "5px",
					}}>
					<RangePicker
						placeholder={["Start Date", "End Date"]}
						onChange={handleDateChange}
						allowClear
					/>
					<Select
						placeholder="Select Doctor"
						style={{ width: 200 }}
						onChange={handleDoctorChange}
						allowClear>
								<Option key={0} value={null}>
										All
									</Option>
						{users &&
							users.length !== 0 &&
							users
								.filter((user) => user.role === 1)
								?.map((doc) => (
									<Option key={doc._id} value={doc._id}>
										{doc.name}
									</Option>
								))}
							
					</Select>
					<Button type="primary" onClick={applyFilters}>
						Search
					</Button>
				</div>
			</div>

			{/* Last 7 Days Chart Section */}
			<div className="mt-4">
				<h3>Earnings for Last 7 Days</h3>
				<Bar data={chartData} options={{ responsive: true }} />
			</div>

			{loading ? (
				<div className="text-center">
					<div className="spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			) : error ? (
				<div className="alert alert-danger">{error}</div>
			) : !expense || expense.length === 0 ? (
				<div className="alert alert-info">No Expenses Found</div>
			) : (
				<Fragment>
					<div className="table-responsive my-4">
						<table className="table table-striped table-hover">
							<thead className="thead-dark">
								<tr className="text-center">
									<th>ID</th>
									<th>Doctor</th>
									<th>Patient</th>
									<th>Date</th>
									<th>Grand Total</th>
									<th>Paid</th>
									<th>Payment Method</th>
									<th>Total Cost</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{expense.map((exp, i) => (
									<tr key={i} className="text-center">
										<td>{exp._id.substring(0, 7)}</td>
										<td>{exp.doctor.name}</td>
										<td>
											{exp?.patient?.firstName +
												" - " +
												exp?.patient?.patientNumber}
										</td>
										<td>
											{moment(exp.createdAt).format(
												"YYYY-MM-DD"
											)}
										</td>
										<td>₹ {exp.grandTotal}</td>
										<td>{exp.paid}</td>
										<td>{exp.paymentMethod}</td>
										<td>₹ {exp.totalCost}</td>
										<td>
											<div
												className="btn-group"
												role="group">
												<Button
													type="primary"
													size="small"
													onClick={() =>
														navigate(
															`/update-expenses/${exp._id}`
														)
													}>
													Edit
												</Button>
												<Button
													type="danger"
													size="small"
													onClick={() =>
														deleteHandler(exp._id)
													}>
													Delete
												</Button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="my-4">
						<Pagination
							current={pagination.currentPage}
							total={totalExpenses}
							pageSize={pagination.pageSize}
							onChange={handlePaginationChange}
							showSizeChanger
							pageSizeOptions={["10", "20", "50"]}
							onShowSizeChange={handlePaginationChange}
						/>
					</div>
				</Fragment>
			)}
		</Layout>
	);
};

export default ListExpenses;
