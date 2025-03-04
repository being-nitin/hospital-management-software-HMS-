import React, { Fragment, useEffect } from "react";
import Layout from "../core/Layout";
import { listDeparts, deleteDeparts } from "../actions/departmentActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListDeparts = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const departsList = useSelector((state) => state.departsList);
  const { loading, error, departments } = departsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const departsDelete = useSelector((state) => state.departsDelete);
  const { success: successDelete } = departsDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listDeparts());
    } else {
      navigate("/signin");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    
    if (window.confirm("Are you sure")) {
      dispatch(deleteDeparts(id));
    }
  };

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
    fontFamily: "Roboto sans-serif",
  };

  const emailStyles = {
    fontStyle: "italic",
    color: "#495057",
    fontFamily: "Roboto sans-serif",
  };

  const buttonStyles = {
    borderRadius: "20px",
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
      title="Profile"
      description="list treatment categories"
      className="container-fluid"
    >
      <h4>
        <Link to="/add-depart">
          <button className="btn btn-primary btn-sm" style={buttonStyles}>
            Add Department
          </button>
        </Link>
      </h4>

      <h2 className="mb-4" style={centeredHeading}>
        List Departments
      </h2>

      {loading ? (
        showLoading()
      ) : error ? (
        showError()
      ) : (
        <div className="row">
          <div className="col-sm-12">
            <table className="table" style={tableStyles}>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">name</th>
                  <th scope="col">Head</th>
                  <th scope="col">Address</th>
                  <th scope="col">Floor</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {departments &&
                  departments.map((dep, i) => (
                    <tr key={i}>
                      <Fragment>
                        <th scope="row">{dep._id}</th>
                        <td>{dep.name}</td>
                        <td>{dep.head}</td>
                        <td>{dep.address}</td>
                        <td>{dep.floor.name}</td>
                        <td>{dep.phone}</td>
                        <td>
                          <Link to={`/update-depart/${dep._id}`}>
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                        </td>
                        <td>
                          <i
                            className="bi bi-trash"
                            onClick={() => deleteHandler(dep._id)}
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

export default ListDeparts;
