import React, { useEffect, useRef, useState } from "react";
import Layout from "../core/Layout";
import { listPatients, deletePatients } from "../actions/patientActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import moment from "moment";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const ListPatients = () => {
	const [searchDetails, setSearchDetails] = useState({
		firstName: "",
		lastName: "",
		phoneNo: "",
		patientNumber: "",
		address: "",
	});
	const [page, setPage] = useState(1);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const patientList = useSelector((state) => state.patientList);
	const {
		loading,
		error,
		patients: { patient, totalPages } = {},
	} = patientList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const patientDelete = useSelector((state) => state.patientDelete);
	const { success: successDelete } = patientDelete;

	useEffect(() => {
		if (userInfo) {
			dispatch(listPatients(searchDetails, page));
		} else {
			navigate("/signin");
		}
	}, [dispatch, successDelete, userInfo, page]);

	const handleSearch = () => {
		setPage(1); // Reset to the first page on a new search
		dispatch(listPatients(searchDetails, 1));
	};

	const handlePageChange = (newPage) => {
		if (newPage > 0 && newPage <= totalPages) {
			setPage(newPage);
			dispatch(listPatients(searchDetails, newPage));
		}
	};

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deletePatients(id));
		}
	};

	const buttonStyles = {
		borderRadius: "20px",
		padding: "3px 10px",
		fontSize: "12px",
		fontWeight: "bold",
		fontFamily: "Roboto sans-serif",
	};

	const componentRef = useRef();

	const menu = (patientId) => (
		<Menu>
			<Menu.Item key="1">
				<Link to={`/pat-details/${patientId}`}>More Details</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to={`/add-appointment/${patientId}`}>
					Add Appointment
				</Link>
			</Menu.Item>
			<Menu.Item key="3">
				<Link to={`/update-patient/${patientId}`}>Update Patient</Link>
			</Menu.Item>
			<Menu.Item key="4" onClick={() => deleteHandler(patientId)}>
				Delete Patient
			</Menu.Item>
		</Menu>
	);

	return (
		<Layout title="List Patients" className="container-fluid">
			<h4>
				<Link to="/add-patient-details">
					<Button type="primary" style={buttonStyles}>
						Add Patient Details
					</Button>
				</Link>
			</h4>
			<ReactToPrint
				trigger={() => (
					<Button type="primary" style={buttonStyles}>
						Click To Print Patients
					</Button>
				)}
				content={() => componentRef.current}
			/>
			<h2 className="mb-4">List Patients</h2>
			{error && (
				<div
					className="alert alert-danger"
					style={{ display: error ? "" : "none" }}>
					{error}
				</div>
			)}
			{loading && (
				<div className="d-flex justify-content-center">
					<div className="spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			)}
			<div className="row mb-3">
				<div className="col-md-2">
					<input
						type="text"
						className="form-control"
						placeholder="First Name"
						value={searchDetails.firstName}
						onChange={(e) =>
							setSearchDetails({
								...searchDetails,
								firstName: e.target.value,
							})
						}
					/>
				</div>
				<div className="col-md-2">
					<input
						type="text"
						className="form-control"
						placeholder="Last Name"
						value={searchDetails.lastName}
						onChange={(e) =>
							setSearchDetails({
								...searchDetails,
								lastName: e.target.value,
							})
						}
					/>
				</div>
				<div className="col-md-2">
					<input
						type="text"
						className="form-control"
						placeholder="Phone No"
						value={searchDetails.phoneNo}
						onChange={(e) =>
							setSearchDetails({
								...searchDetails,
								phoneNo: e.target.value,
							})
						}
					/>
				</div>
				<div className="col-md-2">
					<input
						type="text"
						className="form-control"
						placeholder="Patient Number"
						value={searchDetails.patientNumber}
						onChange={(e) =>
							setSearchDetails({
								...searchDetails,
								patientNumber: e.target.value,
							})
						}
					/>
				</div>
				<div className="col-md-2">
					<input
						type="text"
						className="form-control"
						placeholder="Address"
						value={searchDetails.address}
						onChange={(e) =>
							setSearchDetails({
								...searchDetails,
								address: e.target.value,
							})
						}
					/>
				</div>
				<div className="col-md-2">
					<Button type="primary" onClick={handleSearch}>
						Search
					</Button>
				</div>
			</div>
			<div className="row" ref={componentRef}>
				<div className="table-responsive my-4">
					<table className="table table-striped table-hover">
						<thead className="thead-dark">
							<tr className="text-center">
								<th>Patient Number</th>
								<th>Doctor</th>
								<th>Phone No</th>
								<th>Reg Date</th>
								<th>Gender</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{patient &&
								patient.map((p, i) => (
									<tr key={i} className="text-center">
										<td>{p.patientNumber}</td>
										<td>
											{p?.firstName + " " + p?.lastName}
										</td>
										<td>{p.phoneNo}</td>
										<td>
											{moment(p.regDate).format(
												"YYYY-MM-DD HH:mm Z"
											)}
										</td>
										<td>{p.gender}</td>
										<td>
											<Dropdown
												overlay={menu(p._id)}
												trigger={["click"]}>
												<Button>
													Actions <DownOutlined />
												</Button>
											</Dropdown>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="d-flex justify-content-between">
				<Button
					disabled={page <= 1}
					onClick={() => handlePageChange(page - 1)}>
					Previous
				</Button>
				<span>
					Page {page} of {totalPages}
				</span>
				<Button
					disabled={page >= totalPages}
					onClick={() => handlePageChange(page + 1)}>
					Next
				</Button>
			</div>
		</Layout>
	);
};

export default ListPatients;
