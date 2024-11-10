import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../core/Layout";
import {
  createTest,
  listCatTests,
  listPaidEnums,
} from "../actions/testActions";
import { listUsers } from "../actions/userActions";
import { TEST_CREATE_RESET } from "../constants/testConstants";

import { useNavigate } from "react-router-dom";

const CreateTest = ({ history }) => {
  const [user, setUser] = useState("");
  const [testName, setTestName] = useState("");
  const [result, setResult] = useState("");
  const [description, setDescription] = useState("");
  const [paid, setPaid] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const catTestList = useSelector((state) => state.catTestList);
  const { tests } = catTestList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createTests = useSelector((state) => state.createTests);
  const { success, error, loading } = createTests;

  const testPaidList = useSelector((state) => state.testPaidList);
  const { pays } = testPaidList;

  useEffect(() => {
    if (userInfo) {
      dispatch(listUsers());
      dispatch(listCatTests());
      dispatch(listPaidEnums());

      if (success) {
        dispatch({ type: TEST_CREATE_RESET });
        navigate("/test-result");
      }
    } else {
      navigate("/signin");
    }
  }, [success, dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTest({ user, testName, result, description, paid }));
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

  // Add hover effect for button
  buttonStyles[":hover"] = {
    backgroundColor: "#0056b3",
  };
  const formGroupStyles = {
    marginBottom: "20px",
  };

  const TestForm = () => (
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
              <label className="text-muted font-weight-bold">Select User</label>
              <select
                onChange={(e) => setUser(e.target.value)}
                className="form-control"
                style={selectStyles}
              >
                <option>Please select User</option>
                {users &&
                  users
                    .filter((filtered) => filtered.role === 2)
                    .map((c, i) => (
                      <option key={i} value={c._id}>
                        {c.name}
                      </option>
                    ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="col-md-8">
            <div className="form-group" style={formGroupStyles}>
              <label className="text-muted font-weight-bold">
                Select TestName
              </label>
              <select
                onChange={(e) => setTestName(e.target.value)}
                className="form-control"
                style={selectStyles}
              >
                <option>Please select Test Name</option>
                {tests &&
                  tests.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.testName}
                    </option>
                  ))}
              </select>
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
                Result
              </label>
              <input
                className="form-control py-4"
                type="text"
                aria-describedby="emailHelp"
                placeholder="Result"
                value={result}
                onChange={(e) => setResult(e.target.value)}
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
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="form-control py-4"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={inputStyles}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="col-md-8">
            <div className="form-group" style={formGroupStyles}>
              <label
                className="font-weight-bold"
                htmlFor="exampleFormControlSelect1"
              >
                Paid
              </label>
              <select
                onChange={(e) => setPaid(e.target.value)}
                className="form-control"
                id="exampleFormControlSelect1"
                style={selectStyles}
              >
                <option>Select Pay</option>
                {pays &&
                  pays.map((p, i) => (
                    <option key={i} value={p}>
                      {p}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="form-group mt-4 mb-0">
            <button className="btn btn-primary btn-block" style={buttonStyles}>
              Create Test
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
        Create Test Result
      </h2>

      {showLoading()}
      {showError()}
      {TestForm()}
    </Layout>
  );
};

export default CreateTest;
