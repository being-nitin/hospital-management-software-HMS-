import React, { useEffect, useState, useCallback, useRef } from "react";
import { useAppointments, useInfiniteAppointments } from "./api/app.js";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listPatients } from "../actions/patientActions";
import Layout from "../core/Layout";
import MedicalHistoryForm from "./medicalHistoryForm";
import AppointmentDetail from "./appointmentDetail";
import moment from "moment";

const { RangePicker } = DatePicker;

const PatAppDetail = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [hasMore, setHasMore] = useState(true);
  const [content, setContent] = useState("Today");
  const [showBilling, setShowBilling] = useState(false);
  const [date, setDate] = useState(null)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, refetch } = useInfiniteAppointments({
    limit: 2,
    patient: selectedPatient?._id,
    date: date
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { patients = {} } = useSelector((state) => state.patientList);


  useEffect(() => {
    if (userInfo) {
      dispatch(listPatients({}));
    } else {
      navigate("/signin");
    }
  }, [userInfo]);

  useEffect(() => {
    if (selectedPatient || date) {
      refetch(); // Fetch appointments for the selected patient
    }
  }, [selectedPatient, date, refetch]);

  const handleObserver = useRef();

  const lastElement = useCallback(
    (element) => {
      if (isLoading || isFetchingNextPage) return; // Prevent triggering if still loading or fetching
      if (handleObserver.current) handleObserver.current.disconnect(); // Clean up the previous observer

      handleObserver.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage) {
            console.log("Fetching next page...");
            fetchNextPage(); // Fetch next page when the last item is visible
          }
        });
      });

      if (element) handleObserver.current.observe(element); // Start observing the last element
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage] // Add fetchNextPage and others in the dependencies to ensure they are stable
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDateChange = (dates) => {
    const start = dates ? dates[0].format("YYYY-MM-DD") : null;
    const end = dates ? dates[1].format("YYYY-MM-DD") : null;
    setDateRange({ start, end });

  };

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "center", paddingLeft: "200px" }}>
        <div className="mb-4">

          {selectedPatient && <h2>{selectedPatient.firstName.toUpperCase()} {selectedPatient.lastName.toUpperCase()}-{selectedPatient.patientNumber}</h2>}
          <div>

            {data?.pages?.map((group, index) =>
              group.appointment.map((app, i) => {
                const isLastItem = index === data.pages.length - 1 && i === group.appointment.length - 1; // Check if this is the last item in the list
                return (


                  <AppointmentDetail
                    lastElement={isLastItem ? lastElement : null}
                    key={app._id}
                    app={app}
                  />
                );
              })
            )}
            {isFetchingNextPage && <p>Loading more...</p>}
          </div>
          {date && (
            <button
              className="btn btn-primary mt-3"
              onClick={() => setDate(null)}
            >
              Show More
            </button>
          )}
        </div>
        {selectedPatient && <MedicalHistoryForm id={selectedPatient._id} />}
      </div>
      <div style={{ position: "fixed", top: 0, bottom: 0, left: 60, width: "200px", background: "#ddd" }}>
        <div className="d-flex p-2" style={{ justifyContent: "center", marginTop: "100px", gap: '10px' }}>
          <button className="btn btn-secondary w-100" onClick={() => setContent("Today")}>
            Today
          </button>
          <button className="btn btn-secondary w-100" onClick={() => setContent("All")}>
            All
          </button>
        </div>
        <div className="flex-grow-1 p-3" style={{ overflowY: "scroll", height: "100%" }}>
          {(content === "Today" && data.pages[0].todayAppointment || []).map((item, index) => (
            <div key={index} className="list-group-item" style={{ cursor: "pointer" }}
              onClick={() => {
                refetch()
                setDate(new Date().toDateString())
                setSelectedPatient(item.patient || item)
              }}>
              <i className="fas fa-user-md m-1"></i>
              {item.patient?.firstName || item.firstName}-{item.patient?.patientNumber || item.patientNumber}
            </div>
          ))}
          {(content === "All" && patients.patient || []).map((item, index) => (
            <div key={index} className="list-group-item" style={{ cursor: "pointer" }}
              onClick={() => {

                setDate(null)
                setSelectedPatient(item.patient || item)
              }}>
              <i className="fas fa-user-md m-1"></i>
              {item.patient?.firstName || item.firstName}-{item.patient?.patientNumber || item.patientNumber}
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
};

export default PatAppDetail;