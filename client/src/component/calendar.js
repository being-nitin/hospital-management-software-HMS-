import React from 'react'
import { Badge, Button, Calendar , Popover} from 'antd';
import {Fragment, useEffect} from 'react'
import Layout from '../core/Layout';
import { listVacApp, deleteVacApp } from '../actions/vaccineAppointmentActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom";
import moment from "moment";
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const vaccineAppList = useSelector((state) => state.vaccineAppList)
    const { loading, error, appointments } = vaccineAppList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
      if (userInfo) {
          dispatch(listVacApp())
      } else {
          navigate('/signin')
      }
    }, [dispatch, userInfo])

  const dateCellRender = (value) => {
    const stringValue = value.format("YYYY-MM-DD");
    const listData = appointments?.filter((appointment)=> {
      return moment(appointment.date).format("YYYY-MM-DD") === stringValue
    })

    const content = (
      <div>  
      {listData?.slice(0,2).map((data, index) => (
      <Link to={`/list-app-vaccine/${data._id}`}>
      <div style={{ cursor : "pointer"}}>
       <p>{index +1}.{" "}Dr.{data.doctor.name}</p>
       <p>Patient - {data?.patient?.firstName + "-" + data?.patient?.patientNumber}</p>
       <p>Time - {data.time}</p>
       <hr/>
      </div>
      </Link>
    ))}
    <Button className='rounded-sm' style={{ cursor : 'pointer'}} onClick={(e) =>{
      e.preventDefault()
      navigate('/list-app-vaccine')
    }}>See All</Button>
    </div>
  )
    return (
      <Popover placement={"rightTop"} content={content} title="Appointments" trigger="click">
        {listData?.slice(0,2).map((item) => (
          <p key={item._id}>
             <p style ={{ backgroundColor: 'pink' , fontSize: '14px'}}>{item.time}</p>
          </p>
          
        ))}
      </Popover>
    );
  };

  return (
    <Layout title="Calendar">
    <div className='form-row'>
        <div className='col-md-12'>
        <Calendar  cellRender={dateCellRender} />
        </div>
    </div>
    </Layout>
  )
}

export default Schedule