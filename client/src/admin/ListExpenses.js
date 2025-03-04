import React, { Fragment, useEffect, useState } from "react";
import { Button, DatePicker, Pagination, Select } from "antd";
import Layout from "../core/Layout";
import { listExpenses, deleteExpenses, updateExpense } from "../actions/expensesActions";
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
	const [view, setView] = useState("daily");
	const [filters, setFilters] = useState({
		startDate: null,
		endDate: null,
		doctor: null,
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
	
		if (dates) {
			setFilters((prev) => ({
				...prev,
				startDate: dates[0].format('YYYY-MM-DD'),
				endDate: dates[1].format('YYYY-MMM-DD'),
			}));
			
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

	const processExpenseData = (timeframe) => {
        const today = moment().startOf("day");
        let labels = [];
        let earningsByPeriod = {};

        if (timeframe === "daily") {
            labels = Array.from({ length: 7 }, (_, i) => today.clone().subtract(i, "days").format("YYYY-MM-DD"));
        } else if (timeframe === "weekly") {
            labels = Array.from({ length: 4 }, (_, i) => today.clone().subtract(i, "weeks").format("YYYY-\"WW\""));
        } else if (timeframe === "monthly") {
            labels = Array.from({ length: 6 }, (_, i) => today.clone().subtract(i, "months").format("YYYY-MM"));
        }

        labels.forEach((label) => (earningsByPeriod[label] = 0));

        expense?.forEach((exp) => {
            let periodKey = moment(exp.createdAt).format(timeframe === "daily" ? "YYYY-MM-DD" : timeframe === "weekly" ? "YYYY-\"WW\"" : "YYYY-MM");
            if (earningsByPeriod[periodKey] !== undefined) {
                earningsByPeriod[periodKey] += exp.grandTotal;
            }
        });

        return {
            labels: labels.reverse().map((label) => (timeframe === "daily" ? moment(label).format("MMM DD") : label)),
            datasets: [{
                label: timeframe === "daily" ? "Daily Earnings" : timeframe === "weekly" ? "Weekly Earnings" : "Monthly Earnings",
                data: Object.values(earningsByPeriod).reverse(),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            }],
        };
    };

	const processExpensedoctorData = () => {
		if (!expense) return { labels: [], datasets: [] };
	
		let earningsByDoctor = {};
	
		expense.forEach((exp) => {
			let doctorName = exp.doctor?.name || "Unknown";
			if (!earningsByDoctor[doctorName]) {
				earningsByDoctor[doctorName] = 0;
			}
			earningsByDoctor[doctorName] += exp.grandTotal;
		});
	
		return {
			labels: Object.keys(earningsByDoctor),
			datasets: [
				{
					label: "Doctor's Earnings",
					data: Object.values(earningsByDoctor),
					backgroundColor: "rgba(75, 192, 192, 0.6)",
					borderColor: "rgba(75, 192, 192, 1)",
					borderWidth: 1,
				},
			],
		};
	};
	const handlePaidStatusChange = (expenseId, value) => {
	  
		// Dispatch the update action
		dispatch(updateExpense({_id : expenseId, paid : value}));
		const { startDate, endDate, doctor } = filters;
		const formattedStartDate = startDate
			? moment(startDate).format("YYYY-MM-DD")
			: null;
		const formattedEndDate = endDate
			? moment(endDate).format("YYYY-MM-DD")
			: null;
		dispatch(listExpenses(
			pagination.currentPage,
					pagination.pageSize,
					doctor,
					formattedStartDate,
					formattedEndDate
		))
	  };

	return (
		<Layout title="REVENUE" className="container-fluid">
			      <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex" style={{ gap: "5px" }}>
                    <RangePicker placeholder={["Start Date", "End Date"]} onChange={handleDateChange} allowClear />
                    {userInfo.role !== 1 ? <Select placeholder="Select Doctor" style={{ width: 200 }} onChange={handleDoctorChange} allowClear>
                        <Option key={0} value={null}>All</Option>
                        {/* Render doctor options dynamically */}
						{users &&
							users.length !== 0 &&
							users
								.filter((user) => user.role === 1)
								?.map((doc) => (
									<Option key={doc._id} value={doc._id}>
										{doc.name}
									</Option>
								))} 
                    </Select> : ''}
                    <Button type="primary" onClick={applyFilters}>Search</Button>
                </div>

				<div className="btn-group mb-4" role="group">
                <button 
                    className={`btn ${view === "daily" ? "btn-primary" : "btn-outline-primary"}`} 
                    onClick={() => setView("daily")}
                >
                    Daily
                </button>
                <button 
                    className={`btn ${view === "weekly" ? "btn-primary" : "btn-outline-primary"}`} 
                    onClick={() => setView("weekly")}
                >
                    Weekly
                </button>
                <button 
                    className={`btn ${view === "monthly" ? "btn-primary" : "btn-outline-primary"}`} 
                    onClick={() => setView("monthly")}
                >
                    Monthly
                </button>
				<button 
                    className={`btn ${view === "doctor" ? "btn-primary" : "btn-outline-primary"}`} 
                    onClick={() => setView("doctor")}
                >
                    Doctor
                </button>
            </div>
            </div>

			<div className="mt-4">
			

            <h3>
                {view === "doctor"
				 ? '' : view === "daily"
                    ? "Daily Earnings (Last 7 Days)"
                    : view === "weekly"
                    ? "Weekly Earnings (Last 4 Weeks)"
                    : "Monthly Earnings (Last 6 Months)"}
            </h3>
			<div >
			{view === 'doctor' ? <Bar data={processExpensedoctorData()} options={{ responsive: true }} /> : 
            <Bar data={processExpenseData(view)} options={{ responsive: true }} />}
			
			</div>
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
										<td>
  <Select
    value={exp.paid} // Display the current value: "Paid" or "Un-paid"
    onChange={(value) => handlePaidStatusChange(exp._id, value)} // Handle dropdown change
    style={{ width: 120 }}
  >
    <Option value="Paid">Paid</Option>
    <Option value="Un-paid">Un-paid</Option>
  </Select>
</td>

										<td>{exp.paymentMethod}</td>
										<td>₹ {exp.totalCost}</td>
										<td>
											<div
												className="btn-group"
												role="group">
												{/* <Button
													type="primary"
													size="small"
													onClick={() =>
														navigate(
															`/update-expenses/${exp._id}`
														)
													}>
													Edit
												</Button> */}
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
