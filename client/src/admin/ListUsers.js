import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { listUsers, deleteUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";

const ListUsers = ({ history }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	//console.log(users)

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	const [activePage, setActivePage] = useState(1);
	const [itemPerPage, setItemPerPage] = useState(5);

	const [data, setData] = useState(users);

	const [searchTerm, setSearchTerm] = React.useState("");

	// const handleChange = event => {
	//     setSearchTerm(event.target.value);
	// };

	useEffect(() => {
		if (userInfo) {
			dispatch(listUsers());
		} else {
			navigate("/login");
		}
	}, [dispatch, history, successDelete, userInfo]);

	// useEffect(() => {
	// 	if (window.location.search !== "") {
	// 		setData(
	// 			users?.filter(
	// 				(user) =>
	// 					user?.role === Number(window.location.search.slice(-1))
	// 			)
	// 		);
	// 	} else {
	// 		setData(users);
	// 	}
	// }, [users]);
	useEffect(() => {
		if (users) {
			setData(users);
		}
	}, [users]);

	const deleteHandler = (id) => {
	
		if (window.confirm("Are you sure")) {
			dispatch(deleteUser(id));
		}
	};

	const searchUsers = (target) => {
		if (target === " ") {
			return setData(users);
		}

		let results = [
			...(users &&
				users.filter((user) =>
					user.name.toString().toLowerCase().includes(target)
				)),
			// ...users?.filter(
			// 	(user) =>
			// 		user?.role === Number(window.location.search.slice(-1))
			// ),
		];

		setData(results);
	};

	// search users
	// const results = !searchTerm ? users : users && users.filter(user =>
	//     user.name.toString().toLowerCase().includes(searchTerm)
	// )

	const countUsers = () => {
		//return results && results.length
		return data && data.length;
	};

	const indexOfLastUser = activePage * itemPerPage;
	const indexOfFirstUser = indexOfLastUser - itemPerPage;

	const handlePageChange = (pageNumber) => {
	
		setActivePage(pageNumber);
	};

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: error ? "" : "none" }}>
			{error}
		</div>
	);

	const showLoading = () =>
		loading && (
			<div className="d-flex justify-content-center">
				<div className="spinner-border" role="status">
					<span
						className="sr-only"
						style={{
							fontFamily: "Roboto sans-serif",
						}}>
						Loading...
					</span>
				</div>
			</div>
		);

	const tableStyles = {
		width: "100%",
		boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
		borderCollapse: "separate",
		borderSpacing: "0 10px",
		margin: "20px 0",
		borderRadius: "8px",
		fontFamily: "Roboto sans-serif",
	};

	const theadStyles = {
		backgroundColor: "#f8f9fa",
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: "Roboto sans-serif",
	};

	const rowStyles = {
		backgroundColor: "#fff",
		borderBottom: "1px solid #dee2e6",
		transition: "background-color 0.3s",
		textAlign: "center",
		minHeight: "200px",
		verticalAlign: "middle",
		fontFamily: "Roboto sans-serif",
	};

	const emailStyles = {
		color: "#495057",
		fontFamily: "Roboto sans-serif",
	};

	const buttonStyles = {
		borderRadius: "5px",
		padding: "3px 10px",
		fontSize: "12px",
		fontWeight: "bold",
		fontFamily: "Roboto sans-serif",
	};

	const iconStyles = {
		fontSize: "18px",
		color: "#495057",
		cursor: "pointer",
		transition: "color 0.3s",
		fontFamily: "Roboto sans-serif",
	};
	const centeredHeading = {
		display: "flex",
		justifyContent: "center", // Centers horizontally
		alignItems: "center", // Centers vertically (if there's height)
		textAlign: "center",
		height: "100px", // Optional: Adjust height as needed for vertical centering
		margin: "0 auto",
		fontWeight: "bold",
		fontFamily: "Roboto sans-serif",
	};

	return (
		<Layout
			style={emailStyles}
			title="Profile"
			description="Update your profile"
			className="container-fluid">
			<h4>
				<Link to="/add-users">
					<button
						className="btn btn-primary btn-sm"
						style={buttonStyles}>
						Add User
					</button>
				</Link>
			</h4>

			<h2 className="mb-4" style={centeredHeading}>
				List Users
			</h2>
			{loading ? (
				showLoading()
			) : error ? (
				showError()
			) : (
				<div className="row">
					<div className="col-lg-12">
						<form>
							<div className="input-group">
								<input
									className="form-control"
									type="text"
									placeholder="Search User"
									onChange={(e) => {
										e.preventDefault();
										return searchUsers(e.target.value);
									}}
								/>
								<div className="input-group-append">
									<button
										className="btn btn-primary"
										type="button">
										<i className="fas fa-search" />
									</button>
								</div>
							</div>
						</form>
					</div>

					<div className="table-responsive my-4">
						<table className="table table-striped table-hover">
							<thead className="thead-dark">
								<tr className="text-center">
									<th>User Id</th>
									<th>Name</th>
									<th>Email</th>
									<th>Role</th>
									<th>Edit</th>
									<th>Delete</th>
									<th>Details</th>
								</tr>
							</thead>
							<tbody>
								{data?.length !== 0 ? (
									data
										.slice(
											indexOfFirstUser,
											indexOfLastUser
										)
										.map((user, i) => (
											<tr key={i} className="text-center">
												<td>{user._id}</td>
												<td>{user.name}</td>
												<td style={emailStyles}>
													{user.email}
												</td>

												<td>
													{user.role === 0 ? (
														<button
															type="button"
															className="btn btn-primary btn-sm"
															style={
																buttonStyles
															}>
															Admin
														</button>
													) : user.role === 1 ? (
														<button
															type="button"
															className="btn btn-secondary btn-sm"
															style={
																buttonStyles
															}>
															Doctor
														</button>
													) : user.role === 2 ? (
														<button
															type="button"
															className="btn btn-info btn-sm"
															style={
																buttonStyles
															}>
															Patient
														</button>
													) : user.role === 4 ? (
														<button
															type="button"
															className="btn btn-dark btn-sm"
															style={
																buttonStyles
															}>
															Nurse
														</button>
													) : (
														<button
															type="button"
															className="btn btn-warning btn-sm"
															style={
																buttonStyles
															}>
															Staff
														</button>
													)}
												</td>
												<td>
													{user.role === 0 ? (
														" "
													) : (
														<Link
															to={`/update/users/${user._id}`}>
															<i
																className="bi bi-pencil-square"
																style={
																	iconStyles
																}
															/>
														</Link>
													)}
												</td>
												<td>
													{user.role === 0 ? (
														" "
													) : (
														<i
															className="bi bi-trash"
															style={iconStyles}
															onClick={() =>
																deleteHandler(
																	user._id
																)
															}
														/>
													)}
												</td>
												<td>
													{user.role === 2 ? (
														<Link
															to={`/pat-details/${user._id}`}>
															<button
																type="button"
																className="btn btn-success btn-sm"
																style={
																	buttonStyles
																}>
																Details
															</button>
														</Link>
													) : (
														""
													)}
												</td>
											</tr>
										))
								) : (
									<td
										colSpan="6"
										style={{
											textAlign: "center",
											fontWeight: "bold",
											padding: "20px",
										}}>
										<b>No Users found</b>
									</td>
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}

			<Pagination
				activePage={activePage}
				itemsCountPerPage={itemPerPage}
				totalItemsCount={parseInt(countUsers())}
				pageRangeDisplayed={5}
				onChange={handlePageChange}
				itemClass="page-item"
				linkClass="page-link"
			/>
		</Layout>
	);
};

export default ListUsers;
