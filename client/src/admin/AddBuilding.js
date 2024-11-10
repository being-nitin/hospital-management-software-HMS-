import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../core/Layout";
import { createBuilding } from "../actions/buildingsActions";
import { useNavigate } from "react-router-dom";

const AddBuilding = ({ history }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const buidingCreate = useSelector((state) => state.buidingCreate);
  const { success, error, loading } = buidingCreate;

  useEffect(() => {
    if (success) {
      navigate("/list-buildings");
    }
  }, [success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBuilding({ name, code, description }));
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  //
  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  const formContainerStyles = {
    maxWidth: "800px", // Adjust the max width of the form container
    margin: "0 auto", // Center the form horizontally
    padding: "40px", // Add some padding around the form
    borderRadius: "10px", // Rounded corners for the container
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for a classy effect
    backgroundColor: "#f9f9f9", // Light background color to make it stand out
  };

  const inputStyles = {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#fff",
    transition: "border-color 0.2s ease-in-out",
  };

  const selectStyles = {
    ...inputStyles,
    padding: "5px",
    fontSize: "1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const buttonStyles = {
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    padding: "12px 25px",
    fontSize: "1rem",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
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

  // Add hover effect for button
  buttonStyles[":hover"] = {
    backgroundColor: "#0056b3",
  };
  const formGroupStyles = {
    marginBottom: "20px",
  };

  const BuildingForm = () => (
    <div style={formContainerStyles}>
      <form onSubmit={submitHandler}>
        <div className="form-row">
          <div className="col-md-8">
            <div className="form-group" style={formGroupStyles}>
              <label className="small mb-1" htmlFor="name">
                Name
              </label>
              <input
                className="form-control py-4"
                type="name"
                aria-describedby="emailHelp"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyles}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="col-md-8">
            <div className="form-group" style={formGroupStyles}>
              <label className="small mb-1" htmlFor="inputMinValue">
                Code
              </label>
              <input
                className="form-control py-4"
                type="name"
                aria-describedby="emailHelp"
                placeholder="room code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={inputStyles}
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-8">
            <div className="form-group" style={formGroupStyles}>
              <label className="small mb-1" htmlFor="description">
                Description
              </label>
              <input
                className="form-control py-4"
                type="name"
                aria-describedby="emailHelp"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={inputStyles}
              />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="form-group mt-4 mb-0">
            <button className="btn btn-primary btn-block" style={buttonStyles}>
              Create Building{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <Layout title="Category test Form">
      <h2 className="mb-4" style={centeredHeading}>
        Create Building
      </h2>

      {showLoading()}
      {showError()}
      {BuildingForm()}
    </Layout>
  );
};

export default AddBuilding;
