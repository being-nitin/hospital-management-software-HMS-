import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../core/Layout";
import { treatCatCreate } from "../actions/treatmentActions";
import { useNavigate } from "react-router-dom";

const CreateTreatment = ({ history }) => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  //const [message, setMessage] = useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const treatCreate = useSelector((state) => state.treatCreate);
  const { success, error, loading } = treatCreate;

  useEffect(() => {
    if (success) {
      navigate("/list-treat-cat");
      //setMessage('category test was created')
    }
  }, [success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(treatCatCreate({ name, cost }));
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
          <span
            className="sr-only"
            style={{
              fontFamily: "Roboto sans-serif",
            }}
          >
            Loading...
          </span>
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
    backgroundColor: "#0056d2",
    border: "none",
    color: "white",
    padding: "12px 25px",
    fontSize: "1rem",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
    fontFamily: "Roboto sans-serif",
  };

  // Add hover effect for button
  buttonStyles[":hover"] = {
    backgroundColor: "#0056b3",
  };
  const formGroupStyles = {
    marginBottom: "20px",
  };

  const categoryTestForm = () => (
    <div style={formContainerStyles}>
      <form
        onSubmit={submitHandler}
        style={{
          fontFamily: "Roboto sans-serif",
        }}
      >
        <div className="form-row">
          <div className="col-md-8">
            <div className="form-group" style={formGroupStyles}>
              <label
                className="small mb-1 font-weight-bold"
                htmlFor="inputTestName"
              >
                Enter Treatment Name
              </label>
              <input
                className="form-control py-4"
                id="inputFirstName"
                type="name"
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
              <label className="small mb-1 font-weight-bold" htmlFor="cost">
                Cost
              </label>
              <input
                className="form-control py-4"
                type="name"
                placeholder="Cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                style={inputStyles}
              />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="form-group mt-4 mb-0">
            <button className="btn btn-primary btn-block" style={buttonStyles}>
              Create Treatment Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <Layout title="Category treatment Form">
      <h2
        className="mb-4"
        style={{
          fontFamily: "Roboto sans-serif",
        }}
      >
        Create Treatment Category
      </h2>
      {success && (
        <div className="alert alert-success" role="alert">
          Treatment created
        </div>
      )}

      {showLoading()}
      {showError()}
      {categoryTestForm()}
    </Layout>
  );
};

export default CreateTreatment;
