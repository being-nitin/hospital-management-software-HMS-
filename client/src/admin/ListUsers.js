import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { listUsers, deleteUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";

const ListUsers = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  //console.log(users)

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const [activePage, setActivePage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);

  const [data, setData] = useState(users);

  const [searchTerm, setSearchTerm] = React.useState("");

  // const handleChange = event => {
  //     setSearchTerm(event.target.value);
  // };

  useEffect(() => {
    if (userInfo) {
      dispatch(listUsers());
      //setData(users)
    } else {
      navigate("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  useEffect(() => {
    if (window.location.search !== "") {
      setData(
        users?.filter(
          (user) => user?.role === Number(window.location.search.slice(-1))
        )
      );
    }
  }, []);

  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  const searchUsers = (target) => {
    if (target === " ") {
      return setData(users);
    }

    let results = [
      ...(users &&
        users.filter((user) =>
          user.name.toString().toLowerCase().includes(target)
        )),
      ...users?.filter(
        (user) => user?.role === Number(window.location.search.slice(-1))
      ),
    ];

    setData(results);
  };

  // search users
  // const results = !searchTerm ? users : users && users.filter(user =>
  //     user.name.toString().toLowerCase().includes(searchTerm)
  // )

  const countUsers = () => {
    //return results && results.length
    return data && data.length;
  };

  const indexOfLastUser = activePage * itemPerPage;
  const indexOfFirstUser = indexOfLastUser - itemPerPage;

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
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
      style={emailStyles}
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      <h4>
        <Link to="/add-users">
          <button className="btn btn-primary btn-sm" style={buttonStyles}>
            Add User
          </button>
        </Link>
      </h4>

      <h2 className="mb-4" style={centeredHeading}>
        List Users
      </h2>
      {loading ? (
        showLoading()
      ) : error ? (
        showError()
      ) : (
        <div className="row">
          <div className="col-lg-12">
            <form>
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    e.preventDefault();
                    return searchUsers(e.target.value);
                  }}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-sm-12">
            <table className="table" style={tableStyles}>
              <thead style={theadStyles}>
                <tr>
                  <th scope="col">User Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data?.length !== 0 ? (
                  data
                    .slice(indexOfFirstUser, indexOfLastUser)
                    .map((user, i) => (
                      <tr key={i} style={rowStyles}>
                        <th scope="row">{user._id}</th>
                        <th>{user.name}</th>
                        <th style={emailStyles}>{user.email}</th>

                        <td>
                          {user.role === 0 ? (
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              style={buttonStyles}
                            >
                              Admin
                            </button>
                          ) : user.role === 1 ? (
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              style={buttonStyles}
                            >
                              Doctor
                            </button>
                          ) : user.role === 2 ? (
                            <button
                              type="button"
                              className="btn btn-info btn-sm"
                              style={buttonStyles}
                            >
                              Patient
                            </button>
                          ) : user.role === 4 ? (
                            <button
                              type="button"
                              className="btn btn-dark btn-sm"
                              style={buttonStyles}
                            >
                              Nurse
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-warning btn-sm"
                              style={buttonStyles}
                            >
                              Staff
                            </button>
                          )}
                        </td>
                        <td>
                          {user.role === 0 ? (
                            " "
                          ) : (
                            <Link to={`/update/users/${user._id}`}>
                              <i
                                className="bi bi-pencil-square"
                                style={iconStyles}
                              />
                            </Link>
                          )}
                        </td>
                        <td>
                          {user.role === 0 ? (
                            " "
                          ) : (
                            <i
                              className="bi bi-trash"
                              style={iconStyles}
                              onClick={() => deleteHandler(user._id)}
                            />
                          )}
                        </td>
                        <td>
                          {user.role === 2 ? (
                            <Link to={`/pat-details/${user._id}`}>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-success btn-sm"
                                style={buttonStyles}
                              >
                                Details
                              </button>
                            </Link>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))
                ) : (
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      padding: "20px",
                    }}
                  >
                    <b>No Users found</b>
                  </td>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemPerPage}
        totalItemsCount={parseInt(countUsers())}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </Layout>
  );
};

export default ListUsers;
