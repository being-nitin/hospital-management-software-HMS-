import React, { useEffect, useState, useCallback } from "react";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { listVacApp } from "../actions/vaccineAppointmentActions";
import { listMedicines } from "../actions/medicineActions";
import { listPatients } from "../actions/patientActions";
import InvoiceModal from "./modal/invoiceLayout";
import Layout from "../core/Layout";
import MedicalHistoryForm from "./medicalHistoryForm";
import AppointmentDetail from "./appointmentDetail";

const { RangePicker } = DatePicker;

const PatAppDetail = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 2 });
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [hasMore, setHasMore] = useState(true);
    const [content, setContent] = useState("Today");
    const [showBilling, setShowBilling] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userLogin);
    const { appointments: { appointment = [], totalPages, todayAppointment } = {} } = useSelector((state) => state.vaccineAppList);
    const { patients = {} } = useSelector((state) => state.patientList);

    const fetchData = useCallback(() => {
        dispatch(listVacApp(pagination.currentPage, pagination.pageSize, null, dateRange.start, dateRange.end, selectedPatient?._id || null));
    }, [dispatch, pagination, dateRange, selectedPatient]);

    useEffect(() => {
        if (userInfo) {
            fetchData();
            dispatch(listMedicines());
            dispatch(listPatients({}));
        } else {
            navigate("/signin");
        }
    }, [userInfo, fetchData, dispatch, navigate]);

    useEffect(() => {
        if (appointment.length) {
            setAppointments((prev) => [...prev, ...appointment]);
            setHasMore(pagination.currentPage < totalPages);
        }
    }, [appointment, totalPages, pagination]);

    const handleDateChange = (dates) => {
        const start = dates ? dates[0].format("YYYY-MM-DD") : null;
        const end = dates ? dates[1].format("YYYY-MM-DD") : null;
        setDateRange({ start, end });
        setPagination({ currentPage: 1, pageSize: 2 });
        setAppointments([]);
        fetchData();
    };

    const loadMore = () => {
        if (hasMore) {
            setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
            fetchData();
        }
    };

    return (
        <Layout>
            <InvoiceModal show={showBilling} onClose={() => setShowBilling(false)} appId={selectedAppointment} />
            <div style={{ display: "flex", justifyContent: "center", paddingLeft: "200px" }}>
                <div className="mb-4">
                    <RangePicker onChange={handleDateChange} style={{ marginBottom: "20px" }} />
                    {selectedPatient && <h2>{selectedPatient.firstName.toUpperCase()} {selectedPatient.lastName.toUpperCase()}-{selectedPatient.patientNumber}</h2>}
                    <InfiniteScroll
                        dataLength={appointments.length}
                        next={loadMore}
                        hasMore={hasMore}
                        loader={<p>Loading...</p>}
                        endMessage={<p>No more data to load.</p>}
                    >
                        {appointments.map((app) => (
                            <AppointmentDetail key={app._id} app={app} fetchData={fetchData} />
                        ))}
                    </InfiniteScroll>
                </div>
                {selectedPatient && <MedicalHistoryForm id={selectedPatient._id} />}
            </div>
            <div style={{ position: "fixed", top: 0, bottom: 0, left: 60, width: "200px", background: "#ddd" }}>
                <div className="d-flex p-2" style={{ justifyContent: "center", marginTop: "100px" }}>
                    <button className="btn btn-secondary w-100" onClick={() => setContent("Today")}>
                        Today
                    </button>
                    <button className="btn btn-secondary w-100" onClick={() => setContent("All")}>
                        All
                    </button>
                </div>
				<div className="flex-grow-1 p-3" style={{ overflowY: "scroll", height: "100%" }}>
    {(content === "Today" ? todayAppointment || [] : patients.patient || []).map((item, index) => (
        <div key={index} className="list-group-item" style={{ cursor: "pointer" }} 
            onClick={() => setSelectedPatient(item.patient || item)}>
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