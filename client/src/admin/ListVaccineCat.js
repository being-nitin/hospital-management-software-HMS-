import React, { Fragment, useEffect } from "react";
import Layout from "../core/Layout";
import { listVacCat, deleteVacCat } from "../actions/vaccineCatActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListVaccineCat = ({ history }) => {
	const dispatch = useDispatch();

	const vaccineCatList = useSelector((state) => state.vaccineCatList);
	const { loading, error, vaccines } = vaccineCatList;

	const navigate = useNavigate();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const vaccineCatDelete = useSelector((state) => state.vaccineCatDelete);
	const { success: successDelete } = vaccineCatDelete;

	useEffect(() => {
		if (userInfo) {
			dispatch(listVacCat());
		} else {
			navigate("/signin");
		}
	}, [dispatch, history, successDelete, userInfo]);

	const deleteHandler = (id) => {
	
		if (window.confirm("Are you sure")) {
			dispatch(deleteVacCat(id));
		}
	};

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: error ? "" : "none" }}>
			{error}
		</div>
	);

	const buttonStyles = {
		borderRadius: "20px",
		padding: "3px 10px",
		fontSize: "12px",
		fontWeight: "bold",
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

	const showLoading = () =>
		loading && (
			<div className="d-flex justify-content-center">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);

	return (
		<Layout
			title="Profile"
			description="list treatment categories"
			className="container-fluid">
			<h4>
				<Link to="/add-vac-cat">
					<button
						className="btn btn-primary btn-sm"
						style={buttonStyles}>
						Add Vaccine Category
					</button>
				</Link>
			</h4>

			<h2 className="mb-4" style={centeredHeading}>
				List Vaccine Category
			</h2>

			{loading ? (
				showLoading()
			) : error ? (
				showError()
			) : vaccines.length === 0 ? (
				<div className="row">
					<div className="col-sm-12 table-responsive my-4">
						<table className="table table-striped table-hover">
							<thead className="thead-dark">
								<tr className="text-center">
									<th>Id</th>
									<th>name</th>
									<th>Type</th>
									<th>Description</th>
									<th>Medicine</th>
									<th>Effects</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								<tr className="text-center">
									<td>No Data</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<div className="row">
					<div className="table-responsive my-4">
						<table className="table table-striped table-hover">
							<thead className="thead-dark">
								<tr className="text-center">
									<th>Id</th>
									<th>name</th>
									<th>Type</th>
									<th>Description</th>
									<th>Medicine</th>
									<th>Effects</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{vaccines &&
									vaccines.map((vac, i) => (
										<tr key={i} className="text-center">
											<Fragment>
												<th scope="row">
													{vac._id.substring(0, 7)}
												</th>
												<td>{vac.name}</td>
												<td>{vac.type}</td>
												<td>{vac.description}</td>
												<td>{vac.medicine.name}</td>
												<td>{vac.effects}</td>
												<td>
													<Link
														to={`/update-vaccine-cat/${vac._id}`}>
														<i className="bi bi-pencil-square" />
													</Link>
												</td>
												<td>
													<i
														className="bi bi-trash"
														onClick={() =>
															deleteHandler(
																vac._id
															)
														}
													/>
												</td>
											</Fragment>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default ListVaccineCat;
