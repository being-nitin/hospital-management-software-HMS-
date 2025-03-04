import React, { Fragment, useEffect } from "react";
import Layout from "../core/Layout";
import { listDesignate, deleteDesignate } from "../actions/designateActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListDesignate = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const designateList = useSelector((state) => state.designateList);
  const { loading, error, designations } = designateList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const designateDelete = useSelector((state) => state.designateDelete);
  const { success: successDelete } = designateDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listDesignate());
    } else {
      navigate("/signin");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    
    if (window.confirm("Are you sure")) {
      dispatch(deleteDesignate(id));
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
    <Layout
      title="Profile"
      description="list treatment categories"
      className="container-fluid"
    >
      <h4>
        <Link to="/add-designate">
          <button className="btn btn-primary btn-sm" style={buttonStyles}>
            Add Designation
          </button>
        </Link>
      </h4>

      <h2 className="mb-4" style={centeredHeading}>
        List Designations
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
                {designations &&
                  designations.map((desig, i) => (
                    <tr key={i}>
                      <Fragment>
                        <th scope="row">{desig._id}</th>
                        <td>{desig.name}</td>
                        <td>{desig.description}</td>
                        <td>
                          <Link to={`/update-designation/${desig._id}`}>
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                        </td>
                        <td>
                          <i
                            className="bi bi-trash"
                            onClick={() => deleteHandler(desig._id)}
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

export default ListDesignate;
