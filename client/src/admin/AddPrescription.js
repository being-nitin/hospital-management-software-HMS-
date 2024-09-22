import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { listTreatments } from '../actions/treatmentActions'
import { listCatTests} from '../actions/testActions'
import { listUsers  } from '../actions/userActions'
import { listEnumsPrescriptions, createPrescription, listPaidEnums  } from '../actions/prescriptionActions'
import { PRESCRIPTION__CREATE_RESET } from '../constants/prescriptionConstants'
import {TEST_CREATE_RESET} from "../constants/testConstants";
import { listMedicines } from '../actions/medicineActions';
import { useNavigate, useParams } from 'react-router-dom';
import { listPatients } from '../actions/patientActions'
import { detailsVacApp } from '../actions/vaccineAppointmentActions';


const AddPrescription = () => {
     const {id} = useParams()
    const [user, setUser] = useState('')
    const [treatment, setTreatment] = useState('')
    const [medicine, setMedicine] = useState('')
    const [time, setTime] = useState(0)
    const [days, setDays] = useState(0)
    const [take, setTake] = useState('')
    const [test, setTest] = useState('')
    const [paid, setPaid] = useState('')
    const [history, setHistory] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const vaccineAppList = useSelector((state) => state.vaccineAppDetails)
    const { appointment } = vaccineAppList


    const patientList = useSelector((state) => state.patientList)
    const { patients } = patientList

    const medicineList = useSelector((state) => state.medicineList)
    const { medicines } = medicineList

    const userList = useSelector((state) => state.userList)
    const { users } = userList

    const catTestList = useSelector((state) => state.catTestList)
    const { tests } = catTestList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const treatLists = useSelector((state) => state.treatLists)
    const { treatments } = treatLists

    const prescEnumsList = useSelector((state) => state.prescEnumsList)
    const { enums } = prescEnumsList

    console.log(enums)

    const prescCreate = useSelector((state) => state.prescCreate)
    const { error, loading, success } = prescCreate

    const presPaidList = useSelector((state) => state.presPaidList)
    const { pays } = presPaidList

    useEffect(() => {
            
        if (userInfo ) {
            dispatch(detailsVacApp(id))
            dispatch(listPatients())
            dispatch(listUsers())
            dispatch(listMedicines())
            dispatch(listCatTests())
            dispatch(listEnumsPrescriptions())
            dispatch(listTreatments())
            dispatch(listPaidEnums())
            setUser(appointment.patient._id)
            if(success) {
                dispatch({ type: PRESCRIPTION__CREATE_RESET })
                navigate('/list-prescriptions')
            }
        } else {
            navigate('/signin')
        }


    }, [ dispatch, userInfo, success])


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );
    //
    const showLoading = () =>
        loading && (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createPrescription({ appId : appointment._id ,doctor : userInfo._id ,patient : user, treatment, medicine, time, days, take, test, paid, history}))

    }

    const addPrescriptionForm = () => (

        <div className="form-group col-md-12">
            <form onSubmit={submitHandler}>
                <div className="form-row">
                <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">patient</label>
                        <input type="text" className="form-control"  placeholder="Medicine" value={appointment.patient.firstName + "-" + appointment.patient.patientNumber}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="text-muted">Treatment for</label>
                        <select onChange={(e) => setTreatment(e.target.value)} className="form-control">
                            <option>Select Treatment</option>
                            {treatments &&
                            treatments.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                <div className="form-group col-md-3">
                        <label className="text-muted">Medicine</label>
                        <select onChange={(e) => setMedicine(e.target.value)} className="form-control">
                            <option>Select medicine</option>
                            {medicines &&
                            medicines.map((c, i) => (
                                <option key={i} value={c?.name}>
                                    {c?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                <div className="form-group col-md-3">
                        <label className="text-muted">No of takes</label>
                        <select onChange={(e) => setTime(e.target.value)} className="form-control">
                            <option>No of takes</option>
                            {[0.5,1,1.5, 2.5 , 3].map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">No of days</label>
                        <input type="text" className="form-control"  placeholder="Medicine" value={days}
                               onChange={(e) => setDays(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="text-muted">When to take</label>
                        <select onChange={(e) => setTake(e.target.value)} className="form-control">
                            <option>Select Treatment</option>
                            {enums &&
                            enums.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="exampleFormControlSelect2">Tests</label>
                        <select multiple className="form-control" id="exampleFormControlSelect2" onChange={(e) => setTest(e.target.value)}>
                            <option>Select Test</option>
                            {tests &&
                            tests.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.testName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="exampleFormControlTextarea1">Case History</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" value={history}
                                  onChange={(e) => setHistory(e.target.value)} placeholder="write case history" rows="3"/>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md-3">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Paid</label>
                            <select onChange={(e) => setPaid(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                                <option>Select Pay</option>
                                {pays &&
                                pays.map((p, i) => (
                                    <option key={i} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )


    return  (
        <Layout title="Category treatment Form">
            
            <>
            <h2 className="mb-4">Add Prescription</h2>
                {showLoading()}
                {showError()}
            {addPrescriptionForm()}
            </>

        </Layout>
    )

}




export default AddPrescription