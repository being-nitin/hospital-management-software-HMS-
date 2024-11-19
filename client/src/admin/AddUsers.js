import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { usersRegister } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  USERS_REGISTER_RESET,
  USER_LIST_SUCCESS,
  USERS_REGISTER_FAIL,
} from "../constants/userConstants";
import { useNavigate } from "react-router-dom";

const AddUsers = ({ history }) => {
  const [name, setName] = useState("joseph");
  const [email, setEmail] = useState("joseph@gmail.com");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(2);
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [message, setMessage] = useState(null)

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const usersCreate = useSelector((state) => state.usersCreate);
  const { success, error, loading } = usersCreate;

  useEffect(() => {
    if (userInfo) {
      if (success) {
        dispatch({ type: USERS_REGISTER_RESET });
        navigate("/list/users");
      }
    }
  }, [dispatch, success, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(usersRegister({ name, email, password, confirmPassword, role }));
  };
  const formContainerStyles = {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "30px 40px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Roboto sans-serif",
  };

  const formRowStyles = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  };

  const formGroupStyles = {
    flex: 1,
    marginBottom: "15px", // Space between form groups
  };

  const labelStyles = {
    fontWeight: "600",
    marginBottom: "12px",
    display: "block",
    color: "#333",
    fontSize: "14px",
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
    padding: "6px 12px",
    fontSize: "1rem",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
    marginTop: "15px",
  };

  buttonStyles[":hover"] = {
    backgroundColor: "#0056b3",
  };

  // {message && <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
  //     {message}
  // </div>}

  const usersForm = () => (
    <form onSubmit={submitHandler} style={formContainerStyles}>
      <div className="form-row" style={formRowStyles}>
        <div className="col-md-8" style={formGroupStyles}>
          <label style={labelStyles} htmlFor="inputFirstName">
            Enter Name
          </label>
          <input
            className="form-control"
            id="inputFirstName"
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyles}
          />
        </div>
      </div>

      <div className="form-row" style={formRowStyles}>
        <div className="col-md-8" style={formGroupStyles}>
          <label style={labelStyles} htmlFor="inputRole">
            Enter Role
          </label>
          <input
            className="form-control"
            id="inputRole"
            type="role"
            placeholder="Enter role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyles}
          />
        </div>
      </div>

      <div className="form-row" style={formRowStyles}>
        <div className="col-md-8" style={formGroupStyles}>
          <label style={labelStyles} htmlFor="inputEmailAddress">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyles}
          />
        </div>
      </div>

      <div className="form-row" style={formRowStyles}>
        <div className="col-md-8" style={formGroupStyles}>
          <label style={labelStyles} htmlFor="inputPassword">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyles}
          />
        </div>
      </div>

      <div className="form-row" style={formRowStyles}>
        <div className="col-md-8" style={formGroupStyles}>
          <label style={labelStyles} htmlFor="inputConfirmPassword">
            Confirm Password
          </label>
          <input
            className="form-control"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyles}
          />
        </div>
      </div>

      <div className="col-md-8" style={formGroupStyles}>
        <button
          className="btn btn-primary btn-block"
          type="submit"
          style={buttonStyles}
        >
          Add User
        </button>
      </div>
    </form>
  );

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

  return (
    <Layout className="container-fluid">
      <h2
        className="mb-4"
        style={{
          fontFamily: "Roboto sans-serif",
        }}
      >
        Add User
      </h2>
      {email}

      {showError()}
      {showLoading()}
      {usersForm()}
    </Layout>
  );
};

export default AddUsers;
