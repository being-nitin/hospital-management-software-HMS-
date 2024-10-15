import React, {Fragment, useEffect} from 'react'
import { Button } from 'antd';
import Layout from '../core/Layout';
import { listVacApp, deleteVacApp } from '../actions/vaccineAppointmentActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import moment from "moment";
import { useNavigate } from 'react-router-dom';



const ListAppVaccine = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const vaccineAppList = useSelector((state) => state.vaccineAppList)
    const { loading, error, appointments } = vaccineAppList

    console.log(appointments)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const vaccineAppDelete = useSelector((state) => state.vaccineAppDelete)
    const { success: successDelete } = vaccineAppDelete

    useEffect(() => {
        if (userInfo) {
            dispatch(listVacApp())
        } else {
            navigate('/signin')
        }
    }, [dispatch, successDelete, userInfo])


    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteVacApp(id))
        }
    }


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
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
            <Layout title="Appointments" className="container-fluid">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">List of Appointments</h2>
                <Link to="/add-vacc-app">
                  <Button type="primary" size="large">Add Appointment</Button>
                </Link>
              </div>
        
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : appointments.length === 0 ? (
                <div className="alert alert-info">No Appointments Found</div>
              ) : (
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
                      {appointments.map((app, i) => (
                        <tr key={i}>
                          <Fragment>
                            <td>{app._id.substring(0, 7)}</td>
                            <td>{app.doctor.name}</td>
                            <td>{app.patient.firstName + "-" +app.patient.patientNumber}</td>
                            <td>{moment(app.date).format('YYYY-MM-DD')}</td>
                            <td>{app.time}</td>
                            <td>
                              {app.taken === 'scheduled' ? (
                                <span className="badge badge-success">{app.status}</span>
                              ) : (
                                <span className="badge badge-danger">{app.status}</span>
                              )}
                            </td>
                            <td>{app.remarks}</td>
                            <td>
                              <div className="btn-group" role="group">
                                  <Button type="primary" size="small" className="mr-2" onClick={(e) =>{
                                   e.preventDefault()  
                                   console.log(app._id)
                                   navigate(`/update-vacc-app/${app._id}`)}}>Edit</Button>
                                <Button
                                  type="danger"
                                  size="small"
                                  className="mr-2"
                                  onClick={() => deleteHandler(app._id)}
                                >
                                  Delete
                                </Button>
                                <Link to={`/list-app-vaccine/${app._id}`}>
                                  <Button type="default" size="small">Details</Button>
                                </Link>
                              </div>
                            </td>
                          </Fragment>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Layout>
          );        

}






export default ListAppVaccine