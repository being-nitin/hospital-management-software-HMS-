import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar"; // FIXED
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { listVacApp } from "../actions/vaccineAppointmentActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../core/Layout";

const localizer = momentLocalizer(moment);

const TimelineCalendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState();

  const vaccineAppList = useSelector((state) => state.vaccineAppList);
  const { loading, error, appointments } = vaccineAppList;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listVacApp());
    } else {
      navigate("/signin");
    }
  }, [dispatch, userInfo, navigate]);

  const getDurationInMinutes = (duration) => {
    const parts = duration.match(/\d+/g); // Extract numbers
    if (!parts) return 0;

    if (duration.includes("hr") && duration.includes("min")) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (duration.includes("hr")) {
      return parseInt(parts[0]) * 60;
    } else {
      return parseInt(parts[0]);
    }
  };

  // Format API Data to Calendar Events
  useEffect(() => {
    if (appointments && appointments.length > 0) {
      const formattedAppointments = appointments.map((appointment) => {
        const startDate = moment(appointment.date).toDate();
        const startTime = moment(appointment.time, "HH:mm").toDate();
        
        // Combine Date and Time
        const start = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          startTime.getHours(),
          startTime.getMinutes()
        );

        const durationMinutes = getDurationInMinutes(appointment.duration);
        const end = new Date(start.getTime() + durationMinutes * 60000);

        return {
          title:  `${appointment.patient.firstName} - ${appointment.patient.patientNumber}` ,
          start,
          end,
          desc: appointment,
        };
      });
      setAppointmentData(formattedAppointments);
    }
  }, [appointments]);


  const formats = {
    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, "H:mm", culture),
  };

  const onSelectEvent = (event) => {
    
    if (event.desc.patient) {
      localStorage.setItem("selectedPatient", JSON.stringify(event.desc.patient));
    }



    navigate('/patient-app-details')
  };

  return (
    <Layout title={"Calendar"}>
    <div style={{ height: 700 }}>
      
      <Calendar
        events={appointmentData} // UPDATED TO USE API DATA
        localizer={localizer}
        defaultView={"day"}
        views={["agenda" ,"month" ,"day", "work_week"]}
        // timeslots={8}
        step={2.5}  
        showMultiDayTimes
        defaultDate={new Date()}
        formats={formats}
        onSelectEvent={onSelectEvent}
        // min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)}
        // max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18)}
        culture={moment.locale("en-US")}
        dayLayoutAlgorithm="no-overlap"
        messages={{
          today: "Today",
          previous: "<",
          next: ">",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
      />
    </div>
    </Layout>
  );
};

export default TimelineCalendar;
