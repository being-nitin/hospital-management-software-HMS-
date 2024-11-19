import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../core/Layout";
import { createFloor } from "../actions/floorActions";
import { listBuildings } from "../actions/buildingsActions";
import { FLOOR_CREATE_RESET } from "../constants/floorConstants";
import { useNavigate } from "react-router-dom";

const AddFloor = ({ history }) => {
  const [name, setName] = useState("");
  const [floorcode, setFloorCode] = useState("");
  const [building, setBuilding] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buildingList = useSelector((state) => state.buildingList);
  const { buildings } = buildingList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const floorCreate = useSelector((state) => state.floorCreate);
  const { success, error, loading } = floorCreate;

  useEffect(() => {
    if (userInfo) {
      dispatch(listBuildings());

      if (success) {
        dispatch({ type: FLOOR_CREATE_RESET });
        navigate("/list-floors");
      }
    }
  }, [success, dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createFloor({ name, floorcode, building }));
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
    backgroundColor: "#0056d2",
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

  const AddFloorForm = () => (
    <div style={formContainerStyles}>
      <form onSubmit={submitHandler}>
        <div className="form-row">
          <div className="col-md-8">
            <div className="form-group">
              <label className="small mb-1" htmlFor="description">
                Name
              </label>
              <input
                className="form-control py-4"
                type="name"
                aria-describedby="emailHelp"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="col-md-8">
            <div className="form-group">
              <label className="small mb-1" htmlFor="description">
                Floor Code
              </label>
              <input
                className="form-control py-4"
                type="name"
                aria-describedby="emailHelp"
                placeholder="Enter Floor Code"
                value={floorcode}
                onChange={(e) => setFloorCode(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="col-md-8">
            <div className="form-group">
              <label className="text-muted">Select Building</label>
              <select
                onChange={(e) => setBuilding(e.target.value)}
                className="form-control"
              >
                <option>Please select a Building</option>
                {buildings &&
                  buildings.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="form-group mt-4 mb-0">
            <button className="btn btn-primary btn-block">Add Floor </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <Layout title="Category test Form">
      <h2 className="mb-4" style={centeredHeading}>
        Add A floor
      </h2>

      {showLoading()}
      {showError()}
      {AddFloorForm()}
    </Layout>
  );
};

export default AddFloor;
