import React, {useEffect, Fragment} from 'react'
import Layout from '../core/Layout';
import { useDispatch, useSelector } from 'react-redux'
import "../styles.css";
import { patientsDetailsUser } from '../actions/patientActions'
import { Button } from "antd";
import { useParams , useNavigate , Link} from 'react-router-dom';
import moment from "moment"

const PatDetails = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

   


    useEffect(() => {
        if (userInfo ) {
            dispatch(patientsDetailsUser(id))
        } else {
            navigate('/signin')
        }
    }, [dispatch, userInfo])


    const patientDetailsUser = useSelector((state) => state.patientDetailsUser)
    const { patient } = patientDetailsUser

    
    console.log(patient)


    return (
        <Layout title={"Patients details"}>
             <div className="container mt-4">
           <h4 className='mb-4'>{patient[0]?.patient.firstName + patient[0]?.patient.lastName}</h4>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Gender</th>
            <th>Medical History</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patient && patient.length && patient.map((entry, index) => (
            <tr key={index}>
              <td>{moment(entry.date).format("YYYY-MM-DD")}</td>
              <td>{entry.time}</td>
              <td>{entry.doctor.name}</td>
            
              <td>{entry.patient.gender}</td>
              <td>
                {entry.patient.medicalhistory.length > 0
                  ? entry.patient.medicalhistory.join(", ")
                  : "None"}
              </td>
              <td>
                <span
                  className={`badge ${
                    entry.status === "Scheduled" ? "badge-success" : "badge-danger"
                  }`}
                >
                  {entry.status}
                </span>
              </td>
              <td>{entry.remarks}</td>
              <td>
              <Link to={`/list-app-vaccine/${entry._id}`}>
                          <Button
                            type="default"
                            size="small"
                            style={{
                              fontFamily: "Roboto sans-serif",
                            }}
                          >
                            Details
                          </Button>
                        </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </Layout>
    )
}




export default PatDetails