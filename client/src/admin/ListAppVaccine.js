import React, { Fragment, useEffect, useState } from "react";
import { Button, Input, Select, DatePicker, Pagination } from "antd";
import Layout from "../core/Layout";
import { listVacApp , deleteVacApp } from "../actions/vaccineAppointmentActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const ListAppVaccine = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State for filters and pagination
  const [filters, setFilters] = useState({
    status: null,
    date: null,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
  });

  const vaccineAppList = useSelector((state) => state.vaccineAppList);
  const { loading, error, appointments: {appointment, currentPage, totalPages, totalAppointments} = {}} = vaccineAppList;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const vaccineAppDelete = useSelector((state) => state.vaccineAppDelete);
  const { success: successDelete } = vaccineAppDelete;

  useEffect(() => {
    if (userInfo) {
      // Fetch appointment with current filters and pagination
      const { status, date } = filters;
      const formattedDate = date ? moment(date).format("YYYY-MM-DD") : null;
      dispatch(listVacApp(pagination.currentPage, pagination.pageSize, status, formattedDate));
    } else {
      navigate("/signin");
    }
  }, [dispatch, successDelete, userInfo, filters, pagination]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteVacApp(id));
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    const { status, date } = filters;
    const formattedDate = date ? moment(date).format("YYYY-MM-DD") : null;
    dispatch(listVacApp(1, pagination.pageSize, status, formattedDate)); // Apply filters and reset to first page
    setPagination({ currentPage: 1, pageSize: pagination.pageSize });
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ currentPage: page, pageSize });
    const { status, date } = filters;
    const formattedDate = date ? moment(date).format("YYYY-MM-DD") : null;
    dispatch(listVacApp(page, pageSize, status, formattedDate)); // Fetch data for the selected page
  };

  return (
    <Layout
      style={{
        fontFamily: "Roboto sans-serif",
      }}
      title="appointment"
      className="container-fluid"
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2
          className="mb-0"
          style={{
            fontFamily: "Roboto sans-serif",
          }}
        >
          List of appointment
        </h2>
        <div className="d-flex gap-2">
          {/* Filters */}
          <Select
            placeholder="Filter by Status"
            style={{ width: 150 }}
            onChange={(value) => handleFilterChange("status", value)}
            allowClear
          >
            <Option value="Scheduled">scheduled</Option>
            <Option value="closed">closed</Option>
            <Option value="pending">pending</Option>
          </Select>
          <DatePicker
            placeholder="Filter by Date"
            onChange={(date) => handleFilterChange("date", date)}
            allowClear
          />
          <Button type="primary" onClick={applyFilters}>
            Search
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (appointment && appointment.length  === 0) ? (
        <div className="alert alert-info">No appointment Found</div>
      ) : (
        <Fragment>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Doctor</th>
                  <th scope="col">Patient</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Remarks</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointment && appointment.length && appointment.map((app, i) => (
                  <tr key={i}>
                    <td>{app._id.substring(0, 7)}</td>
                    <td>{app.doctor.name}</td>
                    <td>
                      {app?.patient?.firstName +
                        " - " +
                        app?.patient?.patientNumber}
                    </td>
                    <td>{moment(app.date).format("YYYY-MM-DD")}</td>
                    <td>{app.time}</td>
                    <td>
                      {app.status === "Scheduled" ? (
                        <span className="badge badge-success">{app.status}</span>
                      ) : (
                        <span className="badge badge-danger">{app.status}</span>
                      )}
                    </td>
                    <td>{app.remarks}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <Button
                          type="primary"
                          size="small"
                          className="mr-2"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/update-vacc-app/${app._id}`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          type="danger"
                          size="small"
                          onClick={() => deleteHandler(app._id)}
                        >
                          Delete
                        </Button>
                        <Link to={`/list-app-vaccine/${app._id}`}>
                          <Button type="default" size="small">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            current={currentPage}
            total={totalAppointments}
            pageSize={pagination.pageSize}
            onChange={handlePaginationChange}
            showSizeChanger
            pageSizeOptions={["10", "20", "50"]}
            onShowSizeChange={handlePaginationChange}
          />
        </Fragment>
      )}
    </Layout>
  );
};

export default ListAppVaccine;
