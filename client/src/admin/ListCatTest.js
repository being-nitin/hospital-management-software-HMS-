import React, { Fragment, useEffect } from "react";
import Layout from "../core/Layout";
import { listCatTests, deleteTestCat } from "../actions/testActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListCatTest = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const catTestList = useSelector((state) => state.catTestList);
  const { loading, error, tests } = catTestList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const catTestDelete = useSelector((state) => state.catTestDelete);
  const { success: successDelete } = catTestDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listCatTests());
      //console.log(tests)
    } else {
      navigate("/signin");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      dispatch(deleteTestCat(id));
    }
  };
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
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "100px",
    margin: "0 auto",
    fontWeight: "bold",
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

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      <h4>
        <Link to="/create/cat-test">
          <button className="btn btn-primary btn-sm" style={buttonStyles}>
            Add Category Test
          </button>
        </Link>
      </h4>

      <h2 className="mb-4" style={centeredHeading}>
        List Category tests
      </h2>

      {loading ? (
        showLoading()
      ) : error ? (
        showError()
      ) : (
        <div className="row">
          <div className="col-sm-10" style={tableStyles}>
            <table className="table" style={theadStyles}>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">MinValue</th>
                  <th scope="col">MaxValue</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Test Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {tests &&
                  tests.map((cat, i) => (
                    <tr key={i} style={rowStyles}>
                      <Fragment>
                        <th scope="row">{cat._id}</th>
                        <td>{cat.minValue && cat.minValue}</td>
                        <td>{cat.maxValue}</td>
                        <td>{cat.cost}</td>
                        <td>{cat.testName}</td>
                        <td>{cat.description}</td>
                        <td>
                          <Link to={`/update-cat-test/${cat._id}`}>
                            <i className="bi bi-pencil-square" />
                          </Link>
                        </td>
                        <td>
                          <i
                            className="bi bi-trash"
                            style={iconStyles}
                            onClick={() => deleteHandler(cat._id)}
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

export default ListCatTest;
