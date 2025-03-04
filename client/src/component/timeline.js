import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar"; // FIXED
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { listVacApp } from "../actions/vaccineAppointmentActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../core/Layout";
import { listUsers } from "../actions/userActions";

const localizer = momentLocalizer(moment);

const TimelineCalendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState();
  const [doctorColors, setDoctorColors] = useState({});
  const userList = useSelector((state) => state.userList);
      const { users } = userList;

  const vaccineAppList = useSelector((state) => state.vaccineAppList);
  const { loading, error, appointments } = vaccineAppList;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  

  useEffect(() => {
    if (userInfo) {
      dispatch(listVacApp());
       dispatch(listUsers());
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

  const getRandomColor = () => {
    const colors = ["#7393B3" , "#F0FFFF" , "#6495ED", "#00A36C" ,"#ADD8E6"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Assign colors to doctors based on role == 1
  useEffect(() => {
    if (users && users.length > 0) {
      let storedColors = doctorColors || {};
      let updatedColors = { ...storedColors };

      users.forEach((user) => {
        if (user.role === 1 && !updatedColors[user._id]) {
          updatedColors[user._id] = getRandomColor();
        }
      });

      setDoctorColors(updatedColors);
       
    }
  }, [users]);
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
          title:  `${appointment.patient.firstName} - ${appointment.patient.patientNumber}
           , Dr.${appointment.doctor.name} ` ,
          start,
          end,
          desc: appointment,
          doctorId: appointment.doctor?._id || "unknown", 
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

  const eventPropGetter = (event) => {
    return {
      style: {
        backgroundColor: doctorColors[event.doctorId] || "lightgrey",
        color: "black",
        borderRadius: "5px",
        border: "none",
        padding: "5px",
      },
    };
  };
  return (
    <Layout title={"Calendar"}>
    <div style={{ height: 700 }}>
      
      <Calendar
        events={appointmentData} // UPDATED TO USE API DATA
        localizer={localizer}
        defaultView={"agenda"}
        views={["agenda" ,"month" ,"day", "work_week"]}
        // timeslots={8}
        step={2.5}  
        showMultiDayTimes
        defaultDate={new Date()}
        formats={formats}
        onSelectEvent={onSelectEvent}
        min={new Date().setHours(8 , 0, 0, 0)} 
        eventPropGetter={eventPropGetter}
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
