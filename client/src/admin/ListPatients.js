import React, { Fragment, useEffect, useRef } from "react";
import Layout from "../core/Layout";
import { listPatients, deletePatients } from "../actions/patientActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ListPatients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patientList = useSelector((state) => state.patientList);
  const { loading, error, patients } = patientList;

  console.log(patients);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(userInfo._id);

  const patientDelete = useSelector((state) => state.patientDelete);
  const { success: successDelete } = patientDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listPatients());
      //console.log(tests)
    } else {
      navigate("/signin");
    }
  }, [dispatch, successDelete, userInfo]);

  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      dispatch(deletePatients(id));
    }
  };

  const linkToPrint = () => {
    return (
      <button className="btn btn-primary btn-sm" style={buttonStyles}>
        Click To Print Patients
      </button>
    );
  };

  const componentRef = useRef();

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
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
  };

  const theadStyles = {
    backgroundColor: "#f8f9fa",
    fontWeight: "bold",
    textAlign: "center",
  };

  const rowStyles = {
    backgroundColor: "#fff",
    borderBottom: "1px solid #dee2e6",
    transition: "background-color 0.3s",
    textAlign: "center",
  };

  const emailStyles = {
    fontStyle: "italic",
    color: "#495057",
  };

  const buttonStyles = {
    borderRadius: "20px",
    padding: "3px 10px",
    fontSize: "12px",
    fontWeight: "bold",
  };

  const iconStyles = {
    fontSize: "18px",
    color: "#495057",
    cursor: "pointer",
    transition: "color 0.3s",
  };
  const centeredHeading = {
    display: "flex",
    justifyContent: "center", // Centers horizontally
    alignItems: "center", // Centers vertically (if there's height)
    textAlign: "center",
    height: "100px", // Optional: Adjust height as needed for vertical centering
    margin: "0 auto",
    fontWeight: "bold",
  };

  return (
    <Layout title="List Prescriptions" className="container-fluid">
      <h4>
        <Link to="/add-patient-details">
          <button className="btn btn-primary btn-sm" style={buttonStyles}>
            Add Patient Details
          </button>
        </Link>
      </h4>
      <ReactToPrint
        trigger={linkToPrint}
        content={() => componentRef.current}
      />
      <h2 className="mb-4" style={centeredHeading}>
        List Patients Profile
      </h2>

      {loading ? (
        showLoading()
      ) : error ? (
        showError()
      ) : (
        <div className="row" ref={componentRef}>
          <div className="col-sm-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">patientNumber</th>
                  {/* <th scope="col">profile</th> */}
                  <th scope="col">Doctor</th>
                  {/* <th scope="col">Patient Status</th> */}
                  {/* <th scope="col">Inpatient/Outpatient</th> */}
                  <th scope="col">phoneNo</th>
                  <th scope="col">Reg Date</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {patients &&
                  patients.map((patient, i) => (
                    <tr key={i}>
                      <Fragment>
                        <th scope="row">{patient.patientNumber}</th>
                        {/* <td><img src={`http://localhost:8000${patient.image}`} className="img-fluid rounded-circle"/></td> */}
                        <td>{patient?.firstName + " " + patient?.lastName}</td>
                        {/* <td>{patient.statusPatient}</td> */}
                        {/* <td>{patient.patientType}</td> */}
                        <td>{patient.phoneNo}</td>
                        <td>
                          {moment(patient.regDate).format("YYYY-MM-DD HH:mm Z")}
                        </td>

                        <td>{patient.gender}</td>

                        <td>
                          <Link to={`/update-patient/${patient._id}`}>
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                        </td>
                        <td>
                          <i
                            className="bi bi-trash"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteHandler(patient._id)}
                          ></i>
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

export default ListPatients;
