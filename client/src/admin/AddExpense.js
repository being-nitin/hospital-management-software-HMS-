import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../core/Layout";
import { listPaidEnums, createExpenses } from "../actions/expensesActions";
import { listDeparts } from "../actions/departmentActions";
import DatePicker from "react-datepicker";
import { EXPENSES_CREATE_RESET } from "../constants/expensesConstants";

const AddExpense = ({ history: history1 }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [paid, setPaid] = useState("Un-paid");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const departsList = useSelector((state) => state.departsList);
  const { departments } = departsList;

  const expenseCreate = useSelector((state) => state.expenseCreate);
  const { error, loading, success } = expenseCreate;

  const expensesPaid = useSelector((state) => state.expensesPaid);
  const { pays } = expensesPaid;

  useEffect(() => {
    if (userInfo) {
      dispatch(listDeparts());
      dispatch(listPaidEnums());

      if (success) {
        dispatch({ type: EXPENSES_CREATE_RESET });
        history1.push("/list-expenses");
      }
    } else {
      history1.push("/signin");
    }
  }, [dispatch, userInfo, success]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createExpenses({
        name,
        department,
        amount,
        description,
        fromDate,
        to,
        paid,
      })
    );
  };
  const formContainerStyles = {
    maxWidth: "1000px", // Adjust the max width of the form container
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
  const formRowStyle = {
    marginBottom: "15px",
  };
  const labelStyles = {
    fontWeight: "bold",
  };

  const addExpenseForm = () => (
    <div className="form-group col-md-12">
      <form onSubmit={submitHandler} style={formContainerStyles}>
        <div className="form-row" style={formRowStyle}>
          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="inputAddress2">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              style={inputStyles}
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="inputAmount">
              Amount
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAmount"
              style={inputStyles}
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row" style={formRowStyle}>
          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="fromDate">
              From Date
            </label>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              className="form-control"
              style={inputStyles}
              placeholderText="Select from date"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="toDate">
              To Date
            </label>
            <DatePicker
              selected={to}
              onChange={(date) => setTo(date)}
              className="form-control"
              style={inputStyles}
              placeholderText="Select to date"
              required
            />
          </div>
        </div>

        <div className="form-row" style={formRowStyle}>
          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="departmentSelect">
              Department
            </label>
            <select
              // multiple
              className="form-control"
              id="departmentSelect"
              style={selectStyles}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option disabled>Select Department</option>
              {departments &&
                departments.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group col-md-6">
            <label style={labelStyles} htmlFor="descriptionTextarea">
              Description
            </label>
            <textarea
              className="form-control"
              id="descriptionTextarea"
              style={inputStyles}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a description"
              rows="3"
              required
            />
          </div>
        </div>

        <div className="form-row" style={formRowStyle}>
          <div className="form-group col-md-3">
            <label style={labelStyles} htmlFor="paidSelect">
              Paid
            </label>
            <select
              onChange={(e) => setPaid(e.target.value)}
              className="form-control"
              id="paidSelect"
              style={selectStyles}
              required
            >
              <option disabled>Select Payment Status</option>
              {pays &&
                pays.map((p, i) => (
                  <option key={i} value={p}>
                    {p}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <button type="submit" style={buttonStyles}>
          Save
        </button>
      </form>
    </div>
  );

  return (
    <Layout title="Category treatment Form">
      <>
        <h2 className="mb-4" style={centeredHeading}>
          Add Expense
        </h2>
        {showLoading()}
        {showError()}
        {addExpenseForm()}
      </>
    </Layout>
  );
};

export default AddExpense;
