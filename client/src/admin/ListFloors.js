import React, { Fragment, useEffect } from "react";
import Layout from "../core/Layout";
import { listFloors, deleteFloors } from "../actions/floorActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListFloors = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const floorList = useSelector((state) => state.floorList);
  const { loading, error, floors } = floorList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const floorDelete = useSelector((state) => state.floorDelete);
  const { success: successDelete } = floorDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listFloors());
    } else {
      navigate("/signin");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteFloors(id));
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
        <Link to="/add-floor">
          <button className="btn btn-primary btn-sm" style={buttonStyles}>
            Add Floor
          </button>
        </Link>
      </h4>

      <h2 className="mb-4" style={buttonStyles}>
        List Floors
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
                <tr style={rowStyles}>
                  <th scope="col">Id</th>
                  <th scope="col">name</th>
                  <th scope="col">Floor Code</th>
                  <th scope="col">Building</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {floors &&
                  floors.map((flo, i) => (
                    <tr key={i}>
                      <Fragment>
                        <th scope="row">{flo._id}</th>
                        <td>{flo.name}</td>
                        <td>{flo.floorcode}</td>
                        <td>{flo.building.name}</td>
                        <td>
                          <Link to={`/update-floor/${flo._id}`}>
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                        </td>
                        <td>
                          <i
                            className="bi bi-trash"
                            onClick={() => deleteHandler(flo._id)}
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

export default ListFloors;
