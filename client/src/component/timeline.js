import React, { useRef, useEffect, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // for drag and drop
import dayGridPlugin from '@fullcalendar/daygrid'; // for the grid view
import timeGridPlugin from '@fullcalendar/timegrid';
import Layout from '../core/Layout';
import { listVacApp, deleteVacApp } from '../actions/vaccineAppointmentActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import listPlugin from '@fullcalendar/list';
import AddAppVaccineModal from './modal/addAppointment';

const TimelineCalendar = () => {
  const calendarRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const vaccineAppList = useSelector((state) => state.vaccineAppList)
  const [showModal , setShowModal] = useState(false)
  const { loading, error, appointments } = vaccineAppList
  const [date , setDate] = useState(null)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
        dispatch(listVacApp())
    } else {
        navigate('/signin')
    }
  }, [dispatch, userInfo])


  const setCalendar = () => {
    let listData = []
    if(appointments){
     
    listData = Array.isArray(appointments)
      ? appointments.map((appointment) => ({
          ...appointment,
          date: moment(appointment.date).format("YYYY-MM-DD"),
        }))
      : [];
  }
  
  const calendar = new Calendar(calendarRef.current, {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        dayMaxEventRows: true, 
        views: {
            dayGrid: {
              dayMaxEventRows: 3
            }
          },
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          },
          navLinks: true,
          dateClick: function(info) {
            console.log(info)
            setDate(info.date);
             setShowModal(true)
          },
        events: listData.map(data =>{
          return { title: data.patient?.firstName + "-" + data.patient?.patientNumber , start: moment(`${data.date} ${data.time}`, 'YYYY-MM-DD HH:mm').valueOf() , url: `/list-app-vaccine/${data._id}` }
          }),
        eventClick: function(info) {
          navigate(info.url)
       },  
      });
      calendar.render();
  }

  useEffect(() => {
    setCalendar()
  }, [appointments ,dispatch]);

  return (
    <>
    {showModal && <AddAppVaccineModal
    show={showModal}
    onClose ={() => setShowModal(false)}
     selectedDate={date}
    />}
  <Layout title="Calendar"><div ref={calendarRef} /></Layout>
  </>
  );
};

export default TimelineCalendar;
