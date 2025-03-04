import React, { Fragment, useEffect } from "react";
import Layout from "../core/Layout";
import { listSpecialize, deleteSpecialize } from "../actions/specializeActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListSpecialize = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const specializeList = useSelector((state) => state.specializeList);
  const { loading, error, specializations } = specializeList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const specializeDelete = useSelector((state) => state.specializeDelete);
  const { success: successDelete } = specializeDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listSpecialize());
    } else {
      navigate("/signin");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteSpecialize(id));
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
    <Layout title="Profile" className="container-fluid">
      <h4>
        <Link to="/add-specialize">
          <button className="btn btn-primary btn-sm" style={buttonStyles}>
            Add Specialization
          </button>
        </Link>
      </h4>

      <h2 className="mb-4" style={centeredHeading}>
        List Specializations
      </h2>

      {loading ? (
        showLoading()
      ) : error ? (
        showError()
      ) : (
        <div className="row">
          <div className="col-sm-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {specializations &&
                  specializations.map((special, i) => (
                    <tr key={i}>
                      <Fragment>
                        <th scope="row">{special._id}</th>
                        <td>{special.name}</td>
                        <td>{special.description}</td>
                        <td>
                          <Link to={`/update-specialize/${special._id}`}>
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                        </td>
                        <td>
                          <i
                            className="bi bi-trash"
                            onClick={() => deleteHandler(special._id)}
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

export default ListSpecialize;
