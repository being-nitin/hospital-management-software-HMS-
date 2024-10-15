import React, { Fragment, useEffect } from "react";
import Layout from "../core/Layout";
import { listTestsResults, deleteTests } from "../actions/testActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const ListTestResult = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listTestResult = useSelector((state) => state.listTestResult);
  const { loading, error, tests } = listTestResult;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const testsdelete = useSelector((state) => state.testsdelete);
  const { success: successDelete } = testsdelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listTestsResults());
      //console.log(tests[0])
    } else {
      navigate("/signin");
    }
  }, [history, dispatch, successDelete, userInfo]);

  const totalCollected = () => {
    let total =
      tests &&
      tests.reduce((acc, curr) => {
        if (curr.paid === "Paid") {
          acc += parseInt(curr.testName.cost);
        }

        return acc;
      }, 0);

    return total;
  };

  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      dispatch(deleteTests(id));
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
      description="Update your profile"
      className="container-fluid"
    >
      <h2 className="font-weight-bold">Total Paid:{totalCollected()}</h2>
      <h4>
        <Link to="/create-test">
          <button className="btn btn-primary btn-sm" style={buttonStyles}>
            Add Test
          </button>
        </Link>
      </h4>
      <h2 className="mb-4" style={centeredHeading}>
        List Result tests
      </h2>

      {loading ? (
        showLoading()
      ) : error ? (
        showError()
      ) : (
        <div className="row">
          <div className="col-sm-12" style={tableStyles}>
            <table className="table" style={theadStyles}>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">User</th>
                  <th scope="col">Test Name</th>
                  <th scope="col">Result</th>
                  <th scope="col">Description</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Paid</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {tests &&
                  tests.map((test, i) => (
                    <tr key={i} style={rowStyles}>
                      <Fragment>
                        <th scope="row">{test._id.substring(0, 7)}</th>
                        <td>{test.user.name}</td>
                        <td>{test.testName.testName}</td>
                        <td>{test.result}</td>
                        <td>{test.description}</td>
                        <td>{test.testName.cost}</td>
                        <td>
                          {test.paid === "Paid" ? (
                            <button
                              type="button"
                              className="btn btn-success btn-sm"
                              style={buttonStyles}
                            >
                              {test.paid}
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                            >
                              {test.paid}
                            </button>
                          )}
                        </td>
                        <td>
                          <Link to={`/update-test/${test._id}`}>
                            <i
                              className="bi bi-pencil-square"
                              style={iconStyles}
                            />
                          </Link>
                        </td>
                        <td>
                          <i
                            className="bi bi-trash"
                            onClick={() => deleteHandler(test._id)}
                          />
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

export default ListTestResult;
