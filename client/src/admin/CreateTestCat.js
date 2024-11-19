import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../core/Layout";
import { createCatTest } from "../actions/testActions";
import { useNavigate } from "react-router-dom";

const CreateTestCat = ({ history }) => {
  const [testName, setTestName] = useState("");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [cost, setCost] = useState(0);
  const [description, setDescription] = useState("");
  //const [message, setMessage] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const catTestCreate = useSelector((state) => state.catTestCreate);
  const { success, error, loading } = catTestCreate;

  useEffect(() => {
    if (success) {
      navigate("/");
      //setMessage('category test was created')
    }
  }, [success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCatTest({ testName, minValue, maxValue, cost, description })
    );
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
    padding: "20px", // Add some padding around the form
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

  const buttonStyles = {
    backgroundColor: "#0056d2",
    border: "none",
    color: "white",
    padding: "12px 25px",
    fontSize: "1rem",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
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
                Enter Test Name
              </label>
              <input
                className="form-control py-4"
                id="inputTestName"
                type="text"
                placeholder="Enter name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                style={inputStyles}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="col-md-8">
            <div className="form-group" style={formGroupStyles}>
              <label
                className="small mb-1 font-weight-bold"
                htmlFor="inputMinValue"
              >
                Minimum Value
              </label>
              <input
                className="form-control py-4"
                id="inputMinValue"
                type="number"
                placeholder="Enter minimum value"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                style={inputStyles}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="col-md-8">
            <div className="form-group" style={formGroupStyles}>
              <label
                className="small mb-1 font-weight-bold"
                htmlFor="inputMaxValue"
              >
                Maximum Value
              </label>
              <input
                className="form-control py-4"
                id="inputMaxValue"
                type="number"
                placeholder="Enter maximum value"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                style={inputStyles}
              />
            </div>
          </div>

          <div className="col-md-8">
            <div className="form-group" style={formGroupStyles}>
              <label className="small mb-1 font-weight-bold" htmlFor="cost">
                Cost
              </label>
              <input
                className="form-control py-4"
                id="cost"
                type="text"
                placeholder="Cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                style={inputStyles}
              />
            </div>
          </div>

          <div className="col-md-8">
            <div className="form-group" style={formGroupStyles}>
              <label
                className="small mb-1 font-weight-bold"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="form-control py-4"
                id="description"
                type="text"
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
              Create Test Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <Layout title="Category test Form">
      <h2
        className="mb-4"
        style={{
          fontFamily: "Roboto sans-serif",
        }}
      >
        Create Test Category
      </h2>
      {success && (
        <div
          className="alert alert-success"
          role="alert"
          style={{
            fontFamily: "Roboto sans-serif",
          }}
        >
          Category test created
        </div>
      )}

      {showLoading()}
      {showError()}
      {categoryTestForm()}
    </Layout>
  );
};

export default CreateTestCat;
